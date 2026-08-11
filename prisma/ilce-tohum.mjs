// prisma/ilce-tohum.mjs
//
//     npm run ilce -- ankara            → Ankara ilçelerini ekler (PASİF)
//     npm run ilce -- ankara --aktif    → aktif olarak ekler (önerilmez)
//     npm run ilce -- ankara --hepsini-ez → mevcut kayıtları da günceller
//
// ─────────────────────────────────────────────────────────────────────────
// NEDEN PASİF EKLENİYOR
//
// Site mevcut 120 bölgeyle yayına çıkıyor. Yeni ilçeler canlıda, farklı
// zamanlarda tek tek aktif edilecek. Ölçüldü ve doğrulandı:
//
//   pasifken  → /api/regions'da YOK, sayfa 404, sitemap'te YOK
//   aktifken  → sayfa anında 200, sitemap en geç 10 dakika içinde güncelleniyor
//               (@nuxtjs/sitemap cacheMaxAgeSeconds: 600)
//
// Yani pasif kayıtlar Google'a hiçbir şekilde sızmıyor; aktif edildikleri an
// sitemap'e kendiliğinden giriyorlar. Ayrıca `isProvincePage` ayrımı slug
// üzerinden çalıştığı için (bkz. utils/turkishCities.ts) ilçe kayıtları
// il sayfasının altında doğru yerde listeleniyor.
//
// ─────────────────────────────────────────────────────────────────────────
// SLUG ÇAKIŞMASI
//
// Türkiye'de aynı adı taşıyan ilçeler var (birden fazla ilde "Merkez",
// "Çay", "Gölbaşı"…). Slug UNIQUE olduğu için çakışma hâlinde kayıt hata
// verirdi. Burada çakışma tespit edilirse slug'a il adı ekleniyor
// ("golbasi" doluysa → "golbasi-ankara"). Sessizce ezmek YOK: var olan bir
// bölgenin adresini çalmak, o sayfanın Google'daki sıralamasını yok eder.

import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client/client.ts'

const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

const argumanlar = process.argv.slice(2)
const ilAnahtari = argumanlar.find((a) => !a.startsWith('--'))
const AKTIF_EKLE = argumanlar.includes('--aktif')
const HEPSINI_EZ = argumanlar.includes('--hepsini-ez')

if (!ilAnahtari) {
  console.error('Kullanım: npm run ilce -- <il-anahtarı>   (örn: ankara)')
  process.exit(1)
}

const { il, ilceler } = await import(`./ilce-verileri/${ilAnahtari}.mjs`)

/** Türkçe karakterleri düşürüp URL'e uygun hâle getirir. */
const slugla = (metin) =>
  metin
    .replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i')
    .replace(/Ğ/g, 'g').replace(/ğ/g, 'g')
    .replace(/Ü/g, 'u').replace(/ü/g, 'u')
    .replace(/Ş/g, 's').replace(/ş/g, 's')
    .replace(/Ö/g, 'o').replace(/ö/g, 'o')
    .replace(/Ç/g, 'c').replace(/ç/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const mevcutSluglar = new Set((await p.region.findMany({ select: { slug: true } })).map((x) => x.slug))

let eklenen = 0
let guncellenen = 0
let atlanan = 0
const cakisanlar = []

for (const ilce of ilceler) {
  const temelSlug = slugla(ilce.ad)
  let slug = temelSlug

  // Çakışma: bu slug BAŞKA bir kayda aitse il adıyla ayrıştır.
  // Kendi kaydımızsa (tekrar çalıştırma) çakışma değildir.
  const bizeAitOlabilir = await p.region.findUnique({ where: { slug: temelSlug }, select: { cities: true } })
  const bizimKayit =
    bizeAitOlabilir && Array.isArray(bizeAitOlabilir.cities) && bizeAitOlabilir.cities.includes(il.plaka)

  if (mevcutSluglar.has(temelSlug) && !bizimKayit) {
    slug = `${temelSlug}-${slugla(il.ad)}`
    cakisanlar.push(`${ilce.ad}: ${temelSlug} dolu → ${slug}`)
  }

  const veri = {
    title: `${ilce.ad} Evden Eve Nakliyat`,
    subtitle: ilce.ad,
    shortTitle: ilce.ad,
    content: ilce.govde,
    excerpt: ilce.ozet,
    metaDescription: ilce.metaAciklama,
    faqs: ilce.sorular ?? [],
    facts: ilce.kunye ?? [],
    routes: ilce.guzergahlar ?? [],
    neighborhoods: ilce.mahalleler ?? [],
    cities: [il.plaka],
    isActive: AKTIF_EKLE,
  }

  const varOlan = await p.region.findUnique({ where: { slug }, select: { id: true } })

  if (varOlan && !HEPSINI_EZ) {
    atlanan++
    continue
  }

  if (varOlan) {
    // `isActive` GÜNCELLEMEDE DIŞARIDA BIRAKILIYOR. Yönetici canlıda bir
    // ilçeyi aktif ettikten sonra betik tekrar çalıştırılırsa, o sayfayı
    // sessizce yayından kaldırmış olurduk.
    const { isActive, ...aktifDisi } = veri
    await p.region.update({ where: { slug }, data: aktifDisi })
    guncellenen++
  } else {
    await p.region.create({ data: { slug, ...veri } })
    eklenen++
  }

  mevcutSluglar.add(slug)
}

console.log(`${il.ad} — ${ilceler.length} ilçe işlendi`)
console.log(`  eklenen     : ${eklenen} ${AKTIF_EKLE ? '(AKTİF)' : '(pasif)'}`)
console.log(`  güncellenen : ${guncellenen}`)
console.log(`  atlanan     : ${atlanan}${atlanan ? ' (--hepsini-ez ile güncellenir)' : ''}`)
if (cakisanlar.length) {
  console.log(`  slug çakışması çözüldü (${cakisanlar.length}):`)
  for (const c of cakisanlar) console.log(`     ${c}`)
}

await p.$disconnect()

// prisma/marka-yer-tutucu-tohum.mjs
//
//     npm run marka-yer-tutucu
//
// İçerik alanlarına ELLE yazılmış marka adını `{marka}` yer tutucusuna
// çevirir. Böylece Site Ayarları'ndan ad değiştirildiğinde bu metinler de
// onunla değişir (bkz. app/utils/marka-metni.ts).
//
// TEKRAR ÇALIŞTIRILABİLİR: dönüştürülmüş metinlerde marka adı zaten
// geçmediği için ikinci çalıştırma hiçbir şey yapmaz.
//
// ARANAN AD SABİT DEĞİL: Site Ayarları'ndaki güncel addan okunuyor.
// Böylece marka bir kez değiştirilmiş olsa bile betik doğru metni arar.

import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client/client.ts'

const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

const ayar = await p.siteSettings.findFirst({ select: { brandName: true, siteName: true } })
const MARKA = process.argv[2] || ayar?.brandName?.trim() || ayar?.siteName?.trim()

if (!MARKA) {
  console.error('Marka adı bulunamadı. Site Ayarları boşsa parametre verin:')
  console.error('  npm run marka-yer-tutucu -- "EveNakliyatEvden"')
  process.exit(1)
}

console.log(`aranan marka adı: ${MARKA}\n`)

const kacar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Belirtme ekli geçişi ÖNCE yakala: "Marka'i" içindeki "Marka" düz desenle
 * de eşleşiyor. Düz değişim önce çalışsaydı geriye "{marka}'i" kalırdı —
 * yani ek eski markanın ünlüsüne göre donardı, tam kaçındığımız hata.
 * Kesme işaretinin iki biçimi de (' ve ’) aranıyor; panelde ikisi de girilir.
 */
const EKLI = new RegExp(`${kacar(MARKA)}['’](?:yı|yi|yu|yü|ı|i|u|ü)\\b`, 'g')
const DUZ = new RegExp(kacar(MARKA), 'g')

const donustur = (metin) =>
  metin.replace(EKLI, "{marka'yı}").replace(DUZ, '{marka}')

let degisen = 0

// --- Bölüm içerikleri -------------------------------------------------------
const hedefler = [
  { model: 'heroPage', alanlar: ['description'] },
  { model: 'whyChooseUs', alanlar: ['mainTitle', 'shortDescription', 'closingStatement'] },
]

for (const { model, alanlar } of hedefler) {
  for (const kayit of await p[model].findMany()) {
    const veri = {}
    for (const alan of alanlar) {
      const eski = kayit[alan]
      if (typeof eski !== 'string' || !eski.includes(MARKA)) continue
      veri[alan] = donustur(eski)
    }
    if (!Object.keys(veri).length) continue
    await p[model].update({ where: { id: kayit.id }, data: veri })
    for (const [alan, yeni] of Object.entries(veri)) {
      console.log(`  ${model}.${alan}`)
      console.log(`     → ${yeni.slice(0, 90)}`)
      degisen++
    }
  }
}

// --- Blog yazarı — yer tutucu DEĞİL, alanı BOŞALT --------------------------
//
// 10 yazıda `author` alanı "<Marka> Ekibi" yazıyordu. Buraya yer tutucu
// koymak gereksiz: PostView zaten `author` boşken dinamik bir yedek
// üretiyor (`${brandName} Ekibi` — bkz. pages/[...slug].vue). Alanı
// boşaltmak aynı sonucu veriyor ve bakılacak bir şey daha bırakmıyor.
const yazilar = await p.post.findMany({ where: { author: { contains: MARKA } } })
for (const y of yazilar) {
  await p.post.update({ where: { id: y.id }, data: { author: null } })
  console.log(`  post.author [${y.slug}] → boşaltıldı (dinamik yedeğe düşecek)`)
  degisen++
}

console.log(`\ndeğiştirilen alan: ${degisen}`)
await p.$disconnect()

// prisma/esenler-geri-al.mjs
//
//     node --env-file=.env prisma/esenler-geri-al.mjs <yedek.sql>
//     node --env-file=.env prisma/esenler-geri-al.mjs <yedek.sql> --uygula
//
// TEK SEFERLİK ONARIM. 2026-08-10'da görsel alanının boş bırakılıp
// bırakılamadığı canlı test edilirken `/api/regions`'a yalnızca
// {slug, image:""} taşıyan KISMİ bir PUT gönderildi. regions.service.ts
// update() metin alanlarını `body.X ?? null` ile yazdığı için, istekte
// bulunmayan alanlar null'landı: subtitle, shortTitle, content, excerpt,
// metaDescription. (JSON alanları `?? undefined` olduğu için korundu.)
//
// Değerler ELLE YAZILMIYOR, doğrudan yedek dump'tan okunuyor — el ile
// aktarma denendi ve metin yanlış yeniden kurgulandı; tek güvenilir kaynak
// dosyanın kendisi.
//
// Geri yazmanın birebir olduğu şöyle doğrulandı: aynı yedekteki 120 bölgenin
// 71'i veritabanıyla metin alanlarında BİREBİR aynı, 47'si yalnızca sonradan
// doldurduğumuz priceFactorsTitle alanında farklı; metin alanları farklı olan
// TEK kayıt esenler. Yani 7 Ağustos'tan bu yana bu alanlara dokunan başka bir
// iş çalışmamış.

import { readFileSync } from 'node:fs'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client/client.ts'

// Dump'ta INSERT sütun listesi yok; sıra CREATE TABLE ile aynı.
const SUTUNLAR = ['id', 'title', 'subtitle', 'shortTitle', 'slug', 'content', 'excerpt', 'image', 'createdAt', 'updatedAt', 'isActive', 'cities', 'priceFactors', 'priceFactorsImage', 'priceFactorsTitle', 'neighborhoods', 'facts', 'faqs', 'routes', 'metaDescription']
const GERI_YAZILACAK = ['subtitle', 'shortTitle', 'content', 'excerpt', 'metaDescription']

/** MySQL dump'ındaki tek bir VALUES tuple'ını, kaçışlı tırnakları gözeterek ayırır. */
function tupleAyikla(metin, bas) {
  let i = bas + 1
  const alanlar = []
  let cur = ''
  let tirnak = false
  while (i < metin.length) {
    const c = metin[i]
    if (tirnak) {
      if (c === '\\') { cur += c + metin[i + 1]; i += 2; continue }
      if (c === "'") { tirnak = false; i++; continue }
      cur += c; i++; continue
    }
    if (c === "'") { tirnak = true; i++; continue }
    if (c === ',') { alanlar.push(cur); cur = ''; i++; continue }
    if (c === ')') { alanlar.push(cur); return alanlar }
    cur += c; i++
  }
  throw new Error('tuple kapanmadı')
}

const coz = (v) => v === 'NULL' || v === undefined
  ? null
  : v.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')

const yedekYolu = process.argv[2]
const uygula = process.argv.includes('--uygula')
if (!yedekYolu || yedekYolu.startsWith('--')) {
  console.error('Kullanım: node --env-file=.env prisma/esenler-geri-al.mjs <yedek.sql> [--uygula]')
  process.exit(1)
}

const sql = readFileSync(yedekYolu, 'utf8')
const bas = sql.indexOf("(28,'Esenler Evden Eve Nakliyat'")
if (bas < 0) throw new Error(`esenler satırı bulunamadı: ${yedekYolu}`)

const alanlar = tupleAyikla(sql, bas)
if (alanlar.length !== SUTUNLAR.length) {
  throw new Error(`sütun sayısı uyuşmuyor: ${alanlar.length} ≠ ${SUTUNLAR.length}`)
}
const yedek = {}
SUTUNLAR.forEach((k, n) => { yedek[k] = coz(alanlar[n]) })
if (yedek.slug !== 'esenler') throw new Error(`yanlış satır ayıklandı: ${yedek.slug}`)

const veri = {}
for (const k of GERI_YAZILACAK) veri[k] = yedek[k]

const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

try {
  const mevcut = await p.region.findUnique({
    where: { slug: 'esenler' },
    select: Object.fromEntries(GERI_YAZILACAK.map((k) => [k, true])),
  })
  if (!mevcut) throw new Error('esenler veritabanında yok')

  console.log(`yedek: ${yedekYolu}\n`)
  console.log('alan                mevcut        yedek')
  for (const k of GERI_YAZILACAK) {
    const m = mevcut[k] === null ? '(null)' : `${String(mevcut[k]).length} krk`
    const y = veri[k] === null ? '(null)' : `${String(veri[k]).length} krk`
    console.log(`  ${k.padEnd(18)} ${m.padEnd(13)} ${y}`)
  }

  if (!uygula) {
    console.log('\nRapor modu. Yazmak için --uygula ekleyin.')
  } else {
    await p.region.update({ where: { slug: 'esenler' }, data: veri })
    const sonra = await p.region.findUnique({
      where: { slug: 'esenler' },
      select: Object.fromEntries(GERI_YAZILACAK.map((k) => [k, true])),
    })
    const hatali = GERI_YAZILACAK.filter((k) => (sonra[k] ?? null) !== (veri[k] ?? null))
    console.log(`\ngeri yazıldı. yedekle birebir eşleşmeyen alan: ${hatali.length === 0 ? 'yok' : hatali.join(', ')}`)
  }
} finally {
  await p.$disconnect()
}

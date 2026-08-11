// prisma/ayar-metinleri-tohum.mjs
//
// PANELDEN GİRİLMİŞ SEO METİNLERİ — Site Ayarları ve Meta kayıtları.
//
// Şablondan devralınan ya da yer tutucu kalmış metinleri gerçek içerikle
// değiştirir. Sayfa bazlı açıklamalar ayrı betiklerde:
//   bolge-aciklama-tohum.mjs    → 120 bölge
//   icerik-aciklama-tohum.mjs   → 7 hizmet + 10 blog
//
// TEKRAR ÇALIŞTIRILABİLİR: `--hepsini-ez` verilmedikçe elle yazılmış
// (yer tutucu olmayan) metinleri ezmez.
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client/client.ts'

const hepsiniEz = process.argv.includes('--hepsini-ez')
const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

/**
 * Yer tutucu sayılan değerler. Bunlar "dolu" kabul edilmez ve ezilir —
 * "Site açıklaması" gibi bir metin siteye çıkarsa arama sonucunda o görünür.
 */
const YER_TUTUCULAR = [
  'site açıklaması',
  'site aciklamasi',
  'açıklama',
  'lorem ipsum',
  'örnek',
]
const yerTutucuMu = (v) => {
  const t = String(v ?? '').trim().toLocaleLowerCase('tr-TR')
  return t === '' || YER_TUTUCULAR.includes(t)
}

// ── Site Ayarları ──────────────────────────────────────────────────────────
const AYARLAR = {
  /**
   * Firmanın ne yaptığını anlatan genel açıklama. `metaDescription` boşsa
   * arama sonucu açıklamasının son yedeği olarak da kullanılıyor
   * (bkz. useSiteSettings → metaDescriptionDefault), o yüzden 155 karakter
   * sınırına uyuyor.
   */
  siteDescription:
    'İstanbul merkezli, Türkiye genelinde evden eve nakliyat, şehirler arası taşıma, ofis taşıma ve eşya depolama hizmeti. Sigortalı taşıma, ücretsiz keşif.',

  /**
   * Site geneli yedek arama açıklaması. Sayfaların kendi açıklaması varken
   * KULLANILMAZ; yalnızca hiçbir açıklama bulunamazsa devreye girer.
   * Bu yüzden bilerek siteDescription'dan farklı yazıldı.
   */
  metaDescription:
    'Evden eve nakliyat, asansörlü taşıma, parça eşya, ofis taşıma ve depolama. Yazılı sabit fiyat ve sigortalı taşımacılık. Ücretsiz keşif için arayın.',

  /**
   * BOŞ BIRAKILIYOR — bilinçli.
   *
   * Footer'da bu alan doluysa aynen basılıyor; boşsa marka adı ve
   * İÇİNDE BULUNULAN YIL ile otomatik üretiliyor (bkz. Footer.vue).
   * Öncesinde "© 2026 …" olarak sabitlenmişti; öyle kalsaydı yıl
   * dönümünde site eski yılı göstermeye devam ederdi.
   */
  copyrightText: null,
}

// ── Meta kayıtları ─────────────────────────────────────────────────────────
const META = {
  about: {
    title: 'Hakkımızda | Evden Eve Nakliyat ve Şehirler Arası Taşımacılık',
    description:
      'On iki yıllık deneyimle evden eve nakliyat, şehirler arası taşıma, ofis taşıma ve depolama. Ücretsiz keşif, yazılı sabit fiyat, %100 sigortalı taşıma.',
  },
}

// ── Uygulama ───────────────────────────────────────────────────────────────
const ayar = await p.siteSettings.findFirst()
if (!ayar) {
  console.log('Site Ayarları kaydı yok — atlandı.')
} else {
  const guncelleme = {}
  for (const [alan, deger] of Object.entries(AYARLAR)) {
    const mevcut = ayar[alan]
    if (deger === null) {
      // Bilerek boşaltılan alan
      if (mevcut !== null && mevcut !== '') {
        guncelleme[alan] = null
        console.log(`  boşaltıldı  ${alan}  (otomatik üretilecek)`)
      }
      continue
    }
    if (yerTutucuMu(mevcut) || hepsiniEz) {
      guncelleme[alan] = deger
      console.log(`  yazıldı     ${alan}  (${deger.length} karakter)`)
    } else {
      console.log(`  atlandı     ${alan}  (elle yazılmış, korundu)`)
    }
  }
  if (Object.keys(guncelleme).length) {
    await p.siteSettings.update({ where: { id: ayar.id }, data: guncelleme })
  }

  // Kullanılmayan alanlar hakkında uyarı — doldurmanın faydası yok.
  if (ayar.metaTitle) {
    console.log('\n  NOT: `metaTitle` alanı doluymuş ama kodda HİÇBİR YERDE okunmuyor.')
  }
  if (ayar.metaKeywords) {
    console.log('  NOT: `metaKeywords` <meta name="keywords"> olarak basılıyor;')
    console.log('       Google 2009\'dan beri bu etiketi tamamen yok sayıyor.')
  }
}

for (const [sayfa, veri] of Object.entries(META)) {
  const mevcut = await p.meta.findUnique({ where: { page: sayfa } })
  if (!mevcut) {
    await p.meta.create({ data: { sectionName: 'metas', page: sayfa, ...veri } })
    console.log(`  oluşturuldu meta/${sayfa}`)
    continue
  }
  const ayni = mevcut.title === veri.title && mevcut.description === veri.description
  if (ayni) {
    console.log(`  güncel      meta/${sayfa}`)
    continue
  }
  await p.meta.update({ where: { page: sayfa }, data: veri })
  console.log(`  yazıldı     meta/${sayfa}  (başlık ${veri.title.length}, açıklama ${veri.description.length})`)
}

await p.$disconnect()

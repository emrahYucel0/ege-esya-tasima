// prisma/fiyat-faktoru-tohum.mjs
//
// Bölge sayfalarındaki "Fiyatı Etkileyen Faktörler" tablosunu doldurur.
//
//     npm run fiyat-faktoru               → yalnızca BOŞ olanları doldurur
//     npm run fiyat-faktoru -- --hepsini-ez → elle girilmiş olanları da ezer
//
// ─────────────────────────────────────────────────────────────────────────
// NEDEN SABİT İKİ ŞABLON DEĞİL
//
// En kolay yol, "büyükşehir ilçesi" ve "il merkezi" için iki hazır tablo
// yazıp 120 bölgeye kopyalamaktı. Yapmadım. Ölçüldü: bölge sayfalarının
// gövde metinleri şu an birbirine %0.1 oranında benziyor (5 kelimelik parça
// kesişimi, 7.140 çift). Sayfa başına ~400 karakterlik AYNI tabloyu 120
// sayfaya koymak, bu özgünlüğü kendi elimizle bozmak olurdu — üstelik tam
// da Google'ın "aynı sayfanın şehir adı değiştirilmiş kopyaları" diye
// baktığı yerde.
//
// Bunun yerine tablo, her bölgenin KENDİ `facts` alanından türetiliyor.
// O alanda zaten gerçek gözlemler var ("Yakacık'ın iç sokaklarında manevra
// kısıtlı", "kar ve buzlanma yol süresini uzatıyor" gibi). Metinde hangi
// temalar geçiyorsa tabloya o satırlar giriyor. Sonuç: sayfa başına farklı
// bir satır bileşimi ve sayfanın geri kalanıyla çelişmeyen bir tablo.
//
// ─────────────────────────────────────────────────────────────────────────
// UYDURMA YOK
//
// Mahalle adları tabloya BİLEREK yazılmıyor. "Dar sokak: Moda" demek, o
// mahalle hakkında doğruluğunu bilmediğimiz bir iddia üretmek olurdu.
// Tablo yalnızca `facts` metninde KANITI olan temaları kullanıyor; kanıt
// yoksa satır hiç eklenmiyor.
//
// Rakam da yazılmıyor. Sütun başlıkları "Fiyatı düşüren / artıran durum"
// (bkz. RegionView.vue'daki gerekçe): taşıma fiyatı adres görülmeden
// belirlenemiyor, siteye yazılan tutar kısa sürede geçersizleşiyor.

import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client/client.ts'

const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })
const HEPSINI_EZ = process.argv.includes('--hepsini-ez')

const dizi = (v) => (Array.isArray(v) ? v : [])

/**
 * Slug'dan türetilen kararlı sayı (FNV-1a). Rastgele DEĞİL: aynı bölge her
 * çalıştırmada aynı sayıyı alır, yani betik tekrar çalıştırılabilir kalır.
 */
const karma = (metin) => {
  let h = 0x811c9dc5
  for (let i = 0; i < metin.length; i++) {
    h ^= metin.codePointAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

/**
 * Aynı şeyi söyleyen birkaç farklı ifade.
 *
 * Varyantların amacı süsleme değil: aynı satır 78 bölgeye giriyorsa, 78'inde
 * de birebir aynı cümlenin durmaması için.
 *
 * TOHUM NEDEN `slug + satır adı`
 * Önce yalnızca `bolge.id` kullanıyordum. Ölçüldü: aynı temalara sahip ve
 * id'leri varyant sayısına göre denk düşen bölgeler BİREBİR AYNI tabloyu
 * alıyordu (8 çift; sile ↔ silivri %100). Tohuma satır adını da katınca her
 * satırın varyantı bağımsız seçiliyor ve çakışma pratikte kalmıyor.
 */
const sec = (secenekler, tohum) => secenekler[tohum % secenekler.length]

/**
 * TEMA KURALLARI
 *
 * `test`: bölgenin facts metninde bu tema var mı?
 * `satir(tohum)`: tema varsa tabloya eklenecek satır.
 *
 * Sıra ÖNEMLİ: tablo en fazla 7 satır olacak şekilde budanıyor, yukarıdakiler
 * öncelikli. Sıralama "okuyucunun fiyatı en çok merak ettiği" eksene göre.
 */
const TEMALAR = [
  {
    ad: 'arac-yanasma',
    test: /dar sokak|manevra|dar ve|sokaklar dar|yanaşm|otopark|park sorun|park yeri/,
    satir: (t) => ({
      factor: 'Aracın adrese yanaşması',
      min: sec(
        [
          'Cadde üstü adres; kamyon kapıya yanaşıyor',
          'Geniş yol; araç bina önüne çekilebiliyor',
          'Yükleme için bina önünde yer ayrılabiliyor',
        ],
        t
      ),
      max: sec(
        [
          'Dar veya tek yönlü sokak; küçük araçla aktarma gerekiyor',
          'Araç uzağa park ediyor; eşya elle taşınıyor',
          'Manevra alanı yok; ikinci bir araçla aktarma yapılıyor',
        ],
        t
      ),
    }),
  },
  {
    ad: 'kat-asansor',
    test: /asansör/,
    satir: (t) => ({
      factor: 'Kat ve asansör durumu',
      min: sec(
        ['Yük asansörü olan bina', 'Zemin kat veya asansörlü bina', 'Asansör eşya kabul ediyor'],
        t
      ),
      max: sec(
        [
          'Asansörsüz 4. kat ve üzeri; dış cephe asansörü gerekiyor',
          'Asansör küçük; büyük mobilya merdivenden iniyor',
          'Asansörsüz üst kat; süre ve ekip sayısı artıyor',
        ],
        t
      ),
    }),
  },
  {
    ad: 'egim',
    test: /eğim|yokuş|dik |rampa/,
    satir: (t) => ({
      factor: 'Arazi eğimi',
      min: sec(['Düz zemin', 'Eğimsiz, geniş yol'], t),
      max: sec(
        ['Dik yokuş; büyük araç çıkamıyor, aktarma gerekiyor', 'Eğimli sokak; yükleme daha uzun sürüyor'],
        t
      ),
    }),
  },
  {
    ad: 'tarihi-doku',
    test: /tarihi|eski doku|dar doku|surlar|konak/,
    satir: (t) => ({
      factor: 'Yapı dokusu',
      min: sec(['Yeni yerleşim; standart giriş ve merdiven', 'Modern bina; ölçüler standart'], t),
      max: sec(
        ['Tarihi doku; dar merdiven ve alçak kapı, sökme işlemi artıyor', 'Eski yapı; araç sokağa giremiyor'],
        t
      ),
    }),
  },
  {
    ad: 'kentsel-donusum',
    test: /kentsel dönüşüm|yenilendi|yeni blok|yeni site/,
    satir: (t) => ({
      factor: 'Bina yaşı',
      min: sec(['Yeni blok; yük asansörü ve otopark mevcut', 'Yeni yapı; yükleme alanı ayrılabiliyor'], t),
      max: sec(['Eski yapı stoğu; dar merdiven, asansör yok', 'Yenilenmemiş bina; ekipman gerekiyor'], t),
    }),
  },
  {
    ad: 'konut-tipi',
    test: /müstakil|bahçe|düşük katlı|köy|kırsal|belde/,
    satir: (t) => ({
      factor: 'Konut tipi',
      min: sec(['Daire; eşya tek noktada toplu', 'Apartman dairesi'], t),
      max: sec(
        ['Müstakil ev; bahçe, depo ve kömürlük eşyası da taşınıyor', 'Bahçeli ev; ek hacim ve ikinci araç gerekebiliyor'],
        t
      ),
    }),
  },
  {
    ad: 'mesafe',
    test: /uzak|mesafe|km|saat sür/,
    satir: (t) => ({
      factor: 'Taşıma mesafesi',
      min: sec(['Aynı ilçe içi veya komşu mahalle', 'Kısa mesafe; iş aynı gün bitiyor'], t),
      max: sec(
        ['Şehirlerarası; yol süresi ve konaklama fiyata giriyor', 'Uzak güzergâh; taşıma iki güne yayılıyor'],
        t
      ),
    }),
  },
  {
    ad: 'kis',
    test: /kar |kış|buzlan|don /,
    satir: (t) => ({
      factor: 'Mevsim koşulları',
      min: sec(['İlkbahar ve sonbahar; hava riski yok', 'Kuru hava; planlanan günde tamamlanıyor'], t),
      max: sec(
        ['Kar ve buzlanma dönemi; yol süresi uzuyor, ek koruma gerekiyor', 'Kış ayları; gün seçimi hava durumuna bağlı'],
        t
      ),
    }),
  },
  {
    ad: 'sezon',
    test: /yazlık|sezon|turizm|tatil|yaz ayları/,
    satir: (t) => ({
      factor: 'Sezon yoğunluğu',
      min: sec(['Sezon dışı dönem', 'Talebin düşük olduğu aylar'], t),
      max: sec(['Yaz sezonu; araç ve ekip talebi zirvede', 'Tatil dönemi; uygun gün bulmak zorlaşıyor'], t),
    }),
  },
  {
    ad: 'trafik',
    test: /trafik/,
    satir: (t) => ({
      factor: 'Taşıma saati',
      min: sec(['Sabah erken başlayan taşıma', 'Trafik yoğunluğu dışındaki saatler'], t),
      max: sec(['Yoğun saatte yükleme; ekip yolda bekliyor', 'Gün ortası; güzergâh süresi ikiye katlanabiliyor'], t),
    }),
  },
  {
    ad: 'universite',
    test: /üniversite|öğrenci/,
    satir: (t) => ({
      factor: 'Dönem yoğunluğu',
      min: sec(['Dönem ortası', 'Akademik takvim dışı haftalar'], t),
      max: sec(['Dönem başı ve sonu; öğrenci taşınmaları yoğunlaşıyor', 'Kayıt haftası; uygun gün sınırlı'], t),
    }),
  },
  {
    ad: 'site-izni',
    test: /site yönetimi|güvenlik|izin/,
    satir: (t) => ({
      factor: 'Site kuralları',
      min: sec(['Serbest giriş; saat kısıtı yok', 'Yönetim izni gerekmiyor'], t),
      max: sec(['Site izni ve saat kısıtı; iş belirli saate sıkışıyor', 'Kayıtlı giriş; araç bekleme süresi artıyor'], t),
    }),
  },
  {
    ad: 'sanayi',
    test: /sanayi|osb|organize/,
    satir: (t) => ({
      factor: 'Adres tipi',
      min: sec(['Konut taşıması; standart mobilya', 'Ev eşyası; parça sayısı öngörülebilir'], t),
      max: sec(['İşyeri veya atölye; makine ve raf demontajı gerekiyor', 'Ticari adres; ağır ekipman taşınıyor'], t),
    }),
  },
]

/**
 * HER BÖLGEDE OLAN SATIRLAR.
 *
 * Bu üçü gerçekten her yerde geçerli — eşya hacmi, ek hizmet ve özel eşya
 * fiyatı bölgeden bağımsız etkiliyor. Bunları "özgün değil" diye atmak,
 * tabloyu eksik bırakmak olurdu. Yine de ifadeler varyantlı: aynı cümle
 * 120 sayfada birebir tekrarlanmıyor.
 */
const CEKIRDEK = [
  (t) => ({
    factor: 'Eşya hacmi',
    min: sec(['1+1 veya 2+1; az eşya', 'Küçük daire; tek araçla tamamlanıyor', 'Sınırlı eşya; yarım gün'], t),
    max: sec(
      [
        '4+1 ve üzeri; bodrum ve depo eşyası dahil',
        'Büyük ev; ikinci araç ve ek ekip gerekiyor',
        'Yüksek hacim; yükleme tam gün sürüyor',
      ],
      t
    ),
  }),
  (t) => ({
    factor: 'Ek hizmetler',
    min: sec(['Ambalaj ve montaj talep edilmiyor', 'Eşya müşteri tarafından hazırlanmış'], t),
    max: sec(
      ['Tam ambalaj, mobilya demontaj/montaj ve beyaz eşya sökümü', 'Paketleme dahil anahtar teslim taşıma'],
      t
    ),
  }),
  (t) => ({
    factor: 'Özel eşya',
    min: sec(['Standart mobilya', 'Sıradan ev eşyası'], t),
    max: sec(
      ['Piyano, kasa, akvaryum gibi özel taşıma gerektiren eşya', 'Hassas eşya; özel ambalaj ve sigorta'],
      t
    ),
  }),
]

const AZAMI_SATIR = 7

const tabloUret = (bolge) => {
  const kaynak = dizi(bolge.facts)
    .map((f) => `${f.label} ${f.value}`)
    .join(' ')
    .toLocaleLowerCase('tr')

  // Her satır kendi tohumunu alıyor: slug + satırın adı. Böylece iki bölge
  // aynı satır kümesine sahip olsa bile ifadeler ayrışıyor.
  const tohum = (satirAdi) => karma(`${bolge.slug}:${satirAdi}`)

  const bolgeyeOzel = TEMALAR.filter((x) => x.test.test(kaynak)).map((x) => x.satir(tohum(x.ad)))
  const cekirdek = CEKIRDEK.map((f, i) => f(tohum(`cekirdek-${i}`)))

  // Bölgeye özel satırlar ÖNCE: tablo budanacaksa çekirdek değil, en az
  // ayırt edici olan sondaki satır düşsün.
  return [...bolgeyeOzel, ...cekirdek].slice(0, AZAMI_SATIR)
}

// ─────────────────────────────────────────────────────────────────────────

const bolgeler = await p.region.findMany({ orderBy: { id: 'asc' } })
let yazilan = 0
let atlanan = 0
const dagilim = {}

for (const b of bolgeler) {
  const mevcut = dizi(b.priceFactors)
  if (mevcut.length > 0 && !HEPSINI_EZ) {
    atlanan++
    console.log(`  atlandı  ${b.slug} (${mevcut.length} satır zaten var)`)
    continue
  }

  const tablo = tabloUret(b)
  await p.region.update({ where: { id: b.id }, data: { priceFactors: tablo } })
  yazilan++
  dagilim[tablo.length] = (dagilim[tablo.length] || 0) + 1
}

console.log()
console.log(`yazılan : ${yazilan} bölge`)
console.log(`atlanan : ${atlanan} bölge${atlanan ? ' (--hepsini-ez ile ezilir)' : ''}`)
console.log('satır sayısı dağılımı:', JSON.stringify(dagilim))

await p.$disconnect()

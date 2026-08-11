// app/utils/sayfa-meta.ts
//
// SABİT SAYFALARIN SEO KÜTÜĞÜ — tek kaynak.
//
// NEDEN VAR
// Başlık ve açıklama varsayılanları her sayfanın kendi dosyasında gömülüydü.
// İki sonucu vardı:
//
//   1. Admin panelindeki sayfa listesi elle yazılmıştı ve YALNIZCA 5 anahtar
//      içeriyordu (home, about, region, blog, contact). Hizmetlerimiz
//      (`services`) ve Fiyat Hesaplama (`fiyat-hesaplama`) sayfaları
//      `usePageSeo` çağırdıkları hâlde panelde seçilemiyordu — yani başlıkları
//      ve açıklamaları pratikte sabitti, panelden değiştirilemiyordu.
//   2. Üç politika sayfasının (gizlilik, kullanım şartları, çerez) hiç SEO
//      çağrısı yoktu: ne başlık, ne açıklama, ne canonical üretiyorlardı.
//
// Liste artık burada. Panel dropdown'ını buradan kuruyor, sayfalar
// varsayılanlarını buradan alıyor; ikisi ayrışamaz.
//
// ÖNCELİK SIRASI (usePageSeo içinde uygulanıyor)
//   panelden girilen Meta kaydı  >  buradaki varsayılan  >  Site Ayarları
//
// Buradaki metinler SİLİNMEZ: panelde bir sayfanın kaydı yoksa ya da admin
// alanı boşaltırsa siteye bunlar çıkar. Yani "boş meta" durumu hiç oluşmaz.
//
// MARKA ADI ELLE YAZILMAZ
// Buradaki metinlerde marka adı geçecekse `{marka}` yazılır; gerçek değer
// istek anında Site Ayarları'ndan konur (bkz. composables/usePageSeo.ts).
// Elle yazılırsa panelden ad değiştiğinde o sayfa eski adda kalır.

export interface SayfaMeta {
  /** Meta tablosundaki `page` sütununa yazılan anahtar. DEĞİŞTİRİLMEMELİ —
   *  değişirse o sayfanın panelde girilmiş kaydı kopar. */
  anahtar: string
  /** Panelde görünen Türkçe ad. Admin ham anahtar görmemeli. */
  etiket: string
  /** Sitedeki yolu — panelde "hangi sayfa bu?" sorusunu cevaplıyor. */
  yol: string
  title: string
  description: string
}

export const SAYFA_METALARI: SayfaMeta[] = [
  {
    anahtar: 'home',
    etiket: 'Ana Sayfa',
    yol: '/',
    // Marka adı BİLİNÇLİ OLARAK yok. Önceki başlık markayla başlıyordu
    // ("EveNakliyatEvden | …") ve arama hacmi sıfır olan bir ifade,
    // başlığın en değerli ilk 16 karakterini harcıyordu. İç sayfalarda
    // zaten doğru yapılıyor: anahtar kelime başta, marka sonda.
    //
    // "Ucuz" da çıkarıldı: sitenin tüm konumlandırması (yazılı sabit fiyat,
    // sigortalı taşıma, marangozlu söküm-montaj) bunun zıddı. Fiyat avcısı
    // çeken, dönüşmeyen bir kelimeydi.
    //
    // "İstanbul" eklendi: işletme adresi Pendik/İstanbul ve yerel sinyal
    // ana sayfada karşılık buluyor. 80 il sayfası zaten kendi illerini
    // hedefliyor, ana sayfanın onlarla yarışmasına gerek yok.
    title: 'Evden Eve Nakliyat İstanbul | Sigortalı Taşıma, Yazılı Fiyat',
    description:
      'Evden eve nakliyat, parça eşya taşıma ve şehirler arası taşımacılık. Sigortalı ambalaj, marangozlu söküm-montaj ve yazılı sabit fiyat. Ücretsiz keşif.',
  },
  {
    anahtar: 'about',
    etiket: 'Hakkımızda',
    yol: '/hakkimizda',
    // `{marka}`: canlı marka adı istek anında yerleştiriliyor
    // (bkz. composables/usePageSeo.ts). Elle yazılmıyor — panelden ad
    // değişince bu sayfa eski adda kalırdı.
    title: 'Hakkımızda | {marka}',
    description:
      'Evden eve nakliyat, şehirler arası taşıma, ofis taşıma ve depolama hizmetleri. Ücretsiz keşif, yazılı sabit fiyat ve sigortalı taşımacılık anlayışımız.',
  },
  {
    anahtar: 'services',
    etiket: 'Hizmetlerimiz',
    yol: '/hizmetlerimiz',
    // 69 KARAKTERDİ — canlıda ölçüldü, Google sonuçlarında kesiliyordu.
    // Sınır yaklaşık 60 karakter (aslında ~580 piksel genişlik). "Hizmetlerimiz"
    // yerine "Hizmetleri" ve listeden "Parça Eşya" çıkarılarak 59'a indirildi;
    // asıl anahtar kelime "evden eve nakliyat" başta korundu.
    title: 'Evden Eve Nakliyat Hizmetleri | Asansörlü, Ofis, Parça Eşya',
    description:
      'Evden eve, asansörlü, parça eşya, ofis taşıma, depolama ve şehirler arası nakliyat. Her hizmetin kapsamı ve fiyatı etkileyen konular. Ücretsiz keşif.',
  },
  {
    anahtar: 'region',
    etiket: 'Bölgelerimiz',
    yol: '/bolgelerimiz',
    title: 'Hizmet Bölgelerimiz | Evden Eve Nakliyat',
    description:
      'İstanbul ilçeleri ve Türkiye genelindeki illerde evden eve nakliyat ve depolama. Bölgenizi seçin, orada nasıl çalıştığımızı okuyun. Ücretsiz keşif.',
  },
  {
    anahtar: 'blog',
    etiket: 'Blog',
    yol: '/blog',
    title: 'Blog | Nakliyat Rehberi ve Taşınma İpuçları',
    description:
      'Taşınma maliyeti, paketleme, sigorta, asansörlü nakliyat ve depolama hakkında pratik rehberler. Sahada edindiğimiz deneyimi yazıya döktük.',
  },
  {
    anahtar: 'contact',
    etiket: 'İletişim',
    yol: '/iletisim',
    title: 'İletişim | Ücretsiz Keşif ve Teklif',
    description:
      'Evden eve nakliyat, şehirler arası taşıma, ofis taşıma ve depolama için ücretsiz keşif talebi. Formu doldurun, yazılı ve sabit fiyat teklifimizi sunalım.',
  },
  {
    anahtar: 'fiyat-hesaplama',
    etiket: 'Fiyat Hesaplama',
    yol: '/fiyat-hesaplama',
    title: 'Evden Eve Nakliyat Fiyat Hesaplama | Tahmini Taşınma Maliyeti',
    description:
      'Oda sayısı, kat, asansör durumu ve mesafeye göre taşınma maliyetinizi saniyeler içinde tahmin edin. Kesin fiyat ücretsiz keşiften sonra netleşir.',
  },
  {
    anahtar: 'gizlilik-politikasi',
    etiket: 'Gizlilik Politikası',
    yol: '/gizlilik-politikasi',
    title: 'Gizlilik Politikası | Kişisel Verilerin Korunması',
    description:
      'Nakliyat hizmetlerimiz kapsamında topladığımız kişisel verilerin hangi amaçla işlendiği, ne kadar süre saklandığı ve KVKK kapsamındaki haklarınız.',
  },
  {
    anahtar: 'kullanim-sartlari',
    etiket: 'Kullanım Şartları',
    yol: '/kullanim-sartlari',
    title: 'Kullanım Şartları | Hizmet ve Teklif Koşulları',
    description:
      'Sitemizin kullanımına, teklif ve rezervasyon sürecine, taşıma sırasındaki sorumluluklara, iptal ve uyuşmazlık koşullarına ilişkin esaslar.',
  },
  {
    anahtar: 'cerez-politikasi',
    etiket: 'Çerez Politikası',
    yol: '/cerez-politikasi',
    title: 'Çerez Politikası | Sitemizde Kullanılan Çerezler',
    description:
      'Sitemizde hangi çerezlerin kullanıldığı, ne amaçla tutuldukları, ne kadar süre saklandıkları ve tarayıcınızdan nasıl kapatabileceğiniz.',
  },
]

/**
 * Anahtara göre varsayılanı verir.
 *
 * Bilinmeyen anahtarda HATA FIRLATIR, sessizce boş dönmez: bir sayfa
 * kütüğe eklenmeden `usePageSeo` çağırırsa bu, o sayfanın başlıksız
 * yayına çıkması demek olurdu. Geliştirme sırasında patlaması daha iyi.
 */
export const sayfaMetasi = (anahtar: string): SayfaMeta => {
  const kayit = SAYFA_METALARI.find((s) => s.anahtar === anahtar)
  if (!kayit) {
    throw new Error(
      `sayfa-meta: "${anahtar}" anahtarı kütükte yok. app/utils/sayfa-meta.ts içine ekleyin.`
    )
  }
  return kayit
}

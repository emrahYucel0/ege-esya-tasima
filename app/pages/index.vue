<script setup>
/*
 * BÖLÜM SIRASI — ikna yayı
 *   Hero         ne vaat ediyoruz
 *   TrustBar     vaadi destekleyen sayılar (daha kaydırmadan)
 *   RegionFinder bölgenizde var mıyız (ziyaretçinin ilk sorusu)
 *   Help         sizin adınıza neyi üstleniyoruz (neler dahil)
 *   Process     nasıl oluyor (4 adım)
 *   Choose      neden biz (farkımız)
 *   Testimonial iddianın müşteri onayı — Choose'un hemen ardında
 *   Pricing     güven kurulduktan SONRA fiyat
 *   Faq         fiyat itirazının hemen karşılanması (ilk soru zaten fiyat)
 *   FinalCTA    net kapanış
 *
 * Help ile Choose bilerek AYRILDI: ikisi de "büyük görsel + madde listesi"
 * biçiminde ikna bloğu; yan yana geldiklerinde aynı bölüm iki kez
 * gösterilmiş gibi okunuyordu. Process aralarına girince hem tekrar hissi
 * kalkıyor hem de Choose → Testimonial (iddia → kanıt) bitişikliği
 * korunuyor.
 *
 * DİKEY BOŞLUK burada verilmez. Eskiden her bölüme `mb-20 mt-20` ekleniyor,
 * bölümler ayrıca kendi `py`'lerini taşıyordu; iki kaynak breakpoint'lerde
 * birbirini tutmuyordu. Artık tek kaynak UiSection (--space-section).
 *
 * ZEMİN BANTLAMASI dönüşümlü: TrustBar(beyaz) → RegionFinder(gövde) →
 * Help(beyaz) → Process(gövde) → Choose(beyaz) → Testimonial(gövde) →
 * Pricing(beyaz) → Faq(gövde) → FinalCTA(marka). Yan yana aynı zeminli iki
 * bölüm yok; ayırıcı çizgi çizmeye gerek kalmıyor.
 *
 * HİZMETLER BÖLÜMÜ NEDEN KALKTI
 * Hizmetler artık navbar'da kendi girişine ve /hizmetlerimiz altında yedi
 * ayrı sayfaya sahip; ana sayfada aynı kartları tekrarlamak o ekranı ikinci
 * bir menüye çeviriyordu. Yerine gelen RegionFinder iki boşluğu kapatıyor:
 * ziyaretçinin ilk sorusunu ("bölgemde var mısınız") anında cevaplıyor ve
 * ana sayfadan 120 bölge sayfasına giden — daha önce hiç olmayan — iç
 * bağlantıyı kuruyor. (bkz. components/base/RegionFinder.vue)
 */

// Sayfa başlığı/açıklaması artık tek merkezden geliyor: admin panelde bu
// sayfa için ("home") girilen Meta kaydı > aşağıdaki varsayılan > Site
// Ayarları'ndaki site geneli varsayılan. Marka adı ve site URL'i de Site
// Ayarları'ndan (SiteSettings) okunuyor — kodda sabit yazılmıyor.
// Varsayılan başlık/açıklama app/utils/sayfa-meta.ts kütüğünde; panelden
// girilen Meta kaydı varsa o kazanıyor.
const { settings, brandName, siteUrl, socialLinks, description } = await usePageSeo(
  "home",
  sayfaMetasi("home")
);

/** Serbest metin çalışma saatlerinin schema.org karşılığı; çözülemezse boş. */
const acilisSaatleri = computed(() => calismaSaatleriSemasi(settings.value?.workingHours));

/**
 * YORUM PUANI — arama sonucunda yıldız gösterimi için.
 *
 * Yalnızca ONAYLI yorumlar sayılıyor (filtre sunucu tarafında,
 * server/domain/reviews). Ortalama ve adet API'den geliyor, burada
 * hesaplanmıyor — iki yerde hesaplanırsa zamanla ayrışırlar.
 */
const { data: reviewResponse } = await useFetch("/api/reviews", { key: "public-reviews" });
const reviewData = computed(() => reviewResponse.value?.data ?? null);

/**
 * Yıldız işaretlemesi için EN AZ bu kadar yorum gerekiyor.
 *
 * Tek-iki yorumdan hesaplanan ortalama istatistiksel olarak anlamsız; Google
 * da bu kadar küçük örneklemde yıldız göstermeyebiliyor. Eşik altında
 * işaretleme hiç üretilmiyor — eksik veri göndermektense hiç göndermemek
 * daha güvenli.
 */
const ASGARI_YORUM = 3;

const puanBloklari = computed(() => {
  const d = reviewData.value;
  if (!d?.ortalama || (d.adet ?? 0) < ASGARI_YORUM) return {};

  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(d.ortalama),
      reviewCount: String(d.adet),
      bestRating: "5",
      worstRating: "1",
    },
    // Google, aggregateRating ile birlikte en az birkaç tekil yorum bekliyor.
    review: (d.items || []).slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.customerName },
      datePublished: r.date ? new Date(r.date).toISOString().slice(0, 10) : undefined,
      reviewBody: r.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };
});

useHead({
  script: [
    {
      type: "application/ld+json",
      // MovingCompany (schema.org'da LocalBusiness alt tipi) — jenerik
      // Organization yerine kullanılıyor; bir nakliyat firması için yerel
      // aramalarda ("İstanbul evden eve nakliyat" vb.) görünürlüğü doğrudan
      // etkileyen adres/telefon gibi alanları destekliyor.
      innerHTML: () =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MovingCompany",
          name: brandName.value,
          url: siteUrl.value,
          logo: settings.value?.logo || undefined,
          image: settings.value?.ogImage || undefined,
          telephone: settings.value?.phone || undefined,
          email: settings.value?.email || undefined,
          address: settings.value?.address
            ? {
                "@type": "PostalAddress",
                streetAddress: settings.value.address,
                addressCountry: "TR",
              }
            : undefined,
          description: description.value || undefined,
          areaServed: "TR",
          sameAs: socialLinks.value,
          priceRange: settings.value?.priceRange || undefined,
          // Koordinat UYDURULMAZ: ikisi de girilmemişse alan hiç eklenmez.
          // Yanlış konum, işletmeyi haritada başka yerde gösterir.
          geo:
            settings.value?.latitude != null && settings.value?.longitude != null
              ? {
                  "@type": "GeoCoordinates",
                  latitude: settings.value.latitude,
                  longitude: settings.value.longitude,
                }
              : undefined,
          // Serbest metin saatlerden türetiliyor; ayrıştırılamayan satır
          // atlanıyor, hiçbiri çözülemezse alan eklenmiyor.
          openingHoursSpecification: acilisSaatleri.value.length
            ? acilisSaatleri.value
            : undefined,
          // Yorum puanı ve tekil yorumlar — yalnızca onaylı yorumlardan ve
          // yeterli sayı varsa. Yoksa alanlar hiç eklenmiyor.
          ...puanBloklari.value,
        }),
    },
  ],
});
</script>

<template>
  <main class="flex flex-col">
    <base-hero />
    <base-trust-bar />
    <base-region-finder />
    <base-help />
    <base-process />
    <base-choose />
    <base-testimonial />
    <base-pricing />
    <base-faq />
    <base-final-cta />
  </main>
</template>

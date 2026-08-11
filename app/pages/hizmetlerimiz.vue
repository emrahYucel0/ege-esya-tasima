<script setup>
/**
 * HİZMETLER DİZİNİ SAYFASI
 *
 * Hedef terim: "evden eve nakliyat hizmetleri". Ana hizmeti burada tam
 * olarak anlatıyoruz; ayrıca bir /evden-eve-nakliyat sayfası AÇILMADI
 * (bkz. components/service/List.vue — anahtar kelime yamyamlığı notu).
 *
 * Veri, ana sayfadaki hizmetler bölümüyle AYNI kayıttan geliyor: tek bir
 * `Services` bölümü ve ona bağlı `Service` satırları. Böylece panelden bir
 * hizmet eklendiğinde hem ana sayfa kartlarına hem bu dizine hem de (slug
 * verilmişse) kendi sayfasına aynı anda yansıyor; iki ayrı yerde güncel
 * tutulması gereken kopya veri oluşmuyor.
 */
const { data: response } = await useFetch('/api/services', { key: 'services-section' })

const section = computed(() => response.value?.data || null)
const services = computed(() => section.value?.services || [])

/** Yalnızca kendi sayfası olan hizmetler yapısal veriye giriyor. */
const linkedServices = computed(() => services.value.filter((s) => s.slug))

const { brandName, siteUrl } = await usePageSeo('services', sayfaMetasi('services'))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          // NOT: Yol izi (BreadcrumbList) BURADA DEĞİL — sayfa başlığı bandı
          // (fixed/PageHeader.vue) onu Microdata olarak, ekranda görünen yol
          // izinin AYNI kaynağından üretiyor. Burada ikinci bir bildirim
          // vardı ve bantla ÇELİŞİYORDU: bant "Anasayfa > Bölgelerimiz",
          // buradaki "Ana sayfa > Hizmetlerimiz" diyordu. Tek kaynak kaldı.
          '@graph': [
            {
              // Hizmetleri sıralı bir liste olarak bildirmek, Google'ın bu
              // sayfanın bir dizin olduğunu ve alt sayfalara işaret ettiğini
              // anlamasına yardımcı oluyor.
              '@type': 'ItemList',
              name: 'Nakliyat hizmetleri',
              itemListElement: linkedServices.value.map((service, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: service.title,
                url: `${siteUrl.value}/${service.slug}`,
              })),
            },
            {
              '@type': 'Organization',
              name: brandName.value,
              url: siteUrl.value,
            },
          ],
        }),
    },
  ],
})
</script>

<template>
  <fixed-page-header
    title="Hizmetlerimiz"
    subtitle="Evden eve, asansörlü, parça eşya, ofis taşıma, depolama ve şehirler arası nakliyat."
  />

  <main>
    <service-list
      :services="services"
      :heading="section?.mainTitle || 'Nakliyat Hizmetlerimiz'"
      :description="
        section?.description ||
        'Taşınmanın her aşaması için ayrı bir hizmetimiz var. Hangisinin size uygun olduğunu keşifte birlikte belirliyoruz.'
      "
    />

    <base-final-cta />
  </main>
</template>

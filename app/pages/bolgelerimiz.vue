<script setup>
/**
 * BÖLGELER DİZİNİ SAYFASI
 *
 * `skipCanonical` KALDIRILDI. Eskiden bu bayrak, listenin sayfalama
 * mantığının canonical'ı yönetmesi için vardı; sayfalama kalktığı için
 * (bkz. components/region/List.vue) artık tek bir canonical yeterli ve
 * onu usePageSeo yönetiyor.
 *
 * `areaServed` ARTIK VERİDEN GELİYOR. Yapısal veride hizmet verilen iller
 * "İstanbul, Bursa, İzmir" olarak SABİT yazılıydı; site 81 ilde hizmet
 * verdiğini söylerken şema yalnızca üç il bildiriyordu. Artık kayıtlı
 * bölgelerden türetiliyor.
 */
const { data: response } = await useFetch('/api/regions?light=true', { key: 'regions-light' })

/** Kayıtlı bölgelerin bağlı olduğu benzersiz iller. */
const servedCities = computed(() => {
  const ids = new Set()
  ;(response.value?.data || []).forEach((region) =>
    parseCityIds(region.cities).forEach((id) => ids.add(id))
  )
  return [...ids]
    .map((id) => turkishCities.find((city) => city.id === id)?.name)
    .filter(Boolean)
    .sort((a, b) => new Intl.Collator('tr-TR').compare(a, b))
})

const { brandName } = await usePageSeo('region', sayfaMetasi('region'))

/**
 * ARAMA ADRESLERİ DİZİNE GİRMESİN.
 *
 * `?bolge=ege` gibi süzgeç adresleri sorun değil: usePageSeo canonical'ı
 * `route.path` üzerinden ürettiği için hepsi /bolgelerimiz'e konsolide
 * oluyor. `?ara=...` ise ziyaretçinin yazdığı her şeyle sonsuz sayıda adres
 * üretebilir ve bunlar birer ARAMA SONUCU sayfasıdır — Google'ın kalite
 * yönergeleri bu tür sayfaların dizine eklenmesini açıkça önermiyor.
 *
 * `follow` korunuyor: sayfa dizine girmese de üzerindeki il bağlantıları
 * taranmaya devam etsin.
 */
const route = useRoute()
useSeoMeta({
  robots: () => (route.query.ara ? 'noindex, follow' : 'index, follow'),
})

useHead({
  link: [{ rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Evden eve nakliyat',
          provider: { '@type': 'Organization', name: brandName.value },
          areaServed: servedCities.value.map((name) => ({ '@type': 'City', name })),
        }),
    },
  ],
})
</script>

<template>
  <fixed-page-header
    title="Bölgelerimiz"
    subtitle="İstanbul ilçeleri ve Türkiye genelindeki iller. Bölgenizi seçin, orada nasıl çalıştığımızı okuyun."
  />

  <main>
    <region-list />
    <base-post-carousel />
    <base-final-cta />
  </main>
</template>

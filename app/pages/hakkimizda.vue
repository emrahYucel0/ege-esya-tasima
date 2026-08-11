<script setup>
/**
 * HAKKIMIZDA
 *
 * Sayfa eskiden tek bir `components/navbar/About.vue` dosyasından
 * oluşuyordu (klasör adı yanlıştı: navbar ile ilgisi yok, sayfa gövdesi
 * bileşeniydi). Üç bölüme ayrıldı: kimiz + rakamlar, hikâye, hizmet
 * alanları. Kapanış çağrısı için ana sayfadaki bileşen yeniden
 * kullanılıyor — aynı veriden beslendiği için iki sayfa aynı çağrıyı
 * gösteriyor ve ikinci bir bakım noktası oluşmuyor.
 *
 * VERİ TEK YERDEN
 * Üç bölüm de aynı kaydı kullandığı için istek burada bir kez yapılıp
 * prop olarak geçiliyor; her bileşen kendi `useFetch`'ini açsaydı aynı
 * veri için üç ayrı anahtar üretilirdi.
 *
 * ZEMİN BANTLAMASI: PageHeader(koyu) → Intro(beyaz) → Story(gövde) →
 * Expertise(beyaz) → FinalCTA(marka).
 *
 * HATA VE BOŞ DURUM: ziyaretçiye yönetim paneli talimatı GÖSTERİLMEZ.
 * Eski sürüm sayfanın ortasına "Hakkımızda verisi bulunamadı. Lütfen
 * yönetim panelinden bu bölüm için bir kayıt oluşturun." yazıyordu; bu
 * admin'e söylenecek bir cümle. Bölüm ya doludur ya da hiç görünmez.
 */
const { data: aboutResponse, error: fetchError } = await useFetch('/api/about-section', {
  key: 'about-section',
})

/**
 * `/api/about-section` kayıt yokken de doldurulmuş bir varsayılan nesne
 * döndürüyor (bkz. server/domain/sections/about-section.service.ts). Bu
 * yüzden "veri var mı?" sorusunun cevabı nesnenin varlığı değil, İÇİNDE
 * gerçekten metin olup olmadığı.
 */
const aboutData = computed(() => {
  const record = aboutResponse.value?.data
  if (!record) return null
  const hasContent =
    (record.mainTitle && record.mainTitle.trim()) ||
    (record.description1 && record.description1.trim()) ||
    record.services?.length
  return hasContent ? record : null
})

const { brandName } = await usePageSeo('about', sayfaMetasi('about'))

useHead({
  link: [{ rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Hakkımızda',
          description: aboutData.value?.description1 || undefined,
          publisher: { '@type': 'Organization', name: brandName.value },
        }),
    },
  ],
})
</script>

<template>
  <fixed-page-header
    title="Hakkımızda"
    subtitle="On iki yıldır evden eve nakliyat yapıyoruz. Nasıl çalıştığımız, neyi taahhüt ettiğimiz."
  />

  <main>
    <ui-section v-if="fetchError || !aboutData" tone="surface">
      <div class="card p-8 text-center text-ink-muted">
        <p v-if="fetchError">Sayfa içeriği yüklenirken bir sorun oluştu.</p>
        <p v-else>Bu sayfanın içeriği henüz hazırlanmadı.</p>
      </div>
    </ui-section>

    <template v-else>
      <about-intro :data="aboutData" />
      <about-story :data="aboutData" />
      <about-expertise :data="aboutData" />
    </template>

    <base-final-cta />
  </main>
</template>

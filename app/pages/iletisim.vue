<script setup>
/**
 * İLETİŞİM
 *
 * Sayfa eskiden tek bir `components/navbar/Quote.vue` dosyasından
 * oluşuyordu (klasör adı yanlıştı: navbar ile ilgisi yok). İki bölüme
 * ayrıldı: iletişim kanalları ve teklif formu.
 *
 * ÇALIŞMA SAATLERİ artık burada AYRICA basılmıyor. Eskiden hem bu sayfa
 * Site Ayarları'ndaki `workingHours` alanını en altta gösteriyor, hem de
 * Quote bileşeni içinde "Pazartesi-Cuma 08:00-19:00" gibi üç satır SABİT
 * yazılı duruyordu. İki kaynak birbirini tutmayabiliyordu; tek kaynak
 * Site Ayarları ve tek yer <contact-info>.
 */
const { data: quoteResponse } = await useFetch('/api/quote', { key: 'quote-section' })
const quote = computed(() => quoteResponse.value?.data ?? null)

const { brandName, settings } = await usePageSeo('contact', sayfaMetasi('contact'))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'İletişim',
          description: `${brandName.value} ile iletişime geçmek için iletişim bilgileri ve teklif formu.`,
          publisher: {
            '@type': 'Organization',
            name: brandName.value,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: settings.value?.phone || settings.value?.mobilePhone || undefined,
              contactType: 'customer service',
              email: settings.value?.email || undefined,
              areaServed: 'TR',
              availableLanguage: 'Turkish',
            },
          },
        }),
    },
  ],
})
</script>

<template>
  <fixed-page-header
    title="İletişim"
    subtitle="Ücretsiz keşif talebi, yazılı sabit fiyat teklifi ve iletişim bilgilerimiz."
  />

  <main>
    <ui-section tone="surface" labelledby="iletisim-baslik">
      <ui-heading
        id="iletisim-baslik"
        eyebrow="Bize Ulaşın"
        title="Teklif Alın, Sorularınızı Sorun"
        description="Taşınma tarihinizi, mevcut ve yeni adresinizi yazın; eşyalarınızı yerinde görüp size yazılı ve taşıma gününe kadar sabit kalan bir fiyat sunalım."
        align="split"
      />

      <!-- Form solda: sayfanın asıl işi bu. İletişim kanalları sağda,
           masaüstünde yapışkan. -->
      <div class="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-7">
          <contact-form />
        </div>

        <aside class="lg:col-span-5">
          <div class="lg:sticky lg:top-28">
            <contact-info :quote="quote" />
          </div>
        </aside>
      </div>
    </ui-section>

    <!-- Harita: Site Ayarları'ndan girilen Google Haritalar embed kodu.
         Bu alan sadece admin panelinden (güvenilir rol) düzenlenebildiği
         için doğrudan v-html ile basılıyor; genel kullanıcı girdisi
         değildir. Girilmemişse bölüm hiç render edilmez. -->
    <ui-section v-if="settings?.googleMapsEmbed" size="compact" label="Konumumuz">
      <div class="contact-map" v-html="settings.googleMapsEmbed"></div>
    </ui-section>

    <base-final-cta />
  </main>
</template>

<style scoped>
.contact-map {
  overflow: hidden;
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-lg);
}

/* Admin'in yapıştırdığı embed kodu genelde sabit width/height taşıyor;
   kapsayıcıya oturtuluyor ki dar ekranda taşmasın. */
.contact-map :deep(iframe) {
  display: block;
  width: 100%;
  height: clamp(18rem, 45vh, 28rem);
  border: 0;
}
</style>

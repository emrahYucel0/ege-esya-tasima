<script setup>
const { brandName, settings } = await usePageSeo("contact", {
  title: "İletişim | EveNakliyatEvden",
  description:
    "EveNakliyatEvden ile iletişime geçin. Sorularınız ve talepleriniz için bizimle kolayca bağlantı kurabilirsiniz.",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: () =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "İletişim",
          description: `${brandName.value} ile iletişime geçmek için iletişim bilgileri ve form.`,
          publisher: {
            "@type": "Organization",
            name: brandName.value,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: settings.value?.phone || undefined,
              contactType: "customer service",
              email: settings.value?.email || undefined,
            },
          },
        }),
    },
  ],
});
</script>

<template>
  <fixed-page-header
    title="İletişim"
    page="Bize Yazın"
    imageUrl="/img/ege-esya-tasima-genel-anasayfa.jpg"
    link="/blog"
    linkName="Blog"
  />
  <navbar-quote />

  <div v-if="settings?.workingHours" class="container mx-auto px-4 pb-12 text-center">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Çalışma Saatlerimiz</h3>
    <p class="text-gray-600">{{ settings.workingHours }}</p>
  </div>

  <!-- Site Ayarları'ndan girilen Google Haritalar embed kodu. Bu alan
       sadece admin panelinden düzenlenebildiği (güvenilir rol) için
       doğrudan v-html ile basılıyor; genel kullanıcı girdisi değildir. -->
  <div v-if="settings?.googleMapsEmbed" class="container mx-auto px-4 pb-16">
    <div class="rounded-2xl overflow-hidden shadow-lg" v-html="settings.googleMapsEmbed"></div>
  </div>
</template>

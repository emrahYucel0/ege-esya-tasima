<script setup>
// Sayfa başlığı/açıklaması artık tek merkezden geliyor: admin panelde bu
// sayfa için ("home") girilen Meta kaydı > aşağıdaki varsayılan > Site
// Ayarları'ndaki site geneli varsayılan. Marka adı ve site URL'i de Site
// Ayarları'ndan (SiteSettings) okunuyor — kodda sabit yazılmıyor.
const { settings, brandName, siteUrl, socialLinks } = await usePageSeo("home", {
  title: "EveNakliyatEvden | Şehir İçi & Şehirler Arası Ucuz Eşya Taşıma",
  description:
    "Parça eşya taşıma ve evden eve nakliyat günlük seferler ve uygun fiyatlarla sigortalı ambalajlı marangozlu nakliye hizmeti için firmamızla iletişime geçin.",
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
          areaServed: "TR",
          sameAs: socialLinks.value,
        }),
    },
  ],
});
</script>

<template>
  <main class="flex flex-col justify-between">
    <base-hero class="-mt-10" />
    <base-services class="mb-20" />
    <base-process class="mb-20" />
    <base-choose class="mb-20 mt-20" />
    <base-help class="mb-20 mt-20" />
    <base-faq class="mb-20" />
    <base-pricing class=" " />
    <base-testimonial class="mb-20 mt-20" />
    <!-- <base-key />
    <base-card/>
    <base-feature class="mb-20 mt-20" />
    <base-pricing class=" " />
    <base-faq class="mb-20" /> -->
  </main>
</template>

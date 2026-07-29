<script setup>
// Canonical, navbar-region'ın sayfalama mantığı tarafından yönetiliyor
// (bkz. components/navbar/Region.vue) — burada tekrar set edilip
// çakışmaması için skipCanonical kullanılıyor.
const { brandName } = await usePageSeo(
  "region",
  {
    title: "Bölgelerimiz | EveNakliyatEvden",
    description:
      "Düzenli günlük seferlerimiz ile tüm bölgelere karşılıklı evden eve nakliyat hizmeti veriyoruz. Sigortalı ambalajlı nakliye için arayın.",
  },
  { skipCanonical: true }
);

useHead({
  link: [
    {
      rel: "apple-touch-icon",
      href: "/favicon.ico",
      sizes: "180x180",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: () =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Bölgesel Hizmetler",
          provider: {
            "@type": "Organization",
            name: brandName.value,
          },
          areaServed: [
            { "@type": "City", name: "İstanbul" },
            { "@type": "City", name: "Bursa" },
            { "@type": "City", name: "İzmir" },
          ],
        }),
    },
  ],
});
</script>

<template>
  <fixed-page-header
    title="Bölgelerimiz"
    page="Bölgelerimiz"
    imageUrl="/img/ege-esya-tasima-genel-anasayfa.jpg"
    link="/blog"
    linkName="Blog"
  />
  <navbar-region />
  <base-post-carousel />
</template>

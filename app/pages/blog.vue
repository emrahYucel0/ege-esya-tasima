<script setup>
// Canonical, blog listesinin sayfalama mantığı tarafından yönetiliyor
// (bkz. components/blog/List.vue) — burada tekrar set edilip çakışmaması
// için skipCanonical kullanılıyor.
const { brandName, siteUrl } = await usePageSeo("blog", sayfaMetasi("blog"), {
  skipCanonical: true,
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: () =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${brandName.value} Blog`,
          url: `${siteUrl.value}/blog`,
          description: "Sektörel gelişmeler ve uzman görüşleri",
          publisher: {
            "@type": "Organization",
            name: brandName.value,
          },
        }),
    },
  ],
});
</script>

<template>
  <fixed-page-header
    title="Blog"
    subtitle="Taşınma maliyeti, paketleme, sigorta ve depolama üzerine sahadan çıkmış pratik rehberler."
  />
  <main>
    <blog-list />
    <base-region-carousel />
  </main>
</template>

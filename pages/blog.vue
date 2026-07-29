<script setup>
// Canonical, navbar-post'un sayfalama mantığı tarafından yönetiliyor
// (bkz. components/navbar/Post.vue) — burada tekrar set edilip
// çakışmaması için skipCanonical kullanılıyor.
const { brandName, siteUrl } = await usePageSeo(
  "blog",
  {
    title: "Blog | EveNakliyatEvden",
    description:
      "Parça eşya taşıma ve evden eve nakliyat hizmetlerimizin tamamı sigortalı ve ambalajlıdır. Sektörel gelişmeleri blogumuzdan takip edin.",
  },
  { skipCanonical: true }
);

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
    page="Yazılarımız"
    imageUrl="/img/ege-esya-tasima-genel-anasayfa.jpg"
    link="/bolgelerimiz"
    linkName="Bölgelerimiz"
  />
  <navbar-post />
  <base-region-carousel />
</template>

<script setup>
const { brandName } = await usePageSeo("about", {
  title: "Hakkımızda | EveNakliyatEvden",
  description:
    "20 yılı aşkın deneyimimizle taşımacılık alanında hizmet veriyoruz. Misyonumuz ve vizyonumuz hakkında detaylı bilgi.",
});

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
          "@type": "AboutPage",
          name: "Hakkımızda",
          description: "Şirketimizin tarihçesi ve temel değerleri",
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
    title="Hakkımızda"
    page="Hakkımızda"
    imageUrl="/img/ege-esya-tasima-genel-anasayfa.jpg"
    link="/iletisim"
    linkName="İletişim"
  />
  <navbar-about />
</template>

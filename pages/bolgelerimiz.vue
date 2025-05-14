<script setup>
import { ref } from "vue";

const metaData = ref({
  title: "Bölgelerimiz | Ege Eşya Taşıma Şirketi",
  description:
    "Ege parça eşya taşıma düzenli günlük seferlerimiz ile tüm bölgelere karşılıklı evden eve nakliyat hizmeti veriyoruz. Sigortalı ambalajlı nakliye için arayın.", // Varsayılan değer
});

const { data, error } = useFetch("/api/meta?page=region", {
  immediate: true,
  watch: false,
});

watch(
  data,
  (newData) => {
    if (newData && !newData.error) {
      metaData.value = {
        title: newData.title || metaData.value.title,
        description: newData.description || metaData.value.description,
      };
    }
  },
  { immediate: true }
);

useHead({
  title: () => metaData.value.title,
  meta: [
    {
      name: "description",
      content: () => metaData.value.description,
    },
    { property: "og:title", content: () => metaData.value.title },
    {
      property: "og:description",
      content: "Türkiye genelinde 20+ lokasyonda premium hizmet anlayışı",
    },
    {
      property: "og:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    { property: "og:url", content: "https://egeesya.com/bolgelerimiz" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: () => metaData.value.title },
    {
      name: "twitter:description",
      content: "Size en yakın lokasyonu bulun ve hizmetlerimizden yararlanın",
    },
    {
      name: "twitter:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Türkiye haritası üzerinde hizmet bölgelerimizin gösterimi",
    },
    { name: "author", content: "Ege Eşya Taşıma" },
    { name: "robots", content: "index, follow" },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://egeesya.com/bolgelerimiz",
    },
    {
      rel: "apple-touch-icon",
      href: "/favicon.ico",
      sizes: "180x180",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Bölgesel Hizmetler",
        provider: {
          "@type": "Organization",
          name: "Ege Eşya Taşıma",
        },
        areaServed: [
          { "@type": "City", name: "İstanbul" },
          { "@type": "City", name: "Bursa" },
          { "@type": "City", name: "İzmir" },
        ],
      }),
    },
  ],
  htmlAttrs: {
    lang: "tr",
  },
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

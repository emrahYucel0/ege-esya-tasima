<script setup>
import { ref } from "vue";

const metaData = ref({
  title: "Blog | Ege Eşya Taşıma Hizmetleri", // Varsayılan değer
  description:
    "Ege bölgesine günlük karşılıklı seferlerimiz vardır. Parça eşya taşıma ve evden eve nakliyat hizmetlerimizin tamamı sigortalı ve ambalajlıdır.", // Varsayılan değer
});

const { data, error } = useFetch("/api/meta?page=blog", {
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
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: () => metaData.value.title },
    {
      property: "og:description",
      content: "Sektörle ilgili en yeni gelişmeler ve derinlemesine analizler",
    },
    {
      property: "og:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    { property: "og:url", content: "https://egeesya.com/blog" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: () => metaData.value.title },
    {
      name: "twitter:description",
      content: "Sektörel bilgi birikimimizi paylaştığımız resmi blog sayfamız",
    },
    {
      name: "twitter:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Blog yazılarımızın kapak görseli",
    },
    { name: "author", content: "Ege Eşya Taşıma" },
    { name: "robots", content: "index, follow" },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://egeesya.com/blog",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Ege Eşya Blog",
        url: "https://egeesya.com/blog",
        description: "Sektörel gelişmeler ve uzman görüşleri",
        publisher: {
          "@type": "Organization",
          name: "Ege Eşya Taşıma",
        },
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
    title="Blog"
    page="Yazılarımız"
    imageUrl="/img/ege-esya-tasima-genel-anasayfa.jpg"
    link="/bolgelerimiz"
    linkName="Bölgelerimiz"
  />
  <navbar-post />
  <base-region-carousel />
</template>

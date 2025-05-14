<script setup>
import { ref } from "vue";

const metaData = ref({
  title: "İletişim | Ege Eşya Taşıma Şirketi",
  description:
    "Ege Eşya Taşıma ile iletişime geçin. Sorularınız ve talepleriniz için bizimle kolayca bağlantı kurabilirsiniz.",
});

const { data, error } = useFetch("/api/meta?page=contact", {
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
      content:
        "Bize ulaşın! İletişim bilgilerimiz ve destek ekibimizle sorularınıza yanıt alın.",
    },
    {
      property: "og:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    { property: "og:url", content: "https://egeesya.com/iletisim" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: () => metaData.value.title },
    {
      name: "twitter:description",
      content:
        "İletişim sayfamızdan bize ulaşabilir, sorularınızı sorabilirsiniz.",
    },
    {
      name: "twitter:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Ege Eşya Taşıma iletişim Ana Resim",
    },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Ege Eşya Taşıma" },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://egeesya.com/iletisim",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "İletişim",
        description:
          "Ege Eşya Taşıma ile iletişime geçmek için iletişim bilgileri ve form.",
        publisher: {
          "@type": "Organization",
          name: "Ege Eşya Taşıma",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-532-645-4289",
            contactType: "customer service",
            email: "info@egeesya.com",
          },
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
    title="İletişim"
    page="Bize Yazın"
    imageUrl="/img/ege-esya-tasima-genel-anasayfa.jpg"
    link="/blog"
    linkName="Blog"
  />
  <navbar-quote />
</template>

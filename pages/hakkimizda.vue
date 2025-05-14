<script setup>
import { ref } from "vue";

const metaData = ref({
  title: "Hakkımızda | Ege Eşya Taşıma",
  description:
    "20 yılı aşkın deneyimimizle taşımacılık alanında hizmet veriyoruz. Misyonumuz ve vizyonumuz hakkında detaylı bilgi.",
});

const { data, error } = useFetch("/api/meta?page=about", {
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
        "Profesyonel ekibimiz ve sektör deneyimimizle hakkımızda daha fazla bilgi edinin",
    },
    {
      property: "og:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    { property: "og:url", content: "https://egeesya.com/hakkimizda" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: () => metaData.value.title },
    {
      name: "twitter:description",
      content: "Şirket profili ve temel değerlerimiz",
    },
    {
      name: "twitter:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Şirket binamız ve ekibimizin genel görünümü",
    },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Ege Eşya Taşıma" },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://egeesya.com/hakkimizda",
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
        "@type": "AboutPage",
        name: "Hakkımızda",
        description: "Şirketimizin tarihçesi ve temel değerleri",
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

const config = useRuntimeConfig();
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

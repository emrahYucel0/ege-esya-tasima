<script setup>
import { ref } from "vue";

const metaData = ref({
  title: "Ege Eşya Taşıma | Şehir İçi & Şehirler Arası Ucuz Eşya Taşıma", // Varsayılan değer
  description:
    "Ege parça eşya taşıma ve evden eve nakliyat günlük seferler ve uygun fiyatlarla sigortalı ambalajlı marangozlu nakliye hizmeti için firmamızla iletişime geçin.", // Varsayılan değer
});

const { data, error } = useFetch("/api/meta?page=home", {
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
    { name: "author", content: "Ege Eşya Taşıma" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: () => metaData.value.title },
    { property: "og:description", content: "Hızlı ve Güvenilir Taşımacılık" },
    {
      property: "og:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    { property: "og:url", content: "https://egeesya.com/" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@twitter_handle" },
    { name: "twitter:title", content: () => metaData.value.title },
    { name: "twitter:description", content: "Hızlı ve Güvenilir Taşımacılık" },
    {
      name: "twitter:image",
      content: "https://egeesya.com/img/ege-ozenle-tasima.jpg",
    },
    { name: "robots", content: "index, follow" },
  ],
  htmlAttrs: {
    lang: "tr",
  },
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ege Eşya Taşıma",
        url: "https://egeesya.com",
        sameAs: [
          "https://facebook.com/example",
          "https://twitter.com/example",
          "https://linkedin.com/company/example",
        ],
      }),
    },
  ],
});
</script>

<template>
  <main class="flex flex-col justify-between">
    <base-hero class="-mt-10" />
    <base-services class="mb-20" />
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

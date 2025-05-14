<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const currentPage = ref(Number(route.query.sayfa) || 1);
const itemsPerPage = 9;

const { data: rawData, error, pending } = useFetch("/api/posts");

const posts = computed(() => {
  return rawData.value?.success ? rawData.value.data : [];
});

const searchQuery = ref("");

const filteredposts = computed(() => {
  if (!searchQuery.value) return posts.value;
  return posts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedposts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredposts.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredposts.value.length / itemsPerPage)
);

const navigatePage = (direction) => {
  const newPage = currentPage.value + direction;
  if (newPage > 0 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    navigateTo({ query: { sayfa: newPage } });
  }
};

watch(searchQuery, () => {
  currentPage.value = 1;
  navigateTo({ query: { sayfa: 1 } });
});

onMounted(() => {
  gsap.from(".service-card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".container",
      start: "top 90%",
      end: "top 40%",
      toggleActions: "play none none none",
    },
  });
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://egeesya.com/posts?sayfa=${currentPage.value}`,
    },
    {
      rel: "prev",
      href:
        currentPage.value > 1
          ? `https://egeesya.com/posts?sayfa=${currentPage.value - 1}`
          : null,
    },
    {
      rel: "next",
      href:
        currentPage.value < totalPages.value
          ? `https://egeesya.com/posts?sayfa=${currentPage.value + 1}`
          : null,
    },
  ],
});
</script>

<template>
  <div class="container mx-auto py-20 px-5 lg:px-0">
    <div class="text-center mb-16">
      <div
        class="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-6"
      >
        <span
          class="text-primary font-semibold uppercase tracking-wider text-xs"
          >Nakliye Rehberi</span
        >
        <span class="mx-2 text-stone-300">|</span>
        <span class="text-stone-700 text-sm"
          >{{ posts.length }} Profesyonel Makale</span
        >
      </div>

      <h2 class="text-4xl md:text-5xl font-serif italic text-stone-600 mb-4">
        Yazılarımız
      </h2>

      <p
        class="text-stone-800 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
      >
        <strong>Ege Eşya Taşıma</strong> ekibi olarak tüm sektör deneyimimizi
        paylaştığımız bu köşede,
        <span class="text-stone-600 font-medium"
          >ev taşıma sürecinizi kolaylaştıracak</span
        >
        pratik bilgiler sunuyoruz. Özellikle Türkiye geneli eşya taşımacılığı ve
        <strong>Ege Bölgesi'nde nakliye</strong> hizmeti alacaklar için
        hazırladığımız bu rehberlerde:
      </p>

      <div class="flex flex-wrap justify-center gap-4 mt-8 max-w-2xl mx-auto">
        <span
          class="bg-white px-4 py-2 rounded-full shadow-xs text-sm border border-stone-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Paketleme İpuçları
        </span>
        <span
          class="bg-white px-4 py-2 rounded-full shadow-xs text-sm border border-stone-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
          Taşıma Teknikleri
        </span>
        <span
          class="bg-white px-4 py-2 rounded-full shadow-xs text-sm border border-stone-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Maliyet Rehberi
        </span>
        <span
          class="bg-white px-4 py-2 rounded-full shadow-xs text-sm border border-stone-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Bölgesel Bilgiler
        </span>
      </div>

      <p class="text-stone-500 mt-8 text-sm max-w-2xl mx-auto">
        * Tüm yazılarımız <strong>nakliye uzmanlarımız</strong> tarafından
        hazırlanmakta olup, <strong>pratik çözümler</strong> içermektedir.
        Sorularınız için iletişime geçebilirsiniz.
      </p>
    </div>

    <div class="mb-12 max-w-2xl mx-auto">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Blog ara..."
        class="w-full px-6 py-3 border-2 border-stone-200 rounded-full focus:border-primary focus:ring-0 transition-all"
        aria-label="Blog arama"
      />
    </div>

    <div v-if="pending" class="text-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
      ></div>
    </div>
    <div v-else-if="error" class="text-red-500 text-center py-20">
      Hata: {{ error.message }}
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="post in paginatedposts"
          :key="post.id"
          class="service-card group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
        >
          <div class="relative overflow-hidden h-60">
            <NuxtImg
              provider="imgix"
              format="webp"
              quality="70"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              :src="post.image || '/img/default-blog.jpg'"
              :alt="post.shortTitle + ' Görseli'"
              :title="post.title"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent"
            ></div>
            <div class="absolute top-4 right-4">
              <span
                class="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full"
              >
                {{ post.category || "Genel" }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center text-sm text-stone-500 mb-3">
              <span>{{
                new Date(post.createdAt).toLocaleDateString("tr-TR")
              }}</span>
              <span class="mx-2">•</span>
              <span>3 dk okuma</span>
            </div>

            <NuxtLink
              :to="`/${post.slug}`"
              class="block text-xl font-bold text-stone-800 mb-3 hover:text-primary transition-colors line-clamp-2"
              :aria-label="`${post.title} makalesini oku`"
            >
              {{ post.title }}
            </NuxtLink>

            <p class="text-stone-600 mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <div
              class="flex justify-between items-center pt-4 border-t border-stone-100"
            >
              <div class="flex items-center">
                <div
                  class="w-8 h-8 rounded-full bg-stone-200 overflow-hidden mr-2"
                >
                  <NuxtImg
                    v-if="post.authorImage"
                    provider="imgix"
                    format="webp"
                    class="w-full h-full object-cover"
                    :src="post.authorImage"
                    :alt="post.author + ' profil fotoğrafı'"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-primary text-white flex items-center justify-center text-xs"
                  >
                    {{ post.author ? post.author.charAt(0) : "E" }}
                  </div>
                </div>
                <span class="text-sm text-stone-600">{{
                  post.author || "Ege Eşya Ekibi"
                }}</span>
              </div>
              <NuxtLink
                :to="`/${post.slug}`"
                class="text-sm font-medium text-primary hover:text-primary-dark flex items-center transition-colors"
              >
                Devamını oku
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-16 space-x-4">
        <button
          @click="navigatePage(-1)"
          :disabled="currentPage === 1"
          class="px-6 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Önceki sayfa"
        >
          Önceki
        </button>
        <span class="flex items-center text-stone-600">
          Sayfa {{ currentPage }} / {{ totalPages }}
        </span>
        <button
          @click="navigatePage(1)"
          :disabled="currentPage === totalPages"
          class="px-6 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Sonraki sayfa"
        >
          Sonraki
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.container {
  max-width: 1200px;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
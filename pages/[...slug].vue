<script setup>
import { useHead } from "#imports";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = route.params.slug;

// Veri çekme işlemleri
const { data: postData, error: postError } = await useFetch(
  `/api/posts?slug=${slug}`
);
const { data: regionData, error: regionError } = await useFetch(
  `/api/regions?slug=${slug}`
);

// Computed özellikler
const post = computed(() =>
  postData.value?.success ? postData.value.data : null
);
const region = computed(() =>
  regionData.value?.success ? regionData.value.data : null
);

// Tüm verileri çekme (navigasyon için)
const { data: allPostsData } = await useFetch("/api/posts");
const { data: allRegionsData } = await useFetch("/api/regions");

const sortedPosts = computed(() =>
  [...(allPostsData.value?.data || [])].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )
);

const sortedRegions = computed(() =>
  [...(allRegionsData.value?.data || [])].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )
);

// Navigasyon hesaplamaları
const getAdjacentItems = (currentSlug, items) => {
  const index = items.findIndex((item) => item.slug === currentSlug);
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
};

const postNav = computed(() =>
  post.value
    ? getAdjacentItems(post.value.slug, sortedPosts.value)
    : { previous: null, next: null }
);

const regionNav = computed(() =>
  region.value
    ? getAdjacentItems(region.value.slug, sortedRegions.value)
    : { previous: null, next: null }
);

// Dinamik ID'ler
const contentRef = ref(null);
const dynamicIds = ref({
  h2: "",
  blockquote: "",
});

const setDynamicIds = () => {
  if (!contentRef.value || !region.value) return;

  const ids = {
    h2: `${region.value.subtitle}-esya-tasima-sirketleri`,
    blockquote: `${region.value.subtitle}-esya-tasima-fiyatlari`,
  };

  const h2 = contentRef.value.querySelector("h2");
  const blockquote = contentRef.value.querySelector("blockquote");

  if (h2) h2.id = ids.h2;
  if (blockquote) blockquote.id = ids.blockquote;

  dynamicIds.value = ids;
};

watch([contentRef, region], setDynamicIds, { immediate: true });
onMounted(setDynamicIds);

// Meta verileri
const metaData = computed(() => {
  const data = post.value || region.value;
  if (!data) return {};

  // Use subtitle for post, shortTitle for region
  const title = post.value ? data.subtitle : data.shortTitle;

  return {
    title: title || data.title, // Fallback to data.title if subtitle/shortTitle is unavailable
    meta: [
      { name: "description", content: data.excerpt },
      { name: "author", content: "Ege Eşya" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: data.title },
      { property: "og:description", content: data.excerpt },
      { property: "og:image", content: data.image },
      { property: "og:type", content: "article" },
    ],
    link: [
      {
        rel: "canonical",
        href: `https://www.egeesya.com/${data.slug}`,
      },
    ],
  };
});

useHead(metaData);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hata durumları -->
    <div
      v-if="postError || regionError"
      class="bg-red-50 border-l-4 border-red-500 p-4"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p v-if="postError" class="text-sm text-red-700">
            Post yüklenirken hata: {{ postError.message }}
          </p>
          <p v-if="regionError" class="text-sm text-red-700">
            Bölge bilgisi yüklenirken hata: {{ regionError.message }}
          </p>
        </div>
      </div>
    </div>

    <!-- Post içeriği -->
    <article v-if="post" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <!-- Başlık ve Öne Çıkan Görsel -->
        <div class="relative">
          <NuxtImg
            provider="imgix"
            format="webp"
            quality="70"
            loading="lazy"
            decoding="async"
            :src="post.image || '/img/default-blog.jpg'"
            class="w-full h-64 sm:h-80 md:h-96 object-cover"
            :alt="post.shortTitle + ' Görseli'"
            :title="post.title"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {{ post.title }}
            </h1>
            <p v-if="post.excerpt" class="mt-2 text-lg text-gray-200">
              {{ post.excerpt }}
            </p>
          </div>
        </div>

        <!-- İçerik -->
        <div class="p-6 md:p-8">
          <div
            v-html="post.content"
            class="prose prose-lg max-w-none prose-blue prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg prose-img:shadow-md"
          ></div>
        </div>

        <!-- Navigasyon -->
        <div
          class="border-t border-gray-200 px-6 py-4 md:px-8 bg-gray-50 rounded-b-lg"
        >
          <div class="flex justify-between">
            <NuxtLink
              v-if="postNav.previous"
              :to="'/' + postNav.previous.slug"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :aria-label="`Önceki: ${postNav.previous.shortTitle}`"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ postNav.previous.shortTitle }}
            </NuxtLink>
            <div v-else></div>
            <!-- Boş div for spacing -->

            <NuxtLink
              v-if="postNav.next"
              :to="'/' + postNav.next.slug"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :aria-label="`Sonraki: ${postNav.next.shortTitle}`"
            >
              {{ postNav.next.shortTitle }}
              <svg
                class="-mr-1 ml-2 h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>

    <!-- Region içeriği -->
    <article v-if="region" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <!-- Başlık ve Öne Çıkan Görsel -->
        <div class="relative">
          <NuxtImg
            provider="imgix"
            format="webp"
            quality="70"
            loading="lazy"
            decoding="async"
            :src="region.image || '/img/default-region.jpg'"
            class="w-full h-64 sm:h-80 md:h-96 object-cover"
            :alt="region.subtitle + ' Eşya Taşıma Görseli'"
            :title="region.title"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1
              :id="region.subtitle + '-acil-nakliyat'"
              class="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              {{ region.title }}
            </h1>
            <p v-if="region.excerpt" class="mt-2 text-lg text-gray-200">
              {{ region.excerpt }}
            </p>
          </div>
        </div>

        <p class="prose md:p-8">
          {{ region.subtitle }} bölgesinde güvenilir ve profesyonel taşımacılık
          hizmeti arıyorsanız, firmamız size özel çözümler sunuyor.
          <strong>{{ region.subtitle }} evden eve nakliyat</strong> hizmetimizle
          eşyalarınızı hızlı ve güvenli bir şekilde yeni adresinize taşıyoruz.
          Ayrıca büyük taşınmalar dışında küçük gönderileriniz için
          <strong>{{ region.subtitle }} parça eşya taşıma</strong>
          seçeneklerimizle de yanınızdayız. Şehir içi ve şehirlerarası
          taşımacılıkta uzman ekibimizle her zaman müşteri memnuniyetini ön
          planda tutuyoruz.
          <strong>{{ region.subtitle }} eşya taşıma</strong> konusunda ekonomik,
          pratik ve sigortalı hizmet için bizimle iletişime geçin.
        </p>

        <h2 class="text-center" :id="region.subtitle + '-esya-tasima-sirketleri'">
          {{ region.subtitle }} Eşya Taşıma Şirketleri ve Hizmetleri
        </h2>

        <!-- İçerik -->
        <div class="p-6 md:p-8">
          <div
            ref="contentRef"
            v-html="region.content"
            class="prose prose-lg max-w-none prose-blue prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg prose-img:shadow-md"
          ></div>
        </div>

        <!-- Hızlı Navigasyon -->
        <div class="px-6 py-4 md:px-8 bg-blue-50 border-t border-blue-100">
          <div class="flex flex-wrap justify-center gap-4">
            <a
              :href="'#' + region.subtitle + '-acil-nakliyat'"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ region.subtitle }} Acil Nakliyat
            </a>
            <a
              :href="'#' + region.subtitle + '-esya-tasima-sirketleri'"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ region.subtitle }} Eşya Taşıma Şirketleri
            </a>
            <a
              :href="'#' + dynamicIds.blockquote"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ region.subtitle }} Eşya Taşıma Fiyatları
            </a>
          </div>
        </div>

        <!-- Navigasyon -->
        <div
          class="border-t border-gray-200 px-6 py-4 md:px-8 bg-gray-50 rounded-b-lg"
        >
          <div class="flex justify-between">
            <NuxtLink
              v-if="regionNav.previous"
              :to="'/' + regionNav.previous.slug"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :aria-label="`Önceki: ${regionNav.previous.subtitle} Nakliyat`"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ regionNav.previous.subtitle }} Nakliyat
            </NuxtLink>
            <div v-else></div>

            <NuxtLink
              v-if="regionNav.next"
              :to="'/' + regionNav.next.slug"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :aria-label="`Sonraki: ${regionNav.next.subtitle} Nakliyat`"
            >
              {{ regionNav.next.subtitle }} Nakliyat
              <svg
                class="-mr-1 ml-2 h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>

    <!-- 404 Sayfası -->
    <div
      v-if="!post && !region"
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100"
    >
      <div class="max-w-md mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div
          class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6"
        >
          <svg
            class="w-10 h-10 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 class="text-5xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-medium text-gray-800 mb-6">
          Sayfa Bulunamadı
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Aradığınız içerik kaldırılmış veya taşınmış olabilir. Lütfen ana
          sayfaya dönerek aradığınız bilgiye ulaşmayı deneyin.
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg
            class="-ml-1 mr-3 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </svg>
          Ana Sayfaya Dön
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
/* Özel animasyonlar */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Prose özelleştirmeleri */
.prose {
  line-height: 1.7;
}

.prose h2 {
  @apply mt-8 mb-4 text-2xl font-semibold text-gray-900;
}

.prose h3 {
  @apply mt-6 mb-3 text-xl font-semibold text-gray-800;
}

.prose p {
  @apply my-4 text-gray-700;
}

.prose ul,
.prose ol {
  @apply my-4 pl-6;
}

.prose li {
  @apply my-2;
}

.prose blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 py-2 bg-blue-50 rounded-r;
}

/* Responsive ayarlar */
@media (max-width: 640px) {
  .prose {
    font-size: 0.95rem;
  }

  .prose h2 {
    @apply text-xl;
  }

  .prose h3 {
    @apply text-lg;
  }
}
</style>

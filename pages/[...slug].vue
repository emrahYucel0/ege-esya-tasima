<script setup>
import { useHead } from "#imports";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = route.params.slug;

const { brandName, siteUrl, ogImage: siteOgImage } = await useSiteSettings();

// Veri çekme işlemleri — dördü de birbirinden bağımsız olduğu için
// sıralı (her biri bir öncekini bekleyerek) değil, paralel çalıştırılıyor.
// Bu, sayfanın sunucu yanıt süresini (dolayısıyla LCP'yi) ~4 kat azaltır.
const [
  { data: postData, error: postError },
  { data: regionData, error: regionError },
  { data: allRegionsData },
  { data: allPostsData },
] = await Promise.all([
  useFetch(`/api/posts?slug=${slug}`),
  useFetch(`/api/regions?slug=${slug}`),
  useFetch("/api/regions"),
  useFetch("/api/posts"),
]);

// Computed özellikler
const post = computed(() =>
  postData.value?.success ? postData.value.data : null
);
const region = computed(() =>
  regionData.value?.success ? regionData.value.data : null
);

// Ne post ne region eşleşmediyse gerçek bir 404 dönülmeli — aksi halde
// sayfa "Sayfa Bulunamadı" içeriği gösterirken HTTP 200 döner ("soft 404"),
// bu da Google Search Console'un bu URL'leri hatalı/düşük kaliteli olarak
// işaretlemesine ve crawl bütçesinin boşa harcanmasına yol açar.
if (!post.value && !region.value) {
  throw createError({ statusCode: 404, statusMessage: "Sayfa Bulunamadı", fatal: true });
}

// Tüm region listesi
const allRegions = computed(() =>
  allRegionsData.value?.success ? allRegionsData.value.data : []
);

// Region'a bağlı diğer regionları bulma
const relatedRegions = computed(() => {
  if (!region.value || !region.value.cities || !Array.isArray(region.value.cities) || region.value.cities.length === 0) {
    return [];
  }
  
  const currentRegionCities = region.value.cities;
  
  return allRegions.value.filter(otherRegion => {
    if (otherRegion.slug === region.value.slug) return false;
    if (!otherRegion.isActive) return false;
    
    let otherRegionCities = [];
    
    if (otherRegion.cities) {
      if (typeof otherRegion.cities === 'string') {
        try {
          otherRegionCities = JSON.parse(otherRegion.cities);
        } catch (error) {
          console.error('Cities JSON parse hatası:', error);
          return false;
        }
      } else if (Array.isArray(otherRegion.cities)) {
        otherRegionCities = otherRegion.cities;
      }
    }
    
    return otherRegionCities.some(cityId => 
      currentRegionCities.includes(cityId)
    );
  });
});

// Türkiye illeri listesi
const turkishCities = [
  { id: 1, name: 'Adana' },
  { id: 6, name: 'Ankara' },
  { id: 7, name: 'Antalya' },
  { id: 34, name: 'İstanbul' },
  { id: 35, name: 'İzmir' },
  { id: 16, name: 'Bursa' },
  { id: 26, name: 'Eskişehir' },
  { id: 55, name: 'Samsun' },
  { id: 10, name: 'Balıkesir' },
  { id: 38, name: 'Kayseri' },
  { id: 46, name: 'Kahramanmaraş' },
  { id: 42, name: 'Konya' },
  { id: 21, name: 'Diyarbakır' },
  { id: 61, name: 'Trabzon' },
  { id: 25, name: 'Erzurum' },
  { id: 27, name: 'Gaziantep' },
  { id: 33, name: 'Mersin' },
  { id: 40, name: 'Kırşehir' },
  { id: 41, name: 'Kocaeli' },
  { id: 45, name: 'Manisa' },
  { id: 48, name: 'Muğla' },
  { id: 49, name: 'Muş' },
  { id: 51, name: 'Niğde' },
  { id: 52, name: 'Ordu' },
  { id: 54, name: 'Sakarya' },
  { id: 60, name: 'Tokat' },
  { id: 63, name: 'Şanlıurfa' },
  { id: 65, name: 'Van' },
  { id: 66, name: 'Yozgat' },
  { id: 67, name: 'Zonguldak' },
  { id: 2, name: 'Adıyaman' },
  { id: 3, name: 'Afyonkarahisar' },
  { id: 4, name: 'Ağrı' },
  { id: 5, name: 'Amasya' },
  { id: 8, name: 'Artvin' },
  { id: 9, name: 'Aydın' },
  { id: 11, name: 'Bilecik' },
  { id: 12, name: 'Bingöl' },
  { id: 13, name: 'Bitlis' },
  { id: 14, name: 'Bolu' },
  { id: 15, name: 'Burdur' },
  { id: 17, name: 'Çanakkale' },
  { id: 18, name: 'Çankırı' },
  { id: 19, name: 'Çorum' },
  { id: 20, name: 'Denizli' },
  { id: 22, name: 'Edirne' },
  { id: 23, name: 'Elazığ' },
  { id: 24, name: 'Erzincan' },
  { id: 28, name: 'Giresun' },
  { id: 29, name: 'Gümüşhane' },
  { id: 30, name: 'Hakkari' },
  { id: 31, name: 'Hatay' },
  { id: 32, name: 'Isparta' },
  { id: 36, name: 'Kars' },
  { id: 37, name: 'Kastamonu' },
  { id: 39, name: 'Kırklareli' },
  { id: 43, name: 'Kütahya' },
  { id: 44, name: 'Malatya' },
  { id: 47, name: 'Karaman' },
  { id: 50, name: 'Nevşehir' },
  { id: 53, name: 'Rize' },
  { id: 56, name: 'Siirt' },
  { id: 57, name: 'Sinop' },
  { id: 58, name: 'Sivas' },
  { id: 59, name: 'Tekirdağ' },
  { id: 62, name: 'Tunceli' },
  { id: 64, name: 'Uşak' },
  { id: 68, name: 'Aksaray' },
  { id: 69, name: 'Bayburt' },
  { id: 70, name: 'Karaman' },
  { id: 71, name: 'Kırıkkale' },
  { id: 72, name: 'Batman' },
  { id: 73, name: 'Şırnak' },
  { id: 74, name: 'Bartın' },
  { id: 75, name: 'Ardahan' },
  { id: 76, name: 'Iğdır' },
  { id: 77, name: 'Yalova' },
  { id: 78, name: 'Karabük' },
  { id: 79, name: 'Kilis' },
  { id: 80, name: 'Osmaniye' },
  { id: 81, name: 'Düzce' }
];

// Region'ın bağlı olduğu il isimlerini getir
const regionCityNames = computed(() => {
  if (!region.value || !region.value.cities || !Array.isArray(region.value.cities)) {
    return [];
  }
  
  return region.value.cities.map(cityId => {
    const city = turkishCities.find(c => c.id === cityId);
    return city ? city.name : '';
  }).filter(name => name !== '');
});

// Navigasyon için gereken tüm post verisi artık en üstteki paralel
// Promise.all içinde çekiliyor (allPostsData).
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

  const title = post.value ? data.subtitle : data.shortTitle;

  return {
    title: title || data.title,
    meta: [
      { name: "description", content: data.excerpt },
      { name: "author", content: brandName.value },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: data.title },
      { property: "og:description", content: data.excerpt },
      { property: "og:image", content: data.image || siteOgImage.value },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: brandName.value },
    ],
    link: [
      {
        rel: "canonical",
        href: `${siteUrl.value}/${data.slug}`,
      },
    ],
  };
});

useHead(metaData);
</script>

<template>
  <div class="min-h-screen bg-background">
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
    <article v-if="post" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <!-- Hero Section -->
        <div class="relative">
          <!-- Glass Effect Header - Üstte -->
          <div class="relative z-10 p-6 md:p-8 lg:p-10">
            <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl">
              <h1 class="text-2xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-3 leading-tight">
                {{ post.title }}
              </h1>
              <p v-if="post.excerpt" class="text-sm md:text-lg text-dark-light leading-relaxed">
                {{ post.excerpt }}
              </p>
            </div>
          </div>
          
          <!-- Hero Image -->
          <div class="h-[300px] md:h-[400px] overflow-hidden">
            <NuxtImg
              provider="imgix"
              format="webp"
              quality="80"
              loading="lazy"
              decoding="async"
              :src="post.image || '/img/default-blog.jpg'"
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              :alt="post.shortTitle + ' Görseli'"
              :title="post.title"
            />
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-6 md:p-12 lg:p-16">
          <div
            v-html="sanitizeHtml(post.content)"
            class="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-xl prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-xl"
          ></div>
        </div>

        <!-- Navigation -->
        <div class="border-t border-gray-200 px-6 py-6 md:px-12 bg-background">
          <div class="flex justify-between items-center gap-4">
            <NuxtLink
              v-if="postNav.previous"
              :to="'/' + postNav.previous.slug"
              class="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 shadow-sm text-sm font-semibold rounded-xl text-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-x-1"
              :aria-label="`Önceki: ${postNav.previous.shortTitle}`"
            >
              <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>{{ postNav.previous.shortTitle }}</span>
            </NuxtLink>
            <div v-else></div>

            <NuxtLink
              v-if="postNav.next"
              :to="'/' + postNav.next.slug"
              class="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 shadow-sm text-sm font-semibold rounded-xl text-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:translate-x-1"
              :aria-label="`Sonraki: ${postNav.next.shortTitle}`"
            >
              <span>{{ postNav.next.shortTitle }}</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>

    <!-- Region içeriği -->
    <article v-if="region" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <!-- Ana Region İçeriği -->
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <!-- Hero Section -->
        <div class="relative">
          <!-- Glass Effect Header - Üstte -->
          <div class="relative z-10 p-6 md:p-8 lg:p-10">
            <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl">
              <!-- City Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="cityName in regionCityNames" 
                  :key="cityName"
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-white shadow-md hover:bg-primary-dark transition-colors duration-200"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{ cityName }}
                </span>
              </div>
              
              <h1
                :id="region.subtitle + '-acil-nakliyat'"
                class="text-2xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-3 leading-tight"
              >
                {{ region.title }}
              </h1>
              <p v-if="region.excerpt" class="text-sm md:text-lg text-dark-light leading-relaxed">
                {{ region.excerpt }}
              </p>
            </div>
          </div>
          
          <!-- Hero Image -->
          <div class="h-[300px] md:h-[400px] overflow-hidden">
            <NuxtImg
              provider="imgix"
              format="webp"
              quality="80"
              loading="lazy"
              decoding="async"
              :src="region.image || '/img/default-region.jpg'"
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              :alt="region.subtitle + ' Eşya Taşıma Görseli'"
              :title="region.title"
            />
          </div>
        </div>

        <!-- Info Banner -->
        <div class="bg-primary px-6 py-6 md:px-12">
          <p class="text-white text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
            {{ region.subtitle }} bölgesinde güvenilir ve profesyonel taşımacılık hizmeti arıyorsanız, firmamız size özel çözümler sunuyor.
            <strong class="font-bold">{{ region.subtitle }} evden eve nakliyat</strong> hizmetimizle eşyalarınızı hızlı ve güvenli bir şekilde yeni adresinize taşıyoruz.
            Ayrıca <strong class="font-bold">{{ region.subtitle }} parça eşya taşıma</strong> seçeneklerimizle de yanınızdayız.
          </p>
        </div>

        <!-- Section Header -->
        <div class="px-6 py-8 md:px-12 bg-background border-b border-gray-200">
          <h2 class="text-2xl md:text-4xl font-bold text-primary text-center" :id="region.subtitle + '-esya-tasima-sirketleri'">
            {{ region.subtitle }} Eşya Taşıma Şirketleri ve Hizmetleri
          </h2>
        </div>

        <!-- Main Content -->
        <div class="p-6 md:p-12 lg:p-16">
          <div
            ref="contentRef"
            v-html="sanitizeHtml(region.content)"
            class="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-primary prose-p:text-dark prose-a:text-primary hover:prose-a:text-primary-dark prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-xl prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:bg-background prose-blockquote:rounded-r-xl prose-blockquote:py-4"
          ></div>
        </div>

        <!-- ⭐ Fiyatı Etkileyen Faktörler Tablosu (Panelden eklenen) -->
<div v-if="region.priceFactors && region.priceFactors.length > 0" class="px-6 md:px-12 lg:px-16 pb-6">
  <div class="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200">
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <div class="md:w-1/4 flex justify-center">
        <img 
          :src="region.priceFactorsImage || '/images/price.svg'"
          :alt="region.priceFactorsTitle || 'Fiyatı Etkileyen Faktörler'"
          class="w-full max-w-[200px] h-auto object-contain"
        >
      </div>
      <div class="md:w-3/4">
        <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">
          {{ region.priceFactorsTitle || 'Fiyatı Etkileyen Faktörler' }}
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-primary/10 rounded-t-xl">
                <th class="p-3 text-left border-b-2 border-primary/30 font-semibold text-dark">Faktör</th>
                <th class="p-3 text-left border-b-2 border-primary/30 font-semibold text-dark">En Düşük</th>
                <th class="p-3 text-left border-b-2 border-primary/30 font-semibold text-dark">En Yüksek</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(factor, idx) in region.priceFactors" :key="idx" class="border-b border-stone-200 hover:bg-stone-100 transition">
                <td class="p-3 text-dark">{{ factor.factor }}</td>
                <td class="p-3 text-dark font-medium">{{ factor.min }}</td>
                <td class="p-3 text-dark font-medium">{{ factor.max }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-stone-500 mt-4 text-center md:text-left">
          * Fiyatlar tahmini olup, kesin fiyat için firmamızla iletişime geçiniz.
        </p>
      </div>
    </div>
  </div>
</div>

        <!-- Quick Navigation -->
        <div class="px-6 py-6 md:px-12 bg-background border-t border-gray-200">
          <div class="flex flex-wrap justify-center gap-3 md:gap-4">
            <a
              :href="'#' + region.subtitle + '-acil-nakliyat'"
              class="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-primary text-sm font-semibold rounded-xl text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ region.subtitle }} Acil Nakliyat
            </a>
            <a
              :href="'#' + region.subtitle + '-esya-tasima-sirketleri'"
              class="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-primary text-sm font-semibold rounded-xl text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              {{ region.subtitle }} Eşya Taşıma Şirketleri
            </a>
            <a
              :href="'#' + dynamicIds.blockquote"
              class="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-primary text-sm font-semibold rounded-xl text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
              </svg>
              {{ region.subtitle }} Eşya Taşıma Fiyatları
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div class="border-t-2 border-gray-200 px-6 py-6 md:px-12 bg-background">
          <div class="flex justify-between items-center gap-4">
            <NuxtLink
              v-if="regionNav.previous"
              :to="'/' + regionNav.previous.slug"
              class="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 shadow-sm text-sm font-semibold rounded-xl text-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-x-1"
              :aria-label="`Önceki: ${regionNav.previous.subtitle} Nakliyat`"
            >
              <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>{{ regionNav.previous.subtitle }} Nakliyat</span>
            </NuxtLink>
            <div v-else></div>

            <NuxtLink
              v-if="regionNav.next"
              :to="'/' + regionNav.next.slug"
              class="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 shadow-sm text-sm font-semibold rounded-xl text-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:translate-x-1"
              :aria-label="`Sonraki: ${regionNav.next.subtitle} Nakliyat`"
            >
              <span>{{ regionNav.next.subtitle }} Nakliyat</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- İlgili Bölgeler - EN ALTTA -->
      <div v-if="relatedRegions.length > 0" class="mt-12">
        <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <!-- Modern Header -->
          <div class="relative px-8 py-8 bg-primary overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
            </div>
            
            <div class="relative flex items-center justify-between">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
                    Aynı Bölgedeki Diğer Firmalar
                  </h2>
                  <p class="text-white/90 text-sm md:text-base max-w-2xl">
                    {{ region.subtitle }} ile aynı 
                    <span class="font-semibold text-secondary">{{ regionCityNames.join(', ') }}</span> 
                    {{ regionCityNames.length > 1 ? 'illerinde' : 'ilinde' }} hizmet veren güvenilir taşımacılık firmaları
                  </p>
                </div>
              </div>
              
              <!-- Stats Badge -->
              <div class="hidden lg:flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <div class="text-4xl font-bold text-white">{{ relatedRegions.length }}</div>
                <div class="text-xs text-white/90 font-medium text-center">Bağlantılı<br>Bölge</div>
              </div>
            </div>
          </div>
          
          <!-- Cards Grid -->
          <div class="p-8">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              <NuxtLink
                v-for="related in relatedRegions"
                :key="related.slug"
                :to="'/' + related.slug"
                class="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-primary shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <!-- Gradient Overlay on Hover -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary-dark/0 group-hover:from-primary/5 group-hover:to-primary-dark/5 transition-all duration-300 rounded-2xl"></div>
                
                <div class="relative p-5 flex flex-col items-center">
                  <!-- Image Circle -->
                  <div class="w-16 h-16 md:w-20 md:h-20 mb-4 rounded-2xl overflow-hidden bg-background flex items-center justify-center ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                    <NuxtImg
                      v-if="related.image && related.image.trim() !== ''"
                      provider="imgix"
                      format="webp"
                      quality="70"
                      :src="related.image"
                      class="w-full h-full object-cover"
                      :alt="related.subtitle + ' Logo'"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center bg-primary">
                      <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Text Content -->
                  <div class="text-center space-y-2">
                    <h3 class="text-sm md:text-base font-bold text-dark group-hover:text-primary line-clamp-2 transition-colors duration-300">
                      {{ related.shortTitle || related.title }}
                    </h3>
                    <p class="text-xs text-dark-light font-medium">
                      {{ related.subtitle }}
                    </p>
                  </div>
                  
                  <!-- Arrow Icon -->
                  <div class="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Modern Footer Stats -->
          <div class="px-8 py-6 bg-background border-t-2 border-gray-200">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-dark">
                    <span class="text-2xl font-bold text-primary">{{ relatedRegions.length }}</span> Bağlantılı Bölge
                  </div>
                  <div class="text-xs text-dark-light">
                    {{ regionCityNames.length }} {{ regionCityNames.length > 1 ? 'ilde' : 'ilinde' }} hizmet veriyor
                  </div>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(cityName, index) in regionCityNames.slice(0, 3)" 
                  :key="cityName"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-dark border border-gray-200 shadow-sm"
                >
                  <div class="w-2 h-2 bg-primary rounded-full"></div>
                  {{ cityName }}
                </span>
                <span 
                  v-if="regionCityNames.length > 3"
                  class="inline-flex items-center px-3 py-1.5 bg-primary rounded-lg text-xs font-semibold text-white shadow-sm"
                >
                  +{{ regionCityNames.length - 3 }} il
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
/* Modern Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slide-in {
  animation: slideInRight 0.6s ease-out forwards;
}

/* Enhanced Prose Styling */
:deep(.prose) {
  @apply text-dark;
  line-height: 1.8;
  font-size: 1.0625rem;
}

:deep(.prose h2) {
  @apply mt-12 mb-6 text-3xl font-bold text-primary pb-3 border-b-2 border-secondary;
}

:deep(.prose h3) {
  @apply mt-10 mb-5 text-2xl font-bold text-primary;
}

:deep(.prose p) {
  @apply my-5 text-dark leading-relaxed;
}

:deep(.prose ul),
:deep(.prose ol) {
  @apply my-6 pl-6 space-y-3;
}

:deep(.prose li) {
  @apply text-dark;
}

:deep(.prose strong) {
  @apply text-dark font-bold;
}

:deep(.prose blockquote) {
  @apply border-l-4 border-secondary pl-6 pr-6 italic text-dark-light my-8 py-4 bg-background rounded-r-2xl shadow-sm;
}

:deep(.prose a) {
  @apply text-primary font-semibold hover:text-primary-dark transition-colors duration-200;
}

:deep(.prose img) {
  @apply rounded-2xl shadow-2xl my-8 border-4 border-white;
}

/* Custom Scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3b5d50 #eff2f1;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-background rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-primary rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-primary-dark;
}

/* Responsive Typography */
@media (max-width: 640px) {
  :deep(.prose) {
    font-size: 0.9375rem;
  }

  :deep(.prose h2) {
    @apply text-2xl mt-8 mb-4;
  }

  :deep(.prose h3) {
    @apply text-xl mt-6 mb-3;
  }
}

/* Card Hover Effects */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
}

/* Glass Effect */
.glass-effect {
  @apply bg-white/95 backdrop-blur-sm border border-gray-200;
}
</style>
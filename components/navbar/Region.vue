<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, navigateTo } from '#app'

const route = useRoute();
const currentPage = ref(Number(route.query.sayfa) || 1);
const itemsPerPage = 9;
const pageGroupSize = 10; // 10'ar 10'ar ilerleme için

// API'yi active=true parametresiyle çağırın
// Not: "?active=true" server tarafında tanınan bir parametre değildi
// (gerçek admin/publik ayrımı `?admin=true` ile yapılıyor) — sessizce
// yok sayılıyordu, public tarafın zaten varsayılan olarak sadece
// isActive:true bölgeleri döndürmesi tesadüfen doğru sonucu veriyordu.
// "?light=true" gerçek, sunucuda uygulanan bir parametre: liste
// görünümünde kullanılmayan ağır `content` alanını sorgudan çıkarır.
const { data: rawData, error, pending } = useFetch("/api/regions?light=true");

const regions = computed(() => {
  return rawData.value?.success ? rawData.value.data : [];
});

const searchQuery = ref("");

const filteredRegions = computed(() => {
  if (!searchQuery.value) return regions.value;
  return regions.value.filter((region) =>
    region.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedRegions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredRegions.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredRegions.value.length / itemsPerPage)
);

// --- Sayfa Gruplama Hesaplamaları ---
const currentPageGroup = computed(() => {
  return Math.ceil(currentPage.value / pageGroupSize)
})

const totalPageGroups = computed(() => {
  return Math.ceil(totalPages.value / pageGroupSize)
})

const pageGroupStart = computed(() => {
  return (currentPageGroup.value - 1) * pageGroupSize + 1
})

const pageGroupEnd = computed(() => {
  const end = currentPageGroup.value * pageGroupSize
  return end > totalPages.value ? totalPages.value : end
})

const visiblePages = computed(() => {
  const pages = []
  for (let i = pageGroupStart.value; i <= pageGroupEnd.value; i++) {
    pages.push(i)
  }
  return pages
})

// --- Sayfa Navigasyon Fonksiyonları ---
const navigatePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  navigateTo({ query: { sayfa: page } })
}

const navigateFirstPage = () => {
  navigatePage(1)
}

const navigateLastPage = () => {
  navigatePage(totalPages.value)
}

const navigatePreviousPage = () => {
  navigatePage(currentPage.value - 1)
}

const navigateNextPage = () => {
  navigatePage(currentPage.value + 1)
}

const navigatePreviousGroup = () => {
  const newPage = pageGroupStart.value - pageGroupSize
  if (newPage >= 1) {
    navigatePage(newPage)
  } else {
    navigateFirstPage()
  }
}

const navigateNextGroup = () => {
  const newPage = pageGroupEnd.value + 1
  if (newPage <= totalPages.value) {
    navigatePage(newPage)
  } else {
    navigateLastPage()
  }
}

// Direk sayfa numarası ile gitme
const goToPage = (event) => {
  const page = parseInt(event.target.value)
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    navigatePage(page)
  }
}

watch(searchQuery, () => {
  currentPage.value = 1;
  navigateTo({ query: { sayfa: 1 } });
});

// Kart listesinin belirmesi ortak animasyon dilinden geliyor
// (bkz. composables/useReveal.ts): kartlar [data-reveal-group] içinde
// birlikte tetiklenip sırayla gelir.
const listRef = ref(null);
useReveal(listRef);

const { siteUrl, brandName } = await useSiteSettings();

useHead({
  link: [
    {
      rel: "canonical",
      href: () =>
        currentPage.value > 1
          ? `${siteUrl.value}/bolgelerimiz?sayfa=${currentPage.value}`
          : `${siteUrl.value}/bolgelerimiz`,
    },
    {
      rel: "prev",
      href: () =>
        currentPage.value > 1
          ? `${siteUrl.value}/bolgelerimiz?sayfa=${currentPage.value - 1}`
          : undefined,
    },
    {
      rel: "next",
      href: () =>
        currentPage.value < totalPages.value
          ? `${siteUrl.value}/bolgelerimiz?sayfa=${currentPage.value + 1}`
          : undefined,
    },
  ],
});
</script>

<template>
  <div class="container mx-auto py-20 px-5 lg:px-0 overflow-hidden">
    <div class="max-w-5xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-serif italic text-stone-600 mb-4">
          Hizmet Bölgelerimiz
        </h2>
        <p
          class="text-stone-800 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
        >
          <strong>{{ brandName }}</strong> olarak sadece Ege Bölgesi değil,
          Türkiye'nin dört bir köşesine
          <span class="text-stone-700 font-medium"
            >güvenilir nakliye hizmetleri</span
          >
          sunmaktayız. Özellikle
          <span class="text-stone-700 font-medium">evden eve taşımacılık</span>,
          <span class="text-stone-700 font-medium">ofis taşıma</span> ve
          <span class="text-stone-700 font-medium">beyaz eşya nakliyesi</span>
          konularında uzmanlaşmış ekibimiz, eşyalarınızı en güvenli şekilde yeni
          adresinize ulaştırıyor.
        </p>
      </div>

      <div class="bg-stone-50 p-8 rounded-xl mb-12 border border-stone-100">
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-white p-4 rounded-lg shadow-xs text-center">
            <div class="text-primary text-2xl mb-2 mx-auto w-8 h-8">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Ev ikonu"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </div>
            <h4 class="font-medium">Evden Eve</h4>
            <p class="text-sm text-stone-500">Tüm eşyalarınız için</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs text-center">
            <div class="text-primary text-2xl mb-2 mx-auto w-8 h-8">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Ofis ikonu"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <h4 class="font-medium">Ofis Taşıma</h4>
            <p class="text-sm text-stone-500">Kesintisiz iş süreci</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs text-center">
            <div class="text-primary text-2xl mb-2 mx-auto w-8 h-8">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Kutu İkonu"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
            <h4 class="font-medium">Parça Eşya</h4>
            <p class="text-sm text-stone-500">Tek eşya taşıma</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs text-center">
            <div class="text-primary text-2xl mb-2 mx-auto w-8 h-8">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Kamyon ikonu"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                ></path>
              </svg>
            </div>
            <h4 class="font-medium">Acil Nakliye</h4>
            <p class="text-sm text-stone-500">24/7 acil çözümler</p>
          </div>
        </div>
      </div>

      <div class="text-center">
        <p class="text-stone-600 max-w-3xl mx-auto mb-6">
          <strong>{{ brandName }}</strong> olarak müşterilerimize
          <span class="font-medium text-stone-700">%100 sigortalı</span>,
          <span class="font-medium text-stone-700">profesyonel paketleme</span>
          ve
          <span class="font-medium text-stone-700"
            >en uygun fiyat garantisi</span
          >
          ile hizmet veriyoruz. Hizmet bölgelerimizle ilgili detaylı bilgi almak
          için uzman ekibimizle iletişime geçebilirsiniz.
        </p>
        <a
          href="/iletisim"
          class="inline-block bg-stone-600 hover:bg-stone-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Hemen Teklif Alın
        </a>
      </div>
    </div>

    <div class="mb-12 max-w-2xl mx-auto">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Bölge ara..."
        class="w-full px-6 py-3 border-2 border-stone-200 rounded-full focus:border-primary focus:ring-0 transition-all"
        aria-label="Bölge arama"
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
      <!-- Aktif bölge yoksa mesaj göster -->
      <div v-if="paginatedRegions.length === 0" class="text-center py-20">
        <h3 class="text-2xl font-semibold text-stone-600 mb-4">
          Aktif Bölge Bulunamadı
        </h3>
        <p class="text-stone-500 mb-6">
          Şu anda aktif hizmet verdiğimiz bölge bulunmuyor. Lütfen daha sonra tekrar kontrol edin.
        </p>
        <p class="text-sm text-stone-400">
          (Admin panelinden bölgeleri aktif etmek için "Aktif Yap" butonunu kullanabilirsiniz)
        </p>
      </div>
      
      <!-- Aktif bölgeler varsa göster -->
      <div v-else ref="listRef" data-reveal-group class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="region in paginatedRegions"
          :key="region.id"
          data-reveal
          class="service-card group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
        >
          <div class="relative overflow-hidden">
            <NuxtImg
              provider="imgix"
              format="webp"
              quality="60"
              loading="lazy"
              decoding="async"
              class="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
              :src="region.image || '/img/default-region.jpg'"
              :alt="region.subtitle + ' Eşya Taşıma Görseli'"
              :title="region.title"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-stone-900/10 to-transparent"
            ></div>
          </div>
          <div class="p-6">
            <NuxtLink
              :to="`/${region.slug}`"
              class="text-2xl font-bold text-stone-800 mb-2 hover:text-primary transition-colors"
              :aria-label="`${region.title} bölgesi için detaylar`"
            >
              {{ region.title }}
            </NuxtLink>
            <p class="text-stone-600 line-clamp-3">
              {{ region.excerpt }}
            </p>
          </div>
        </div>
      </div>

      <!-- Gelişmiş Sayfalama - Aktif bölgeler varsa göster -->
      <div v-if="paginatedRegions.length > 0 && totalPages > 1" class="mt-12">
        <div class="flex flex-col items-center space-y-4">
          <!-- Üst Sayfalama -->
          <div class="flex flex-wrap items-center justify-center gap-2">
            <!-- İlk Sayfa -->
            <button
              @click="navigateFirstPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              aria-label="İlk sayfaya git"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              İlk
            </button>
            
            <!-- Önceki 10 Sayfa -->
            <button
              @click="navigatePreviousGroup"
              :disabled="currentPageGroup === 1"
              class="px-4 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Önceki 10 sayfa"
            >
              -10
            </button>
            
            <!-- Önceki Sayfa -->
            <button
              @click="navigatePreviousPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              aria-label="Önceki sayfa"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Önceki
            </button>

            <!-- Sayfa Numaraları -->
            <div class="flex items-center space-x-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="navigatePage(page)"
                :class="[
                  'w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all',
                  page === currentPage
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                ]"
                :aria-label="`${page}. sayfaya git`"
              >
                {{ page }}
              </button>
            </div>

            <!-- Sonraki Sayfa -->
            <button
              @click="navigateNextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              aria-label="Sonraki sayfa"
            >
              Sonraki
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <!-- Sonraki 10 Sayfa -->
            <button
              @click="navigateNextGroup"
              :disabled="currentPageGroup === totalPageGroups"
              class="px-4 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sonraki 10 sayfa"
            >
              +10
            </button>
            
            <!-- Son Sayfa -->
            <button
              @click="navigateLastPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              aria-label="Son sayfaya git"
            >
              Son
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Sayfa Bilgisi ve Direk Git -->
          <div class="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <div class="flex items-center space-x-2">
              <span class="text-stone-600">Sayfa:</span>
              <input
                type="number"
                :value="currentPage"
                @input="goToPage"
                @keyup.enter="$event.target.blur()"
                min="1"
                :max="totalPages"
                class="w-16 px-2 py-1 border border-stone-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <span class="text-stone-600">/ {{ totalPages }}</span>
            </div>
            
            <div class="text-sm text-stone-500">
              <span v-if="totalPageGroups > 1">
                Grup {{ currentPageGroup }} / {{ totalPageGroups }}
                <span class="mx-2">•</span>
              </span>
              Sayfalar {{ pageGroupStart }}-{{ pageGroupEnd }}
              <span class="mx-2">•</span>
              Toplam {{ filteredRegions.length }} bölge
            </div>
          </div>

          <!-- Alt Sayfalama (Mobil için) -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-4 sm:hidden">
            <button
              @click="navigateFirstPage"
              :disabled="currentPage === 1"
              class="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              aria-label="İlk sayfa"
            >
              İlk
            </button>
            
            <button
              @click="navigatePreviousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              aria-label="Önceki"
            >
              ←
            </button>
            
            <span class="px-3 py-1.5 text-stone-700 font-medium">
              {{ currentPage }} / {{ totalPages }}
            </span>
            
            <button
              @click="navigateNextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              aria-label="Sonraki"
            >
              →
            </button>
            
            <button
              @click="navigateLastPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              aria-label="Son sayfa"
            >
              Son
            </button>
          </div>
        </div>
      </div>

      <!-- Basit Sayfalama (Eski) - Sadece çok az sayfa varsa -->
      <div v-else-if="paginatedRegions.length > 0 && totalPages <= 5" class="flex justify-center mt-12 space-x-4">
        <button
          @click="navigatePreviousPage"
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
          @click="navigateNextPage"
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

/* Sayfalama butonları için responsive tasarım */
@media (max-width: 640px) {
  .hidden-mobile {
    display: none;
  }
}
</style>
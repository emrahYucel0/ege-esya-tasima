<template>
  <section class="py-16 md:py-24" id="fiyatlandirma">
    <div class="container mx-auto px-4">
      <!-- Başlık ve Açıklama -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ data?.mainTitle || 'Şeffaf Nakliyat Fiyatları' }}</h1>
        <p class="text-lg text-gray-600" v-if="data?.description" v-html="sanitizeHtml(data.description)"></p>
        <p v-else class="text-lg text-gray-600">
          <strong>%100 fiyat garantili</strong> ev taşıma paketlerimiz. Eşyalarınızın güvenli taşınması için özel çözümler
          ve <span class="text-[#3b5d50] font-semibold">kurumsal fiyat avantajları</span> sunuyoruz.
        </p>
      </div>

      <!-- Fiyatlandırma Kartları -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <!-- Dinamik Fiyat Planları -->
        <div 
          v-for="plan in data?.pricingPlans" 
          :key="plan.id"
          class="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          :class="{
            'border-2 border-[#3b5d50]': plan.isFeatured
          }"
        >
          <!-- Plan Başlık Bölümü -->
          <div 
            class="p-6 text-center"
            :class="plan.isFeatured ? 'bg-[#3b5d50]' : 'bg-[#f8f9fa]'"
          >
            <h2 
              class="text-2xl font-bold"
              :class="plan.isFeatured ? 'text-white' : 'text-gray-800'"
            >
              {{ plan.name }}
            </h2>
            <p 
              class="mt-2"
              :class="plan.isFeatured ? 'text-gray-200' : 'text-gray-600'"
            >
              {{ plan.subtitle }}
            </p>
          </div>

          <!-- Plan İçeriği -->
          <div class="p-6">
            <!-- Fiyat -->
            <div class="flex justify-center items-baseline">
              <span class="text-4xl font-extrabold text-[#3b5d50]">{{ plan.price }}</span>
              <span class="ml-1 text-gray-500">{{ plan.priceSuffix }}</span>
            </div>

            <!-- Özellikler Listesi -->
            <ul class="mt-6 space-y-3">
              <li 
                v-for="feature in plan.features" 
                :key="feature.id"
                class="flex items-start"
                :class="!feature.isIncluded ? 'text-gray-400' : ''"
              >
                <svg 
                  class="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  :class="feature.isIncluded ? 'text-[#3b5d50]' : 'text-gray-400'"
                >
                  <path 
                    v-if="feature.isIncluded"
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M5 13l4 4L19 7" 
                  />
                  <path 
                    v-else
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
                <span>{{ feature.text }}</span>
              </li>
            </ul>

            <!-- Buton -->
            <div class="mt-8">
              <NuxtLink 
                :to="plan.buttonLink" 
                class="block w-full px-6 py-3 text-center font-medium rounded-lg transition-colors"
                :class="plan.isFeatured 
                  ? 'bg-[#3b5d50] text-white hover:bg-[#2d473d]' 
                  : 'bg-gray-100 text-[#3b5d50] hover:bg-[#3b5d50] hover:text-white'
                "
                :aria-label="plan.buttonAriaLabel || `${plan.name} paketi detayları`"
              >
                {{ plan.buttonText }}
              </NuxtLink>
            </div>
          </div>

          <!-- Popüler Plan Etiketi -->
          <div 
            v-if="plan.isPopular"
            class="absolute top-5 right-3 bg-[#f9bf29] text-xs font-bold text-gray-800 px-3 py-1 transform rotate-12 translate-x-2 -translate-y-2"
          >
            EN ÇOK TERCİH
          </div>
        </div>

        <!-- Veri yoksa varsayılan içerik -->
        <div v-if="!data?.pricingPlans || data.pricingPlans.length === 0" class="col-span-3 text-center py-12">
          <p class="text-gray-500 text-lg">Fiyatlandırma bilgileri yükleniyor...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ------------------------------------
// VERİ ÇEKME İŞLEMLERİ
// ------------------------------------

// API'den veriyi çekmek için reactive state
const { data: pricingResponse, pending, error } = await useFetch('/api/pricing-section')
// API artık {success,data} zarfı dönüyor; template'in geri kalanı değişmeden
// çalışabilsin diye burada tek noktadan unwrap ediyoruz.
const data = computed(() => pricingResponse.value?.data ?? null)

// Hata durumunda fallback
if (error.value) {
  console.error('Fiyatlandırma verileri yüklenirken hata oluştu:', error.value)
}

// Not: Bu bölüm birden fazla sayfada (ör. ana sayfa) kullanılan paylaşılan
// bir bileşen olduğu için burada useSeoMeta/useHead ÇAĞRILMAZ — sayfa
// başlığı/açıklaması sadece kendisini kullanan sayfa tarafından
// (usePageSeo composable'ı ile) belirlenir. Aksi halde bu bileşenin meta
// verisi, içinde bulunduğu sayfanın gerçek meta verisini ezer.

// Yükleme durumu
const isLoading = computed(() => pending.value && !data.value)
</script>

<style scoped>
/* Mikro interaktif efektler */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Erişilebilirlik odaklu focus stilleri */
button:focus, a:focus {
  outline: 2px solid #3b5d50;
  outline-offset: 2px;
}

/* SEO dostu gizli içerik */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Yükleme animasyonu */
.skeleton-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
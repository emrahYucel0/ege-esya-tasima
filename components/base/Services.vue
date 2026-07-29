<script setup>
import { ref, onMounted, computed } from 'vue'

// API'den gelen veriyi tutacak ref'ler
const servicesData = ref(null)
const servicesList = ref([])
const statisticsList = ref([])
const isLoading = ref(true)
const fetchError = ref(null)

/**
 * API'den "Servisler" verilerini çeker.
 */
const loadServices = async () => {
  isLoading.value = true
  fetchError.value = null
  
  try {
    // API rotasından veriyi çekiyoruz
    const { data, error } = await useFetch('/api/services')
    const record = data.value?.data

    if (error.value) {
      fetchError.value = 'Servis verileri yüklenirken bir sorun oluştu.'
      console.error('Veri çekme hatası:', error.value)
    } else if (record && record.id) {
      servicesData.value = record
      servicesList.value = record.services || []
      statisticsList.value = record.statistics || []
    } else {
      fetchError.value = data.value?.error || 'Servis verisi veritabanında bulunamadı.'
      servicesData.value = null
      servicesList.value = []
      statisticsList.value = []
    }
  } catch (err) {
    fetchError.value = 'Sunucuya erişilemedi.'
    console.error('Fetch işlemi sırasında beklenmeyen bir hata:', err)
  } finally {
    isLoading.value = false
  }
}

// Component mount edildiğinde verileri yükle
loadServices()

// Computed properties ile dinamik veriler
const mainTitle = computed(() => servicesData.value?.mainTitle || "Profesyonel Nakliye Hizmetlerimiz")
const description = computed(() => servicesData.value?.description || "Evden eve nakliyat sürecinizde güvenle yararlanabileceğiniz uzman hizmetlerimiz. Eşyalarınız özenle taşınır, hasarsız teslimat garantisi.")
const buttonText = computed(() => servicesData.value?.buttonText || "Tüm Hizmetler")
const buttonLink = computed(() => servicesData.value?.buttonLink || "/hizmetlerimiz")

// İstatistikler için computed properties
const statisticsWithIcons = computed(() => {
  const defaultIcons = [
    {
      icon: `<svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2V4a1 1 0 001 1h10a1 1 0 001-1V3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-.707-.707a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414 0l3.414-3.414z" clip-rule="evenodd"></path>
      </svg>`
    },
    {
      icon: `<svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 7.5H15a2 2 0 110 4h-1.06l2.29 2.29A7 7 0 0110 17a7 7 0 01-5.27-2.21l2.29-2.29H5a2 2 0 010-4h1.07L7.07 6.43A7 7 0 0010 3a7 7 0 002.93 4.5z"></path>
      </svg>`
    },
    {
      icon: `<svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
      </svg>`
    },
    {
      icon: `<svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
      </svg>`
    }
  ]

  return statisticsList.value.map((stat, index) => ({
    ...stat,
    // Özel iconPath varsa şablonda gerçek <img :src> ile render edilir (bkz. template);
    // displayIcon burada SADECE varsayılan, sabit kod içindeki güvenli SVG'ler için kullanılır.
    displayIcon: defaultIcons[index]?.icon || defaultIcons[0].icon
  }))
})

// Varsayılan servisler (API'den veri gelmezse kullanılacak)
const defaultServices = [
  {
    imagePath: "/images/ev-nakliye.png",
    title: "Evden Eve Nakliyat",
    subtitle: "Şehir İçi & Şehirlerarası"
  },
  {
    imagePath: "/images/ofis-tasima.png",
    title: "Ofis Taşıma", 
    subtitle: "Kurumsal Çözümler"
  },
  {
    imagePath: "/images/esyali-kiralik.png",
    title: "Eşyalı Kiralık Taşıma",
    subtitle: "Güvenli Paketleme"
  }
]

// Display için servis listesi - API'den gelen veya default
const displayServices = computed(() => {
  return servicesList.value.length > 0 ? servicesList.value : defaultServices
})

</script>

<template>
  <section class="py-16 md:py-28 relative overflow-hidden">
    <!-- Dekoratif Arka Plan Elementleri -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Büyük Daire -->
      <div class="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#3b5d50]/10 to-[#dce5e4]/20 rounded-full blur-3xl"></div>
      
      <!-- Küçük Daireler -->
      <div class="absolute top-32 left-10 w-6 h-6 bg-[#3b5d50]/30 rounded-full animate-pulse"></div>
      <div class="absolute top-20 right-32 w-4 h-4 bg-[#dce5e4]/50 rounded-full animate-bounce delay-1000"></div>
      <div class="absolute bottom-40 left-20 w-8 h-8 bg-[#3b5d50]/20 rounded-full animate-pulse delay-500"></div>
      
      <!-- Geometrik Şekiller -->
      <div class="absolute top-40 right-20 w-12 h-12 border-2 border-[#3b5d50]/20 rotate-45 animate-spin-slow"></div>
      <div class="absolute bottom-60 right-40 w-16 h-16 border border-[#dce5e4]/40 rotate-12"></div>
      
      <!-- Zigzag Desenler -->
      <svg class="absolute top-16 left-1/4 w-20 h-8 opacity-20" viewBox="0 0 80 32" fill="none">
        <path d="M0 16L8 8L16 16L24 8L32 16L40 8L48 16L56 8L64 16L72 8L80 16" stroke="#3b5d50" stroke-width="2"/>
      </svg>
      
      <!-- Nokta Deseni -->
      <div class="absolute bottom-20 left-1/3 opacity-30">
        <div class="grid grid-cols-4 gap-2">
          <div class="w-2 h-2 bg-[#3b5d50] rounded-full"></div>
          <div class="w-2 h-2 bg-[#dce5e4] rounded-full"></div>
          <div class="w-2 h-2 bg-[#3b5d50] rounded-full"></div>
          <div class="w-2 h-2 bg-[#dce5e4] rounded-full"></div>
          <div class="w-2 h-2 bg-[#dce5e4] rounded-full"></div>
          <div class="w-2 h-2 bg-[#3b5d50] rounded-full"></div>
          <div class="w-2 h-2 bg-[#dce5e4] rounded-full"></div>
          <div class="w-2 h-2 bg-[#3b5d50] rounded-full"></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      
      <!-- Yükleniyor Durumu -->
      <div v-if="isLoading" class="text-center text-xl text-gray-500 py-10">
        <p>Servis verileri yükleniyor...</p>
      </div>
      
      <!-- Hata Durumu -->
      <div v-else-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>{{ fetchError }}</p>
        <p class="text-sm mt-2">Varsayılan içerik gösteriliyor.</p>
      </div>

      <div class="flex flex-col lg:flex-row">
        <!-- Kolon 1 - Başlık ve Açıklama -->
        <div class="w-full lg:w-1/4 mb-10 lg:mb-0 lg:pr-8 relative">
          <!-- Dekoratif Element - Sol Üst -->
          <div class="absolute -top-4 -left-4 w-16 h-16 border-l-4 border-t-4 border-[#3b5d50]/30"></div>
          
          <h2 class="text-3xl section-title md:text-4xl font-bold text-gray-800 mb-6 relative">
            {{ mainTitle }}
            <!-- Alt Çizgi Dekorasyonu -->
            <div class="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-[#3b5d50] to-[#dce5e4] rounded-full"></div>
          </h2>
          
          <p class="text-gray-600 mb-6 relative">
            {{ description }}
          </p>
          
          <NuxtLink 
            :to="buttonLink" 
            class="inline-block px-6 py-3 bg-[#3b5d50] text-white rounded-lg hover:bg-[#2d473d] transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-xl"
          >
            <!-- Buton İçi Shimmer Efekti -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span class="relative z-10">{{ buttonText }}</span>
          </NuxtLink>
          
          <!-- Dekoratif Element - Sağ Alt -->
          <div class="absolute -bottom-4 -right-4 w-12 h-12 border-r-4 border-b-4 border-[#dce5e4]/40"></div>
        </div>

        <!-- Dinamik Servis Kartları -->
        <template v-for="(service, index) in displayServices" :key="service.id || index">
          <div class="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0 md:px-3 relative">
            <!-- Üst Dekoratif Element -->
            <div v-if="index > 0" class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#3b5d50] to-[#dce5e4] rounded-full"></div>
            
            <div class="service-item text-center relative pb-12 cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100">
              <!-- Köşe Dekorasyonları -->
              <div class="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[#3b5d50]/30 rounded-tl-lg"></div>
              <div class="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[#3b5d50]/30 rounded-tr-lg"></div>
              
              <img 
                :src="service.imagePath" 
                :alt="service.title" 
                class="w-full h-48 object-contain mb-6 transition-transform duration-300 group-hover:-translate-y-6 filter group-hover:drop-shadow-xl"
                loading="lazy"
              >
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ service.title }}</h3>
              <p class="text-[#3b5d50] font-bold text-lg">{{ service.subtitle }}</p>

              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-[#dce5e4] to-[#dce5e4]/50 rounded-lg -z-10 transition-all duration-300 group-hover:h-3/4"></div>
            </div>
          </div>
        </template>

      </div>
      
      <!-- İstatistikler -->
      <div v-if="statisticsWithIcons.length > 0" class="flex flex-wrap justify-around gap-8 mt-16 relative">
        <!-- Arka Plan Dekoratif Element -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#3b5d50]/5 via-transparent to-[#dce5e4]/10 rounded-2xl"></div>
        
        <!-- Üst Dekoratif Çizgi -->
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#3b5d50] to-transparent rounded-full"></div>
        
        <div 
          v-for="(statistic, index) in statisticsWithIcons" 
          :key="index"
          class="flex flex-col items-center text-center max-w-[150px] relative z-10 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <!-- Hover Glow Effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#3b5d50]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <div class="mb-2 text-[#3b5d50] text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            <img v-if="statistic.iconPath" :src="statistic.iconPath" :alt="`${statistic.label1} ikonu`" class="w-12 h-12 drop-shadow-md mx-auto" />
            <div v-else v-html="statistic.displayIcon"></div>
          </div>
          <p class="text-black text-3xl font-bold relative z-10">{{ statistic.value }}</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">{{ statistic.label1 }}</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">{{ statistic.label2 }}</p>
        </div>
      </div>

      <!-- Varsayılan İstatistikler (API'den veri gelmezse) -->
      <div v-else class="flex flex-wrap justify-around gap-8 mt-16 relative">
        <!-- Arka Plan Dekoratif Element -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#3b5d50]/5 via-transparent to-[#dce5e4]/10 rounded-2xl"></div>
        
        <!-- Üst Dekoratif Çizgi -->
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#3b5d50] to-transparent rounded-full"></div>
        
        <!-- Varsayılan İstatistik Kartları -->
        <div class="flex flex-col items-center text-center max-w-[150px] relative z-10 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div class="absolute inset-0 bg-gradient-to-br from-[#3b5d50]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <div class="mb-2 text-[#3b5d50] text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2V4a1 1 0 001 1h10a1 1 0 001-1V3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-.707-.707a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414 0l3.414-3.414z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <p class="text-black text-3xl font-bold relative z-10">60k</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Başarılı</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Taşıma</p>
        </div>
        
        <!-- Diğer varsayılan istatistikler... -->
        <div class="flex flex-col items-center text-center max-w-[150px] relative z-10 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div class="absolute inset-0 bg-gradient-to-br from-[#3b5d50]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <div class="mb-2 text-[#3b5d50] text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 7.5H15a2 2 0 110 4h-1.06l2.29 2.29A7 7 0 0110 17a7 7 0 01-5.27-2.21l2.29-2.29H5a2 2 0 010-4h1.07L7.07 6.43A7 7 0 0010 3a7 7 0 002.93 4.5z"></path>
            </svg>
          </div>
          <p class="text-black text-3xl font-bold relative z-10">150+</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Deneyimli</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Ekip Üyesi</p>
        </div>
        
        <div class="flex flex-col items-center text-center max-w-[150px] relative z-10 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div class="absolute inset-0 bg-gradient-to-br from-[#3b5d50]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <div class="mb-2 text-[#3b5d50] text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <p class="text-black text-3xl font-bold relative z-10">15+</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Yıllık</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Deneyim</p>
        </div>
        
        <div class="flex flex-col items-center text-center max-w-[150px] relative z-10 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div class="absolute inset-0 bg-gradient-to-br from-[#3b5d50]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <div class="mb-2 text-[#3b5d50] text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <p class="text-black text-3xl font-bold relative z-10">58k</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Memnun</p>
          <p class="text-gray-600 text-sm font-semibold relative z-10">Müşteri</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Özel animasyonlar için ek CSS */
.service-item {
  transition: all 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
}

/* Yavaş döngü animasyonu */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Responsive ayarlar */
@media (max-width: 767px) {
  .service-item {
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Glow efektleri */
.group:hover .drop-shadow-xl {
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}

/* Backdrop blur destek kontrolü */
@supports (backdrop-filter: blur(12px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(12px);
  }
}
</style>
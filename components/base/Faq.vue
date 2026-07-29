<template>
  <div class="py-12 md:py-16 lg:py-20">
    <div class="container mx-auto px-4">
      
      <!-- Yükleniyor Durumu -->
      <div v-if="isLoading" class="text-center text-xl text-gray-500 py-10">
        <p>SSS verileri yükleniyor...</p>
      </div>
      
      <!-- Hata Durumu -->
      <div v-else-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>{{ fetchError }}</p>
      </div>
      
      <!-- İçerik -->
      <div v-else-if="faqData" class="grid grid-cols-1 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 items-start">
        <!-- Sol Kolon - SSS İçeriği -->
        <div class="lg:col-span-2">
          <div class="mb-10 md:mb-12 text-left">
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {{ mainTitle }}
            </h1>
            <p class="text-gray-600 text-base md:text-lg">
              {{ description }}
            </p>
          </div>

          <!-- FAQ Listesi -->
          <div v-if="activeFaqs.length > 0" class="space-y-4">
            <div 
              v-for="(item, index) in activeFaqs" 
              :key="item.id || index" 
              class="shadow-lg rounded-lg overflow-hidden"
            >
              <button
                @click="toggleAccordion(index)"
                class="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none transition-colors duration-200 ease-in-out"
                :class="{ 'bg-gray-50': activeIndex === index }"
                :aria-expanded="activeIndex === index"
                :aria-controls="`faq-${index}`"
              >
                <h3 class="text-md sm:text-lg font-semibold text-gray-800 pr-4">
                  {{ item.question }}
                </h3>
                <span class="ml-2 flex-shrink-0">
                  <svg 
                    class="w-6 h-6 text-[#3b5d50] transition-transform duration-300" 
                    :class="{ 'rotate-180': activeIndex === index }" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                :id="`faq-${index}`"
                class="overflow-hidden transition-all duration-300 px-5 sm:px-6"
                :class="{
                  'max-h-0': activeIndex !== index,
                  'max-h-[500px] pb-5': activeIndex === index
                }"
              >
                <div class="prose prose-lg text-gray-600 pt-2">
                  <p>{{ item.answer }}</p>
                  <div v-if="item.details && item.details.length > 0" class="mt-4 pl-4 border-l-2 border-[#3b5d50]">
                    <ul class="space-y-2">
                      <li v-for="(detail, i) in item.details" :key="detail.id || i" class="flex items-start">
                        <svg class="h-5 w-5 text-[#3b5d50] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{{ detail.text }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Varsayılan FAQ Listesi (veri yoksa) -->
          <div v-else class="space-y-4">
            <div 
              v-for="(item, index) in defaultFaqs" 
              :key="index" 
              class="shadow-lg rounded-lg overflow-hidden"
            >
              <button
                @click="toggleAccordion(index)"
                class="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none transition-colors duration-200 ease-in-out"
                :class="{ 'bg-gray-50': activeIndex === index }"
                :aria-expanded="activeIndex === index"
                :aria-controls="`faq-${index}`"
              >
                <h3 class="text-md sm:text-lg font-semibold text-gray-800 pr-4">
                  {{ item.question }}
                </h3>
                <span class="ml-2 flex-shrink-0">
                  <svg 
                    class="w-6 h-6 text-[#3b5d50] transition-transform duration-300" 
                    :class="{ 'rotate-180': activeIndex === index }" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                :id="`faq-${index}`"
                class="overflow-hidden transition-all duration-300 px-5 sm:px-6"
                :class="{
                  'max-h-0': activeIndex !== index,
                  'max-h-[500px] pb-5': activeIndex === index
                }"
              >
                <div class="prose prose-lg text-gray-600 pt-2">
                  <p>{{ item.answer }}</p>
                  <div v-if="item.details" class="mt-4 pl-4 border-l-2 border-[#3b5d50]">
                    <ul class="space-y-2">
                      <li v-for="(detail, i) in item.details" :key="i" class="flex items-start">
                        <svg class="h-5 w-5 text-[#3b5d50] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{{ detail }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sağ Kolon - Görseller -->
        <div class="lg:col-span-1 ml-10 relative mt-8 md:mt-4 lg:mt-0 lg:pt-8">
          <!-- Primary Image (Sol üstteki büyük görsel) -->
          <div 
            v-if="primaryImage" 
            class="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto lg:mx-0 lg:ml-[-2rem] xl:ml-[-3rem] z-10"
          >
            <img
              :src="primaryImage.imagePath"
              :alt="primaryImage.altText"
              class="rounded-lg shadow-xl w-full h-96 object-cover"
              loading="lazy"
            />
            <!-- Top-right stats card -->
            <div 
              v-if="topRightCard"
              class="absolute -top-10 sm:-right-6 rounded-lg shadow-xl w-[120px] sm:w-[140px] text-center"
              :style="{ backgroundColor: topRightCard.bgColor, color: topRightCard.textColor }"
            >
              <div class="p-3 py-2 sm:p-4 sm:py-3">
                <p class="text-xl sm:text-2xl font-bold">{{ topRightCard.value }}</p>
                <p class="text-[10px] sm:text-xs leading-tight">
                  {{ topRightCard.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- Secondary Image (Sağ alttaki görsel) -->
          <div 
            v-if="secondaryImage"
            class="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto lg:mx-0 mt-[-6rem] sm:mt-[-7rem] md:mt-[-8rem] lg:mt-[-7rem] ml-[2rem] sm:ml-[3rem] md:ml-[4rem] lg:ml-[3rem] xl:ml-[4rem] z-20"
          >
            <img
              :src="secondaryImage.imagePath"
              :alt="secondaryImage.altText"
              class="rounded-lg shadow-xl w-full h-80 object-cover"
              loading="lazy"
            />
            <!-- Bottom-left stats card -->
            <div 
              v-if="bottomLeftCard"
              class="absolute -bottom-8 sm:-left-6 rounded-lg shadow-xl w-[120px] sm:w-[140px] text-center"
              :style="{ backgroundColor: bottomLeftCard.bgColor, color: bottomLeftCard.textColor }"
            >
              <div class="p-3 py-2 sm:p-4 sm:py-3">
                <p class="text-xl sm:text-2xl font-bold">{{ bottomLeftCard.value }}</p>
                <p class="text-[10px] sm:text-xs leading-tight">{{ bottomLeftCard.label }}</p>
              </div>
            </div>
          </div>

          <!-- Varsayılan görseller (veri yoksa) -->
          <template v-if="!primaryImage && !secondaryImage">
            <div class="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto lg:mx-0 lg:ml-[-2rem] xl:ml-[-3rem] z-10">
              <img
                src="~/assets/images/nakliye2.jpg"
                alt="Profesyonel Nakliye Ekibimiz"
                class="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div class="absolute -top-10 sm:-right-6 bg-[#3b5d50] text-white p-3 py-2 sm:p-4 sm:py-3 rounded-lg shadow-xl w-[120px] sm:w-[140px] text-center">
                <p class="text-xl sm:text-2xl font-bold">150+</p>
                <p class="text-[10px] sm:text-xs leading-tight">
                  Profesyonel Ekip
                </p>
              </div>
            </div>

            <div class="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto lg:mx-0 mt-[-6rem] sm:mt-[-7rem] md:mt-[-8rem] lg:mt-[-7rem] ml-[2rem] sm:ml-[3rem] md:ml-[4rem] lg:ml-[3rem] xl:ml-[4rem] z-20">
              <img
                src="~/assets/images/nakliye1.jpg"
                alt="Modern Nakliye Araçlarımız"
                class="rounded-lg shadow-xl w-full h-80 object-cover"
              />
              <div class="absolute -bottom-8 sm:-left-6 bg-[#f9bf29] text-gray-800 p-3 py-2 sm:p-4 sm:py-3 rounded-lg shadow-xl w-[120px] sm:w-[140px] text-center">
                <p class="text-xl sm:text-2xl font-bold">75+</p>
                <p class="text-[10px] sm:text-xs leading-tight">Taşıma Aracı</p>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Veri Bulunamadı Durumu -->
      <div v-else class="text-center text-xl text-yellow-600 py-10">
        <p>FAQ bölümü verisi bulunamadı. Lütfen yönetim panelinden (Admin) bu bölüm için bir kayıt oluşturun.</p>
      </div>

      <!-- Ek CTA -->
      <div class="mt-16 text-center">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ ctaTitle }}</h3>
        <NuxtLink 
          :to="ctaButtonLink" 
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#3b5d50] hover:bg-[#2d473d] transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ ctaButtonText }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const activeIndex = ref(null)
const faqData = ref(null)
const isLoading = ref(true)
const fetchError = ref(null)

// Accordion Toggle
const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

/**
 * API'den FAQ Section verilerini çeker
 */
const loadFaqSection = async () => {
  isLoading.value = true
  fetchError.value = null
  
  try {
    const { data, error } = await useFetch('/api/faq-section')
    const record = data.value?.data

    if (error.value) {
      fetchError.value = 'Veriler yüklenirken bir sorun oluştu.'
      console.error('Veri çekme hatası:', error.value)
    } else if (record && record.id) {
      faqData.value = record
    } else {
      fetchError.value = data.value?.error || 'FAQ bölümü verisi veritabanında bulunamadı.'
      faqData.value = null
    }
  } catch (err) {
    fetchError.value = 'Sunucuya erişilemedi.'
    console.error('Fetch işlemi sırasında beklenmeyen bir hata:', err)
  } finally {
    isLoading.value = false
  }
}

// Sayfa yüklendiğinde verileri çek
loadFaqSection()

// Computed properties
const mainTitle = computed(() => faqData.value?.mainTitle || "Nakliye Sürecinizle İlgili Tüm Sorularınız")
const description = computed(() => faqData.value?.description || "Evden eve nakliyat sürecinizle ilgili merak ettikleriniz. Profesyonel taşımacılık hizmetlerimiz hakkında en çok sorulan sorular ve detaylı cevapları.")
const ctaTitle = computed(() => faqData.value?.ctaTitle || "Başka sorunuz mu var?")
const ctaButtonText = computed(() => faqData.value?.ctaButtonText || "Bize Ulaşın")
const ctaButtonLink = computed(() => faqData.value?.ctaButtonLink || "/iletisim")

// Sadece aktif FAQ'ları filtrele
const activeFaqs = computed(() => {
  if (!faqData.value?.faqs) return []
  return faqData.value.faqs.filter(faq => faq.isActive)
})

// Görselleri pozisyona göre filtrele
const primaryImage = computed(() => {
  if (!faqData.value?.images) return null
  return faqData.value.images.find(img => img.position === 'primary')
})

const secondaryImage = computed(() => {
  if (!faqData.value?.images) return null
  return faqData.value.images.find(img => img.position === 'secondary')
})

// Stats kartlarını pozisyona göre filtrele
const topRightCard = computed(() => {
  if (!faqData.value?.statsCards) return null
  return faqData.value.statsCards.find(card => card.position === 'top-right')
})

const bottomLeftCard = computed(() => {
  if (!faqData.value?.statsCards) return null
  return faqData.value.statsCards.find(card => card.position === 'bottom-left')
})

// Varsayılan FAQ'lar (veri yoksa gösterilecek)
const defaultFaqs = ref([
  {
    question: "Nakliye öncesi eşyalarımı nasıl hazırlamalıyım?",
    answer: "Eşyalarınızın güvenli taşınması için ön hazırlık çok önemlidir. Kırılacak eşyalarınızı özel ambalaj malzemeleriyle paketlemenizi, elektronik eşyalarınızın kablolarını sarmanızı ve özel eşyalarınızı ayrı bir yerde tutmanızı öneririz.",
    details: [
      "Kırılabilir eşyalar için köpük rulo ve özel karton kutular",
      "Elektronik cihazların orijinal kutularını saklayın",
      "Değerli evraklarınızı yanınıza alın",
      "Buzdolabı ve derin dondurucuyu taşımadan 24 saat önce boşaltın"
    ]
  },
  {
    question: "Taşıma ücreti nasıl hesaplanır?",
    answer: "Nakliye ücreti mesafe, eşya hacmi, kat sayısı, asansör varlığı ve özel taşıma gerektiren eşyalar gibi faktörlere göre belirlenir. Ücretsiz keşif hizmetimizle net fiyat alabilirsiniz.",
    details: [
      "Şehir içi ve şehirlerarası farklı tarifeler",
      "50 km'ye kadar ücretsiz keşif",
      "Sabit fiyat garantisi",
      "Özel eşyalar için ek ücret yok"
    ]
  },
  {
    question: "Sigorta kapsamı nedir?",
    answer: "Tüm taşıma işlemlerimiz %100 sigortalıdır. Eşyalarınızın değerine uygun olarak eksper raporu hazırlanır ve olası hasar durumunda ekspertiz heyeti tarafından değerlendirme yapılır.",
    details: [
      "Full kasko sigorta kapsamı",
      "Eşya değerinin %100'üne kadar teminat",
      "Hasar durumunda 7 gün içinde tazminat",
      "Uluslararası standartlarda paketleme garantisi"
    ]
  }
])
</script>

<style scoped>
/* Mikro animasyonlar */
button {
  transition: color 0.2s ease;
}

button:hover {
  color: #3b5d50;
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

/* Okunabilirlik için */
.prose ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
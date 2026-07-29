<template>
  <section class="we-help-section py-16 md:py-20 lg:py-28">
    <div class="container mx-auto px-4">
      
      <div v-if="isLoading" class="text-center text-xl text-gray-500 py-10">
        <p>Bölüm verileri yükleniyor...</p>
      </div>
      
      <div v-else-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>{{ fetchError }}</p>
      </div>
      
      <div v-else-if="weHelpData" class="flex flex-col lg:flex-row justify-between gap-12">
        <div class="lg:w-7/12 mb-12 lg:mb-0">
          <div class="imgs-grid relative">
            <!-- Grid 1 - Büyük resim (sol üst) -->
            <div 
              v-if="getImageByPosition('grid-1')" 
              class="grid grid-1 absolute w-[66.666%] h-[77.777%]"
            >
              <img
                :src="getImageByPosition('grid-1').imagePath"
                :alt="getImageByPosition('grid-1').altText"
                class="rounded-2xl w-full h-full object-cover shadow-lg"
                loading="lazy"
              />
            </div>

            <!-- Grid 2 - Küçük resim (sağ üst) -->
            <div 
              v-if="getImageByPosition('grid-2')"
              class="grid grid-2 absolute top-0 right-0 w-[33.333%] h-[18.518%] pl-5"
            >
              <img
                :src="getImageByPosition('grid-2').imagePath"
                :alt="getImageByPosition('grid-2').altText"
                class="rounded-2xl w-full h-full object-cover shadow-lg"
                loading="lazy"
              />
            </div>

            <!-- Grid 3 - Orta resim (sağ alt) -->
            <div 
              v-if="getImageByPosition('grid-3')"
              class="grid grid-3 absolute bottom-0 left-[48.148%] w-[59.259%] h-[67.777%] pt-5"
            >
              <img
                :src="getImageByPosition('grid-3').imagePath"
                :alt="getImageByPosition('grid-3').altText"
                class="rounded-2xl w-full h-full object-cover shadow-lg"
                loading="lazy"
              />
            </div>

            <!-- Varsayılan görseller (veri yoksa) -->
            <div v-if="imagesList.length === 0">
              <div class="grid grid-1 absolute w-[66.666%] h-[77.777%]">
                <img
                  src="~/assets/images/img-grid-1.jpg"
                  alt="Evenakliye.com profesyonel eşya paketleme görseli"
                  class="rounded-2xl w-full h-full object-cover shadow-lg"
                />
              </div>

              <div
                class="grid grid-2 absolute top-0 right-0 w-[33.333%] h-[18.518%] pl-5"
              >
                <img
                  src="~/assets/images/img-grid-2.jpg"
                  alt="Evenakliye.com ambalaj detayı"
                  class="rounded-2xl w-full h-full object-cover shadow-lg"
                />
              </div>

              <div
                class="grid grid-3 absolute bottom-0 left-[48.148%] w-[59.259%] h-[67.777%] pt-5"
              >
                <img
                  src="~/assets/images/img-grid-3.jpg"
                  alt="Evenakliye.com mobilya taşıma süreci"
                  class="rounded-2xl w-full h-full object-cover shadow-lg"
                />
              </div>
            </div>

            <div
              class="hidden lg:block absolute w-64 h-56 bg-[url('~/assets/images/dots-green.svg')] bg-contain bg-no-repeat -translate-x-[40%] -translate-y-[40%] -z-10 opacity-75"
            ></div>
          </div>
        </div>

        <div class="lg:w-5/12 lg:pl-12 text-center lg:text-left">
          <h2
            class="section-title text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            <span v-html="formattedMainTitle"></span>
          </h2>
          
          <p class="text-gray-600 text-lg leading-relaxed mb-6">
            {{ description }}
          </p>

          <ul v-if="featuresList.length > 0" class="custom-list space-y-4 mb-8 text-lg text-gray-700">
            <li 
              v-for="(feature, index) in featuresList" 
              :key="feature.id || index"
              class="flex items-start justify-center lg:justify-start"
            >
              <span class="text-secondary mr-3 mt-1 text-xl font-bold">•</span>
              <span>{{ feature.text }}</span>
            </li>
          </ul>

          <!-- Varsayılan özellikler (veri yoksa) -->
          <ul v-else class="custom-list space-y-4 mb-8 text-lg text-gray-700">
            <li class="flex items-start justify-center lg:justify-start">
              <span class="text-secondary mr-3 mt-1 text-xl font-bold">•</span>
              <span>Ücretsiz Ekspertiz ve Detaylı Planlama</span>
            </li>
            <li class="flex items-start justify-center lg:justify-start">
              <span class="text-secondary mr-3 mt-1 text-xl font-bold">•</span>
              <span>Profesyonel Paketleme ve Özel Ambalajlama</span>
            </li>
            <li class="flex items-start justify-center lg:justify-start">
              <span class="text-secondary mr-3 mt-1 text-xl font-bold">•</span>
              <span>Mobilya Demontaj ve Montaj Hizmetleri</span>
            </li>
            <li class="flex items-start justify-center lg:justify-start">
              <span class="text-secondary mr-3 mt-1 text-xl font-bold">•</span>
              <span>Asansörlü Nakliyat İmkanı (Gerekliyse)</span>
            </li>
            <li class="flex items-start justify-center lg:justify-start">
              <span class="text-secondary mr-3 mt-1 text-xl font-bold">•</span>
              <span>Sigortalı ve Takip Edilebilir Taşımacılık</span>
            </li>
          </ul>

          <NuxtLink 
            v-if="buttonLink && buttonText"
            :to="buttonLink" 
            class="btn btn-primary inline-block"
          >
            {{ buttonText }}
          </NuxtLink>
          
          <!-- Varsayılan buton (veri yoksa) -->
          <NuxtLink 
            v-else
            to="/hizmetlerimiz" 
            class="btn btn-primary inline-block"
          >
            Hizmetlerimizi İnceleyin
          </NuxtLink>
        </div>
      </div>
      
      <div v-else class="text-center text-xl text-yellow-600 py-10">
        <p>Bölüm verisi bulunamadı. Lütfen yönetim panelinden (Admin) bu bölüm için bir kayıt oluşturun.</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// API'den gelen veriyi tutacak ref'ler
const weHelpData = ref(null)
const featuresList = ref([])
const imagesList = ref([])
const isLoading = ref(true)
const fetchError = ref(null)

/**
 * API'den "We Help Section" verilerini çeker
 */
const loadWeHelpSection = async () => {
  isLoading.value = true
  fetchError.value = null
  
  try {
    const { data, error } = await useFetch('/api/we-help-section')
    const record = data.value?.data

    if (error.value) {
      fetchError.value = 'Veriler yüklenirken bir sorun oluştu.'
      console.error('Veri çekme hatası:', error.value)
    } else if (record && record.id) {
      weHelpData.value = record
      featuresList.value = record.features || []
      imagesList.value = record.images || []
    } else {
      fetchError.value = data.value?.error || 'Bölüm verisi veritabanında bulunamadı.'
      weHelpData.value = null
      featuresList.value = []
      imagesList.value = []
    }
  } catch (err) {
    fetchError.value = 'Sunucuya erişilemedi.'
    console.error('Fetch işlemi sırasında beklenmeyen bir hata:', err)
  } finally {
    isLoading.value = false
  }
}

// Sayfa yüklendiğinde verileri çek
loadWeHelpSection()

// Computed property'ler
const mainTitle = computed(() => weHelpData.value?.mainTitle || "Evenakliye.com: Taşınma Sürecinizi Kolaylaştırıyoruz")
const description = computed(() => weHelpData.value?.description || "Evenakliye.com olarak biliyoruz ki, taşınma sadece eşyaların bir yerden başka bir yere nakli değil, aynı zamanda yeni bir başlangıçtır. Bu süreci sizin için mümkün olduğunca stressiz, hızlı ve güvenli hale getirmek için buradayız. Modern yöntemlerimiz ve uzman ekibimizle, taşınmanın her adımında yanınızdayız.")
const buttonText = computed(() => weHelpData.value?.buttonText || "Hizmetlerimizi İnceleyin")
const buttonLink = computed(() => weHelpData.value?.buttonLink || "/hizmetlerimiz")

// Formatlanmış başlık için computed property
const formattedMainTitle = computed(() => {
  const title = mainTitle.value
  return sanitizeHtml(title.replace(/\n/g, '<br class="block lg:hidden" />'))
})

/**
 * Pozisyona göre görseli bulur
 */
const getImageByPosition = (position) => {
  return imagesList.value.find(image => image.position === position)
}
</script>

<style scoped>
/* Görsel Grid Alanının Oranı */
.imgs-grid {
  aspect-ratio: 1/1; /* Kare oranını korur */
  position: relative;
}

/* Grid içindeki görsellerin konumu ve gölgesi */
.grid {
  position: absolute;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* Bölüm Başlığı ve Alt Çizgi */
.section-title {
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: #f9bf29;
  border-radius: 2px;
}

/* LG ve üzeri ekranlarda sol hizalama */
@media (min-width: 1024px) {
  .section-title::after {
    left: 0;
    transform: translateX(0);
  }
}

/* Mobilde görsel grid yüksekliği */
@media (max-width: 1023px) {
  .imgs-grid {
    height: 300px;
    margin-bottom: 2rem;
  }
}

/* Özel liste madde işareti rengi */
.custom-list li span:first-child {
  color: #f9bf29;
}

/* Buton stilleri */
.btn {
  display: inline-block;
  padding: 12px 32px;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2563eb;
}

.btn-primary {
  background-color: #3b82f6;
}

.btn-primary:hover {
  background-color: #2563eb;
}
</style>
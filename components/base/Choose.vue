<script setup>
// **Düzeltme 1: computed'ı import etmeliyiz.**
import { ref, onMounted, computed } from 'vue'

// API'den gelen veriyi tutacak ref'ler
const whyChooseUsData = ref(null)
const featuresList = ref([])
const isLoading = ref(true)
const fetchError = ref(null)

/**
 * API'den "Neden Bizi Seçmelisiniz" verilerini çeker.
 * Nuxt 3'te, bu fonskiyonu `onMounted` yerine doğrudan `setup` içinde
 * `await` ile çağırmak, SEO için daha iyi sonuçlar verir (server-side rendering).
 */
const loadWhyChooseUs = async () => {
  isLoading.value = true
  fetchError.value = null
  
  try {
    // API rotasından veriyi çekiyoruz
    // Nuxt 3'te, bu kullanım sunucu tarafında çalışacaktır (SSR)
    const { data, error } = await useFetch('/api/why-choose-us')
    const record = data.value?.data

    if (error.value) {
      fetchError.value = 'Veriler yüklenirken bir sorun oluştu.'
      console.error('Veri çekme hatası:', error.value)
    } else if (record && record.id) { // Başarılı veri ve geçerli ID kontrolü
      whyChooseUsData.value = record
      featuresList.value = record.features || []
    } else {
      // API'den success:false, error: 'kayıt bulunamadı' gibi bir yanıt gelirse
      fetchError.value = data.value?.error || 'Bölüm verisi veritabanında bulunamadı.'
      whyChooseUsData.value = null
      featuresList.value = []
    }
  } catch (err) {
    fetchError.value = 'Sunucuya erişilemedi.'
    console.error('Fetch işlemi sırasında beklenmeyen bir hata:', err)
  } finally {
    isLoading.value = false
  }
}

// **Düzeltme 2: Nuxt 3'te, verinin daha hızlı gelmesi için `onMounted` yerine
// bu fonksiyonu doğrudan `setup` bloğunda çalıştırıyoruz (üst düzey await'i taklit eder).**
// Alternatif olarak, `setup` dışında `const { data } = await useFetch(...)` kullanabilirsiniz.
loadWhyChooseUs()

// Veri gelene kadar veya hata durumunda boş kalacak/gösterilecek hesaplanmış alanlar
const mainTitle = computed(() => whyChooseUsData.value?.mainTitle || "Yükleniyor...")
const shortDescription = computed(() => whyChooseUsData.value?.shortDescription || "Veriler henüz yüklenmedi veya mevcut değil.")
const closingStatement = computed(() => whyChooseUsData.value?.closingStatement || "")
const mainImage = computed(() => whyChooseUsData.value?.mainImage || "")

</script>

<template>
  <section class="why-choose-section py-16 md:py-20 lg:py-28">
    <div class="container mx-auto px-4">
      
      <div v-if="isLoading" class="text-center text-xl text-gray-500 py-10">
        <p>Bölüm verileri yükleniyor...</p>
      </div>
      
      <div v-else-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>{{ fetchError }}</p>
      </div>
      
      <div v-else-if="whyChooseUsData" class="flex flex-col lg:flex-row justify-between gap-12">
        <div class="lg:w-6/12 text-center lg:text-left relative">
          <div class="absolute -top-4 -left-4 w-16 h-16 border-l-4 border-t-4 border-[#3b5d50]/30"></div>
          
          <h2
            class="section-title text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            v-html="sanitizeHtml(mainTitle.replace(/\n/g, '<br class=\'block lg:hidden\' />'))"
            >
          </h2>
          
          <p class="text-gray-600 text-lg leading-relaxed mb-10">
            {{ shortDescription }}
          </p>
          
          <div class="absolute -bottom-4 -right-4 w-12 h-12 border-r-4 border-b-4 border-[#dce5e4]/40"></div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 my-8">
            <div class="feature" v-for="(feature, index) in featuresList" :key="feature.id || index">
              <div class="icon mb-4">
                <img
                  :src="feature.iconPath"
                  :alt="feature.title + ' İkonu'"
                  class="w-12 h-12 mx-auto lg:mx-0"
                  loading="lazy"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-700 mb-3">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
          
          <p class="text-gray-700 text-lg leading-relaxed mt-6 italic">
            {{ closingStatement }}
          </p>
        </div>

        <div class="lg:w-5/12 flex justify-center lg:justify-end items-center">
          <div class="img-wrap relative max-w-sm lg:max-w-full">
            <img
              :src="mainImage"
              alt="Evenakliye.com neden bizi seçmelisiniz görseli"
              class="img-fluid rounded-2xl w-full h-auto object-cover shadow-xl"
              loading="lazy"
            />
            <div
              class="hidden lg:block absolute w-64 h-56 bg-[url('/images/dots-yellow.svg')] bg-contain bg-no-repeat -translate-x-[40%] -translate-y-[350%] -z-10 opacity-75"
            ></div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center text-xl text-yellow-600 py-10">
        <p>Bölüm verisi bulunamadı. Lütfen yönetim panelinden (Admin) bu bölüm için bir kayıt oluşturun.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Mevcut stil kuralları */
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

@media (min-width: 1024px) {
  .section-title::after {
    left: 0;
    transform: translateX(0);
  }
}
</style>
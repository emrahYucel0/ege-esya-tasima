<script setup>
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (bkz. components/base/Services.vue'daki aynı düzeltmenin gerekçesi — eski
// "tanımla ve await etmeden çağır" deseni sunucu/istemci render'larının
// birbirini tutmamasına, Vue hydration mismatch'ine ve istemci tarafında
// gereksiz bir ikinci isteğe yol açıyordu).
const { data: whyChooseUsResponse, error: fetchError } = await useFetch('/api/why-choose-us')
const whyChooseUsData = computed(() => whyChooseUsResponse.value?.data ?? null)
const featuresList = computed(() => whyChooseUsData.value?.features || [])

// Veri gelene kadar veya hata durumunda boş kalacak/gösterilecek hesaplanmış alanlar
const mainTitle = computed(() => whyChooseUsData.value?.mainTitle || "Yükleniyor...")
const shortDescription = computed(() => whyChooseUsData.value?.shortDescription || "Veriler henüz yüklenmedi veya mevcut değil.")
const closingStatement = computed(() => whyChooseUsData.value?.closingStatement || "")
const mainImage = computed(() => whyChooseUsData.value?.mainImage || "")

</script>

<template>
  <section class="why-choose-section py-16 md:py-20 lg:py-28">
    <div class="container mx-auto px-4">
      
      <div v-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>Bölüm verileri yüklenirken bir sorun oluştu.</p>
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
              alt="Neden bizi seçmelisiniz görseli"
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
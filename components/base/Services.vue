<script setup>
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (bkz. Choose.vue'daki aynı düzeltmenin gerekçesi — tanımla ve await
// etmeden çağır deseni Vue hydration mismatch'ine yol açıyordu).
const { data: servicesResponse, error: fetchError } = await useFetch('/api/services')
const servicesData = computed(() => servicesResponse.value?.data ?? null)
const servicesList = computed(() => servicesData.value?.services || [])
const statisticsList = computed(() => servicesData.value?.statistics || [])

const mainTitle = computed(() => servicesData.value?.mainTitle || 'Nakliyat Hizmetlerimiz')
const description = computed(
  () =>
    servicesData.value?.description ||
    'Evden eve nakliyat sürecinizde en sık ihtiyaç duyulan üç temel hizmetimiz — ihtiyacınıza göre tek başına veya birlikte talep edebilirsiniz.'
)
const buttonText = computed(() => servicesData.value?.buttonText || 'Ücretsiz Teklif Al')
const buttonLink = computed(() => servicesData.value?.buttonLink || '/iletisim')

// Varsayılan servisler (API'den hiç veri gelmezse kullanılacak) — evden eve
// nakliyat işine en çok bağlı 3 hizmet, canlı veriyle birebir aynı seçim.
const defaultServices = [
  {
    imagePath: '/images/ev-nakliye.png',
    title: 'Evden Eve Nakliyat',
    subtitle: 'Şehir İçi & Şehirlerarası',
    description: 'Eşyalarınız tek tek paketlenir, sigortalı ve kayıt altında yeni adresinize taşınır.',
  },
  {
    imagePath: '/images/ev-nakliye.png',
    title: 'Asansörlü Nakliyat',
    subtitle: 'Yüksek Katlarda Hızlı ve Güvenli Çözüm',
    description: 'Cephe asansörümüzle eşyalarınızı bina duvarlarına zarar vermeden indirip biniyoruz.',
  },
  {
    imagePath: '/images/ev-nakliye.png',
    title: 'Parça Eşya Taşıma',
    subtitle: 'Tek Parça, Uygun Fiyat',
    description: 'Tüm ev taşıma maliyetine katlanmadan, tek parça eşyanız için hızlı bir çözüm.',
  },
]

const displayServices = computed(() => (servicesList.value.length > 0 ? servicesList.value : defaultServices))

// Giriş animasyonu: başlık/açıklama bir kez, kartlar staggered olarak scroll'da
// belirir (bkz. composables/useScrollReveal.ts — tüm ana sayfa bölümlerinin
// paylaştığı tek animasyon dili).
const headerRef = ref(null)
const cardsRef = ref(null)
useScrollReveal(headerRef)
useScrollReveal(cardsRef, { targets: '.service-card', stagger: 0.15 })
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4">
      <div v-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>Servis verileri yüklenirken bir sorun oluştu.</p>
      </div>

      <div ref="headerRef" class="text-center max-w-2xl mx-auto mb-14">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ mainTitle }}</h2>
        <p class="text-gray-600 text-lg leading-relaxed">{{ description }}</p>
      </div>

      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        <div
          v-for="(service, index) in displayServices"
          :key="service.id || index"
          class="service-card card-hover bg-white rounded-xl shadow-md p-8 text-center border border-gray-100"
        >
          <img
            :src="service.imagePath"
            :alt="service.title"
            class="w-full h-40 object-contain mb-6"
            loading="lazy"
          />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ service.title }}</h3>
          <p class="text-primary font-semibold mb-3">{{ service.subtitle }}</p>
          <p v-if="service.description" class="text-gray-600 leading-relaxed">{{ service.description }}</p>
        </div>
      </div>

      <div class="text-center mb-16">
        <NuxtLink :to="buttonLink" class="btn btn-primary">
          {{ buttonText }}
        </NuxtLink>
      </div>

      <!-- İstatistikler -->
      <div
        v-if="statisticsList.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100"
      >
        <div v-for="(statistic, index) in statisticsList" :key="index" class="text-center">
          <p class="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{{ statistic.value }}</p>
          <p class="text-gray-500 text-sm">{{ statistic.label1 }} {{ statistic.label2 }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

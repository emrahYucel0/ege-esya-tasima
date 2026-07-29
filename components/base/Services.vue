<script setup>
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (bkz. Choose.vue'daki aynı düzeltmenin gerekçesi — tanımla ve await
// etmeden çağır deseni Vue hydration mismatch'ine yol açıyordu).
// Güven bandı (base/TrustBar.vue) aynı endpoint'i kullanıyor; ortak `key`
// sayesinde Nuxt isteği tek sefer yapıp iki bileşende paylaşıyor.
const { data: servicesResponse, error: fetchError } = await useFetch('/api/services', {
  key: 'services-section',
})
const servicesData = computed(() => servicesResponse.value?.data ?? null)
const servicesList = computed(() => servicesData.value?.services || [])

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

// Giriş animasyonu: bölümdeki [data-reveal] taşıyan öğeler scroll'a girince
// belirir; [data-reveal-group] içindeki kartlar birlikte tetiklenip sırayla
// (stagger) gelir. Tek animasyon dili için bkz. composables/useReveal.ts.
const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="py-16 md:py-24">
    <div class="container mx-auto px-4">
      <div v-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>Servis verileri yüklenirken bir sorun oluştu.</p>
      </div>

      <div class="text-center max-w-2xl mx-auto mb-14">
        <h2 data-reveal class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ mainTitle }}</h2>
        <p data-reveal class="text-gray-600 text-lg leading-relaxed">{{ description }}</p>
      </div>

      <div data-reveal-group class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        <div
          v-for="(service, index) in displayServices"
          :key="service.id || index"
          data-reveal
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

      <div data-reveal class="text-center mb-16">
        <NuxtLink :to="buttonLink" class="btn btn-primary">
          {{ buttonText }}
        </NuxtLink>
      </div>

      <!-- NOT: İstatistikler artık burada değil. Bölümün DİBİNE gömülü
           oldukları için ziyaretçi firmanın büyüklüğünü ancak sayfanın
           ortasında öğreniyordu; Hero'nun hemen altındaki güven bandına
           taşındılar (bkz. components/base/TrustBar.vue). -->
    </div>
  </section>
</template>

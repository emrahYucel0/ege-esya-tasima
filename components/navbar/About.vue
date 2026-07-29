<script setup>
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (bkz. components/base/Services.vue'daki aynı düzeltmenin gerekçesi — eski
// "tanımla ve await etmeden çağır" deseni Vue hydration mismatch'ine ve
// istemci tarafında gereksiz bir ikinci isteğe yol açıyordu).
const { data: aboutResponse, error: fetchError } = await useFetch('/api/about-section')
const aboutData = computed(() => {
  const record = aboutResponse.value?.data
  return record && (record.id || record.sectionName) ? record : null
})
const servicesList = computed(() => aboutData.value?.services || [])
const statsList = computed(() => aboutData.value?.stats || [])

// Not: paylaşılan bir bölüm bileşeni olduğu için burada useHead çağrılmaz —
// sayfa meta verisi usePageSeo composable'ı ile pages/hakkimizda.vue
// seviyesinde yönetiliyor.

// Veri gelene kadar veya hata durumunda boş kalacak/gösterilecek hesaplanmış alanlar
const mainTitle = computed(() => aboutData.value?.mainTitle || "Nakliyat Sektörünün Güvenilir Adresi")
const description1 = computed(() => aboutData.value?.description1 || "2008 yılından bu yana İstanbul'un tüm ilçeleri ve çevre illerde (Kocaeli, Sakarya, Tekirdağ, Bursa) profesyonel evden eve nakliyat hizmeti sunmaktayız. Eşyalarınızı kendi eşyamız gibi özenle taşıyor, her detayı önceden planlıyoruz.")
const description2 = computed(() => aboutData.value?.description2 || "Alanında uzman kadromuz ve son teknoloji ekipmanlarımızla; apartman dairesi, villa, ofis, fabrika taşımacılığı gibi her türlü nakliye işlemini sigortalı olarak gerçekleştiriyoruz. Müşteri memnuniyetini ön planda tutarak, sektörde kalitemizle fark yaratıyoruz.")
const description3 = computed(() => aboutData.value?.description3 || "Nakliye öncesi ücretsiz keşif hizmetimizle eşyalarınızın en güvenli şekilde nasıl taşınacağını planlıyor, şeffaf fiyat politikamızla sürpriz maliyetlerin önüne geçiyoruz.")
const teamImage = computed(() => aboutData.value?.teamImage || "~/assets/images/team.jpg")
const teamImageAlt = computed(() => aboutData.value?.teamImageAlt || "Profesyonel Nakliyat Ekibimiz İş Başında")
const historyTitle = computed(() => aboutData.value?.historyTitle || "15 Yıllık Deneyimle Geleceğe Taşıyoruz")
const historyText1 = computed(() => aboutData.value?.historyText1 || "Küçük bir ekip ve 2 araçla Pendik'te başladığımız bu yolculukta, bugün 50'den fazla profesyonel çalışan ve 20 araçlık modern filomuzla hizmet veriyoruz. Her geçen yıl büyüyerek İstanbul'un en çok tercih edilen nakliyat firmalarından biri olduk.")
const historyText2 = computed(() => aboutData.value?.historyText2 || "2015 yılında şehirlerarası nakliyat, 2018'de ofis taşıma departmanlarımızı açarak hizmet yelpazemizi genişlettik. 2020'de pandemi döneminde özel hijyen protokolleri geliştirerek sektörde öncü olduk.")
const historyText3 = computed(() => aboutData.value?.historyText3 || "Bugün yılda ortalama 1.200 taşıma işlemi gerçekleştiriyor, müşteri memnuniyetinde %97 oranla sektör liderliğimizi sürdürüyoruz.")

</script>

<template>
  <section class="about-section py-16">
    <div class="container mx-auto px-4">
      
      <!-- Hata durumu -->
      <div v-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>Veriler yüklenirken bir sorun oluştu.</p>
      </div>

      <!-- Veri mevcut durumu -->
      <div v-else>
        <!-- Başlık ve Tanıtım -->
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ mainTitle }}</h1>
          <div class="max-w-8xl mx-auto text-lg text-gray-600 space-y-4">
            <p>{{ description1 }}</p>
            <p>{{ description2 }}</p>
            <p>{{ description3 }}</p>
          </div>
        </div>

        <!-- Hizmet Detayları -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div 
            v-for="(service, index) in servicesList" 
            :key="service.id || index" 
            class="service-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="icon mb-4" v-if="service.iconPath">
              <img 
                :src="service.iconPath" 
                :alt="service.iconAlt || service.title" 
                class="w-12 h-12 mx-auto"
                loading="lazy"
              >
            </div>
            <h3 class="text-xl font-semibold text-center mb-3">{{ service.title }}</h3>
            <p class="text-gray-600 text-center">
              {{ service.description }}
            </p>
          </div>
          
          <!-- Varsayılan hizmetler (veri yoksa) -->
          <div v-if="servicesList.length === 0" class="md:col-span-3 text-center text-gray-500 py-8">
            <p>Hizmet detayları henüz eklenmemiş.</p>
          </div>
        </div>

        <!-- Full-width Resim -->
        <div class="mb-16 rounded-xl overflow-hidden shadow-lg" v-if="teamImage">
          <img 
            :src="teamImage" 
            :alt="teamImageAlt"
            class="w-full h-80 object-cover"
            loading="lazy"
          >
        </div>

        <!-- Şirket Tarihçesi -->
        <div class="history-section bg-white p-8 rounded-xl shadow-sm mb-16" v-if="historyTitle || historyText1">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ historyTitle }}</h2>
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p class="text-gray-600 mb-4" v-if="historyText1">{{ historyText1 }}</p>
              <p class="text-gray-600 mb-4" v-if="historyText2">{{ historyText2 }}</p>
              <p class="text-gray-600" v-if="historyText3">{{ historyText3 }}</p>
            </div>
            <div class="stats-grid grid grid-cols-2 gap-4">
              <div 
                v-for="(stat, index) in statsList" 
                :key="stat.id || index" 
                class="stat-item bg-gray-50 p-4 rounded-lg border-l-4 border-primary"
              >
                <div class="text-3xl font-bold text-primary mb-1">{{ stat.value }}</div>
                <div class="text-gray-600">{{ stat.label }}</div>
              </div>
              
              <!-- Varsayılan istatistikler (veri yoksa) -->
              <div v-if="statsList.length === 0" class="col-span-2 text-center text-gray-500 py-4">
                <p>İstatistikler henüz eklenmemiş.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Veri bulunamadı durumu -->
        <div v-if="!aboutData && !fetchError" class="text-center text-xl text-yellow-600 py-10">
          <p>Hakkımızda verisi bulunamadı. Lütfen yönetim panelinden bu bölüm için bir kayıt oluşturun.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* .about-section {
  background-image: url('~/assets/images/texture-bg.png');
  background-attachment: fixed;
  background-size: cover;
} */

.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.stat-item {
  transition: transform 0.2s ease;
}

.stat-item:hover {
  transform: scale(1.05);
}

.border-primary {
  border-color: #3b82f6; /* Primary color */
}
</style>
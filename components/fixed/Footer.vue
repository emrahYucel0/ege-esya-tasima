<template>
  <footer class="bg-white border-t border-gray-100 relative overflow-visible">
    <div class="container mx-auto px-4 relative overflow-visible">

      <!-- Sabit Resim (sağ üst) -->
      <div class="absolute top-0 right-0 z-50 translate-x-8 -translate-y-8 lg:translate-x-16 lg:-translate-y-16 pointer-events-none">
        <img src="/images/sofa.png" alt="Sofa" class="w-40 md:w-56 lg:w-72 h-auto" />
      </div>

      <!-- Ana içerik (resmin altından başlar) -->
      <div class="relative z-0 pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <!-- Sol Sütun: Marka, iletişim, sosyal medya -->
          <div class="lg:col-span-4">
            <div class="mb-4">
              <NuxtLink to="/" class="text-3xl font-bold text-gray-800">
                {{ brandName }}<span class="text-primary">.</span>
              </NuxtLink>
            </div>
            <p class="text-gray-500 mb-6 leading-relaxed">
              {{ siteSettings?.footerText || 'Kaliteli mobilya ve dekorasyon ürünleriyle yaşam alanlarınızı güzelleştiriyoruz.' }}
            </p>
            <p v-if="siteSettings?.workingHours" class="text-gray-500 mb-6 leading-relaxed flex items-start">
              <svg class="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ siteSettings.workingHours }}</span>
            </p>

            <!-- İletişim Bilgileri (API'den) -->
            <div v-if="footerData" class="space-y-2 text-gray-600 mb-4">
              <div v-if="footerData.address" class="flex items-start">
                <svg class="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ footerData.address }}</span>
              </div>
              <div v-if="footerData.phone" class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a :href="'tel:' + footerData.phone" class="hover:text-primary">{{ footerData.phone }}</a>
              </div>
              <div v-if="footerData.email" class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a :href="'mailto:' + footerData.email" class="hover:text-primary">{{ footerData.email }}</a>
              </div>
            </div>

            <!-- Sosyal Medya İkonları (API'den) -->
            <div class="flex space-x-3">
              <a
                v-for="social in validSocialLinks"
                :key="social.id"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-gray-600 transition-colors"
                :aria-label="`Bizi ${social.name || 'sosyal medya'} üzerinden takip edin`"
              >
                <base-social-icon :name="social.name" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Sağ Sütun: Link Listeleri (3 sütun) - API'den gelen veriler -->
          <div class="lg:col-span-8">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <!-- Menü (quickLinks) -->
              <div>
                <h3 class="font-semibold text-gray-800 mb-4">Menü</h3>
                <ul class="space-y-3">
                  <li v-for="link in footerData?.quickLinks" :key="link.id">
                    <NuxtLink :to="link.url" class="text-gray-500 hover:text-primary transition">
                      {{ link.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <!-- Bölgelerimiz (regionLinks) -->
              <div>
                <h3 class="font-semibold text-gray-800 mb-4">Bölgelerimiz</h3>
                <ul class="space-y-3">
                  <li v-for="link in footerData?.regionLinks" :key="link.id">
                    <NuxtLink :to="link.url" class="text-gray-500 hover:text-primary transition">
                      {{ link.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <!-- Diğer Hizmetler (blogLinks) -->
              <div>
                <h3 class="font-semibold text-gray-800 mb-4">Diğer Hizmetler</h3>
                <ul class="space-y-3">
                  <li v-for="link in footerData?.blogLinks" :key="link.id">
                    <NuxtLink :to="link.url" class="text-gray-500 hover:text-primary transition">
                      {{ link.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Alt Bilgi (copyright & yasal linkler) -->
        <div class="border-t border-gray-200 pt-6 mt-6 text-sm">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-500 text-center md:text-left">
              {{ footerData?.copyright || siteSettings?.copyrightText || `© ${new Date().getFullYear()} ${brandName}. Tüm Hakları Saklıdır.` }}
            </p>
            <div class="flex flex-wrap justify-center gap-4 md:gap-6">
              <NuxtLink to="/gizlilik-politikasi" class="text-gray-500 hover:text-primary transition">
                Gizlilik Politikası
              </NuxtLink>
              <NuxtLink to="/kullanim-sartlari" class="text-gray-500 hover:text-primary transition">
                Kullanım Şartları
              </NuxtLink>
              <NuxtLink to="/cerez-politikasi" class="text-gray-500 hover:text-primary transition">
                Çerez Politikası
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
const { data, error } = await useFetch('/api/footer')

const footerData = ref(null)

if (data.value?.data) {
  footerData.value = data.value.data
}

if (error.value) {
  console.error('Footer verisi çekilirken hata oluştu:', error.value)
}

const { brandName, settings: siteSettings } = await useSiteSettings()

// Admin bir sosyal medya satırı ekleyip url'siz bırakabiliyor — url'siz kayıt
// gerçek bir bağlantı değil, boş href üretiyordu (bkz. components/fixed/Navbar.vue
// içindeki aynı düzeltme). Sadece gerçek url'si olan kayıtlar render edilir.
const validSocialLinks = computed(
  () => footerData.value?.socialLinks?.filter((social) => social.url) || []
)
</script>

<style scoped>
.text-primary {
  color: #3b82f6;
}
.hover\:text-primary:hover {
  color: #3b82f6;
}
.bg-primary {
  background-color: #3b82f6;
}
.hover\:bg-primary:hover {
  background-color: #3b82f6;
}
.overflow-visible {
  overflow: visible !important;
}
</style>
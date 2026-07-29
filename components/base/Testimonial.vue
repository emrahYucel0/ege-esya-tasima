<template>
  <section 
    class="relative py-16 md:py-24 overflow-hidden"
    :style="{
      backgroundColor: data?.backgroundColor,
      color: data?.textColor
    }"
  >
    <!-- Koşullu dekoratif elementler -->
    <template v-if="data?.showDecorations">
      <div class="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-secondary/10 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
    </template>
    
    <div class="container mx-auto px-4 relative z-10">
      <!-- Başlık -->
      <div class="text-center mb-12">
        <span 
          v-if="data?.tag"
          class="inline-block text-sm font-semibold text-[#3b5d50] px-3 py-1 rounded-full mb-4"
        >
          {{ data.tag }}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          <template v-if="data?.mainTitle">
            <span v-html="sanitizeHtml(formatTitle(data.mainTitle))"></span>
          </template>
          <template v-else>
            Müşterilerimizin <span class="text-[#3b5d50]">Deneyimleri</span>
          </template>
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          {{ data?.subtitle || 'Evden eve nakliyat sürecimiz hakkında müşterilerimizin gerçek yorumları. Profesyonel hizmet anlayışımızın sonuçlarını keşfedin.' }}
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="relative max-w-6xl mx-auto">
        <!-- Kartlar -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Dinamik Testimonial Kartları -->
          <div 
            v-for="testimonial in sortedTestimonials" 
            :key="testimonial.id"
            class="rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            :class="{
              'border-2 border-[#f9bf29]': testimonial.isFeatured
            }"
          >
            <!-- Testimonial İçeriği -->
            <div class="p-6">
              <div class="flex items-center mb-4">
                <!-- Müşteri Fotoğrafı -->
                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-[#3b5d50]">
                  <img
                    :src="testimonial.customerImage || '/images/testimonial-placeholder.svg'"
                    :alt="testimonial.customerName || 'Müşteri fotoğrafı'"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  >
                </div>
                <div class="ml-4">
                  <!-- Müşteri Adı -->
                  <h4 class="font-bold text-gray-800">{{ testimonial.customerName }}</h4>
                  <!-- Yıldız Değerlendirmesi -->
                  <div class="flex mt-1">
                    <svg 
                      v-for="i in 5" 
                      :key="i" 
                      class="w-4 h-4"
                      :class="i <= testimonial.rating ? 'text-[#f9bf29] fill-current' : 'text-gray-300 fill-current'"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- Yorum Metni -->
              <p class="text-gray-600 mb-4 italic line-clamp-4">"{{ testimonial.comment }}"</p>
              <!-- Tarih ve Konum -->
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{{ formatDate(testimonial.date) }}<span v-if="testimonial.location"> - {{ testimonial.location }}</span></span>
              </div>
            </div>
            <!-- Hizmet Tipi Bilgisi -->
            <div class="bg-[#f8f9fa] px-6 py-4 border-t border-gray-200">
              <div class="flex items-center">
                <!-- Hizmet Tipi İkonu -->
                <div class="w-8 h-8 rounded-full bg-[#3b5d50] flex items-center justify-center mr-3">
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getServiceIcon(testimonial.serviceType, testimonial.serviceTypeIcon)" />
                  </svg>
                </div>
                <!-- Hizmet Tipi Metni -->
                <span class="text-sm font-medium text-gray-700">{{ testimonial.serviceType }}</span>
              </div>
            </div>
          </div>

          <!-- Testimonial verisi yoksa -->
          <base-empty-state
            v-if="!testimonials || testimonials.length === 0"
            class="col-span-3"
            message="Henüz yayınlanmış bir müşteri yorumu bulunmuyor."
          />
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
const { data: testimonialResponse, error } = await useFetch('/api/testimonials-section')
// API artık {success,data} zarfı dönüyor; template'in geri kalanı değişmeden
// çalışabilsin diye burada tek noktadan unwrap ediyoruz.
const data = computed(() => testimonialResponse.value?.data ?? null)

// Hata durumunda fallback
if (error.value) {
  console.error('Testimonial verileri yüklenirken hata oluştu:', error.value)
}

// Testimonials'ı computed property olarak tanımla
const testimonials = computed(() => data.value?.testimonials || [])

// Order'a göre sıralanmış testimonials
const sortedTestimonials = computed(() => {
  return [...testimonials.value].sort((a, b) => a.order - b.order)
})

// ------------------------------------
// YARDIMCI FONKSİYONLAR
// ------------------------------------

// Tarih formatı için yardımcı fonksiyon
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch (error) {
    console.error('Tarih formatlama hatası:', error)
    return dateString
  }
}

// Başlıktaki renkli bölümü işlemek için yardımcı fonksiyon
const formatTitle = (title) => {
  if (!title) return ''
  
  // <span> etiketini bul ve uygun şekilde formatla
  const spanRegex = /<span[^>]*>(.*?)<\/span>/g
  const hasSpan = spanRegex.test(title)
  
  if (hasSpan) {
    return title.replace(spanRegex, '<span class="text-[#3b5d50]">$1</span>')
  }
  
  // Eğer span yoksa, özel işaretleme yapabiliriz
  // Örneğin: **Deneyimleri** şeklinde ise
  const boldRegex = /\*\*(.*?)\*\*/g
  return title.replace(boldRegex, '<span class="text-[#3b5d50]">$1</span>')
}

// Hizmet tipine göre ikon getiren fonksiyon
const getServiceIcon = (serviceType, customIcon) => {
  if (customIcon) {
    // Eğer özel SVG path varsa onu kullan
    return customIcon
  }
  
  // Hizmet tipine göre varsayılan ikonlar
  const icons = {
    'Evden Eve Taşıma': 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    'Şehirlerarası Nakliye': 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    'Ofis Taşıma': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  }
  
  return icons[serviceType] || 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
}

// Resim yükleme hatası durumunda
const handleImageError = (event) => {
  event.target.src = '/images/testimonial-placeholder.svg'
}

// Not: paylaşılan bir bölüm bileşeni olduğu için burada useSeoMeta/useHead
// çağrılmaz — sayfa meta verisi usePageSeo composable'ı ile sayfa
// seviyesinde yönetiliyor (bkz. pages/index.vue).
</script>

<style scoped>
/* Özel animasyonlar */
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

/* Öne çıkan yorum için özel stil */
.border-2 {
  border-width: 2px;
}

/* Varsayılan renk sınıfları */
.bg-primary\/10 {
  background-color: rgba(var(--color-primary), 0.1);
}

.bg-secondary\/10 {
  background-color: rgba(var(--color-secondary), 0.1);
}

/* Skeleton loading için */
.skeleton {
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
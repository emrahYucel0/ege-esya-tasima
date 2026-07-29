<script setup>
const { form, message, showDeleteModal, recordId, save, remove } = useSectionCrud('testimonials-section', 'testimonials-section', {
  mainTitle: '',
  subtitle: '',
  tag: '',
  showDecorations: true,
  backgroundColor: '',
  textColor: '',
  testimonials: [],
});

// Yeni bir testimonial ekler
const addTestimonial = () => {
  form.testimonials.push({
    customerName: '',
    customerImage: '~/assets/images/testimonial.svg',
    rating: 5,
    comment: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    serviceType: '',
    serviceTypeIcon: '',
    isFeatured: false,
    isActive: true,
    order: form.testimonials.length
  })
}

// Bir testimonial'ı listeden siler
const removeTestimonial = (index) => {
  form.testimonials.splice(index, 1)
  form.testimonials.forEach((item, i) => item.order = i)
}

// Yıldız derecelendirmesi için yardımcı fonksiyon
const setRating = (testimonial, rating) => {
  testimonial.rating = rating
}

// İkon seçimi için yardımcı fonksiyon
const selectIcon = (testimonial, iconKey) => {
  const icons = {
    phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    office: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  }
  testimonial.serviceTypeIcon = icons[iconKey] || ''
}

// Hizmet tipine göre otomatik ikon ata
const setServiceType = (testimonial, serviceType) => {
  testimonial.serviceType = serviceType
  switch(serviceType) {
    case 'Evden Eve Taşıma':
      selectIcon(testimonial, 'phone')
      break
    case 'Şehirlerarası Nakliye':
      selectIcon(testimonial, 'location')
      break
    case 'Ofis Taşıma':
      selectIcon(testimonial, 'office')
      break
    default:
      testimonial.serviceTypeIcon = ''
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Müşteri Yorumları Bölümü Yönetimi 💬</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
          <input id="mainTitle" v-model="form.mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Müşterilerimizin Deneyimleri" required />
        </div>

        <div>
          <label for="tag" class="block font-medium text-gray-700 mb-1">Etiket</label>
          <input id="tag" v-model="form.tag" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Müşteri Yorumları" />
        </div>
      </div>

      <div>
        <label for="subtitle" class="block font-medium text-gray-700 mb-1">Alt Başlık</label>
        <textarea id="subtitle" v-model="form.subtitle" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Evden eve nakliyat sürecimiz hakkında müşterilerimizin gerçek yorumları..."></textarea>
      </div>

      <!-- Görünüm Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center">
          <input id="showDecorations" v-model="form.showDecorations" type="checkbox" class="h-4 w-4 text-[#3b5d50] rounded focus:ring-[#3b5d50]" />
          <label for="showDecorations" class="ml-2 text-gray-700">Dekoratif Elementleri Göster</label>
        </div>

        <div>
          <label for="backgroundColor" class="block text-sm font-medium text-gray-600 mb-1">Arkaplan Rengi</label>
          <div class="flex items-center space-x-2">
            <input id="backgroundColor" v-model="form.backgroundColor" type="text" class="flex-1 p-2 border rounded" placeholder="#ffffff" />
            <input type="color" v-model="form.backgroundColor" class="w-10 h-10 cursor-pointer" />
          </div>
        </div>

        <div>
          <label for="textColor" class="block text-sm font-medium text-gray-600 mb-1">Yazı Rengi</label>
          <div class="flex items-center space-x-2">
            <input id="textColor" v-model="form.textColor" type="text" class="flex-1 p-2 border rounded" placeholder="#000000" />
            <input type="color" v-model="form.textColor" class="w-10 h-10 cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Müşteri Yorumları Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Müşteri Yorumları</h2>
      <p class="text-sm text-gray-500">Müşterilerinizin bıraktığı geri bildirimler ve değerlendirmeler</p>

      <div class="space-y-6">
        <div
          v-for="(testimonial, testimonialIndex) in form.testimonials"
          :key="'testimonial-' + (testimonial.id || testimonialIndex)"
          class="p-6 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition duration-150"
          :class="{ 'border-[#f9bf29] bg-yellow-50': testimonial.isFeatured }"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-bold text-xl text-gray-700">Yorum #{{ testimonialIndex + 1 }}</h4>
            <div class="flex items-center space-x-2">
              <!-- Öne Çıkan Yorum Etiketi -->
              <div v-if="testimonial.isFeatured" class="bg-[#f9bf29] text-xs font-bold text-gray-800 px-3 py-1 rounded">
                ÖNE ÇIKAN
              </div>
              <div class="flex items-center">
                <input :id="'active-' + testimonialIndex" v-model="testimonial.isActive" type="checkbox" class="h-4 w-4 text-green-500 rounded mr-2" />
                <label :for="'active-' + testimonialIndex" class="text-sm text-gray-600">Aktif</label>
              </div>
              <button type="button" @click="removeTestimonial(testimonialIndex)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Müşteri Bilgileri -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label :for="'customer-name-' + testimonialIndex" class="block text-sm font-medium text-gray-600">Müşteri Adı *</label>
              <input v-model="testimonial.customerName" :id="'customer-name-' + testimonialIndex" type="text" class="w-full p-2 border rounded" placeholder="Örn: Ahmet K." required />
            </div>
            <div>
              <label :for="'customer-image-' + testimonialIndex" class="block text-sm font-medium text-gray-600">Müşteri Fotoğrafı URL</label>
              <input v-model="testimonial.customerImage" :id="'customer-image-' + testimonialIndex" type="text" class="w-full p-2 border rounded" placeholder="~/assets/images/testimonial.svg" />
            </div>
          </div>

          <!-- Değerlendirme -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">Değerlendirme (Yıldız)</label>
            <div class="flex space-x-1">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="setRating(testimonial, star)"
                class="text-2xl focus:outline-none"
                :class="star <= testimonial.rating ? 'text-[#f9bf29]' : 'text-gray-300'"
              >
                ★
              </button>
            </div>
          </div>

          <!-- Yorum Metni -->
          <div class="mb-6">
            <label :for="'comment-' + testimonialIndex" class="block text-sm font-medium text-gray-600 mb-2">Yorum Metni *</label>
            <textarea
              v-model="testimonial.comment"
              :id="'comment-' + testimonialIndex"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder='"Eşyalarımızın taşınması konusunda endişeliydik..."'
              required
            ></textarea>
          </div>

          <!-- Tarih ve Konum -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label :for="'date-' + testimonialIndex" class="block text-sm font-medium text-gray-600">Yorum Tarihi *</label>
              <input v-model="testimonial.date" :id="'date-' + testimonialIndex" type="date" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label :for="'location-' + testimonialIndex" class="block text-sm font-medium text-gray-600">Konum</label>
              <input v-model="testimonial.location" :id="'location-' + testimonialIndex" type="text" class="w-full p-2 border rounded" placeholder="İstanbul" />
            </div>
          </div>

          <!-- Hizmet Tipi -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">Hizmet Tipi *</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                @click="setServiceType(testimonial, 'Evden Eve Taşıma')"
                class="p-3 border rounded-lg text-center transition duration-150"
                :class="testimonial.serviceType === 'Evden Eve Taşıma' ? 'border-[#3b5d50] bg-[#3b5d50] text-white' : 'border-gray-300 hover:bg-gray-50'"
              >
                <svg class="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span class="text-sm">Evden Eve</span>
              </button>

              <button
                type="button"
                @click="setServiceType(testimonial, 'Şehirlerarası Nakliye')"
                class="p-3 border rounded-lg text-center transition duration-150"
                :class="testimonial.serviceType === 'Şehirlerarası Nakliye' ? 'border-[#3b5d50] bg-[#3b5d50] text-white' : 'border-gray-300 hover:bg-gray-50'"
              >
                <svg class="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm">Şehirlerarası</span>
              </button>

              <button
                type="button"
                @click="setServiceType(testimonial, 'Ofis Taşıma')"
                class="p-3 border rounded-lg text-center transition duration-150"
                :class="testimonial.serviceType === 'Ofis Taşıma' ? 'border-[#3b5d50] bg-[#3b5d50] text-white' : 'border-gray-300 hover:bg-gray-50'"
              >
                <svg class="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <span class="text-sm">Ofis Taşıma</span>
              </button>
            </div>

            <!-- Özel Hizmet Tipi -->
            <div class="mt-3">
              <label :for="'service-type-' + testimonialIndex" class="block text-sm font-medium text-gray-600 mb-1">Özel Hizmet Tipi</label>
              <input
                v-model="testimonial.serviceType"
                :id="'service-type-' + testimonialIndex"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Veya özel hizmet tipi yazın"
                @input="testimonial.serviceTypeIcon = ''"
              />
            </div>
          </div>

          <!-- Özellik Ayarları -->
          <div class="mt-4 p-3 bg-gray-50 rounded-lg border">
            <h6 class="font-medium text-gray-700 mb-2">Ayarlar</h6>
            <div class="flex space-x-4">
              <label class="flex items-center space-x-2">
                <input v-model="testimonial.isFeatured" type="checkbox" class="h-4 w-4 text-[#f9bf29] rounded focus:ring-[#f9bf29]" />
                <span class="text-sm text-gray-600">Öne Çıkan Yorum</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addTestimonial" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Yeni Yorum Ekle</span>
      </button>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button type="submit" class="px-6 py-3 bg-[#3b5d50] text-white rounded-lg hover:bg-[#2d473d] transition duration-150 font-semibold">
          {{ recordId ? 'Tümünü Güncelle' : 'Oluştur' }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold">
          Kaydı Sil
        </button>
      </div>
    </form>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Testimonial Bölümünü Sil"
      message="Bu bölümdeki tüm verileri (ana metinler ve müşteri yorumları) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
      confirmText="Evet, Kaydı Sil"
      cancelText="İptal Et"
      @confirm="remove"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #3b5d50;
}
.hover\:bg-green-600:hover {
  background-color: #2d473d;
}
.text-primary {
  color: #3b5d50;
}
</style>

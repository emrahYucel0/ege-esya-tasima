<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'testimonials-section' 
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const mainTitle = ref('')
const subtitle = ref('')
const tag = ref('')
const showDecorations = ref(true)
const backgroundColor = ref('')
const textColor = ref('')

// Dinamik olarak yönetilen listeler
const testimonialsList = ref([])

// Modal için ayrı state'ler
const modalMainTitle = ref('')
const modalSubtitle = ref('')
const modalTag = ref('')
const modalShowDecorations = ref(true)
const modalBackgroundColor = ref('')
const modalTextColor = ref('')
const modalTestimonialsList = ref([])

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// TestimonialSection verisini API'den yükler
const loadTestimonialSection = async () => {
  isLoading.value = true
  const { data, error } = await useFetch(`/api/${sectionName}`, { immediate: true })
  
  if (error.value) {
    message.value = 'Testimonial Section verisi alınırken hata oluştu.'
  } else if (data.value && data.value.success !== false) {
    mainTitle.value = data.value.mainTitle || ''
    subtitle.value = data.value.subtitle || ''
    tag.value = data.value.tag || ''
    showDecorations.value = data.value.showDecorations !== undefined ? data.value.showDecorations : true
    backgroundColor.value = data.value.backgroundColor || ''
    textColor.value = data.value.textColor || ''
    testimonialsList.value = data.value.testimonials || []
  } else {
    message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
  }
  isLoading.value = false
}

onMounted(() => {
  loadTestimonialSection()
})

// TestimonialSection güncelleme işlemi (PUT)
const updateTestimonialSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Order değerlerini güncelle
  testimonialsList.value.forEach((testimonial, index) => {
    testimonial.order = index
  })

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'PUT',
    body: {
      sectionName: sectionName,
      mainTitle: mainTitle.value,
      subtitle: subtitle.value,
      tag: tag.value,
      showDecorations: showDecorations.value,
      backgroundColor: backgroundColor.value,
      textColor: textColor.value,
      testimonials: testimonialsList.value.map(testimonial => ({
        customerName: testimonial.customerName,
        customerImage: testimonial.customerImage,
        rating: testimonial.rating || 5,
        comment: testimonial.comment,
        date: testimonial.date,
        location: testimonial.location,
        serviceType: testimonial.serviceType,
        serviceTypeIcon: testimonial.serviceTypeIcon,
        isFeatured: testimonial.isFeatured || false,
        isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
        order: testimonial.order
      })),
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Testimonial Section başarıyla güncellendi! 🎉'
    await loadTestimonialSection()
  }
  isLoading.value = false
}

// Yeni TestimonialSection kaydı ekleme işlemi (POST)
const addTestimonialSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Modal'daki verileri order ile birlikte hazırla
  const preparedTestimonials = modalTestimonialsList.value.map((testimonial, index) => ({
    customerName: testimonial.customerName,
    customerImage: testimonial.customerImage,
    rating: testimonial.rating || 5,
    comment: testimonial.comment,
    date: testimonial.date,
    location: testimonial.location,
    serviceType: testimonial.serviceType,
    serviceTypeIcon: testimonial.serviceTypeIcon,
    isFeatured: testimonial.isFeatured || false,
    isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
    order: index
  }))
  
  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'POST',
    body: {
      sectionName: sectionName,
      mainTitle: modalMainTitle.value,
      subtitle: modalSubtitle.value,
      tag: modalTag.value,
      showDecorations: modalShowDecorations.value,
      backgroundColor: modalBackgroundColor.value,
      textColor: modalTextColor.value,
      testimonials: preparedTestimonials,
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Testimonial Section başarıyla eklendi! ✨'
    showAddForm.value = false
    resetModal()
    await loadTestimonialSection()
  }
  isLoading.value = false
}

// TestimonialSection silme işlemi (DELETE)
const confirmDelete = async () => {
  message.value = ''
  isLoading.value = true
  const { error, data } = await useFetch(`/api/${sectionName}`, {
    method: 'DELETE',
    body: { sectionName: sectionName },
  })

  showDeleteModal.value = false

  if (error.value || !data.value?.success) {
    message.value = 'Silme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Testimonial Section kaydı silindi!🗑️'
    resetForm()
  }
  isLoading.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// Form state'lerini sıfırla
const resetForm = () => {
  mainTitle.value = ''
  subtitle.value = ''
  tag.value = ''
  showDecorations.value = true
  backgroundColor.value = ''
  textColor.value = ''
  testimonialsList.value = []
}

// Modal state'lerini sıfırla
const resetModal = () => {
  modalMainTitle.value = ''
  modalSubtitle.value = ''
  modalTag.value = ''
  modalShowDecorations.value = true
  modalBackgroundColor.value = ''
  modalTextColor.value = ''
  modalTestimonialsList.value = []
}

// Modal açıldığında temizle
const openAddForm = () => {
  resetModal()
  showAddForm.value = true
}

// Modal kapatıldığında temizle
const closeAddForm = () => {
  showAddForm.value = false
  resetModal()
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - ANA FORM
// ------------------------------------

// Yeni bir testimonial ekler
const addTestimonial = () => {
  testimonialsList.value.push({ 
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
    order: testimonialsList.value.length
  })
}

// Bir testimonial'ı listeden siler
const removeTestimonial = (index) => {
  testimonialsList.value.splice(index, 1)
  testimonialsList.value.forEach((item, i) => item.order = i)
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

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - MODAL FORM
// ------------------------------------

// Modal için yeni bir testimonial ekler
const addModalTestimonial = () => {
  modalTestimonialsList.value.push({ 
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
    order: modalTestimonialsList.value.length
  })
}

// Modal için bir testimonial'ı listeden siler
const removeModalTestimonial = (index) => {
  modalTestimonialsList.value.splice(index, 1)
  modalTestimonialsList.value.forEach((item, i) => item.order = i)
}

// Modal için yıldız derecelendirmesi
const setModalRating = (testimonial, rating) => {
  testimonial.rating = rating
}

// Modal için hizmet tipi ata
const setModalServiceType = (testimonial, serviceType) => {
  testimonial.serviceType = serviceType
  switch(serviceType) {
    case 'Evden Eve Taşıma':
      testimonial.serviceTypeIcon = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
      break
    case 'Şehirlerarası Nakliye':
      testimonial.serviceTypeIcon = 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
      break
    case 'Ofis Taşıma':
      testimonial.serviceTypeIcon = 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      break
    default:
      testimonial.serviceTypeIcon = ''
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Müşteri Yorumları Bölümü Yönetimi 💬</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form @submit.prevent="updateTestimonialSection" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
          <input id="mainTitle" v-model="mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Müşterilerimizin Deneyimleri" required />
        </div>
        
        <div>
          <label for="tag" class="block font-medium text-gray-700 mb-1">Etiket</label>
          <input id="tag" v-model="tag" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Müşteri Yorumları" />
        </div>
      </div>
      
      <div>
        <label for="subtitle" class="block font-medium text-gray-700 mb-1">Alt Başlık</label>
        <textarea id="subtitle" v-model="subtitle" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Evden eve nakliyat sürecimiz hakkında müşterilerimizin gerçek yorumları..."></textarea>
      </div>

      <!-- Görünüm Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center">
          <input id="showDecorations" v-model="showDecorations" type="checkbox" class="h-4 w-4 text-[#3b5d50] rounded focus:ring-[#3b5d50]" />
          <label for="showDecorations" class="ml-2 text-gray-700">Dekoratif Elementleri Göster</label>
        </div>
        
        <div>
          <label for="backgroundColor" class="block text-sm font-medium text-gray-600 mb-1">Arkaplan Rengi</label>
          <div class="flex items-center space-x-2">
            <input id="backgroundColor" v-model="backgroundColor" type="text" class="flex-1 p-2 border rounded" placeholder="#ffffff" />
            <input type="color" v-model="backgroundColor" class="w-10 h-10 cursor-pointer" />
          </div>
        </div>
        
        <div>
          <label for="textColor" class="block text-sm font-medium text-gray-600 mb-1">Yazı Rengi</label>
          <div class="flex items-center space-x-2">
            <input id="textColor" v-model="textColor" type="text" class="flex-1 p-2 border rounded" placeholder="#000000" />
            <input type="color" v-model="textColor" class="w-10 h-10 cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Müşteri Yorumları Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Müşteri Yorumları</h2>
      <p class="text-sm text-gray-500">Müşterilerinizin bıraktığı geri bildirimler ve değerlendirmeler</p>

      <div class="space-y-6">
        <div 
          v-for="(testimonial, testimonialIndex) in testimonialsList" 
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
                <input id="active" v-model="testimonial.isActive" type="checkbox" class="h-4 w-4 text-green-500 rounded mr-2" />
                <label for="active" class="text-sm text-gray-600">Aktif</label>
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
        <button type="submit" :disabled="isLoading" class="px-6 py-3 bg-[#3b5d50] text-white rounded-lg hover:bg-[#2d473d] transition duration-150 disabled:opacity-50 font-semibold">
          {{ isLoading ? 'Güncelleniyor...' : 'Tümünü Güncelle' }}
        </button>
        <button type="button" @click="showDeleteModal = true" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold">
          Kaydı Sil
        </button>
      </div>
    </form>
    
    <!-- YENİ KAYIT EKLE BUTONU -->
    <button v-if="!mainTitle && !isLoading" @click="openAddForm" class="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold shadow-md">
      Yeni Kayıt Ekle (İlk Kaydı Oluştur)
    </button>
    
    <!-- YENİ KAYIT EKLEME MODAL'I -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Yeni Testimonial Section Kaydı Ekle</h2>
          <button @click="closeAddForm" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Temel İçerik -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Temel İçerik</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="modal-mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık *</label>
                <input 
                  id="modal-mainTitle" 
                  v-model="modalMainTitle" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Müşterilerimizin Deneyimleri"
                  required 
                />
              </div>
              
              <div>
                <label for="modal-tag" class="block font-medium text-gray-700 mb-1">Etiket</label>
                <input 
                  id="modal-tag" 
                  v-model="modalTag" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Müşteri Yorumları"
                />
              </div>
            </div>
            
            <div>
              <label for="modal-subtitle" class="block font-medium text-gray-700 mb-1">Alt Başlık</label>
              <textarea 
                id="modal-subtitle" 
                v-model="modalSubtitle" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Evden eve nakliyat sürecimiz hakkında müşterilerimizin gerçek yorumları..."
              ></textarea>
            </div>
          </div>

          <!-- Görünüm Ayarları -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <input id="modal-showDecorations" v-model="modalShowDecorations" type="checkbox" class="h-4 w-4 text-[#3b5d50] rounded focus:ring-[#3b5d50]" />
              <label for="modal-showDecorations" class="ml-2 text-gray-700">Dekoratif Elementler</label>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Arkaplan Rengi</label>
              <input v-model="modalBackgroundColor" type="text" class="w-full p-2 border rounded" placeholder="#ffffff" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Yazı Rengi</label>
              <input v-model="modalTextColor" type="text" class="w-full p-2 border rounded" placeholder="#000000" />
            </div>
          </div>

          <!-- Müşteri Yorumları -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Müşteri Yorumları</h3>
              <button 
                type="button" 
                @click="addModalTestimonial" 
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Yorum Ekle</span>
              </button>
            </div>
            
            <p class="text-sm text-gray-500">Müşterilerinizin bıraktığı geri bildirimler ve değerlendirmeler</p>

            <div class="space-y-6 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(testimonial, testimonialIndex) in modalTestimonialsList" 
                :key="'modal-testimonial-' + testimonialIndex" 
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Yorum #{{ testimonialIndex + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalTestimonial(testimonialIndex)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- Müşteri Bilgileri -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Müşteri Adı *</label>
                    <input v-model="testimonial.customerName" type="text" class="w-full p-2 border rounded" placeholder="Ahmet K." required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Fotoğraf URL</label>
                    <input v-model="testimonial.customerImage" type="text" class="w-full p-2 border rounded" placeholder="~/assets/images/testimonial.svg" />
                  </div>
                </div>

                <!-- Değerlendirme -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-600 mb-1">Değerlendirme</label>
                  <div class="flex space-x-1">
                    <button 
                      v-for="star in 5" 
                      :key="star"
                      type="button"
                      @click="setModalRating(testimonial, star)"
                      class="text-xl focus:outline-none"
                      :class="star <= testimonial.rating ? 'text-[#f9bf29]' : 'text-gray-300'"
                    >
                      ★
                    </button>
                  </div>
                </div>

                <!-- Yorum Metni -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-600 mb-1">Yorum Metni *</label>
                  <textarea 
                    v-model="testimonial.comment" 
                    rows="3" 
                    class="w-full p-2 border rounded"
                    placeholder='"Çok memnun kaldık..."'
                    required
                  ></textarea>
                </div>

                <!-- Tarih ve Konum -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Yorum Tarihi *</label>
                    <input v-model="testimonial.date" type="date" class="w-full p-2 border rounded" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Konum</label>
                    <input v-model="testimonial.location" type="text" class="w-full p-2 border rounded" placeholder="İstanbul" />
                  </div>
                </div>

                <!-- Hizmet Tipi -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-600 mb-1">Hizmet Tipi *</label>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <button 
                      type="button"
                      @click="setModalServiceType(testimonial, 'Evden Eve Taşıma')"
                      class="p-2 border rounded text-center text-sm transition duration-150"
                      :class="testimonial.serviceType === 'Evden Eve Taşıma' ? 'border-[#3b5d50] bg-[#3b5d50] text-white' : 'border-gray-300 hover:bg-gray-50'"
                    >
                      Evden Eve
                    </button>
                    
                    <button 
                      type="button"
                      @click="setModalServiceType(testimonial, 'Şehirlerarası Nakliye')"
                      class="p-2 border rounded text-center text-sm transition duration-150"
                      :class="testimonial.serviceType === 'Şehirlerarası Nakliye' ? 'border-[#3b5d50] bg-[#3b5d50] text-white' : 'border-gray-300 hover:bg-gray-50'"
                    >
                      Şehirlerarası
                    </button>
                    
                    <button 
                      type="button"
                      @click="setModalServiceType(testimonial, 'Ofis Taşıma')"
                      class="p-2 border rounded text-center text-sm transition duration-150"
                      :class="testimonial.serviceType === 'Ofis Taşıma' ? 'border-[#3b5d50] bg-[#3b5d50] text-white' : 'border-gray-300 hover:bg-gray-50'"
                    >
                      Ofis Taşıma
                    </button>
                  </div>
                  
                  <!-- Özel Hizmet Tipi -->
                  <div class="mt-2">
                    <input 
                      v-model="testimonial.serviceType" 
                      type="text" 
                      class="w-full p-2 border rounded text-sm"
                      placeholder="Veya özel hizmet tipi yazın"
                    />
                  </div>
                </div>

                <!-- Ayarlar -->
                <div class="flex space-x-4 text-sm">
                  <label class="flex items-center space-x-1">
                    <input v-model="testimonial.isFeatured" type="checkbox" class="h-3 w-3 text-[#f9bf29] rounded" />
                    <span class="text-gray-600">Öne Çıkan</span>
                  </label>
                  <label class="flex items-center space-x-1">
                    <input v-model="testimonial.isActive" type="checkbox" class="h-3 w-3 text-green-500 rounded" checked />
                    <span class="text-gray-600">Aktif</span>
                  </label>
                </div>
              </div>
              
              <div v-if="modalTestimonialsList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p class="mt-2">Henüz yorum eklenmemiş</p>
                <button 
                  type="button" 
                  @click="addModalTestimonial" 
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  İlk Yorumu Ekle
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button 
            @click="closeAddForm" 
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
          >
            İptal
          </button>
          <button 
            @click="addTestimonialSection" 
            :disabled="!modalMainTitle || modalTestimonialsList.length === 0 || isLoading"
            class="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
          >
            {{ isLoading ? 'Ekleniyor...' : 'Kaydı Oluştur' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Silme Modalı -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Testimonial Bölümünü Sil</h3>
          <p class="text-gray-600 mb-6">
            Bu bölümdeki tüm verileri (ana metinler ve müşteri yorumları) silmek istediğinize emin misiniz? 
            Bu işlem geri alınamaz!
          </p>
          <div class="flex justify-end space-x-3">
            <button 
              @click="cancelDelete"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
            >
              İptal Et
            </button>
            <button 
              @click="confirmDelete"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
            >
              Evet, Kaydı Sil
            </button>
          </div>
        </div>
      </div>
    </div>
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
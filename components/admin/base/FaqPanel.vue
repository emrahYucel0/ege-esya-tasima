<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'faq-section' 
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const mainTitle = ref('')
const description = ref('')
const ctaTitle = ref('')
const ctaButtonText = ref('')
const ctaButtonLink = ref('')

// Dinamik olarak yönetilen listeler
const faqsList = ref([])
const statsCardsList = ref([])
const imagesList = ref([])

// Modal için ayrı state'ler
const modalMainTitle = ref('')
const modalDescription = ref('')
const modalCtaTitle = ref('')
const modalCtaButtonText = ref('')
const modalCtaButtonLink = ref('')
const modalFaqsList = ref([])
const modalStatsCardsList = ref([])
const modalImagesList = ref([])

// Her görsel için temporary ID ve image mapping
const temporaryImageIds = ref({})
const imageUpdates = ref({})

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// FaqSection verisini API'den yükler
const loadFaqSection = async () => {
  isLoading.value = true
  const { data, error } = await useFetch(`/api/${sectionName}`, { immediate: true })
  
  if (error.value) {
    message.value = 'FAQ Section verisi alınırken hata oluştu.'
  } else if (data.value && data.value.success !== false) {
    mainTitle.value = data.value.mainTitle || ''
    description.value = data.value.description || ''
    ctaTitle.value = data.value.ctaTitle || ''
    ctaButtonText.value = data.value.ctaButtonText || ''
    ctaButtonLink.value = data.value.ctaButtonLink || ''
    faqsList.value = data.value.faqs || []
    statsCardsList.value = data.value.statsCards || []
    imagesList.value = data.value.images || []

    // Temporary ID'leri oluştur
    imagesList.value.forEach((image, index) => {
      if (!temporaryImageIds.value[index]) {
        temporaryImageIds.value[index] = image.id || Date.now() + index
      }
    })
  } else {
    message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
  }
  isLoading.value = false
}

onMounted(() => {
  loadFaqSection()
})

// FaqSection güncelleme işlemi (PUT)
const updateFaqSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Order değerlerini güncelle
  faqsList.value.forEach((faq, index) => {
    faq.order = index
    faq.details.forEach((detail, detailIndex) => {
      detail.order = detailIndex
    })
  })
  
  statsCardsList.value.forEach((card, index) => {
    card.order = index
  })
  
  // Güncellenmiş görselleri hazırla
  const updatedImages = imagesList.value.map((image, index) => {
    const tempId = temporaryImageIds.value[index]
    const currentImage = imageUpdates.value[tempId] || image.imagePath

    return {
      imagePath: currentImage,
      altText: image.altText,
      position: image.position,
      order: index
    }
  })

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'PUT',
    body: {
      sectionName: sectionName,
      mainTitle: mainTitle.value,
      description: description.value,
      ctaTitle: ctaTitle.value,
      ctaButtonText: ctaButtonText.value,
      ctaButtonLink: ctaButtonLink.value,
      faqs: faqsList.value.map(faq => ({ 
        question: faq.question,
        answer: faq.answer,
        order: faq.order,
        isActive: faq.isActive,
        details: faq.details.map(detail => ({
          text: detail.text,
          order: detail.order
        }))
      })),
      statsCards: statsCardsList.value.map(card => ({
        value: card.value,
        label: card.label,
        bgColor: card.bgColor,
        textColor: card.textColor,
        position: card.position,
        order: card.order
      })),
      images: updatedImages,
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'FAQ Section başarıyla güncellendi! 🎉'
    imagesList.value.forEach((_, index) => {
      const tempId = temporaryImageIds.value[index]
      if (imageUpdates.value[tempId]) {
        delete imageUpdates.value[tempId]
      }
    })
    await loadFaqSection()
  }
  isLoading.value = false
}

// Yeni FaqSection kaydı ekleme işlemi (POST)
const addFaqSection = async () => {
  message.value = ''
  isLoading.value = true
  
  const preparedFaqs = modalFaqsList.value.map((faq, index) => ({
    question: faq.question,
    answer: faq.answer,
    order: index,
    isActive: faq.isActive !== undefined ? faq.isActive : true,
    details: Array.isArray(faq.details)
      ? faq.details.map((detail, detailIndex) => ({
          text: detail.text,
          order: detailIndex
        }))
      : []
  }))
  
  const preparedStatsCards = modalStatsCardsList.value.map((card, index) => ({
    value: card.value,
    label: card.label,
    bgColor: card.bgColor || "#3b5d50",
    textColor: card.textColor || "#ffffff",
    position: card.position,
    order: index
  }))
  
  const preparedImages = modalImagesList.value.map((image, index) => ({
    imagePath: image.imagePath,
    altText: image.altText,
    position: image.position,
    order: index
  }))
  
  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'POST',
    body: {
      sectionName: sectionName,
      mainTitle: modalMainTitle.value,
      description: modalDescription.value,
      ctaTitle: modalCtaTitle.value,
      ctaButtonText: modalCtaButtonText.value,
      ctaButtonLink: modalCtaButtonLink.value,
      faqs: preparedFaqs,
      statsCards: preparedStatsCards,
      images: preparedImages,
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'FAQ Section başarıyla eklendi! ✨'
    showAddForm.value = false
    resetModal()
    await loadFaqSection()
  }
  isLoading.value = false
}

// FaqSection silme işlemi (DELETE)
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
    message.value = 'FAQ Section kaydı silindi!🗑️'
    mainTitle.value = ''
    description.value = ''
    ctaTitle.value = ''
    ctaButtonText.value = ''
    ctaButtonLink.value = ''
    faqsList.value = []
    statsCardsList.value = []
    imagesList.value = []
    imageUpdates.value = {}
    temporaryImageIds.value = {}
  }
  isLoading.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// ------------------------------------
// DOSYA YÜKLEYİCİ İŞLEMLERİ
// ------------------------------------

const updateImageUrl = (url, index) => {
  const tempId = temporaryImageIds.value[index]
  if (tempId) {
    imageUpdates.value[tempId] = url

    if (imagesList.value[index]) {
      imagesList.value[index].imagePath = url
    }

    message.value = 'Görsel başarıyla güncellendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
  }
}

const updateModalImageUrl = (url, index) => {
  if (modalImagesList.value[index]) {
    modalImagesList.value[index].imagePath = url
  }
}

// Modal state'lerini sıfırla
const resetModal = () => {
  modalMainTitle.value = ''
  modalDescription.value = ''
  modalCtaTitle.value = ''
  modalCtaButtonText.value = ''
  modalCtaButtonLink.value = ''
  modalFaqsList.value = []
  modalStatsCardsList.value = []
  modalImagesList.value = []
}

const openAddForm = () => {
  resetModal()
  showAddForm.value = true
}

const closeAddForm = () => {
  showAddForm.value = false
  resetModal()
}

// Görsel pozisyonları için seçenekler
const imagePositions = [
  { value: 'primary', label: 'Primary - Sol üstteki büyük görsel' },
  { value: 'secondary', label: 'Secondary - Sağ alttaki görsel' }
]

// İstatistik kartı pozisyonları için seçenekler
const statsPositions = [
  { value: 'top-right', label: 'Üst sağ' },
  { value: 'bottom-left', label: 'Alt sol' }
]

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - ANA FORM (FAQ)
// ------------------------------------

const addFaq = () => {
  faqsList.value.push({ 
    question: '', 
    answer: '',
    order: faqsList.value.length,
    isActive: true,
    details: []
  })
}

const removeFaq = (index) => {
  faqsList.value.splice(index, 1)
  faqsList.value.forEach((faq, i) => faq.order = i)
}

const addFaqDetail = (faqIndex) => {
  if (!faqsList.value[faqIndex].details) {
    faqsList.value[faqIndex].details = []
  }
  faqsList.value[faqIndex].details.push({
    text: '',
    order: faqsList.value[faqIndex].details.length
  })
}

const removeFaqDetail = (faqIndex, detailIndex) => {
  faqsList.value[faqIndex].details.splice(detailIndex, 1)
  faqsList.value[faqIndex].details.forEach((detail, i) => detail.order = i)
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - ANA FORM (STATS CARDS)
// ------------------------------------

const addStatsCard = () => {
  statsCardsList.value.push({ 
    value: '', 
    label: '',
    bgColor: '#3b5d50',
    textColor: '#ffffff',
    position: '',
    order: statsCardsList.value.length
  })
}

const removeStatsCard = (index) => {
  statsCardsList.value.splice(index, 1)
  statsCardsList.value.forEach((card, i) => card.order = i)
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - ANA FORM (IMAGES)
// ------------------------------------

const addImage = () => {
  const newIndex = imagesList.value.length
  const tempId = Date.now() + newIndex

  imagesList.value.push({ 
    imagePath: '', 
    altText: '', 
    position: '', 
    order: newIndex 
  })

  temporaryImageIds.value[newIndex] = tempId
}

const removeImage = (index) => {
  const tempId = temporaryImageIds.value[index]
  if (imageUpdates.value[tempId]) {
    delete imageUpdates.value[tempId]
  }

  delete temporaryImageIds.value[index]

  imagesList.value.splice(index, 1)

  imagesList.value.forEach((image, i) => {
    image.order = i
    if (i >= index) {
      const oldTempId = temporaryImageIds.value[i + 1]
      if (oldTempId) {
        temporaryImageIds.value[i] = oldTempId
        delete temporaryImageIds.value[i + 1]
      }
    }
  })
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - MODAL FORM
// ------------------------------------

const addModalFaq = () => {
  modalFaqsList.value.push({ 
    question: '', 
    answer: '',
    order: modalFaqsList.value.length,
    isActive: true,
    details: []
  })
}

const removeModalFaq = (index) => {
  modalFaqsList.value.splice(index, 1)
  modalFaqsList.value.forEach((faq, i) => faq.order = i)
}

const addModalFaqDetail = (faqIndex) => {
  if (!modalFaqsList.value[faqIndex].details) {
    modalFaqsList.value[faqIndex].details = []
  }
  modalFaqsList.value[faqIndex].details.push({
    text: '',
    order: modalFaqsList.value[faqIndex].details.length
  })
}

const removeModalFaqDetail = (faqIndex, detailIndex) => {
  modalFaqsList.value[faqIndex].details.splice(detailIndex, 1)
  modalFaqsList.value[faqIndex].details.forEach((detail, i) => detail.order = i)
}

const addModalStatsCard = () => {
  modalStatsCardsList.value.push({ 
    value: '', 
    label: '',
    bgColor: '#3b5d50',
    textColor: '#ffffff',
    position: '',
    order: modalStatsCardsList.value.length
  })
}

const removeModalStatsCard = (index) => {
  modalStatsCardsList.value.splice(index, 1)
  modalStatsCardsList.value.forEach((card, i) => card.order = i)
}

const addModalImage = () => {
  modalImagesList.value.push({ 
    imagePath: '', 
    altText: '', 
    position: '', 
    order: modalImagesList.value.length 
  })
}

const removeModalImage = (index) => {
  modalImagesList.value.splice(index, 1)
  modalImagesList.value.forEach((image, i) => image.order = i)
}

// Görsel görüntüleme
const displayImage = (index) => {
  const tempId = temporaryImageIds.value[index]
  const image = imagesList.value[index]

  if (!image) return ''

  return imageUpdates.value[tempId] || image.imagePath || ''
}

const hasImageUpdate = (index) => {
  const tempId = temporaryImageIds.value[index]
  const image = imagesList.value[index]

  if (!image || !tempId) return false

  const originalImage = image.imagePath
  const localImage = imageUpdates.value[tempId]

  return localImage && localImage !== originalImage
}

const getImageTempId = (index) => {
  return (
    temporaryImageIds.value[index] ||
    imagesList.value[index]?.id ||
    Date.now() + index
  )
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">FAQ Section Yönetimi ❓</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form @submit.prevent="updateFaqSection" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>
      
      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      
      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama Paragrafı</label>
        <textarea id="description" v-model="description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="ctaTitle" class="block font-medium text-gray-700 mb-1">CTA Başlığı</label>
        <input id="ctaTitle" v-model="ctaTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="ctaButtonText" class="block font-medium text-gray-700 mb-1">CTA Buton Metni</label>
          <input id="ctaButtonText" v-model="ctaButtonText" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="ctaButtonLink" class="block font-medium text-gray-700 mb-1">CTA Buton Linki</label>
          <input id="ctaButtonLink" v-model="ctaButtonLink" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <!-- FAQ'lar Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Sıkça Sorulan Sorular</h2>

      <div class="space-y-6">
        <div 
          v-for="(faq, index) in faqsList" 
          :key="'faq-' + (faq.id || index)" 
          class="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-bold text-lg text-gray-700">Soru #{{ index + 1 }}</h4>
            <button type="button" @click="removeFaq(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="space-y-3">
            <div>
              <label :for="'faq-question-' + index" class="block text-sm font-medium text-gray-600">Soru</label>
              <input v-model="faq.question" :id="'faq-question-' + index" type="text" class="w-full p-2 border rounded" placeholder="Nakliye öncesi eşyalarımı nasıl hazırlamalıyım?" required />
            </div>
            
            <div>
              <label :for="'faq-answer-' + index" class="block text-sm font-medium text-gray-600">Cevap</label>
              <textarea v-model="faq.answer" :id="'faq-answer-' + index" rows="3" class="w-full p-2 border rounded" placeholder="Detaylı cevap..." required></textarea>
            </div>

            <div class="flex items-center">
              <input v-model="faq.isActive" :id="'faq-active-' + index" type="checkbox" class="mr-2" />
              <label :for="'faq-active-' + index" class="text-sm text-gray-600">Aktif</label>
            </div>

            <!-- Detaylar -->
            <div class="mt-4 p-3 bg-white rounded border">
              <div class="flex justify-between items-center mb-2">
                <h5 class="font-semibold text-gray-700">Detaylar (Madde İşaretli Liste)</h5>
                <button type="button" @click="addFaqDetail(index)" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                  + Detay Ekle
                </button>
              </div>

              <div v-for="(detail, detailIndex) in faq.details" :key="'detail-' + detailIndex" class="flex items-center gap-2 mb-2">
                <input v-model="detail.text" type="text" class="flex-1 p-2 border rounded text-sm" placeholder="Detay metni..." />
                <button type="button" @click="removeFaqDetail(index, detailIndex)" class="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" @click="addFaq" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Soru Ekle</span>
      </button>

      <!-- İstatistik Kartları -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">İstatistik Kartları</h2>

      <div class="space-y-4">
        <div 
          v-for="(card, index) in statsCardsList" 
          :key="'stats-' + (card.id || index)" 
          class="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-bold text-lg text-gray-700">Kart #{{ index + 1 }}</h4>
            <button type="button" @click="removeStatsCard(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-600">Değer</label>
              <input v-model="card.value" type="text" class="w-full p-2 border rounded" placeholder="150+" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Etiket</label>
              <input v-model="card.label" type="text" class="w-full p-2 border rounded" placeholder="Profesyonel Ekip" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Pozisyon</label>
              <select v-model="card.position" class="w-full p-2 border rounded">
                <option value="">Pozisyon seçin</option>
                <option v-for="pos in statsPositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Arka Plan Rengi</label>
              <input v-model="card.bgColor" type="color" class="w-full p-1 border rounded h-10" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Metin Rengi</label>
              <input v-model="card.textColor" type="color" class="w-full p-1 border rounded h-10" />
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" @click="addStatsCard" class="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni İstatistik Kartı Ekle</span>
      </button>

      <!-- Görseller -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Görseller</h2>

      <div class="space-y-4">
        <div 
          v-for="(image, index) in imagesList" 
          :key="getImageTempId(index)" 
          class="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-bold text-lg text-gray-700">Görsel #{{ index + 1 }}</h4>
            <button type="button" @click="removeImage(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">Pozisyon</label>
              <select v-model="image.position" class="w-full p-2 border rounded">
                <option value="">Pozisyon seçin</option>
                <option v-for="pos in imagePositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Alt Metni</label>
              <input v-model="image.altText" type="text" class="w-full p-2 border rounded" placeholder="Görsel açıklaması" />
            </div>
          </div>
          
          <div class="mt-3 p-3 bg-white rounded-lg border">
            <label class="block text-sm font-medium text-gray-600 mb-2">Görsel URL</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <input 
                  :value="displayImage(index)" 
                  type="url" 
                  class="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed" 
                  placeholder="URL otomatik olarak dolacak" 
                  readonly
                />
                <p v-if="displayImage(index)" class="mt-2 text-sm text-gray-500">
                  Mevcut Görsel: 
                  <a :href="displayImage(index)" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                    {{ displayImage(index) }}
                  </a>
                  <span v-if="hasImageUpdate(index)" class="ml-2 text-orange-500 font-semibold">
                    (Yeni yüklenen - Kaydedilmemiş)
                  </span>
                </p>
                <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
              </div>
              <div>
                <FileUploader 
                  @file-uploaded="(url) => updateImageUrl(url, index)" 
                  :label="'Görsel Yükle #' + (index + 1)" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" @click="addImage" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Görsel Ekle</span>
      </button>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button type="submit" :disabled="isLoading" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-150 disabled:opacity-50 font-semibold">
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
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto my-8">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 class="text-2xl font-bold text-gray-800">Yeni FAQ Section Kaydı Ekle</h2>
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
            
            <div>
              <label for="modal-mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık *</label>
              <input 
                id="modal-mainTitle" 
                v-model="modalMainTitle" 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            
            <div>
              <label for="modal-description" class="block font-medium text-gray-700 mb-1">Açıklama Paragrafı</label>
              <textarea 
                id="modal-description" 
                v-model="modalDescription" 
                rows="4" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label for="modal-ctaTitle" class="block font-medium text-gray-700 mb-1">CTA Başlığı</label>
              <input 
                id="modal-ctaTitle" 
                v-model="modalCtaTitle" 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="modal-ctaButtonText" class="block font-medium text-gray-700 mb-1">CTA Buton Metni</label>
                <input 
                  id="modal-ctaButtonText" 
                  v-model="modalCtaButtonText" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label for="modal-ctaButtonLink" class="block font-medium text-gray-700 mb-1">CTA Buton Linki</label>
                <input 
                  id="modal-ctaButtonLink" 
                  v-model="modalCtaButtonLink" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>

          <!-- FAQ'lar Listesi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Sıkça Sorulan Sorular</h3>
              <button 
                type="button" 
                @click="addModalFaq" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Soru Ekle</span>
              </button>
            </div>

            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(faq, index) in modalFaqsList" 
                :key="'modal-faq-' + index" 
                class="p-4 border-2 border-gray-300 rounded-lg bg-white"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Soru #{{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalFaq(index)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Soru</label>
                    <input 
                      v-model="faq.question" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Nakliye öncesi eşyalarımı nasıl hazırlamalıyım?" 
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Cevap</label>
                    <textarea 
                      v-model="faq.answer" 
                      rows="3" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Detaylı cevap..."
                    ></textarea>
                  </div>

                  <div class="flex items-center">
                    <input v-model="faq.isActive" type="checkbox" class="mr-2" />
                    <label class="text-sm text-gray-600">Aktif</label>
                  </div>

                  <!-- Modal FAQ Detayları -->
                  <div class="mt-3 p-3 bg-gray-50 rounded border">
                    <div class="flex justify-between items-center mb-2">
                      <h5 class="font-semibold text-gray-700 text-sm">Detaylar</h5>
                      <button 
                        type="button" 
                        @click="addModalFaqDetail(index)" 
                        class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                      >
                        + Detay
                      </button>
                    </div>

                    <div v-for="(detail, detailIndex) in faq.details" :key="'modal-detail-' + detailIndex" class="flex items-center gap-2 mb-2">
                      <input 
                        v-model="detail.text" 
                        type="text" 
                        class="flex-1 p-2 border rounded text-sm" 
                        placeholder="Detay metni..." 
                      />
                      <button 
                        type="button" 
                        @click="removeModalFaqDetail(index, detailIndex)" 
                        class="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="modalFaqsList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2">Henüz soru eklenmemiş</p>
              </div>
            </div>
          </div>

          <!-- İstatistik Kartları -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">İstatistik Kartları</h3>
              <button 
                type="button" 
                @click="addModalStatsCard" 
                class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Kart Ekle</span>
              </button>
            </div>

            <div class="space-y-4 max-h-64 overflow-y-auto pr-2">
              <div 
                v-for="(card, index) in modalStatsCardsList" 
                :key="'modal-stats-' + index" 
                class="p-4 border border-gray-300 rounded-lg bg-white"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Kart #{{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalStatsCard(index)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Değer</label>
                    <input v-model="card.value" type="text" class="w-full p-2 border rounded" placeholder="150+" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Etiket</label>
                    <input v-model="card.label" type="text" class="w-full p-2 border rounded" placeholder="Profesyonel Ekip" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Pozisyon</label>
                    <select v-model="card.position" class="w-full p-2 border rounded">
                      <option value="">Pozisyon seçin</option>
                      <option v-for="pos in statsPositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Arka Plan Rengi</label>
                    <input v-model="card.bgColor" type="color" class="w-full p-1 border rounded h-10" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Metin Rengi</label>
                    <input v-model="card.textColor" type="color" class="w-full p-1 border rounded h-10" />
                  </div>
                </div>
              </div>
              
              <div v-if="modalStatsCardsList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p class="mt-2">Henüz istatistik kartı eklenmemiş</p>
              </div>
            </div>
          </div>

          <!-- Görseller -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Görseller</h3>
              <button 
                type="button" 
                @click="addModalImage" 
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Görsel Ekle</span>
              </button>
            </div>

            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(image, index) in modalImagesList" 
                :key="'modal-image-' + index" 
                class="p-4 border border-gray-300 rounded-lg bg-white"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Görsel #{{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalImage(index)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Pozisyon</label>
                    <select v-model="image.position" class="w-full p-2 border rounded">
                      <option value="">Pozisyon seçin</option>
                      <option v-for="pos in imagePositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Alt Metni</label>
                    <input v-model="image.altText" type="text" class="w-full p-2 border rounded" placeholder="Görsel açıklaması" />
                  </div>
                </div>
                
                <div class="mt-3 p-3 bg-gray-100 rounded border">
                  <label class="block text-sm font-medium text-gray-600 mb-2">Görsel URL</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        v-model="image.imagePath" 
                        type="url" 
                        class="w-full p-2 border border-gray-300 rounded bg-gray-50 cursor-not-allowed" 
                        placeholder="Dosya yüklendikten sonra otomatik dolacak" 
                        readonly
                      />
                      <p v-if="image.imagePath" class="mt-2 text-sm text-green-600">
                        ✓ Görsel başarıyla yüklendi!
                      </p>
                      <p v-else class="mt-2 text-sm text-red-500">
                        ⚠️ Lütfen görsel yükleyin
                      </p>
                    </div>
                    <div>
                      <FileUploader 
                        @file-uploaded="(url) => updateModalImageUrl(url, index)" 
                        :label="'Görsel Yükle #' + (index + 1)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="modalImagesList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="mt-2">Henüz görsel eklenmemiş</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg sticky bottom-0">
          <button 
            @click="closeAddForm" 
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
          >
            İptal
          </button>
          <button 
            @click="addFaqSection" 
            :disabled="!modalMainTitle || isLoading"
            class="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
          >
            {{ isLoading ? 'Ekleniyor...' : 'Kaydı Oluştur' }}
          </button>
        </div>
      </div>
    </div>
    
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="FAQ Section Kaydını Sil"
      message="Bu bölümdeki tüm verileri (sorular, detaylar, istatistik kartları ve görseller) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
      confirmText="Evet, Kaydı Sil"
      cancelText="İptal Et"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #3b82f6;
}
.hover\:bg-green-600:hover {
  background-color: #10b981;
}
.text-primary {
  color: #3b82f6;
}
</style>
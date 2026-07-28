<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'we-help-section' 
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const mainTitle = ref('')
const description = ref('')
const buttonText = ref('')
const buttonLink = ref('')

// Dinamik olarak yönetilen listeler
const featuresList = ref([])
const imagesList = ref([])

// Modal için ayrı state'ler
const modalMainTitle = ref('')
const modalDescription = ref('')
const modalButtonText = ref('')
const modalButtonLink = ref('')
const modalFeaturesList = ref([])
const modalImagesList = ref([])

// DÜZELTME: Her görsel için temporary ID ve image mapping
const temporaryImageIds = ref({}) // index -> temporary ID mapping
const imageUpdates = ref({}) // temporary ID -> image URL mapping

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// WeHelpSection verisini API'den yükler
const loadWeHelpSection = async () => {
  isLoading.value = true
  const { data, error } = await useFetch(`/api/${sectionName}`, { immediate: true })
  
  if (error.value) {
    message.value = 'We Help Section verisi alınırken hata oluştu.'
  } else if (data.value && data.value.success !== false) {
    mainTitle.value = data.value.mainTitle || ''
    description.value = data.value.description || ''
    buttonText.value = data.value.buttonText || ''
    buttonLink.value = data.value.buttonLink || ''
    featuresList.value = data.value.features || []
    imagesList.value = data.value.images || []

    // DÜZELTME: Temporary ID'leri oluştur veya koru
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
  loadWeHelpSection()
})

// WeHelpSection güncelleme işlemi (PUT)
const updateWeHelpSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Order değerlerini güncelle
  featuresList.value.forEach((feature, index) => {
    feature.order = index
  })
  
  // DÜZELTME: Güncellenmiş görselleri hazırla
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
      buttonText: buttonText.value,
      buttonLink: buttonLink.value,
      features: featuresList.value.map(feature => ({ 
        text: feature.text,
        order: feature.order
      })),
      images: updatedImages,
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'We Help Section başarıyla güncellendi! 🎉'
    // DÜZELTME: Local image state'lerini temizleme
    imagesList.value.forEach((_, index) => {
      const tempId = temporaryImageIds.value[index]
      if (imageUpdates.value[tempId]) {
        delete imageUpdates.value[tempId]
      }
    })
    await loadWeHelpSection()
  }
  isLoading.value = false
}

// Yeni WeHelpSection kaydı ekleme işlemi (POST)
const addWeHelpSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Modal'daki verileri order ile birlikte hazırla
  const preparedFeatures = modalFeaturesList.value.map((feature, index) => ({
    text: feature.text,
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
      buttonText: modalButtonText.value,
      buttonLink: modalButtonLink.value,
      features: preparedFeatures,
      images: preparedImages,
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'We Help Section başarıyla eklendi! ✨'
    showAddForm.value = false
    resetModal()
    await loadWeHelpSection()
  }
  isLoading.value = false
}

// WeHelpSection silme işlemi (DELETE)
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
    message.value = 'We Help Section kaydı silindi!🗑️'
    mainTitle.value = ''
    description.value = ''
    buttonText.value = ''
    buttonLink.value = ''
    featuresList.value = []
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
// DOSYA YÜKLEYİCİ İŞLEMLERİ - DÜZELTİLDİ
// ------------------------------------

/**
 * Görsel için FileUploader'dan gelen URL'i günceller
 */
const updateImageUrl = (url, index) => {
  const tempId = temporaryImageIds.value[index]
  if (tempId) {
    // DÜZELTME: Local state'i güncelle
    imageUpdates.value[tempId] = url

    // Hemen görseli güncelle (kullanıcı deneyimi için)
    if (imagesList.value[index]) {
      imagesList.value[index].imagePath = url
    }

    message.value = 'Görsel başarıyla güncellendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
  }
}

/**
 * Modal için görsel URL'ini günceller.
 */
const updateModalImageUrl = (url, index) => {
  if (modalImagesList.value[index]) {
    modalImagesList.value[index].imagePath = url
  }
}

// Modal state'lerini sıfırla
const resetModal = () => {
  modalMainTitle.value = ''
  modalDescription.value = ''
  modalButtonText.value = ''
  modalButtonLink.value = ''
  modalFeaturesList.value = []
  modalImagesList.value = []
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

// Görsel pozisyonları için seçenekler
const imagePositions = [
  { value: 'grid-1', label: 'Grid 1 - Büyük resim (sol üst)' },
  { value: 'grid-2', label: 'Grid 2 - Küçük resim (sağ üst)' },
  { value: 'grid-3', label: 'Grid 3 - Orta resim (sağ alt)' }
]

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - ANA FORM
// ------------------------------------

// Yeni bir özellik ekler
const addFeature = () => {
  featuresList.value.push({ 
    text: '', 
    order: featuresList.value.length 
  })
}

// Bir özelliği listeden siler
const removeFeature = (index) => {
  featuresList.value.splice(index, 1)
  featuresList.value.forEach((feature, i) => feature.order = i)
}

// Yeni bir görsel ekler
const addImage = () => {
  const newIndex = imagesList.value.length
  const tempId = Date.now() + newIndex

  imagesList.value.push({ 
    imagePath: '', 
    altText: '', 
    position: '', 
    order: newIndex 
  })

  // DÜZELTME: Yeni görsel için temporary ID oluştur
  temporaryImageIds.value[newIndex] = tempId
}

// Bir görseli listeden siler
const removeImage = (index) => {
  const tempId = temporaryImageIds.value[index]
  // DÜZELTME: Local image state'ini temizle
  if (imageUpdates.value[tempId]) {
    delete imageUpdates.value[tempId]
  }

  // Temporary ID mapping'i güncelle
  delete temporaryImageIds.value[index]

  imagesList.value.splice(index, 1)

  // DÜZELTME: Kalan görsellerin index'lerini ve temporary ID'lerini güncelle
  imagesList.value.forEach((image, i) => {
    image.order = i
    // Temporary ID'leri kaydır
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

// Modal için yeni bir özellik ekler
const addModalFeature = () => {
  modalFeaturesList.value.push({ 
    text: '', 
    order: modalFeaturesList.value.length 
  })
}

// Modal için bir özelliği listeden siler
const removeModalFeature = (index) => {
  modalFeaturesList.value.splice(index, 1)
  modalFeaturesList.value.forEach((feature, i) => feature.order = i)
}

// Modal için yeni bir görsel ekler
const addModalImage = () => {
  modalImagesList.value.push({ 
    imagePath: '', 
    altText: '', 
    position: '', 
    order: modalImagesList.value.length 
  })
}

// Modal için bir görseli listeden siler
const removeModalImage = (index) => {
  modalImagesList.value.splice(index, 1)
  modalImagesList.value.forEach((image, i) => image.order = i)
}

// DÜZELTME: Görsel URL'ini görüntülemek için
const displayImage = (index) => {
  const tempId = temporaryImageIds.value[index]
  const image = imagesList.value[index]

  if (!image) return ''

  // Önce güncellenmiş resmi kontrol et, yoksa orijinal resmi göster
  return imageUpdates.value[tempId] || image.imagePath || ''
}

// DÜZELTME: Resim değişikliği olup olmadığını kontrol etmek için
const hasImageUpdate = (index) => {
  const tempId = temporaryImageIds.value[index]
  const image = imagesList.value[index]

  if (!image || !tempId) return false

  const originalImage = image.imagePath
  const localImage = imageUpdates.value[tempId]

  return localImage && localImage !== originalImage
}

// DÜZELTME: Görsel ID'sini almak için
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
    <h1 class="text-3xl font-bold mb-6 text-gray-800">We Help Section Yönetimi ⚙️</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form @submit.prevent="updateWeHelpSection" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>
      
      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      
      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama Paragrafı</label>
        <textarea id="description" v-model="description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="buttonText" class="block font-medium text-gray-700 mb-1">Buton Metni</label>
          <input id="buttonText" v-model="buttonText" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="buttonLink" class="block font-medium text-gray-700 mb-1">Buton Linki</label>
          <input id="buttonLink" v-model="buttonLink" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <!-- Özellikler Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Özellikler Listesi</h2>
      <p class="text-sm text-gray-500">Liste maddeleri (• işaretli öğeler)</p>

      <div class="space-y-4">
        <div 
          v-for="(feature, index) in featuresList" 
          :key="'feature-' + (feature.id || index)" 
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Madde #{{ index + 1 }}</h4>
            <button type="button" @click="removeFeature(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div>
            <label :for="'feature-text-' + index" class="block text-sm font-medium text-gray-600">Madde Metni</label>
            <input v-model="feature.text" :id="'feature-text-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Ücretsiz Ekspertiz ve Detaylı Planlama" required />
          </div>
        </div>
      </div>
      
      <button type="button" @click="addFeature" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Madde Ekle</span>
      </button>

      <!-- Görseller Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Grid Görselleri</h2>
      <p class="text-sm text-gray-500">Grid içinde kullanılacak görseller</p>

      <div class="space-y-4">
        <div 
          v-for="(image, index) in imagesList" 
          :key="getImageTempId(index)" 
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Görsel #{{ index + 1 }}</h4>
            <button type="button" @click="removeImage(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label :for="'image-position-' + index" class="block text-sm font-medium text-gray-600">Grid Pozisyonu</label>
              <select v-model="image.position" :id="'image-position-' + index" class="w-full p-2 border rounded">
                <option value="">Pozisyon seçin</option>
                <option v-for="pos in imagePositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
              </select>
            </div>
            <div>
              <label :for="'image-alt-' + index" class="block text-sm font-medium text-gray-600">Alt Metni</label>
              <input v-model="image.altText" :id="'image-alt-' + index" type="text" class="w-full p-2 border rounded" placeholder="Görsel açıklaması" />
            </div>
          </div>
          
          <!-- DÜZELTME: Görsel Yönetimi -->
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
                  <!-- DÜZELTME: Resim değişikliği kontrolü -->
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
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Yeni We Help Section Kaydı Ekle</h2>
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="modal-buttonText" class="block font-medium text-gray-700 mb-1">Buton Metni</label>
                <input 
                  id="modal-buttonText" 
                  v-model="modalButtonText" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label for="modal-buttonLink" class="block font-medium text-gray-700 mb-1">Buton Linki</label>
                <input 
                  id="modal-buttonLink" 
                  v-model="modalButtonLink" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>

          <!-- Özellikler Listesi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Özellikler Listesi</h3>
              <button 
                type="button" 
                @click="addModalFeature" 
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Madde Ekle</span>
              </button>
            </div>
            
            <p class="text-sm text-gray-500">Liste maddeleri (• işaretli öğeler)</p>

            <div class="space-y-4 max-h-64 overflow-y-auto pr-2">
              <div 
                v-for="(feature, index) in modalFeaturesList" 
                :key="'modal-feature-' + index" 
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Madde #{{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalFeature(index)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div>
                  <label :for="'modal-feature-text-' + index" class="block text-sm font-medium text-gray-600 mb-1">Madde Metni</label>
                  <input 
                    v-model="feature.text" 
                    :id="'modal-feature-text-' + index" 
                    type="text" 
                    class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Örn: Ücretsiz Ekspertiz ve Detaylı Planlama" 
                  />
                </div>
              </div>
              
              <div v-if="modalFeaturesList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="mt-2">Henüz madde eklenmemiş</p>
                <button 
                  type="button" 
                  @click="addModalFeature" 
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  İlk Maddeyi Ekle
                </button>
              </div>
            </div>
          </div>

          <!-- Görseller Listesi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Grid Görselleri</h3>
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
            
            <p class="text-sm text-gray-500">Grid içinde kullanılacak görseller</p>

            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(image, index) in modalImagesList" 
                :key="'modal-image-' + index" 
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Görsel #{{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalImage(index)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label :for="'modal-image-position-' + index" class="block text-sm font-medium text-gray-600 mb-1">Grid Pozisyonu</label>
                    <select 
                      v-model="image.position" 
                      :id="'modal-image-position-' + index" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pozisyon seçin</option>
                      <option v-for="pos in imagePositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
                    </select>
                  </div>
                  <div>
                    <label :for="'modal-image-alt-' + index" class="block text-sm font-medium text-gray-600 mb-1">Alt Metni</label>
                    <input 
                      v-model="image.altText" 
                      :id="'modal-image-alt-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Görsel açıklaması" 
                    />
                  </div>
                </div>
                
                <!-- DÜZELTME: Modal Görsel Yönetimi -->
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
                <button 
                  type="button" 
                  @click="addModalImage" 
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  İlk Görseli Ekle
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
            @click="addWeHelpSection" 
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
      title="Bölüm Kaydını Sil"
      message="Bu bölümdeki tüm verileri (ana metinler, özellikler ve görseller) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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
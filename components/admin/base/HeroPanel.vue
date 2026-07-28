<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'heros' 
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const title = ref('')
const subtitle = ref('')
const description = ref('')
const primaryButton = ref('')
const primaryLink = ref('')
const secondaryButton = ref('')
const secondaryLink = ref('')
const image = ref('')
const backgroundImage = ref('')

// Modal için ayrı state'ler
const modalTitle = ref('')
const modalSubtitle = ref('')
const modalDescription = ref('')
const modalPrimaryButton = ref('')
const modalPrimaryLink = ref('')
const modalSecondaryButton = ref('')
const modalSecondaryLink = ref('')
const modalImage = ref('')
const modalBackgroundImage = ref('')

// Yeni eklenen: Local image state'leri takip etmek için
const localImage = ref('')
const localBackgroundImage = ref('')

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// Hero verisini API'den yükler
const loadHero = async () => {
  isLoading.value = true
  try {
    const { data, error } = await useFetch(`/api/hero`)
    
    console.log('Panel API Response:', data.value) // Debug
    
    if (error.value) {
      message.value = 'Hero verisi alınırken hata oluştu: ' + error.value.message
    } else if (data.value?.success && data.value.data) {
      // API'den gelen verileri state'lere ata
      const heroData = data.value.data
      title.value = heroData.title || ''
      subtitle.value = heroData.subtitle || ''
      description.value = heroData.description || ''
      primaryButton.value = heroData.primaryButton || ''
      primaryLink.value = heroData.primaryLink || ''
      secondaryButton.value = heroData.secondaryButton || ''
      secondaryLink.value = heroData.secondaryLink || ''
      image.value = heroData.image || ''
      backgroundImage.value = heroData.backgroundImage || ''
      
      // Local state'leri de güncelle, ancak sadece boşsa
      if (!localImage.value) {
        localImage.value = heroData.image || ''
      }
      if (!localBackgroundImage.value) {
        localBackgroundImage.value = heroData.backgroundImage || ''
      }
      
      message.value = 'Veriler başarıyla yüklendi!'
    } else if (data.value?.success === false) {
      message.value = 'API hatası: ' + (data.value.error || 'Bilinmeyen hata')
    } else {
      message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
    }
  } catch (err) {
    message.value = 'Veri yüklenirken beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadHero()
})

// Hero güncelleme işlemi (PUT)
const updateHero = async () => {
  message.value = ''
  isLoading.value = true

  // Local image state'lerini kullan
  const imageToUpdate = localImage.value || image.value
  const backgroundImageToUpdate = localBackgroundImage.value || backgroundImage.value

  try {
    const { data, error } = await useFetch(`/api/hero`, {
      method: 'PUT',
      body: {
        sectionName: sectionName,
        title: title.value,
        subtitle: subtitle.value,
        description: description.value,
        primaryButton: primaryButton.value,
        primaryLink: primaryLink.value,
        secondaryButton: secondaryButton.value,
        secondaryLink: secondaryLink.value,
        image: imageToUpdate,
        backgroundImage: backgroundImageToUpdate,
      },
    })

    if (error.value) {
      message.value = 'Güncelleme sırasında hata oluştu: ' + error.value.message
    } else if (data.value?.success) {
      message.value = 'Hero bölümü başarıyla güncellendi! 🎉'
      // Local state'leri sıfırla ve veriyi yeniden yükle
      localImage.value = ''
      localBackgroundImage.value = ''
      await loadHero() 
    } else {
      message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || 'Bilinmeyen hata')
    }
  } catch (err) {
    message.value = 'Güncelleme sırasında beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

// Yeni Hero kaydı ekleme işlemi (POST)
const addHero = async () => {
  message.value = ''
  isLoading.value = true
  
  try {
    const { data, error } = await useFetch(`/api/hero`, {
      method: 'POST',
      body: {
        sectionName: sectionName,
        title: modalTitle.value,
        subtitle: modalSubtitle.value,
        description: modalDescription.value,
        primaryButton: modalPrimaryButton.value,
        primaryLink: modalPrimaryLink.value,
        secondaryButton: modalSecondaryButton.value,
        secondaryLink: modalSecondaryLink.value,
        image: modalImage.value,
        backgroundImage: modalBackgroundImage.value,
      },
    })

    if (error.value) {
      message.value = 'Ekleme sırasında hata oluştu: ' + error.value.message
    } else if (data.value?.success) {
      message.value = 'Hero başarıyla eklendi! ✨'
      showAddForm.value = false
      resetModal()
      // Local state'leri sıfırla
      localImage.value = ''
      localBackgroundImage.value = ''
      await loadHero() 
    } else {
      message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || 'Bilinmeyen hata')
    }
  } catch (err) {
    message.value = 'Ekleme sırasında beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

// Hero silme işlemi (DELETE)
const confirmDelete = async () => {
  message.value = ''
  isLoading.value = true
  
  try {
    const { error, data } = await useFetch(`/api/hero`, {
      method: 'DELETE',
      body: { sectionName: sectionName },
    })

    showDeleteModal.value = false

    if (error.value) {
      message.value = 'Silme sırasında hata oluştu: ' + error.value.message
    } else if (data.value?.success) {
      message.value = 'Hero kaydı silindi!🗑️'
      // Tüm state'leri sıfırla
      title.value = ''
      subtitle.value = ''
      description.value = ''
      primaryButton.value = ''
      primaryLink.value = ''
      secondaryButton.value = ''
      secondaryLink.value = ''
      image.value = ''
      backgroundImage.value = ''
      localImage.value = ''
      localBackgroundImage.value = ''
    } else {
      message.value = 'Silme sırasında hata oluştu: ' + (data.value?.error || 'Bilinmeyen hata')
    }
  } catch (err) {
    message.value = 'Silme sırasında beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// ------------------------------------
// DOSYA YÜKLEYİCİ İŞLEMLERİ
// ------------------------------------

/**
 * Ana form için FileUploader'dan gelen URL'i image ref'ine atar.
 * @param {string} url - Yüklenen görselin tam URL'i.
 */
const updateImageUrl = (url) => {
  localImage.value = url
  message.value = 'Ön plan görseli başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

/**
 * Ana form için FileUploader'dan gelen URL'i backgroundImage ref'ine atar.
 * @param {string} url - Yüklenen görselin tam URL'i.
 */
const updateBackgroundImageUrl = (url) => {
  localBackgroundImage.value = url
  message.value = 'Arka plan görseli başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

/**
 * Modal form için FileUploader'dan gelen URL'i modalImage ref'ine atar.
 * @param {string} url - Yüklenen görselin tam URL'i.
 */
const updateModalImageUrl = (url) => {
  modalImage.value = url
}

/**
 * Modal form için FileUploader'dan gelen URL'i modalBackgroundImage ref'ine atar.
 * @param {string} url - Yüklenen görselin tam URL'i.
 */
const updateModalBackgroundImageUrl = (url) => {
  modalBackgroundImage.value = url
}

// Modal state'lerini sıfırla
const resetModal = () => {
  modalTitle.value = ''
  modalSubtitle.value = ''
  modalDescription.value = ''
  modalPrimaryButton.value = ''
  modalPrimaryLink.value = ''
  modalSecondaryButton.value = ''
  modalSecondaryLink.value = ''
  modalImage.value = ''
  modalBackgroundImage.value = ''
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

// Yeni eklenen: Görsel URL'lerini görüntülemek için computed property'ler
const displayImage = () => {
  return localImage.value || image.value
}

const displayBackgroundImage = () => {
  return localBackgroundImage.value || backgroundImage.value
}

// Yeni eklenen: Kayıt var mı kontrolü
const hasData = () => {
  return !!(title.value || subtitle.value || description.value)
}

</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Hero Bölümü Yönetimi 🚀</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('Hata') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form v-if="hasData() || isLoading" @submit.prevent="updateHero" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="title" class="block font-medium text-gray-700 mb-1">Başlık *</label>
          <input id="title" v-model="title" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label for="subtitle" class="block font-medium text-gray-700 mb-1">Alt Başlık</label>
          <input id="subtitle" v-model="subtitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      
      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama</label>
        <textarea id="description" v-model="description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Buton Ayarları</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="primaryButton" class="block font-medium text-gray-700 mb-1">Birincil Buton Metni</label>
          <input id="primaryButton" v-model="primaryButton" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="primaryLink" class="block font-medium text-gray-700 mb-1">Birincil Buton Linki</label>
          <input id="primaryLink" v-model="primaryLink" type="url" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="secondaryButton" class="block font-medium text-gray-700 mb-1">İkincil Buton Metni</label>
          <input id="secondaryButton" v-model="secondaryButton" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="secondaryLink" class="block font-medium text-gray-700 mb-1">İkincil Buton Linki</label>
          <input id="secondaryLink" v-model="secondaryLink" type="url" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Görsel Yönetimi</h2>
      
      <!-- Ön Plan Görseli -->
      <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700">Ön Plan Görseli</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label for="image" class="block font-medium text-gray-700 mb-1">Ön Plan Görsel URL</label>
            <input 
              id="image" 
              :value="displayImage()" 
              type="url" 
              class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
              placeholder="URL otomatik olarak dolacak" 
              readonly
            />
            <p v-if="displayImage()" class="mt-2 text-sm text-gray-500">
              Mevcut Görsel: 
              <a :href="displayImage()" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                {{ displayImage() }}
              </a>
              <span v-if="localImage && localImage !== image" class="ml-2 text-orange-500 font-semibold">
                (Yeni yüklenen - Kaydedilmemiş)
              </span>
            </p>
            <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
          </div>
          <div>
            <FileUploader 
              @file-uploaded="updateImageUrl" 
              label="Yeni Ön Plan Görseli Yükle (JPG, PNG, WEBP)" 
            />
          </div>
        </div>
      </div>

      <!-- Arka Plan Görseli -->
      <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700">Arka Plan Görseli</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label for="backgroundImage" class="block font-medium text-gray-700 mb-1">Arka Plan Görsel URL</label>
            <input 
              id="backgroundImage" 
              :value="displayBackgroundImage()" 
              type="url" 
              class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
              placeholder="URL otomatik olarak dolacak" 
              readonly
            />
            <p v-if="displayBackgroundImage()" class="mt-2 text-sm text-gray-500">
              Mevcut Görsel: 
              <a :href="displayBackgroundImage()" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                {{ displayBackgroundImage() }}
              </a>
              <span v-if="localBackgroundImage && localBackgroundImage !== backgroundImage" class="ml-2 text-orange-500 font-semibold">
                (Yeni yüklenen - Kaydedilmemiş)
              </span>
            </p>
            <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
          </div>
          <div>
            <FileUploader 
              @file-uploaded="updateBackgroundImageUrl" 
              label="Yeni Arka Plan Görseli Yükle (JPG, PNG, WEBP)" 
            />
          </div>
        </div>
      </div>

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
    <div v-if="!hasData() && !isLoading" class="text-center py-12">
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-2xl mx-auto">
        <svg class="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <h3 class="text-xl font-semibold text-yellow-800 mb-2">Hero Kaydı Bulunamadı</h3>
        <p class="text-yellow-700 mb-6">Veritabanında hero bölümü için kayıt bulunamadı. Yeni bir kayıt oluşturmak için aşağıdaki butonu kullanın.</p>
        <button @click="openAddForm" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold shadow-md">
          Yeni Kayıt Ekle (İlk Kaydı Oluştur)
        </button>
      </div>
    </div>
    
    <!-- YENİ KAYIT EKLEME MODAL'I -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Yeni Hero Kaydı Ekle</h2>
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
                <label for="modal-title" class="block font-medium text-gray-700 mb-1">Başlık *</label>
                <input 
                  id="modal-title" 
                  v-model="modalTitle" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              <div>
                <label for="modal-subtitle" class="block font-medium text-gray-700 mb-1">Alt Başlık</label>
                <input 
                  id="modal-subtitle" 
                  v-model="modalSubtitle" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
            
            <div>
              <label for="modal-description" class="block font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea 
                id="modal-description" 
                v-model="modalDescription" 
                rows="4" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <!-- Buton Ayarları -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Buton Ayarları</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="modal-primaryButton" class="block font-medium text-gray-700 mb-1">Birincil Buton Metni</label>
                <input 
                  id="modal-primaryButton" 
                  v-model="modalPrimaryButton" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label for="modal-primaryLink" class="block font-medium text-gray-700 mb-1">Birincil Buton Linki</label>
                <input 
                  id="modal-primaryLink" 
                  v-model="modalPrimaryLink" 
                  type="url" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="modal-secondaryButton" class="block font-medium text-gray-700 mb-1">İkincil Buton Metni</label>
                <input 
                  id="modal-secondaryButton" 
                  v-model="modalSecondaryButton" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label for="modal-secondaryLink" class="block font-medium text-gray-700 mb-1">İkincil Buton Linki</label>
                <input 
                  id="modal-secondaryLink" 
                  v-model="modalSecondaryLink" 
                  type="url" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>

          <!-- Görsel Yönetimi -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Görsel Yönetimi</h3>
            
            <!-- Ön Plan Görseli -->
            <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-700">Ön Plan Görseli</h4>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block font-medium text-gray-700 mb-2">Görsel URL (Otomatik dolacak)</label>
                  <input 
                    v-model="modalImage" 
                    type="url" 
                    class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                    placeholder="Dosya yüklendikten sonra otomatik dolacak" 
                    readonly
                  />
                  <p v-if="modalImage" class="mt-2 text-sm text-green-600">
                    ✓ Görsel başarıyla yüklendi! URL: 
                    <a :href="modalImage" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                      {{ modalImage }}
                    </a>
                  </p>
                  <p v-else class="mt-2 text-sm text-red-500">⚠️ Lütfen görsel yükleyin</p>
                </div>
                <div class="border-t pt-4">
                  <FileUploader 
                    @file-uploaded="updateModalImageUrl" 
                    label="Ön Plan Görseli Yükle (JPG, PNG, WEBP)" 
                  />
                </div>
              </div>
            </div>

            <!-- Arka Plan Görseli -->
            <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-700">Arka Plan Görseli</h4>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block font-medium text-gray-700 mb-2">Görsel URL (Otomatik dolacak)</label>
                  <input 
                    v-model="modalBackgroundImage" 
                    type="url" 
                    class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                    placeholder="Dosya yüklendikten sonra otomatik dolacak" 
                    readonly
                  />
                  <p v-if="modalBackgroundImage" class="mt-2 text-sm text-green-600">
                    ✓ Görsel başarıyla yüklendi! URL: 
                    <a :href="modalBackgroundImage" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                      {{ modalBackgroundImage }}
                    </a>
                  </p>
                  <p v-else class="mt-2 text-sm text-red-500">⚠️ Lütfen görsel yükleyin</p>
                </div>
                <div class="border-t pt-4">
                  <FileUploader 
                    @file-uploaded="updateModalBackgroundImageUrl" 
                    label="Arka Plan Görseli Yükle (JPG, PNG, WEBP)" 
                  />
                </div>
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
            @click="addHero" 
            :disabled="!modalTitle || isLoading"
            class="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
          >
            {{ isLoading ? 'Ekleniyor...' : 'Kaydı Oluştur' }}
          </button>
        </div>
      </div>
    </div>
    
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Hero Kaydını Sil"
      message="Hero bölümündeki tüm verileri silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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
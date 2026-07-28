<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'why-choose-us' 
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const mainTitle = ref('')
const shortDescription = ref('')
const closingStatement = ref('')
const mainImage = ref('')

// Dinamik olarak yönetilen özellikler listesi
const featuresList = ref([])

// Modal için ayrı state'ler
const modalMainImage = ref('')
const modalFeaturesList = ref([])

// Modal form alanları - SADECE TEMEL ALANLAR
const newWhyChooseUsFields = ref([
  { name: 'mainTitle', label: 'Ana Başlık', type: 'text', value: '', required: true },
  { name: 'shortDescription', label: 'Kısa Açıklama', type: 'textarea', value: '' },
  { name: 'closingStatement', label: 'Kapanış Cümlesi', type: 'text', value: '' },
])

// Yeni eklenen: Local image state'i takip etmek için
const localMainImage = ref('')

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// WhyChooseUs verisini API'den yükler
const loadWhyChooseUs = async () => {
  isLoading.value = true
  const { data, error } = await useFetch(`/api/${sectionName}`, { immediate: true })
  
  if (error.value) {
    message.value = 'Neden Bizi Seçmelisiniz verisi alınırken hata oluştu.'
  } else if (data.value && data.value.success !== false) {
    mainTitle.value = data.value.mainTitle || ''
    shortDescription.value = data.value.shortDescription || ''
    closingStatement.value = data.value.closingStatement || ''
    mainImage.value = data.value.mainImage || ''
    // Yeni eklenen: Local state'i de güncelle, ancak sadece boşsa
    if (!localMainImage.value) {
      localMainImage.value = data.value.mainImage || ''
    }
    featuresList.value = data.value.features || [] 
  } else {
    message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
  }
  isLoading.value = false
}

onMounted(() => {
  loadWhyChooseUs()
})

// WhyChooseUs güncelleme işlemi (PUT)
const updateWhyChooseUs = async () => {
  message.value = ''
  isLoading.value = true
  
  featuresList.value.forEach((feature, index) => {
    feature.order = index;
  });

  // Yeni eklenen: Local image state'ini kullan
  const imageToUpdate = localMainImage.value || mainImage.value

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'PUT',
    body: {
      sectionName: sectionName,
      mainTitle: mainTitle.value,
      shortDescription: shortDescription.value,
      closingStatement: closingStatement.value,
      mainImage: imageToUpdate, // Local state'i kullan
      features: featuresList.value.map(feature => ({ 
        iconPath: feature.iconPath,
        title: feature.title, 
        description: feature.description,
        order: feature.order
      })),
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Neden Bizi Seçmelisiniz bölümü başarıyla güncellendi! 🎉'
    // Yeni eklenen: Local state'i sıfırla ve veriyi yeniden yükle
    localMainImage.value = ''
    await loadWhyChooseUs() 
  }
  isLoading.value = false
}

// Yeni WhyChooseUs kaydı ekleme işlemi (POST)
const addWhyChooseUs = async (formData) => {
  message.value = ''
  isLoading.value = true
  
  // Modal'daki özellikleri order ile birlikte hazırla
  const preparedFeatures = modalFeaturesList.value.map((feature, index) => ({
    iconPath: feature.iconPath,
    title: feature.title,
    description: feature.description,
    order: index
  }))
  
  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'POST',
    body: {
      sectionName: sectionName,
      mainTitle: formData.mainTitle,
      shortDescription: formData.shortDescription,
      closingStatement: formData.closingStatement,
      mainImage: modalMainImage.value,
      features: preparedFeatures, 
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Neden Bizi Seçmelisiniz başarıyla eklendi! ✨'
    showAddForm.value = false
    resetModal()
    // Yeni eklenen: Local state'i sıfırla
    localMainImage.value = ''
    await loadWhyChooseUs() 
  }
  isLoading.value = false
}

// WhyChooseUs silme işlemi (DELETE)
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
    message.value = 'Neden Bizi Seçmelisiniz kaydı silindi!🗑️'
    mainTitle.value = ''
    shortDescription.value = ''
    closingStatement.value = ''
    mainImage.value = ''
    localMainImage.value = '' // Yeni eklenen: Local state'i de temizle
    featuresList.value = []
  }
  isLoading.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// ------------------------------------
// DOSYA YÜKLEYİCİ İŞLEMLERİ
// ------------------------------------

/**
 * Ana form için FileUploader'dan gelen URL'i mainImage ref'ine atar.
 * @param {string} url - Yüklenen görselin tam URL'i.
 */
const updateMainImageUrl = (url) => {
  // YENİ: Local state'i güncelle, ana state'i değil
  localMainImage.value = url
  message.value = 'Ana Görsel başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

/**
 * Modal form için FileUploader'dan gelen URL'i modalMainImage ref'ine atar.
 * @param {string} url - Yüklenen görselin tam URL'i.
 */
const updateModalMainImageUrl = (url) => {
  modalMainImage.value = url
}

// Modal state'lerini sıfırla
const resetModal = () => {
  modalMainImage.value = ''
  modalFeaturesList.value = []
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
// DİNAMİK ÖZELLİK (FEATURE) İŞLEMLERİ - ANA FORM
// ------------------------------------

// Yeni bir özellik (feature) ekler
const addFeature = () => {
  featuresList.value.push({ 
    iconPath: '', 
    title: '', 
    description: '', 
    order: featuresList.value.length 
  })
}

// Bir özelliği listeden siler
const removeFeature = (index) => {
  featuresList.value.splice(index, 1)
  featuresList.value.forEach((feature, i) => feature.order = i);
}

// ------------------------------------
// DİNAMİK ÖZELLİK (FEATURE) İŞLEMLERİ - MODAL FORM
// ------------------------------------

// Modal için yeni bir özellik (feature) ekler
const addModalFeature = () => {
  modalFeaturesList.value.push({ 
    iconPath: '', 
    title: '', 
    description: '', 
    order: modalFeaturesList.value.length 
  })
}

// Modal için bir özelliği listeden siler
const removeModalFeature = (index) => {
  modalFeaturesList.value.splice(index, 1)
  modalFeaturesList.value.forEach((feature, i) => feature.order = i);
}

// Yeni eklenen: Görsel URL'ini görüntülemek için computed property
const displayMainImage = () => {
  return localMainImage.value || mainImage.value
}

</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Neden Bizi Seçmelisiniz Bölümü Yönetimi ⚙️</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form @submit.prevent="updateWhyChooseUs" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>
      
      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      
      <div>
        <label for="shortDescription" class="block font-medium text-gray-700 mb-1">Kısa Açıklama Paragrafı</label>
        <textarea id="shortDescription" v-model="shortDescription" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="closingStatement" class="block font-medium text-gray-700 mb-1">Kapanış Cümlesi (İtalik Metin)</label>
        <input id="closingStatement" v-model="closingStatement" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Ana Görsel Yönetimi</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label for="mainImage" class="block font-medium text-gray-700 mb-1">Ana Görsel URL</label>
          <input 
            id="mainImage" 
            :value="displayMainImage()" 
            type="url" 
            class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
            placeholder="URL otomatik olarak dolacak" 
            readonly
          />
          <p v-if="displayMainImage()" class="mt-2 text-sm text-gray-500">
            Mevcut Görsel: 
            <a :href="displayMainImage()" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
              {{ displayMainImage() }}
            </a>
            <span v-if="localMainImage && localMainImage !== mainImage" class="ml-2 text-orange-500 font-semibold">
              (Yeni yüklenen - Kaydedilmemiş)
            </span>
          </p>
          <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
        </div>
        <div>
          <FileUploader 
            @file-uploaded="updateMainImageUrl" 
            label="Yeni Görsel Yükle (JPG, PNG)" 
          />
        </div>
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Taşıma Özellikleri</h2>
      <p class="text-sm text-gray-500">Her özelliğin ikonu, başlığı ve kısa açıklaması.</p>

      <div class="space-y-4">
        <div 
          v-for="(feature, index) in featuresList" 
          :key="'feature-' + (feature.id || index)" 
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Özellik #{{ index + 1 }}</h4>
            <button type="button" @click="removeFeature(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="space-y-2">
            <div>
              <label :for="'feature-icon-' + index" class="block text-sm font-medium text-gray-600">İkon URL (Örn: SVG yolu)</label>
              <input v-model="feature.iconPath" :id="'feature-icon-' + index" type="text" class="w-full p-2 border rounded" placeholder="~/assets/images/shield.svg" />
            </div>
            <div>
              <label :for="'feature-title-' + index" class="block text-sm font-medium text-gray-600">Başlık</label>
              <input v-model="feature.title" :id="'feature-title-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Güvenli Taşıma" required />
            </div>
            <div>
              <label :for="'feature-desc-' + index" class="block text-sm font-medium text-gray-600">Açıklama</label>
              <textarea v-model="feature.description" :id="'feature-desc-' + index" rows="2" class="w-full p-2 border rounded" placeholder="Özellik detayları"></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" @click="addFeature" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Özellik Ekle</span>
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
    
    <!-- YENİ KAYIT EKLEME MODAL'I (Önceki kodu aynen koruyoruz) -->

    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Yeni 'Neden Bizi Seçmelisiniz' Kaydı Ekle</h2>
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
                v-model="newWhyChooseUsFields[0].value" 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            
            <div>
              <label for="modal-shortDescription" class="block font-medium text-gray-700 mb-1">Kısa Açıklama Paragrafı</label>
              <textarea 
                id="modal-shortDescription" 
                v-model="newWhyChooseUsFields[1].value" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label for="modal-closingStatement" class="block font-medium text-gray-700 mb-1">Kapanış Cümlesi (İtalik Metin)</label>
              <input 
                id="modal-closingStatement" 
                v-model="newWhyChooseUsFields[2].value" 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>

          <!-- Ana Görsel Yönetimi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Ana Görsel Yönetimi</h3>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block font-medium text-gray-700 mb-2">Görsel URL (Otomatik dolacak)</label>
                <input 
                  v-model="modalMainImage" 
                  type="url" 
                  class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                  placeholder="Dosya yüklendikten sonra otomatik dolacak" 
                  readonly
                />
                <p v-if="modalMainImage" class="mt-2 text-sm text-green-600">
                  ✓ Görsel başarıyla yüklendi! URL: 
                  <a :href="modalMainImage" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                    {{ modalMainImage }}
                  </a>
                </p>
                <p v-else class="mt-2 text-sm text-red-500">⚠️ Lütfen görsel yükleyin</p>
              </div>
              <div class="border-t pt-4">
                <FileUploader 
                  @file-uploaded="updateModalMainImageUrl" 
                  label="Ana Görsel Yükle (JPG, PNG, WEBP, SVG)" 
                />
              </div>
            </div>
          </div>

          <!-- Özellikler Yönetimi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Taşıma Özellikleri</h3>
              <button 
                type="button" 
                @click="addModalFeature" 
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Özellik Ekle</span>
              </button>
            </div>
            
            <p class="text-sm text-gray-500">Yeni kayıt için özellik ekleyebilirsiniz. (İsteğe bağlı)</p>

            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(feature, index) in modalFeaturesList" 
                :key="'modal-feature-' + index" 
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Özellik #{{ index + 1 }}</h4>
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
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label :for="'modal-feature-icon-' + index" class="block text-sm font-medium text-gray-600 mb-1">İkon URL</label>
                    <input 
                      v-model="feature.iconPath" 
                      :id="'modal-feature-icon-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="~/assets/images/shield.svg" 
                    />
                  </div>
                  <div>
                    <label :for="'modal-feature-title-' + index" class="block text-sm font-medium text-gray-600 mb-1">Başlık</label>
                    <input 
                      v-model="feature.title" 
                      :id="'modal-feature-title-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Örn: Güvenli Taşıma" 
                    />
                  </div>
                  <div>
                    <label :for="'modal-feature-desc-' + index" class="block text-sm font-medium text-gray-600 mb-1">Açıklama</label>
                    <textarea 
                      v-model="feature.description" 
                      :id="'modal-feature-desc-' + index" 
                      rows="2" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Özellik detayları"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div v-if="modalFeaturesList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="mt-2">Henüz özellik eklenmemiş</p>
                <button 
                  type="button" 
                  @click="addModalFeature" 
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  İlk Özelliği Ekle
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
            @click="addWhyChooseUs({
              mainTitle: newWhyChooseUsFields[0].value,
              shortDescription: newWhyChooseUsFields[1].value,
              closingStatement: newWhyChooseUsFields[2].value
            })" 
            :disabled="!newWhyChooseUsFields[0].value || isLoading"
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
      message="Bu bölümdeki tüm verileri (ana metinler ve tüm özellikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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
















<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'about-section' 
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const mainTitle = ref('')
const description1 = ref('')
const description2 = ref('')
const description3 = ref('')
const teamImage = ref('')
const teamImageAlt = ref('')
const historyTitle = ref('')
const historyText1 = ref('')
const historyText2 = ref('')
const historyText3 = ref('')
const seoTitle = ref('')
const seoDescription = ref('')

// Dinamik listeler
const servicesList = ref([])
const statsList = ref([])

// Modal için ayrı state'ler
const modalMainTitle = ref('')
const modalDescription1 = ref('')
const modalDescription2 = ref('')
const modalDescription3 = ref('')
const modalTeamImage = ref('')
const modalTeamImageAlt = ref('')
const modalHistoryTitle = ref('')
const modalHistoryText1 = ref('')
const modalHistoryText2 = ref('')
const modalHistoryText3 = ref('')
const modalSeoTitle = ref('')
const modalSeoDescription = ref('')
const modalServicesList = ref([])
const modalStatsList = ref([])

// Local image state'leri
const localTeamImage = ref('')

// Modal form alanları
const newAboutFields = ref([
  { name: 'mainTitle', label: 'Ana Başlık', type: 'text', value: '', required: true },
  { name: 'description1', label: '1. Paragraf', type: 'textarea', value: '' },
  { name: 'description2', label: '2. Paragraf', type: 'textarea', value: '' },
  { name: 'description3', label: '3. Paragraf', type: 'textarea', value: '' },
  { name: 'teamImageAlt', label: 'Takım Fotoğrafı Alt Metni', type: 'text', value: '' },
  { name: 'historyTitle', label: 'Şirket Tarihçesi Başlığı', type: 'text', value: '' },
  { name: 'historyText1', label: 'Tarihçe 1. Paragraf', type: 'textarea', value: '' },
  { name: 'historyText2', label: 'Tarihçe 2. Paragraf', type: 'textarea', value: '' },
  { name: 'historyText3', label: 'Tarihçe 3. Paragraf', type: 'textarea', value: '' },
  { name: 'seoTitle', label: 'SEO Başlığı', type: 'text', value: '' },
  { name: 'seoDescription', label: 'SEO Açıklaması', type: 'textarea', value: '' },
])

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// AboutSection verisini API'den yükler
const loadAboutSection = async () => {
  isLoading.value = true
  const { data, error } = await useFetch(`/api/${sectionName}`, { immediate: true })
  
  if (error.value) {
    message.value = 'Hakkımızda verisi alınırken hata oluştu.'
  } else if (data.value && data.value.success !== false) {
    mainTitle.value = data.value.mainTitle || ''
    description1.value = data.value.description1 || ''
    description2.value = data.value.description2 || ''
    description3.value = data.value.description3 || ''
    teamImage.value = data.value.teamImage || ''
    teamImageAlt.value = data.value.teamImageAlt || ''
    historyTitle.value = data.value.historyTitle || ''
    historyText1.value = data.value.historyText1 || ''
    historyText2.value = data.value.historyText2 || ''
    historyText3.value = data.value.historyText3 || ''
    seoTitle.value = data.value.seoTitle || ''
    seoDescription.value = data.value.seoDescription || ''
    
    // Local state'i güncelle, ancak sadece boşsa
    if (!localTeamImage.value) {
      localTeamImage.value = data.value.teamImage || ''
    }
    
    servicesList.value = data.value.services || []
    statsList.value = data.value.stats || []
  } else {
    message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
  }
  isLoading.value = false
}

onMounted(() => {
  loadAboutSection()
})

// AboutSection güncelleme işlemi (PUT)
const updateAboutSection = async () => {
  message.value = ''
  isLoading.value = true
  
  servicesList.value.forEach((service, index) => {
    service.order = index;
  });

  statsList.value.forEach((stat, index) => {
    stat.order = index;
  });

  // Local image state'ini kullan
  const imageToUpdate = localTeamImage.value || teamImage.value

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'PUT',
    body: {
      sectionName: sectionName,
      mainTitle: mainTitle.value,
      description1: description1.value,
      description2: description2.value,
      description3: description3.value,
      teamImage: imageToUpdate,
      teamImageAlt: teamImageAlt.value,
      historyTitle: historyTitle.value,
      historyText1: historyText1.value,
      historyText2: historyText2.value,
      historyText3: historyText3.value,
      seoTitle: seoTitle.value,
      seoDescription: seoDescription.value,
      services: servicesList.value.map(service => ({ 
        iconPath: service.iconPath,
        iconAlt: service.iconAlt,
        title: service.title,
        description: service.description,
        order: service.order
      })),
      stats: statsList.value.map(stat => ({
        value: stat.value,
        label: stat.label,
        order: stat.order
      }))
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Hakkımızda bölümü başarıyla güncellendi! 🎉'
    localTeamImage.value = ''
    await loadAboutSection()
  }
  isLoading.value = false
}

// Yeni AboutSection kaydı ekleme işlemi (POST)
const addAboutSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Modal'daki verileri hazırla
  const preparedServices = modalServicesList.value.map((service, index) => ({
    iconPath: service.iconPath,
    iconAlt: service.iconAlt,
    title: service.title,
    description: service.description,
    order: index
  }))
  
  const preparedStats = modalStatsList.value.map((stat, index) => ({
    value: stat.value,
    label: stat.label,
    order: index
  }))
  
  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'POST',
    body: {
      sectionName: sectionName,
      mainTitle: modalMainTitle.value,
      description1: modalDescription1.value,
      description2: modalDescription2.value,
      description3: modalDescription3.value,
      teamImage: modalTeamImage.value,
      teamImageAlt: modalTeamImageAlt.value,
      historyTitle: modalHistoryTitle.value,
      historyText1: modalHistoryText1.value,
      historyText2: modalHistoryText2.value,
      historyText3: modalHistoryText3.value,
      seoTitle: modalSeoTitle.value,
      seoDescription: modalSeoDescription.value,
      services: preparedServices,
      stats: preparedStats
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Hakkımızda bölümü başarıyla eklendi! ✨'
    showAddForm.value = false
    resetModal()
    localTeamImage.value = ''
    await loadAboutSection()
  }
  isLoading.value = false
}

// AboutSection silme işlemi (DELETE)
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
    message.value = 'Hakkımızda kaydı silindi!🗑️'
    resetForm()
    localTeamImage.value = ''
  }
  isLoading.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// Formu sıfırla
const resetForm = () => {
  mainTitle.value = ''
  description1.value = ''
  description2.value = ''
  description3.value = ''
  teamImage.value = ''
  teamImageAlt.value = ''
  historyTitle.value = ''
  historyText1.value = ''
  historyText2.value = ''
  historyText3.value = ''
  seoTitle.value = ''
  seoDescription.value = ''
  servicesList.value = []
  statsList.value = []
}

// Modal'ı sıfırla
const resetModal = () => {
  modalMainTitle.value = ''
  modalDescription1.value = ''
  modalDescription2.value = ''
  modalDescription3.value = ''
  modalTeamImage.value = ''
  modalTeamImageAlt.value = ''
  modalHistoryTitle.value = ''
  modalHistoryText1.value = ''
  modalHistoryText2.value = ''
  modalHistoryText3.value = ''
  modalSeoTitle.value = ''
  modalSeoDescription.value = ''
  modalServicesList.value = []
  modalStatsList.value = []
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
// DOSYA YÜKLEYİCİ İŞLEMLERİ
// ------------------------------------

/**
 * Ana form için FileUploader'dan gelen URL'i teamImage ref'ine atar.
 */
const updateTeamImageUrl = (url) => {
  localTeamImage.value = url
  message.value = 'Takım fotoğrafı başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

/**
 * Modal form için FileUploader'dan gelen URL'i modalTeamImage ref'ine atar.
 */
const updateModalTeamImageUrl = (url) => {
  modalTeamImage.value = url
}

// Görsel URL'ini görüntülemek için computed property
const displayTeamImage = () => {
  return localTeamImage.value || teamImage.value
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - ANA FORM
// ------------------------------------

// Yeni bir hizmet ekler
const addService = () => {
  servicesList.value.push({ 
    iconPath: '', 
    iconAlt: '', 
    title: '', 
    description: '', 
    order: servicesList.value.length 
  })
}

// Bir hizmeti listeden siler
const removeService = (index) => {
  servicesList.value.splice(index, 1)
  servicesList.value.forEach((service, i) => service.order = i);
}

// Yeni bir istatistik ekler
const addStat = () => {
  statsList.value.push({ 
    value: '', 
    label: '', 
    order: statsList.value.length 
  })
}

// Bir istatistiği listeden siler
const removeStat = (index) => {
  statsList.value.splice(index, 1)
  statsList.value.forEach((stat, i) => stat.order = i);
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - MODAL FORM
// ------------------------------------

// Modal için yeni bir hizmet ekler
const addModalService = () => {
  modalServicesList.value.push({ 
    iconPath: '', 
    iconAlt: '', 
    title: '', 
    description: '', 
    order: modalServicesList.value.length 
  })
}

// Modal için bir hizmeti listeden siler
const removeModalService = (index) => {
  modalServicesList.value.splice(index, 1)
  modalServicesList.value.forEach((service, i) => service.order = i);
}

// Modal için yeni bir istatistik ekler
const addModalStat = () => {
  modalStatsList.value.push({ 
    value: '', 
    label: '', 
    order: modalStatsList.value.length 
  })
}

// Modal için bir istatistiği listeden siler
const removeModalStat = (index) => {
  modalStatsList.value.splice(index, 1)
  modalStatsList.value.forEach((stat, i) => stat.order = i);
}

</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Hakkımızda Bölümü Yönetimi ⚙️</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form @submit.prevent="updateAboutSection" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <h2 class="text-2xl font-semibold border-b pb-2 text-primary mb-6">Başlık ve Tanıtım</h2>
      
      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      
      <div>
        <label for="description1" class="block font-medium text-gray-700 mb-1">1. Paragraf</label>
        <textarea id="description1" v-model="description1" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="description2" class="block font-medium text-gray-700 mb-1">2. Paragraf</label>
        <textarea id="description2" v-model="description2" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="description3" class="block font-medium text-gray-700 mb-1">3. Paragraf</label>
        <textarea id="description3" v-model="description3" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">Takım Fotoğrafı</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label for="teamImage" class="block font-medium text-gray-700 mb-1">Takım Fotoğrafı URL</label>
          <input 
            id="teamImage" 
            :value="displayTeamImage()" 
            type="url" 
            class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
            placeholder="URL otomatik olarak dolacak" 
            readonly
          />
          <p v-if="displayTeamImage()" class="mt-2 text-sm text-gray-500">
            Mevcut Fotoğraf: 
            <a :href="displayTeamImage()" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
              {{ displayTeamImage() }}
            </a>
            <span v-if="localTeamImage && localTeamImage !== teamImage" class="ml-2 text-orange-500 font-semibold">
              (Yeni yüklenen - Kaydedilmemiş)
            </span>
          </p>
          <p v-else class="mt-2 text-sm text-red-500">Mevcut Fotoğraf Yok.</p>
        </div>
        <div>
          <FileUploader 
            @file-uploaded="updateTeamImageUrl" 
            label="Yeni Takım Fotoğrafı Yükle (JPG, PNG)" 
          />
        </div>
      </div>

      <div>
        <label for="teamImageAlt" class="block font-medium text-gray-700 mb-1">Takım Fotoğrafı Alt Metni</label>
        <input id="teamImageAlt" v-model="teamImageAlt" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Profesyonel Nakliyat Ekibimiz İş Başında" />
      </div>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">Şirket Tarihçesi</h2>
      
      <div>
        <label for="historyTitle" class="block font-medium text-gray-700 mb-1">Tarihçe Başlığı</label>
        <input id="historyTitle" v-model="historyTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label for="historyText1" class="block font-medium text-gray-700 mb-1">Tarihçe 1. Paragraf</label>
        <textarea id="historyText1" v-model="historyText1" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="historyText2" class="block font-medium text-gray-700 mb-1">Tarihçe 2. Paragraf</label>
        <textarea id="historyText2" v-model="historyText2" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="historyText3" class="block font-medium text-gray-700 mb-1">Tarihçe 3. Paragraf</label>
        <textarea id="historyText3" v-model="historyText3" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">Hizmet Detayları</h2>
      <p class="text-sm text-gray-500 mb-4">Her hizmet için ikon, ikon alt metni, başlık ve açıklama.</p>

      <div class="space-y-4">
        <div 
          v-for="(service, index) in servicesList" 
          :key="'service-' + (service.id || index)" 
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Hizmet #{{ index + 1 }}</h4>
            <button type="button" @click="removeService(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label :for="'service-icon-' + index" class="block text-sm font-medium text-gray-600">İkon URL</label>
              <input v-model="service.iconPath" :id="'service-icon-' + index" type="text" class="w-full p-2 border rounded" placeholder="~/assets/images/shield.svg" />
            </div>
            <div>
              <label :for="'service-icon-alt-' + index" class="block text-sm font-medium text-gray-600">İkon Alt Metni</label>
              <input v-model="service.iconAlt" :id="'service-icon-alt-' + index" type="text" class="w-full p-2 border rounded" placeholder="Güvenli Taşıma" />
            </div>
            <div class="md:col-span-2">
              <label :for="'service-title-' + index" class="block text-sm font-medium text-gray-600">Hizmet Başlığı</label>
              <input v-model="service.title" :id="'service-title-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Sigortalı Taşıma" required />
            </div>
            <div class="md:col-span-2">
              <label :for="'service-desc-' + index" class="block text-sm font-medium text-gray-600">Hizmet Açıklaması</label>
              <textarea v-model="service.description" :id="'service-desc-' + index" rows="2" class="w-full p-2 border rounded" placeholder="Hizmet detayları"></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" @click="addService" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Hizmet Ekle</span>
      </button>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">İstatistikler</h2>
      <p class="text-sm text-gray-500 mb-4">Her istatistik için değer ve etiket.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="(stat, index) in statsList" 
          :key="'stat-' + (stat.id || index)" 
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">İstatistik #{{ index + 1 }}</h4>
            <button type="button" @click="removeStat(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="space-y-2">
            <div>
              <label :for="'stat-value-' + index" class="block text-sm font-medium text-gray-600">Değer</label>
              <input v-model="stat.value" :id="'stat-value-' + index" type="text" class="w-full p-2 border rounded" placeholder="15+" required />
            </div>
            <div>
              <label :for="'stat-label-' + index" class="block text-sm font-medium text-gray-600">Etiket</label>
              <input v-model="stat.label" :id="'stat-label-' + index" type="text" class="w-full p-2 border rounded" placeholder="Yıllık Deneyim" required />
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" @click="addStat" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni İstatistik Ekle</span>
      </button>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">SEO Ayarları</h2>
      
      <div>
        <label for="seoTitle" class="block font-medium text-gray-700 mb-1">SEO Başlığı</label>
        <input id="seoTitle" v-model="seoTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Hakkımızda | İstanbulun En Güvenilir Nakliyat Şirketi" />
      </div>

      <div>
        <label for="seoDescription" class="block font-medium text-gray-700 mb-1">SEO Açıklaması</label>
        <textarea id="seoDescription" v-model="seoDescription" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="15 yıllık nakliyat deneyimiyle..."></textarea>
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
    <button v-if="!mainTitle && !isLoading" @click="openAddForm" class="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold shadow-md">
      Yeni Kayıt Ekle (İlk Kaydı Oluştur)
    </button>
    
    <!-- YENİ KAYIT EKLEME MODAL'I -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Yeni 'Hakkımızda' Kaydı Ekle</h2>
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
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Başlık ve Tanıtım</h3>
            
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
              <label for="modal-description1" class="block font-medium text-gray-700 mb-1">1. Paragraf</label>
              <textarea 
                id="modal-description1" 
                v-model="modalDescription1" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label for="modal-description2" class="block font-medium text-gray-700 mb-1">2. Paragraf</label>
              <textarea 
                id="modal-description2" 
                v-model="modalDescription2" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label for="modal-description3" class="block font-medium text-gray-700 mb-1">3. Paragraf</label>
              <textarea 
                id="modal-description3" 
                v-model="modalDescription3" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <!-- Takım Fotoğrafı -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Takım Fotoğrafı Yönetimi</h3>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block font-medium text-gray-700 mb-1">Takım Fotoğrafı Alt Metni</label>
                <input 
                  v-model="modalTeamImageAlt" 
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Profesyonel Nakliyat Ekibimiz İş Başında"
                />
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-2">Fotoğraf URL (Otomatik dolacak)</label>
                <input 
                  v-model="modalTeamImage" 
                  type="url" 
                  class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                  placeholder="Dosya yüklendikten sonra otomatik dolacak" 
                  readonly
                />
                <p v-if="modalTeamImage" class="mt-2 text-sm text-green-600">
                  ✓ Fotoğraf başarıyla yüklendi! URL: 
                  <a :href="modalTeamImage" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                    {{ modalTeamImage }}
                  </a>
                </p>
                <p v-else class="mt-2 text-sm text-red-500">⚠️ Lütfen takım fotoğrafı yükleyin</p>
              </div>
              <div class="border-t pt-4">
                <FileUploader 
                  @file-uploaded="updateModalTeamImageUrl" 
                  label="Takım Fotoğrafı Yükle (JPG, PNG)" 
                />
              </div>
            </div>
          </div>

          <!-- Şirket Tarihçesi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Şirket Tarihçesi</h3>
            
            <div>
              <label for="modal-historyTitle" class="block font-medium text-gray-700 mb-1">Tarihçe Başlığı</label>
              <input 
                id="modal-historyTitle" 
                v-model="modalHistoryTitle" 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>

            <div>
              <label for="modal-historyText1" class="block font-medium text-gray-700 mb-1">Tarihçe 1. Paragraf</label>
              <textarea 
                id="modal-historyText1" 
                v-model="modalHistoryText1" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label for="modal-historyText2" class="block font-medium text-gray-700 mb-1">Tarihçe 2. Paragraf</label>
              <textarea 
                id="modal-historyText2" 
                v-model="modalHistoryText2" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label for="modal-historyText3" class="block font-medium text-gray-700 mb-1">Tarihçe 3. Paragraf</label>
              <textarea 
                id="modal-historyText3" 
                v-model="modalHistoryText3" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <!-- SEO Ayarları -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">SEO Ayarları</h3>
            
            <div>
              <label for="modal-seoTitle" class="block font-medium text-gray-700 mb-1">SEO Başlığı</label>
              <input 
                id="modal-seoTitle" 
                v-model="modalSeoTitle" 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Hakkımızda | İstanbulun En Güvenilir Nakliyat Şirketi"
              />
            </div>

            <div>
              <label for="modal-seoDescription" class="block font-medium text-gray-700 mb-1">SEO Açıklaması</label>
              <textarea 
                id="modal-seoDescription" 
                v-model="modalSeoDescription" 
                rows="3" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="15 yıllık nakliyat deneyimiyle..."
              ></textarea>
            </div>
          </div>

          <!-- Hizmetler Yönetimi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Hizmet Detayları</h3>
              <button 
                type="button" 
                @click="addModalService" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Hizmet Ekle</span>
              </button>
            </div>
            
            <p class="text-sm text-gray-500">Yeni kayıt için hizmet ekleyebilirsiniz. (İsteğe bağlı)</p>

            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(service, index) in modalServicesList" 
                :key="'modal-service-' + index" 
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Hizmet #{{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalService(index)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label :for="'modal-service-icon-' + index" class="block text-sm font-medium text-gray-600 mb-1">İkon URL</label>
                    <input 
                      v-model="service.iconPath" 
                      :id="'modal-service-icon-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="~/assets/images/shield.svg" 
                    />
                  </div>
                  <div>
                    <label :for="'modal-service-icon-alt-' + index" class="block text-sm font-medium text-gray-600 mb-1">İkon Alt Metni</label>
                    <input 
                      v-model="service.iconAlt" 
                      :id="'modal-service-icon-alt-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Güvenli Taşıma" 
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label :for="'modal-service-title-' + index" class="block text-sm font-medium text-gray-600 mb-1">Hizmet Başlığı</label>
                    <input 
                      v-model="service.title" 
                      :id="'modal-service-title-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Örn: Sigortalı Taşıma" 
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label :for="'modal-service-desc-' + index" class="block text-sm font-medium text-gray-600 mb-1">Hizmet Açıklaması</label>
                    <textarea 
                      v-model="service.description" 
                      :id="'modal-service-desc-' + index" 
                      rows="2" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Hizmet detayları"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div v-if="modalServicesList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p class="mt-2">Henüz hizmet eklenmemiş</p>
                <button 
                  type="button" 
                  @click="addModalService" 
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  İlk Hizmeti Ekle
                </button>
              </div>
            </div>
          </div>

          <!-- İstatistikler Yönetimi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">İstatistikler</h3>
              <button 
                type="button" 
                @click="addModalStat" 
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>İstatistik Ekle</span>
              </button>
            </div>
            
            <p class="text-sm text-gray-500">Yeni kayıt için istatistik ekleyebilirsiniz. (İsteğe bağlı)</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(stat, index) in modalStatsList" 
                :key="'modal-stat-' + index" 
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">İstatistik #{{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalStat(index)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div class="space-y-2">
                  <div>
                    <label :for="'modal-stat-value-' + index" class="block text-sm font-medium text-gray-600 mb-1">Değer</label>
                    <input 
                      v-model="stat.value" 
                      :id="'modal-stat-value-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="15+" 
                    />
                  </div>
                  <div>
                    <label :for="'modal-stat-label-' + index" class="block text-sm font-medium text-gray-600 mb-1">Etiket</label>
                    <input 
                      v-model="stat.label" 
                      :id="'modal-stat-label-' + index" 
                      type="text" 
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Yıllık Deneyim" 
                    />
                  </div>
                </div>
              </div>
              
              <div v-if="modalStatsList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg md:col-span-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p class="mt-2">Henüz istatistik eklenmemiş</p>
                <button 
                  type="button" 
                  @click="addModalStat" 
                  class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150"
                >
                  İlk İstatistiği Ekle
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
            @click="addAboutSection" 
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
      title="Hakkımızda Kaydını Sil"
      message="Bu bölümdeki tüm verileri (metinler, hizmetler ve istatistikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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
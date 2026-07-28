<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'pricing-section' 
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const mainTitle = ref('')
const description = ref('')

// Dinamik olarak yönetilen listeler
const pricingPlansList = ref([])

// Modal için ayrı state'ler
const modalMainTitle = ref('')
const modalDescription = ref('')
const modalPricingPlansList = ref([])

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// PricingSection verisini API'den yükler
const loadPricingSection = async () => {
  isLoading.value = true
  const { data, error } = await useFetch(`/api/${sectionName}`, { immediate: true })
  
  if (error.value) {
    message.value = 'Pricing Section verisi alınırken hata oluştu.'
  } else if (data.value && data.value.success !== false) {
    mainTitle.value = data.value.mainTitle || ''
    description.value = data.value.description || ''
    pricingPlansList.value = data.value.pricingPlans || []
  } else {
    message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
  }
  isLoading.value = false
}

onMounted(() => {
  loadPricingSection()
})

// PricingSection güncelleme işlemi (PUT)
const updatePricingSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Order değerlerini güncelle
  pricingPlansList.value.forEach((plan, index) => {
    plan.order = index
    if (plan.features) {
      plan.features.forEach((feature, featureIndex) => {
        feature.order = featureIndex
      })
    }
  })

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'PUT',
    body: {
      sectionName: sectionName,
      mainTitle: mainTitle.value,
      description: description.value,
      pricingPlans: pricingPlansList.value.map(plan => ({
        name: plan.name,
        subtitle: plan.subtitle,
        price: plan.price,
        priceSuffix: plan.priceSuffix,
        isPopular: plan.isPopular,
        isFeatured: plan.isFeatured,
        buttonText: plan.buttonText,
        buttonLink: plan.buttonLink,
        buttonAriaLabel: plan.buttonAriaLabel,
        order: plan.order,
        features: plan.features ? plan.features.map(feature => ({
          text: feature.text,
          isIncluded: feature.isIncluded,
          order: feature.order
        })) : []
      })),
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Pricing Section başarıyla güncellendi! 🎉'
    await loadPricingSection()
  }
  isLoading.value = false
}

// Yeni PricingSection kaydı ekleme işlemi (POST)
const addPricingSection = async () => {
  message.value = ''
  isLoading.value = true
  
  // Modal'daki verileri order ile birlikte hazırla
  const preparedPricingPlans = modalPricingPlansList.value.map((plan, index) => ({
    name: plan.name,
    subtitle: plan.subtitle,
    price: plan.price,
    priceSuffix: plan.priceSuffix,
    isPopular: plan.isPopular,
    isFeatured: plan.isFeatured,
    buttonText: plan.buttonText,
    buttonLink: plan.buttonLink,
    buttonAriaLabel: plan.buttonAriaLabel,
    order: index,
    features: plan.features ? plan.features.map((feature, featureIndex) => ({
      text: feature.text,
      isIncluded: feature.isIncluded,
      order: featureIndex
    })) : []
  }))
  
  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'POST',
    body: {
      sectionName: sectionName,
      mainTitle: modalMainTitle.value,
      description: modalDescription.value,
      pricingPlans: preparedPricingPlans,
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Pricing Section başarıyla eklendi! ✨'
    showAddForm.value = false
    resetModal()
    await loadPricingSection()
  }
  isLoading.value = false
}

// PricingSection silme işlemi (DELETE)
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
    message.value = 'Pricing Section kaydı silindi!🗑️'
    mainTitle.value = ''
    description.value = ''
    pricingPlansList.value = []
  }
  isLoading.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// Modal state'lerini sıfırla
const resetModal = () => {
  modalMainTitle.value = ''
  modalDescription.value = ''
  modalPricingPlansList.value = []
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

// Yeni bir fiyat planı ekler
const addPricingPlan = () => {
  pricingPlansList.value.push({ 
    name: '',
    subtitle: '',
    price: '',
    priceSuffix: '/başlangıç',
    isPopular: false,
    isFeatured: false,
    buttonText: 'Detaylı Bilgi',
    buttonLink: '',
    buttonAriaLabel: '',
    order: pricingPlansList.value.length,
    features: []
  })
}

// Bir fiyat planını listeden siler
const removePricingPlan = (index) => {
  pricingPlansList.value.splice(index, 1)
  pricingPlansList.value.forEach((plan, i) => plan.order = i)
}

// Bir fiyat planına yeni özellik ekler
const addFeatureToPlan = (planIndex) => {
  if (!pricingPlansList.value[planIndex].features) {
    pricingPlansList.value[planIndex].features = []
  }
  pricingPlansList.value[planIndex].features.push({ 
    text: '', 
    isIncluded: true,
    order: pricingPlansList.value[planIndex].features.length 
  })
}

// Bir fiyat planından özellik siler
const removeFeatureFromPlan = (planIndex, featureIndex) => {
  pricingPlansList.value[planIndex].features.splice(featureIndex, 1)
  pricingPlansList.value[planIndex].features.forEach((feature, i) => feature.order = i)
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - MODAL FORM
// ------------------------------------

// Modal için yeni bir fiyat planı ekler
const addModalPricingPlan = () => {
  modalPricingPlansList.value.push({ 
    name: '',
    subtitle: '',
    price: '',
    priceSuffix: '/başlangıç',
    isPopular: false,
    isFeatured: false,
    buttonText: 'Detaylı Bilgi',
    buttonLink: '',
    buttonAriaLabel: '',
    order: modalPricingPlansList.value.length,
    features: []
  })
}

// Modal için bir fiyat planını listeden siler
const removeModalPricingPlan = (index) => {
  modalPricingPlansList.value.splice(index, 1)
  modalPricingPlansList.value.forEach((plan, i) => plan.order = i)
}

// Modal için bir fiyat planına yeni özellik ekler
const addModalFeatureToPlan = (planIndex) => {
  if (!modalPricingPlansList.value[planIndex].features) {
    modalPricingPlansList.value[planIndex].features = []
  }
  modalPricingPlansList.value[planIndex].features.push({ 
    text: '', 
    isIncluded: true,
    order: modalPricingPlansList.value[planIndex].features.length 
  })
}

// Modal için bir fiyat planından özellik siler
const removeModalFeatureFromPlan = (planIndex, featureIndex) => {
  modalPricingPlansList.value[planIndex].features.splice(featureIndex, 1)
  modalPricingPlansList.value[planIndex].features.forEach((feature, i) => feature.order = i)
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Fiyatlandırma Bölümü Yönetimi ⚙️</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form @submit.prevent="updatePricingSection" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>
      
      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      
      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama Paragrafı</label>
        <textarea id="description" v-model="description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <!-- Fiyat Planları Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Fiyat Planları</h2>
      <p class="text-sm text-gray-500">Müşterilere sunulan fiyatlandırma paketleri</p>

      <div class="space-y-6">
        <div 
          v-for="(plan, planIndex) in pricingPlansList" 
          :key="'plan-' + (plan.id || planIndex)" 
          class="p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-150"
          :class="{ 'border-[#3b5d50] bg-green-50': plan.isFeatured }"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-bold text-xl text-gray-700">Plan #{{ planIndex + 1 }}</h4>
            <div class="flex items-center space-x-2">
              <!-- Popüler Plan Etiketi -->
              <div v-if="plan.isPopular" class="bg-[#f9bf29] text-xs font-bold text-gray-800 px-3 py-1 rounded transform rotate-12">
                EN ÇOK TERCİH
              </div>
              <button type="button" @click="removePricingPlan(planIndex)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Plan Temel Bilgileri -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label :for="'plan-name-' + planIndex" class="block text-sm font-medium text-gray-600">Plan Adı *</label>
              <input v-model="plan.name" :id="'plan-name-' + planIndex" type="text" class="w-full p-2 border rounded" placeholder="Örn: Ekonomik Taşıma" required />
            </div>
            <div>
              <label :for="'plan-subtitle-' + planIndex" class="block text-sm font-medium text-gray-600">Alt Başlık</label>
              <input v-model="plan.subtitle" :id="'plan-subtitle-' + planIndex" type="text" class="w-full p-2 border rounded" placeholder="Örn: Temel nakliye hizmeti" />
            </div>
            <div>
              <label :for="'plan-price-' + planIndex" class="block text-sm font-medium text-gray-600">Fiyat *</label>
              <input v-model="plan.price" :id="'plan-price-' + planIndex" type="text" class="w-full p-2 border rounded" placeholder="Örn: 1.499₺" required />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label :for="'plan-priceSuffix-' + planIndex" class="block text-sm font-medium text-gray-600">Fiyat Eki</label>
              <input v-model="plan.priceSuffix" :id="'plan-priceSuffix-' + planIndex" type="text" class="w-full p-2 border rounded" placeholder="/başlangıç" />
            </div>
            <div>
              <label :for="'plan-buttonText-' + planIndex" class="block text-sm font-medium text-gray-600">Buton Metni *</label>
              <input v-model="plan.buttonText" :id="'plan-buttonText-' + planIndex" type="text" class="w-full p-2 border rounded" placeholder="Detaylı Bilgi" required />
            </div>
            <div>
              <label :for="'plan-buttonLink-' + planIndex" class="block text-sm font-medium text-gray-600">Buton Linki *</label>
              <input v-model="plan.buttonLink" :id="'plan-buttonLink-' + planIndex" type="text" class="w-full p-2 border rounded" placeholder="/ekonomik-paket" required />
            </div>
            <div>
              <label :for="'plan-buttonAriaLabel-' + planIndex" class="block text-sm font-medium text-gray-600">Aria Label</label>
              <input v-model="plan.buttonAriaLabel" :id="'plan-buttonAriaLabel-' + planIndex" type="text" class="w-full p-2 border rounded" placeholder="Erişilebilirlik metni" />
            </div>
          </div>

          <!-- Plan Özellikleri -->
          <div class="flex items-center justify-between mb-4">
            <h5 class="font-semibold text-lg text-gray-700">Plan Özellikleri</h5>
            <button type="button" @click="addFeatureToPlan(planIndex)" class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 text-sm">
              Özellik Ekle
            </button>
          </div>

          <div class="space-y-3">
            <div 
              v-for="(feature, featureIndex) in plan.features" 
              :key="'feature-' + (feature.id || featureIndex)" 
              class="p-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between"
            >
              <div class="flex items-center space-x-3 flex-1">
                <input 
                  v-model="feature.isIncluded" 
                  type="checkbox" 
                  class="h-5 w-5 text-[#3b5d50] rounded focus:ring-[#3b5d50]"
                />
                <input 
                  v-model="feature.text" 
                  type="text" 
                  class="flex-1 p-2 border rounded"
                  placeholder="Örn: 1 oda eşya taşıma"
                />
              </div>
              <button 
                type="button" 
                @click="removeFeatureFromPlan(planIndex, featureIndex)" 
                class="ml-3 text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <div v-if="!plan.features || plan.features.length === 0" class="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p>Henüz özellik eklenmemiş</p>
            </div>
          </div>

          <!-- Plan Ayarları -->
          <div class="mt-4 p-3 bg-white rounded-lg border">
            <h6 class="font-medium text-gray-700 mb-2">Plan Ayarları</h6>
            <div class="flex space-x-4">
              <label class="flex items-center space-x-2">
                <input v-model="plan.isPopular" type="checkbox" class="h-4 w-4 text-[#f9bf29] rounded focus:ring-[#f9bf29]" />
                <span class="text-sm text-gray-600">Popüler Plan (EN ÇOK TERCİH etiketi)</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="plan.isFeatured" type="checkbox" class="h-4 w-4 text-[#3b5d50] rounded focus:ring-[#3b5d50]" />
                <span class="text-sm text-gray-600">Öne Çıkan Plan (Border vurgulu)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" @click="addPricingPlan" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Yeni Fiyat Planı Ekle</span>
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
          <h2 class="text-2xl font-bold text-gray-800">Yeni Pricing Section Kaydı Ekle</h2>
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
          </div>

          <!-- Fiyat Planları -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Fiyat Planları</h3>
              <button 
                type="button" 
                @click="addModalPricingPlan" 
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Plan Ekle</span>
              </button>
            </div>
            
            <p class="text-sm text-gray-500">Müşterilere sunulan fiyatlandırma paketleri</p>

            <div class="space-y-6 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(plan, planIndex) in modalPricingPlansList" 
                :key="'modal-plan-' + planIndex" 
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">Plan #{{ planIndex + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeModalPricingPlan(planIndex)" 
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- Plan Temel Bilgileri -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Plan Adı *</label>
                    <input v-model="plan.name" type="text" class="w-full p-2 border rounded" placeholder="Örn: Ekonomik Taşıma" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Alt Başlık</label>
                    <input v-model="plan.subtitle" type="text" class="w-full p-2 border rounded" placeholder="Örn: Temel nakliye hizmeti" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Fiyat *</label>
                    <input v-model="plan.price" type="text" class="w-full p-2 border rounded" placeholder="Örn: 1.499₺" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Fiyat Eki</label>
                    <input v-model="plan.priceSuffix" type="text" class="w-full p-2 border rounded" placeholder="/başlangıç" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Buton Metni *</label>
                    <input v-model="plan.buttonText" type="text" class="w-full p-2 border rounded" placeholder="Detaylı Bilgi" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Buton Linki *</label>
                    <input v-model="plan.buttonLink" type="text" class="w-full p-2 border rounded" placeholder="/ekonomik-paket" required />
                  </div>
                </div>

                <!-- Plan Özellikleri -->
                <div class="mb-4">
                  <div class="flex justify-between items-center mb-2">
                    <h5 class="font-semibold text-gray-700">Plan Özellikleri</h5>
                    <button type="button" @click="addModalFeatureToPlan(planIndex)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                      Özellik Ekle
                    </button>
                  </div>
                  
                  <div class="space-y-2">
                    <div 
                      v-for="(feature, featureIndex) in plan.features" 
                      :key="'modal-feature-' + featureIndex" 
                      class="p-2 border border-gray-200 rounded bg-gray-50 flex items-center justify-between"
                    >
                      <div class="flex items-center space-x-2 flex-1">
                        <input v-model="feature.isIncluded" type="checkbox" class="h-4 w-4 text-[#3b5d50] rounded" />
                        <input v-model="feature.text" type="text" class="flex-1 p-1 border rounded text-sm" placeholder="Özellik metni" />
                      </div>
                      <button type="button" @click="removeModalFeatureFromPlan(planIndex, featureIndex)" class="text-red-500 hover:text-red-700 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div v-if="!plan.features || plan.features.length === 0" class="text-center py-2 text-gray-500 text-sm">
                      Henüz özellik eklenmemiş
                    </div>
                  </div>
                </div>

                <!-- Plan Ayarları -->
                <div class="flex space-x-4 text-sm">
                  <label class="flex items-center space-x-1">
                    <input v-model="plan.isPopular" type="checkbox" class="h-3 w-3 text-[#f9bf29] rounded" />
                    <span class="text-gray-600">Popüler Plan</span>
                  </label>
                  <label class="flex items-center space-x-1">
                    <input v-model="plan.isFeatured" type="checkbox" class="h-3 w-3 text-[#3b5d50] rounded" />
                    <span class="text-gray-600">Öne Çıkan Plan</span>
                  </label>
                </div>
              </div>
              
              <div v-if="modalPricingPlansList.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2">Henüz fiyat planı eklenmemiş</p>
                <button 
                  type="button" 
                  @click="addModalPricingPlan" 
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  İlk Planı Ekle
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
            @click="addPricingSection" 
            :disabled="!modalMainTitle || modalPricingPlansList.length === 0 || isLoading"
            class="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
          >
            {{ isLoading ? 'Ekleniyor...' : 'Kaydı Oluştur' }}
          </button>
        </div>
      </div>
    </div>
    
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Fiyatlandırma Bölümünü Sil"
      message="Bu bölümdeki tüm verileri (ana metinler, fiyat planları ve özellikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
      confirmText="Evet, Kaydı Sil"
      cancelText="İptal Et"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
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
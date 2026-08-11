<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('pricing-section', 'pricing-section', {
  mainTitle: '',
  description: '',
  pricingPlans: [],
});

const addPricingPlan = () => {
  form.pricingPlans.push({
    name: '',
    subtitle: '',
    price: '',
    priceSuffix: '/başlangıç',
    isPopular: false,
    isFeatured: false,
    buttonText: 'Detaylı Bilgi',
    buttonLink: '',
    buttonAriaLabel: '',
    order: form.pricingPlans.length,
    features: []
  })
}

const removePricingPlan = (index) => {
  form.pricingPlans.splice(index, 1)
  form.pricingPlans.forEach((plan, i) => plan.order = i)
}

const addFeatureToPlan = (planIndex) => {
  if (!form.pricingPlans[planIndex].features) {
    form.pricingPlans[planIndex].features = []
  }
  form.pricingPlans[planIndex].features.push({
    text: '',
    isIncluded: true,
    order: form.pricingPlans[planIndex].features.length
  })
}

const removeFeatureFromPlan = (planIndex, featureIndex) => {
  form.pricingPlans[planIndex].features.splice(featureIndex, 1)
  form.pricingPlans[planIndex].features.forEach((feature, i) => feature.order = i)
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Fiyatlandırma Bölümü Yönetimi ⚙️</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>

      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="form.mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama Paragrafı</label>
        <textarea id="description" v-model="form.description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <!-- Fiyat Planları Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Fiyat Planları</h2>
      <p class="text-sm text-gray-500">Müşterilere sunulan fiyatlandırma paketleri</p>

      <div class="space-y-6">
        <div
          v-for="(plan, planIndex) in form.pricingPlans"
          :key="'plan-' + (plan.id || planIndex)"
          class="p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-150"
          :class="{ 'border-[#3b5d50] bg-green-50': plan.isFeatured }"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-bold text-xl text-gray-700">Plan #{{ planIndex + 1 }}</h4>
            <div class="flex items-center space-x-2">
              <div v-if="plan.isPopular" class="bg-[#f9bf29] text-xs font-bold text-gray-800 px-3 py-1 rounded transform rotate-12">
                EN ÇOK TERCİH
              </div>
              <button :aria-label="`${planIndex + 1}. Fiyat planını sil`" type="button" @click="removePricingPlan(planIndex)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

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
                :aria-label="`${featureIndex + 1}. özelliği plandan çıkar`"
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
        <button type="submit" :disabled="isSaving" :aria-busy="isSaving" class="px-6 py-3 bg-[#3b5d50] text-white rounded-lg hover:bg-[#2d473d] transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {{ recordId ? 'Tümünü Güncelle' : 'Oluştur' }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" :disabled="isSaving" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          Kaydı Sil
        </button>
      </div>
    </form>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      :loading="isDeleting"
      title="Fiyatlandırma Bölümünü Sil"
      message="Bu bölümdeki tüm verileri (ana metinler, fiyat planları ve özellikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const pricingPlan = ref({
  title: '',
  subtitle: '',
  basicFeatures: [],
  standardFeatures: [],
  advancedFeatures: []
})

// API'den verileri çek ve formu doldur
const fetchPricingPlans = async () => {
  try {
    const data = await $fetch('/api/price')
    // Başlık ve alt başlığı ata
    pricingPlan.value.title = data.title
    pricingPlan.value.subtitle = data.subtitle

    // Basic planları ayarla
    pricingPlan.value.basicFeatures = data.basicFeatures && Array.isArray(data.basicFeatures)
      ? data.basicFeatures.map(plan => ({
          planName: plan.planName,
          price: plan.price,
          features: plan.basicPlanTypes.map(item => item.description)
        }))
      : []

    // Standard planları ayarla
    pricingPlan.value.standardFeatures = data.standardFeatures && Array.isArray(data.standardFeatures)
      ? data.standardFeatures.map(plan => ({
          planName: plan.planName,
          price: plan.price,
          features: plan.standardPlanTypes.map(item => item.description)
        }))
      : []

    // Advanced planları ayarla
    pricingPlan.value.advancedFeatures = data.advancedFeatures && Array.isArray(data.advancedFeatures)
      ? data.advancedFeatures.map(plan => ({
          planName: plan.planName,
          price: plan.price,
          features: plan.advancedPlanTypes.map(item => item.description)
        }))
      : []
  } catch (error) {
    console.error('Error fetching pricing plans:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPricingPlans()
})

// --- Basic Plan İşlemleri ---
const addBasicPlan = () => {
  pricingPlan.value.basicFeatures.push({
    planName: '',
    price: '',
    features: []
  })
}
const removeBasicPlan = (index) => {
  pricingPlan.value.basicFeatures.splice(index, 1)
}
const addBasicFeatureItem = (planIndex) => {
  pricingPlan.value.basicFeatures[planIndex].features.push('')
}
const removeBasicFeature = (planIndex, featureIndex) => {
  pricingPlan.value.basicFeatures[planIndex].features.splice(featureIndex, 1)
}

// --- Standard Plan İşlemleri ---
const addStandardPlan = () => {
  pricingPlan.value.standardFeatures.push({
    planName: '',
    price: '',
    features: []
  })
}
const removeStandardPlan = (index) => {
  pricingPlan.value.standardFeatures.splice(index, 1)
}
const addStandardFeatureItem = (planIndex) => {
  pricingPlan.value.standardFeatures[planIndex].features.push('')
}
const removeStandardFeature = (planIndex, featureIndex) => {
  pricingPlan.value.standardFeatures[planIndex].features.splice(featureIndex, 1)
}

// --- Advanced Plan İşlemleri ---
const addAdvancedPlan = () => {
  pricingPlan.value.advancedFeatures.push({
    planName: '',
    price: '',
    features: []
  })
}
const removeAdvancedPlan = (index) => {
  pricingPlan.value.advancedFeatures.splice(index, 1)
}
const addAdvancedFeatureItem = (planIndex) => {
  pricingPlan.value.advancedFeatures[planIndex].features.push('')
}
const removeAdvancedFeature = (planIndex, featureIndex) => {
  pricingPlan.value.advancedFeatures[planIndex].features.splice(featureIndex, 1)
}

// --- Güncelleme İşlemi ---
const updatePricingPlan = async () => {
  try {
    // API'nin beklediği formata göre payload hazırlıyoruz:
    const payload = {
      sectionName: "pricings",
      title: pricingPlan.value.title,
      subtitle: pricingPlan.value.subtitle,
      basicFeatures: pricingPlan.value.basicFeatures.map(plan => ({
        planName: plan.planName,
        price: plan.price,
        // Burada API'nin beklediği "planTypes" anahtarını kullanıyoruz
        planTypes: plan.features.map(desc => ({ description: desc }))
      })),
      standardFeatures: pricingPlan.value.standardFeatures.map(plan => ({
        planName: plan.planName,
        price: plan.price,
        planTypes: plan.features.map(desc => ({ description: desc }))
      })),
      advancedFeatures: pricingPlan.value.advancedFeatures.map(plan => ({
        planName: plan.planName,
        price: plan.price,
        planTypes: plan.features.map(desc => ({ description: desc }))
      }))
    }

    const response = await $fetch('/api/price', {
      method: 'PUT',
      body: payload
    });

    if (response.success) {
      alert("Başarıyla güncellendi!");
      await fetchPricingPlans(); // Verileri yeniden çek
    } else {
      alert("Hata: " + (response.error || "Bilinmeyen hata"));
    }
  } catch (error) {
    alert("Hata: " + error.data?.error || error.message);
  }
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Pricing Plan Panel</h1>
    
    <!-- Yüklenme Durumu -->
    <div v-if="loading" class="text-center">Yükleniyor...</div>
    
    <!-- Veriler Yüklendikten Sonra Form -->
    <form v-else @submit.prevent="updatePricingPlan" class="space-y-6">
      <!-- Başlık & Alt Başlık -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input
            v-model="pricingPlan.title"
            type="text"
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input
            v-model="pricingPlan.subtitle"
            type="text"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <!-- Basic Planlar -->
      <div>
        <h2 class="text-xl font-semibold mb-2">Basic Planlar</h2>
        <div
          v-for="(plan, index) in pricingPlan.basicFeatures"
          :key="'basic-' + index"
          class="mb-4 p-4 border rounded"
        >
          <div class="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label class="block mb-2">Plan Adı</label>
              <input
                v-model="plan.planName"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block mb-2">Fiyat</label>
              <input
                v-model="plan.price"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-2">Plan Tipleri</h3>
            <div
              v-for="(feature, fIndex) in plan.features"
              :key="'basic-feature-' + fIndex"
              class="flex items-center mb-2"
            >
              <input
                v-model="plan.features[fIndex]"
                type="text"
                class="w-full p-2 border rounded"
              />
              <button
                type="button"
                @click="removeBasicFeature(index, fIndex)"
                class="ml-2 text-red-600"
              >
                Sil
              </button>
            </div>
            <button
              type="button"
              @click="addBasicFeatureItem(index)"
              class="text-blue-600"
            >
              Plan Tipi Ekle
            </button>
          </div>
          <div class="mt-2">
            <button
              type="button"
              @click="removeBasicPlan(index)"
              class="text-red-600"
            >
              Bu Planı Sil
            </button>
          </div>
        </div>
        <button type="button" @click="addBasicPlan" class="text-blue-600">
          Yeni Basic Plan Ekle
        </button>
      </div>

      <!-- Standard Planlar -->
      <div>
        <h2 class="text-xl font-semibold mb-2">Standard Planlar</h2>
        <div
          v-for="(plan, index) in pricingPlan.standardFeatures"
          :key="'standard-' + index"
          class="mb-4 p-4 border rounded"
        >
          <div class="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label class="block mb-2">Plan Adı</label>
              <input
                v-model="plan.planName"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block mb-2">Fiyat</label>
              <input
                v-model="plan.price"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-2">Plan Tipleri</h3>
            <div
              v-for="(feature, fIndex) in plan.features"
              :key="'standard-feature-' + fIndex"
              class="flex items-center mb-2"
            >
              <input
                v-model="plan.features[fIndex]"
                type="text"
                class="w-full p-2 border rounded"
              />
              <button
                type="button"
                @click="removeStandardFeature(index, fIndex)"
                class="ml-2 text-red-600"
              >
                Sil
              </button>
            </div>
            <button
              type="button"
              @click="addStandardFeatureItem(index)"
              class="text-blue-600"
            >
              Plan Tipi Ekle
            </button>
          </div>
          <div class="mt-2">
            <button
              type="button"
              @click="removeStandardPlan(index)"
              class="text-red-600"
            >
              Bu Planı Sil
            </button>
          </div>
        </div>
        <button type="button" @click="addStandardPlan" class="text-blue-600">
          Yeni Standard Plan Ekle
        </button>
      </div>

      <!-- Advanced Planlar -->
      <div>
        <h2 class="text-xl font-semibold mb-2">Advanced Planlar</h2>
        <div
          v-for="(plan, index) in pricingPlan.advancedFeatures"
          :key="'advanced-' + index"
          class="mb-4 p-4 border rounded"
        >
          <div class="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label class="block mb-2">Plan Adı</label>
              <input
                v-model="plan.planName"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block mb-2">Fiyat</label>
              <input
                v-model="plan.price"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-2">Plan Tipleri</h3>
            <div
              v-for="(feature, fIndex) in plan.features"
              :key="'advanced-feature-' + fIndex"
              class="flex items-center mb-2"
            >
              <input
                v-model="plan.features[fIndex]"
                type="text"
                class="w-full p-2 border rounded"
              />
              <button
                type="button"
                @click="removeAdvancedFeature(index, fIndex)"
                class="ml-2 text-red-600"
              >
                Sil
              </button>
            </div>
            <button
              type="button"
              @click="addAdvancedFeatureItem(index)"
              class="text-blue-600"
            >
              Plan Tipi Ekle
            </button>
          </div>
          <div class="mt-2">
            <button
              type="button"
              @click="removeAdvancedPlan(index)"
              class="text-red-600"
            >
              Bu Planı Sil
            </button>
          </div>
        </div>
        <button type="button" @click="addAdvancedPlan" class="text-blue-600">
          Yeni Advanced Plan Ekle
        </button>
      </div>

      <!-- Güncelle Butonu -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Güncelle
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
input {
  outline: none;
}
button {
  cursor: pointer;
}
</style>

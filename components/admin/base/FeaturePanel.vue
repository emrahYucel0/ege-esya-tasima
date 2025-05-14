<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

// --- Feature Veri Modeli ---
const feature = ref({
  id: null,
  sectionName: "features", // Varsayılan olarak "features"
  subtitle: "",
  title: "",
  image: "",
  featureTypes: [] // Her biri { title, description } şeklinde nesneler
})

// API'den mevcut Feature verisini çekiyoruz
onMounted(async () => {
  const { data, error } = await useFetch('/api/feature')
  if (!error.value && data.value) {
    feature.value = data.value
  }
})

// --- Yeni Feature Type Ekleme ---
const addFeatureType = () => {
  feature.value.featureTypes.push({
    title: "",
    description: ""
  })
}

// --- Belirtilen Feature Type'ı Kaldırma ---
const removeFeatureType = (index) => {
  feature.value.featureTypes.splice(index, 1)
}

// --- Dosya Yükleyici Event İşleyicisi ---
// FileUploader bileşeninden gelen URL'i feature.image alanına aktarıyoruz.
const updateImageUrl = (url) => {
  feature.value.image = url
}

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  try {
    // Eğer kayıt varsa PUT, yoksa POST metodu kullanılacak
    const method = feature.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/feature', {
      method,
      body: feature.value
    })
    if (method === 'PUT') {
      if (response.success) {
        feature.value = response.data
        alert('Feature başarıyla güncellendi.')
      } else {
        alert('Hata: ' + response.error)
      }
    } else {
      feature.value = response
      alert('Feature başarıyla oluşturuldu.')
    }
  } catch (err) {
    console.error(err)
    alert('Form gönderilirken bir hata oluştu.')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Feature Yönetim Paneli</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Ana Bilgiler: Başlık & Alt Başlık -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input 
            v-model="feature.title" 
            type="text" 
            class="w-full p-2 border rounded" 
            required 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input 
            v-model="feature.subtitle" 
            type="text" 
            class="w-full p-2 border rounded" 
          />
        </div>
      </div>

      <!-- Görsel Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label class="block mb-2 font-medium">Görsel URL</label>
          <input 
            v-model="feature.image" 
            type="text" 
            class="w-full p-2 border rounded" 
            readonly 
          />
        </div>
        <div>
          <!-- FileUploader bileşeni; dosya yüklendikten sonra updateImageUrl tetiklenecek -->
          <FileUploader @file-uploaded="updateImageUrl" />
        </div>
      </div>

      <!-- Feature Tipleri (Dinamik Liste) -->
      <div>
        <label class="block mb-2 font-medium">Feature Tipleri</label>
        <div 
          v-for="(ft, index) in feature.featureTypes" 
          :key="index" 
          class="mb-4 border p-4 rounded"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-medium">Başlık</label>
              <input 
                v-model="ft.title" 
                type="text" 
                class="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label class="block mb-2 font-medium">Açıklama</label>
              <textarea 
                v-model="ft.description" 
                class="w-full p-2 border rounded" 
                rows="3" 
                required
              ></textarea>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            <button 
              type="button" 
              @click="removeFeatureType(index)" 
              class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sil
            </button>
          </div>
        </div>
        <button 
          type="button" 
          @click="addFeatureType" 
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Yeni Feature Tipi Ekle
        </button>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ feature.id ? 'Güncelle' : 'Oluştur' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Girdi alanları için temel stiller */
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

/* Genel buton stili */
button {
  cursor: pointer;
}
</style>

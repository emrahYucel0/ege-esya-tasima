<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

// --- Service Veri Modeli ---
const service = ref({
  id: null,
  sectionName: "services",
  title: "",
  subtitle: "",
  blockquote: "",
  features: [] // Her biri { cardTitle, cardDescription, contents: [] } şeklinde
})

// API'den mevcut Service verisini çekiyoruz
onMounted(async () => {
  const { data, error } = await useFetch('/api/service')
  if (!error.value && data.value) {
    // API'den gelen verileri uygun formata dönüştür
    service.value = {
      ...data.value,
      features: data.value.features.map(feature => ({
        cardTitle: feature.cardTitle,
        cardDescription: feature.cardDescription,
        contents: feature.content.split('|||') // İçerikleri ayır
      }))
    }
  }
})

// --- Yeni Service Card Ekleme ---
const addServiceCard = () => {
  service.value.features.push({
    cardTitle: "",
    cardDescription: "",
    contents: [""] // Başlangıçta bir içerik ekliyoruz
  })
}

// --- Yeni İçerik Ekleme ---
const addContent = (cardIndex) => {
  service.value.features[cardIndex].contents.push("")
}

// --- İçerik Silme ---
const removeContent = (cardIndex, contentIndex) => {
  service.value.features[cardIndex].contents.splice(contentIndex, 1)
}

// --- Belirtilen Service Card'ı Kaldırma ---
const removeServiceCard = (index) => {
  service.value.features.splice(index, 1)
}

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  try {
    // Verileri API formatına dönüştür
    const payload = {
      ...service.value,
      features: service.value.features.map(feature => ({
        cardTitle: feature.cardTitle,
        cardDescription: feature.cardDescription,
        content: feature.contents.join('|||') // İçerikleri birleştir
      }))
    }

    const method = service.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/service', {
      method,
      body: payload
    })
    
    if (method === 'PUT') {
      if (response.success) {
        service.value = response.data
        alert('Service başarıyla güncellendi.')
      } else {
        alert('Hata: ' + response.error)
      }
    } else {
      service.value = response
      alert('Service başarıyla oluşturuldu.')
    }
  } catch (err) {
    console.error(err)
    alert('Form gönderilirken bir hata oluştu.')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Service Yönetim Paneli</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Ana Bilgiler -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input 
            v-model="service.title" 
            type="text" 
            class="w-full p-2 border rounded" 
            required 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input 
            v-model="service.subtitle" 
            type="text" 
            class="w-full p-2 border rounded" 
            required
          />
        </div>
      </div>

      <!-- Blockquote -->
      <div>
        <label class="block mb-2 font-medium">Alıntı/Blockquote</label>
        <textarea 
          v-model="service.blockquote" 
          class="w-full p-2 border rounded" 
          rows="3" 
          required
        ></textarea>
      </div>

      <!-- Service Card'lar (Dinamik Liste) -->
      <div>
        <label class="block mb-2 font-medium">Service Kartları</label>
        <div 
          v-for="(card, cardIndex) in service.features" 
          :key="cardIndex" 
          class="mb-4 border p-4 rounded"
        >
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block mb-2 font-medium">Kart Başlığı</label>
              <input
                v-model="card.cardTitle"
                type="text"
                class="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label class="block mb-2 font-medium">Kart Açıklaması</label>
              <textarea
                v-model="card.cardDescription"
                class="w-full p-2 border rounded"
                rows="2"
                required
              ></textarea>
            </div>
            
            <!-- İçerikler -->
            <div>
              <label class="block mb-2 font-medium">İçerikler</label>
              <div 
                v-for="(content, contentIndex) in card.contents" 
                :key="contentIndex"
                class="mb-4"
              >
                <div class="flex items-center gap-2 mb-1">
                  <label class="font-medium">İçerik {{ contentIndex + 1 }}</label>
                  <button
                    type="button"
                    @click="removeContent(cardIndex, contentIndex)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Sil
                  </button>
                </div>
                <textarea
                  v-model="card.contents[contentIndex]"
                  class="w-full p-2 border rounded"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button
                type="button"
                @click="addContent(cardIndex)"
                class="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                + Yeni İçerik Ekle
              </button>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            <button 
              type="button" 
              @click="removeServiceCard(cardIndex)" 
              class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Kartı Sil
            </button>
          </div>
        </div>
        <button 
          type="button" 
          @click="addServiceCard" 
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Yeni Service Kartı Ekle
        </button>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ service.id ? 'Güncelle' : 'Oluştur' }}
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
  transition: background-color 0.2s;
}
</style>
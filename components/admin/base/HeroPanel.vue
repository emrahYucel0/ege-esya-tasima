<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

// --- Hero Veri Modeli ---
const hero = ref({
  id: null,
  title: '',
  subtitle: '',
  description: '',
  primaryButton: '',
  primaryLink: '',
  secondaryButton: '',
  secondaryLink: '',
  image: ''
})

// --- API'den Veri Çekme ---
const fetchHeroData = async () => {
  const { data, error } = await useFetch('/api/hero')
  if (!error.value && data.value?.success) {
    hero.value = data.value.data || hero.value
  }
}

// Sayfa yüklendiğinde verileri çek
fetchHeroData()

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  try {
    const method = hero.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/hero', {
      method,
      body: hero.value
    })
    
    if (response.success) {
      hero.value = response.data
      alert('Hero bölümü başarıyla kaydedildi.')
    } else {
      alert('Hata: ' + (response.error || 'Bilinmeyen hata'))
    }
  } catch (err) {
    console.error('Form gönderme hatası:', err)
    alert(`Form gönderilirken bir hata oluştu: ${err.message}`)
  }
}

// --- Dosya Yükleyici Event İşleyicisi ---
const updateImageUrl = (url) => {
  hero.value.image = url
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Hero Yönetim Paneli</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Başlık & Alt Başlık -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık*</label>
          <input 
            v-model="hero.title" 
            type="text" 
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            required
            placeholder="Ana başlık metni"
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input 
            v-model="hero.subtitle" 
            type="text" 
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Alt başlık metni"
          />
        </div>
      </div>

      <!-- Açıklama (Textarea) -->
      <div>
        <label class="block mb-2 font-medium">Açıklama</label>
        <textarea
          v-model="hero.description"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="6"
          placeholder="Detaylı açıklama metni..."
        ></textarea>
      </div>

      <!-- Birincil Buton Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Birincil Buton Metni</label>
          <input 
            v-model="hero.primaryButton" 
            type="text" 
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Örneğin: Hemen Teklif Al"
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Birincil Buton Linki</label>
          <input 
            v-model="hero.primaryLink" 
            type="url" 
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="https://example.com/iletisim"
          />
        </div>
      </div>

      <!-- İkincil Buton Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">İkincil Buton Metni</label>
          <input 
            v-model="hero.secondaryButton" 
            type="text" 
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Örneğin: Detaylı Bilgi"
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">İkincil Buton Linki</label>
          <input 
            v-model="hero.secondaryLink" 
            type="url" 
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="https://example.com/hizmetler"
          />
        </div>
      </div>

      <!-- Görsel Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label class="block mb-2 font-medium">Görsel URL</label>
          <input 
            v-model="hero.image" 
            type="url" 
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="https://example.com/images/hero-image.jpg"
            readonly 
          />
        </div>
        <div>
          <!-- FileUploader bileşeni -->
          <FileUploader @file-uploaded="updateImageUrl" />
        </div>
      </div>

      <!-- Önizleme ve Kaydet Butonları -->
      <div class="flex justify-between items-center pt-4 border-t">
        <button
          type="button"
          @click="$emit('preview')"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Önizleme
        </button>
        <button 
          type="submit" 
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ hero.id ? 'Güncelle' : 'Kaydet' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
textarea {
  min-height: 200px;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

input[type="text"],
input[type="url"] {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}
</style>
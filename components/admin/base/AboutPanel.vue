<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

// --- About Veri Modeli ---
const about = ref({
  id: null,
  sectionName: "abouts", // Varsayılan olarak "abouts"
  title: "",
  subtitle: "",
  content: "",
  image: "",
})

// API'den mevcut About verisini çekiyoruz
onMounted(async () => {
  const { data, error } = await useFetch('/api/about')
  if (!error.value && data.value) {
    about.value = {
      ...about.value, // Varsayılan değerleri koru
      ...data.value,  // API'den gelen verilerle güncelle
    }
  }
})

// --- Dosya Yükleyici Event İşleyicisi ---
const updateImageUrl = (url) => {
  about.value.image = url
}

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  try {
    const method = about.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/about', {
      method,
      body: about.value,
    })
    if (method === 'PUT') {
      if (response.success) {
        about.value = response.data
        alert('About başarıyla güncellendi.')
      } else {
        alert('Hata: ' + response.error)
      }
    } else {
      about.value = response
      alert('About başarıyla oluşturuldu.')
    }
  } catch (err) {
    console.error(err)
    alert('Form gönderilirken bir hata oluştu.')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">About Yönetim Paneli</h1>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Ana Bilgiler: Başlık & Alt Başlık -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input
            v-model="about.title"
            type="text"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input
            v-model="about.subtitle"
            type="text"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <!-- İçerik -->
      <div>
        <label class="block mb-2 font-medium">İçerik</label>
        <textarea
          v-model="about.content"
          class="w-full p-2 border rounded"
          rows="10"
          required
        ></textarea>
      </div>

      <!-- Görsel Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label class="block mb-2 font-medium">Görsel URL</label>
          <input
            v-model="about.image"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="Görsel URL'sini buraya girin veya yükleyin"
          />
        </div>
        <div>
          <FileUploader @file-uploaded="updateImageUrl" />
        </div>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ about.id ? 'Güncelle' : 'Oluştur' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

button {
  cursor: pointer;
}
</style>
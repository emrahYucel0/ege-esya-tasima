<script setup>
import { ref, onMounted } from 'vue'

// --- Meta Veri Modeli ---
const meta = ref({
  id: null,
  sectionName: "metas",
  page: "",
  title: "",
  description: ""
})

// Mevcut sayfalar için bir dropdown listesi
const pages = ref(['home', 'about', 'region', 'blog', 'contact'])

// API'den mevcut Meta verisini çekiyoruz
// $fetch kasıtlı: useFetch aynı sayfa arasında geçiş yapıldığında (fetchMetaData
// birden çok kez çağrıldığından) URL bazlı cache'ten eski veriyi döndürebiliyordu.
const fetchMetaData = async (page) => {
  const response = await $fetch(`/api/meta?page=${page}`)
  if (response.success) {
    meta.value = { ...response.data }
  } else {
    meta.value = {
      id: null,
      sectionName: "metas",
      page: page,
      title: "",
      description: ""
    }
  }
}

// Sayfa seçildiğinde veriyi çek
const onPageChange = (event) => {
  const selectedPage = event.target.value
  if (selectedPage) {
    fetchMetaData(selectedPage)
  }
}

// İlk yüklemede varsayılan olarak "home" sayfasını seçiyoruz
onMounted(() => {
  fetchMetaData('home')
})

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  try {
    const method = meta.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/meta', {
      method,
      body: meta.value
    })

    if (response.success) {
      meta.value = response.data
      alert(method === 'POST' ? 'Meta verisi başarıyla oluşturuldu.' : 'Meta verisi başarıyla güncellendi.')
    } else {
      alert('Hata: ' + response.error)
    }
  } catch (err) {
    console.error(err)
    alert('Form gönderilirken bir hata oluştu.')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Meta Yönetim Paneli</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Sayfa Seçimi -->
      <div>
        <label class="block mb-2 font-medium">Sayfa</label>
        <select
          v-model="meta.page"
          @change="onPageChange"
          class="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>Sayfa seçin</option>
          <option v-for="page in pages" :key="page" :value="page">
            {{ page }}
          </option>
        </select>
      </div>

      <!-- Ana Bilgiler -->
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık (Meta Title)</label>
          <input 
            v-model="meta.title" 
            type="text" 
            class="w-full p-2 border rounded" 
            required 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Açıklama (Meta Description)</label>
          <textarea
            v-model="meta.description"
            class="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ meta.id ? 'Güncelle' : 'Oluştur' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Girdi alanları için temel stiller */
input,
textarea,
select {
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
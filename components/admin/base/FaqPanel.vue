<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

// --- FAQ Veri Modeli ---
const faq = ref({
  id: null,
  sectionName: "faqs",
  title: "",
  subtitle: "",
  faqItems: [] // Her biri { question, answer, open } şeklinde
})

// API'den mevcut FAQ verisini çekiyoruz
onMounted(async () => {
  const { data, error } = await useFetch('/api/faq')
  if (!error.value && data.value) {
    faq.value = {
      ...data.value,
      faqItems: data.value.faqItems || []
    }
  }
})

// --- Yeni FAQ Ekleme ---
const addFaqItem = () => {
  faq.value.faqItems.push({
    question: "",
    answer: "",
    open: false
  })
}

// --- FAQ Silme ---
const removeFaqItem = (index) => {
  faq.value.faqItems.splice(index, 1)
}

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  try {
    const method = faq.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/faq', {
      method,
      body: faq.value
    })
    
    if (method === 'PUT') {
      if (response.success) {
        faq.value = response.data
        alert('FAQ başarıyla güncellendi.')
      } else {
        alert('Hata: ' + response.error)
      }
    } else {
      faq.value = response
      alert('FAQ başarıyla oluşturuldu.')
    }
  } catch (err) {
    console.error(err)
    alert('Form gönderilirken bir hata oluştu.')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">FAQ Yönetim Paneli</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Ana Bilgiler -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input 
            v-model="faq.title" 
            type="text" 
            class="w-full p-2 border rounded" 
            required 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input 
            v-model="faq.subtitle" 
            type="text" 
            class="w-full p-2 border rounded" 
            required
          />
        </div>
      </div>

      <!-- FAQ Items (Dinamik Liste) -->
      <div>
        <label class="block mb-2 font-medium">Sıkça Sorulan Sorular</label>
        <div 
          v-for="(item, index) in faq.faqItems" 
          :key="index" 
          class="mb-4 border p-4 rounded"
        >
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block mb-2 font-medium">Soru</label>
              <input
                v-model="item.question"
                type="text"
                class="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label class="block mb-2 font-medium">Cevap</label>
              <textarea
                v-model="item.answer"
                class="w-full p-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="item.open"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span class="ml-2">Başlangıçta açık gösterilsin mi?</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            <button 
              type="button" 
              @click="removeFaqItem(index)" 
              class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Soruyu Sil
            </button>
          </div>
        </div>
        <button 
          type="button" 
          @click="addFaqItem" 
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Yeni Soru Ekle
        </button>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ faq.id ? 'Güncelle' : 'Oluştur' }}
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

/* Checkbox stil ayarı */
input[type="checkbox"] {
  width: auto;
}
</style>
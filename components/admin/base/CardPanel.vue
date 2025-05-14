<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

// --- Card Veri Modeli ---
const card = ref({
  id: null,
  sectionName: "cards", // Varsayılan olarak "cards"
  title: "",
  subtitle: "",
  blockquote: "",
  image: "",
  cards: [] // Her biri { iconPath, title, description, order } şeklinde nesneler
})

// API'den mevcut Card verisini çekiyoruz
onMounted(async () => {
  const { data, error } = await useFetch('/api/card')
  if (!error.value && data.value) {
    card.value = data.value
  }
})

// --- Yeni CardItem Ekleme ---
const addCardItem = () => {
  card.value.cards.push({
    iconPath: "", // Varsayılan SVG path
    title: "",
    description: "",
    order: card.value.cards.length // Sıralama için otomatik artan değer
  })
}

// --- Belirtilen CardItem'ı Kaldırma ---
const removeCardItem = (index) => {
  card.value.cards.splice(index, 1)
  // Order değerlerini yeniden düzenle
  card.value.cards.forEach((item, idx) => {
    item.order = idx
  })
}

// --- Dosya Yükleyici Event İşleyicisi ---
const updateImageUrl = (url) => {
  console.log('Yeni URL:', url);
  card.value = { ...card.value, image: url }; // Reaktif güncelleme
  console.log('Güncellenmiş card.image:', card.value.image);
}

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  console.log('Form gönderiliyor, mevcut card:', { ...card.value });
  try {
    const method = card.value.id ? 'PUT' : 'POST';
    const response = await $fetch('/api/card', {
      method,
      body: card.value
    });
    console.log('API Yanıtı:', response);
    if (method === 'PUT') {
      if (response.success) {
        card.value = response.data; // API yanıtını kullan
        alert('Card başarıyla güncellendi.');
      } else {
        alert('Hata: ' + response.error);
      }
    } else {
      card.value = response;
      alert('Card başarıyla oluşturuldu.');
    }
  } catch (err) {
    console.error('Hata:', err);
    alert('Form gönderilirken bir hata oluştu.');
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Card Yönetim Paneli</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Ana Bilgiler: Başlık, Alt Başlık ve Blockquote -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input 
            v-model="card.title" 
            type="text" 
            class="w-full p-2 border rounded" 
            required 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input 
            v-model="card.subtitle" 
            type="text" 
            class="w-full p-2 border rounded" 
          />
        </div>
      </div>
      <div>
        <label class="block mb-2 font-medium">Alıntı (Blockquote)</label>
        <textarea 
          v-model="card.blockquote" 
          class="w-full p-2 border rounded" 
          rows="3"
        ></textarea>
      </div>

      <!-- Görsel Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label class="block mb-2 font-medium">Görsel URL</label>
          <input 
            v-model="card.image" 
            type="text" 
            class="w-full p-2 border rounded" 
            placeholder="Görsel URL'sini buraya girin veya yükleyin"
          />
        </div>
        <div>
          <!-- FileUploader bileşeni; dosya yüklendikten sonra updateImageUrl tetiklenecek -->
          <FileUploader @file-uploaded="updateImageUrl" />
        </div>
      </div>

      <!-- Card Items (Dinamik Liste) -->
      <div>
        <label class="block mb-2 font-medium">Kartlar</label>
        <div 
          v-for="(cardItem, index) in card.cards" 
          :key="index" 
          class="mb-4 border p-4 rounded"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-medium">İkon SVG Path (d attribute)</label>
              <input 
                v-model="cardItem.iconPath" 
                type="text" 
                class="w-full p-2 border rounded" 
                placeholder="örn: M5 13l4 4L19 7"
              />
            </div>
            <div>
              <label class="block mb-2 font-medium">Başlık</label>
              <input 
                v-model="cardItem.title" 
                type="text" 
                class="w-full p-2 border rounded" 
                required 
              />
            </div>
          </div>
          <div class="mt-4">
            <label class="block mb-2 font-medium">Açıklama</label>
            <textarea 
              v-model="cardItem.description" 
              class="w-full p-2 border rounded" 
              rows="3" 
              required
            ></textarea>
          </div>
          <div class="flex justify-between mt-2">
            <div>
              <label class="block mb-2 font-medium">Sıra</label>
              <input 
                v-model.number="cardItem.order" 
                type="number" 
                class="w-20 p-2 border rounded" 
                min="0"
              />
            </div>
            <button 
              type="button" 
              @click="removeCardItem(index)" 
              class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sil
            </button>
          </div>
        </div>
        <button 
          type="button" 
          @click="addCardItem" 
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Yeni Kart Ekle
        </button>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ card.id ? 'Güncelle' : 'Oluştur' }}
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
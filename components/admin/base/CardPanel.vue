<script setup>
const { form, message, showDeleteModal, recordId, save, remove } = useSectionCrud('card', 'cards', {
  title: "",
  subtitle: "",
  blockquote: "",
  image: "",
  cards: [] // Her biri { iconPath, title, description, order } şeklinde nesneler
})

// --- Yeni CardItem Ekleme ---
const addCardItem = () => {
  form.cards.push({
    iconPath: "", // Varsayılan SVG path
    title: "",
    description: "",
    order: form.cards.length // Sıralama için otomatik artan değer
  })
}

// --- Belirtilen CardItem'ı Kaldırma ---
const removeCardItem = (index) => {
  form.cards.splice(index, 1)
  // Order değerlerini yeniden düzenle
  form.cards.forEach((item, idx) => {
    item.order = idx
  })
}

// --- Dosya Yükleyici Event İşleyicisi ---
const updateImageUrl = (url) => {
  form.image = url
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Card Yönetim Paneli</h1>

    <form @submit.prevent="save" class="space-y-6">
      <!-- Ana Bilgiler: Başlık, Alt Başlık ve Blockquote -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input
            v-model="form.subtitle"
            type="text"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div>
        <label class="block mb-2 font-medium">Alıntı (Blockquote)</label>
        <textarea
          v-model="form.blockquote"
          class="w-full p-2 border rounded"
          rows="3"
        ></textarea>
      </div>

      <!-- Görsel Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label class="block mb-2 font-medium">Görsel URL</label>
          <input
            v-model="form.image"
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
          v-for="(cardItem, index) in form.cards"
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

      <!-- Kaydet / Sil Butonları -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          v-if="recordId"
          @click="showDeleteModal = true"
          class="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sil
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ recordId ? 'Güncelle' : 'Oluştur' }}
        </button>
      </div>
    </form>

    <!-- Mesaj Gösterimi -->
    <p class="mt-4 text-green-600" v-if="message">{{ message }}</p>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Card Kaydını Sil"
      message="Bu Card kaydını silmek istediğinize emin misiniz?"
      confirmText="Sil"
      cancelText="İptal"
      @confirm="remove"
      @cancel="showDeleteModal = false"
    />
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

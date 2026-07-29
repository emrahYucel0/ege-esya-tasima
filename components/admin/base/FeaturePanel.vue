<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('feature', 'features', {
  subtitle: "",
  title: "",
  image: "",
  featureTypes: [] // Her biri { title, description } şeklinde nesneler
})

// --- Yeni Feature Type Ekleme ---
const addFeatureType = () => {
  form.featureTypes.push({
    title: "",
    description: ""
  })
}

// --- Belirtilen Feature Type'ı Kaldırma ---
const removeFeatureType = (index) => {
  form.featureTypes.splice(index, 1)
}

// --- Dosya Yükleyici Event İşleyicisi ---
// FileUploader bileşeninden gelen URL'i form.image alanına aktarıyoruz.
const updateImageUrl = (url) => {
  form.image = url
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Feature Yönetim Paneli</h1>

    <form @submit.prevent="save" class="space-y-6">
      <!-- Ana Bilgiler: Başlık & Alt Başlık -->
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

      <!-- Görsel Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label class="block mb-2 font-medium">Görsel URL</label>
          <input
            v-model="form.image"
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
          v-for="(ft, index) in form.featureTypes"
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

      <!-- Kaydet / Sil Butonları -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          v-if="recordId"
          @click="showDeleteModal = true"
          :disabled="isSaving"
          class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sil
        </button>
        <button
          type="submit"
          :disabled="isSaving"
          :aria-busy="isSaving"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Kaydediliyor...' : (recordId ? 'Güncelle' : 'Oluştur') }}
        </button>
      </div>
    </form>

    <!-- Mesaj Gösterimi -->
    <p class="mt-4 text-green-600" v-if="message">{{ message }}</p>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      :loading="isDeleting"
      title="Feature Kaydını Sil"
      message="Bu Feature kaydını silmek istediğinize emin misiniz?"
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

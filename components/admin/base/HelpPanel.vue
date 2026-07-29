<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('we-help-section', 'we-help-section', {
  mainTitle: '',
  description: '',
  buttonText: '',
  buttonLink: '',
  features: [],
  images: [],
});

// Görsel pozisyonları için seçenekler
const imagePositions = [
  { value: 'grid-1', label: 'Grid 1 - Büyük resim (sol üst)' },
  { value: 'grid-2', label: 'Grid 2 - Küçük resim (sağ üst)' },
  { value: 'grid-3', label: 'Grid 3 - Orta resim (sağ alt)' }
]

const updateImageUrl = (url, index) => {
  form.images[index].imagePath = url
  message.value = 'Görsel başarıyla güncellendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

const addFeature = () => {
  form.features.push({ text: '', order: form.features.length })
}

const removeFeature = (index) => {
  form.features.splice(index, 1)
  form.features.forEach((feature, i) => feature.order = i)
}

const addImage = () => {
  form.images.push({ imagePath: '', altText: '', position: '', order: form.images.length })
}

const removeImage = (index) => {
  form.images.splice(index, 1)
  form.images.forEach((image, i) => image.order = i)
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">We Help Section Yönetimi ⚙️</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>

      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="form.mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama Paragrafı</label>
        <textarea id="description" v-model="form.description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="buttonText" class="block font-medium text-gray-700 mb-1">Buton Metni</label>
          <input id="buttonText" v-model="form.buttonText" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="buttonLink" class="block font-medium text-gray-700 mb-1">Buton Linki</label>
          <input id="buttonLink" v-model="form.buttonLink" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <!-- Özellikler Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Özellikler Listesi</h2>
      <p class="text-sm text-gray-500">Liste maddeleri (• işaretli öğeler)</p>

      <div class="space-y-4">
        <div
          v-for="(feature, index) in form.features"
          :key="'feature-' + (feature.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Madde #{{ index + 1 }}</h4>
            <button type="button" @click="removeFeature(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div>
            <label :for="'feature-text-' + index" class="block text-sm font-medium text-gray-600">Madde Metni</label>
            <input v-model="feature.text" :id="'feature-text-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Ücretsiz Ekspertiz ve Detaylı Planlama" required />
          </div>
        </div>
      </div>

      <button type="button" @click="addFeature" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Madde Ekle</span>
      </button>

      <!-- Görseller Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Grid Görselleri</h2>
      <p class="text-sm text-gray-500">Grid içinde kullanılacak görseller</p>

      <div class="space-y-4">
        <div
          v-for="(image, index) in form.images"
          :key="'image-' + (image.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Görsel #{{ index + 1 }}</h4>
            <button type="button" @click="removeImage(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label :for="'image-position-' + index" class="block text-sm font-medium text-gray-600">Grid Pozisyonu</label>
              <select v-model="image.position" :id="'image-position-' + index" class="w-full p-2 border rounded">
                <option value="">Pozisyon seçin</option>
                <option v-for="pos in imagePositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
              </select>
            </div>
            <div>
              <label :for="'image-alt-' + index" class="block text-sm font-medium text-gray-600">Alt Metni</label>
              <input v-model="image.altText" :id="'image-alt-' + index" type="text" class="w-full p-2 border rounded" placeholder="Görsel açıklaması" />
            </div>
          </div>

          <div class="mt-3 p-3 bg-white rounded-lg border">
            <label class="block text-sm font-medium text-gray-600 mb-2">Görsel URL</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <input
                  :value="image.imagePath"
                  type="url"
                  class="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                  placeholder="URL otomatik olarak dolacak"
                  readonly
                />
                <p v-if="image.imagePath" class="mt-2 text-sm text-gray-500">
                  Mevcut Görsel:
                  <a :href="image.imagePath" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                    {{ image.imagePath }}
                  </a>
                </p>
                <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
              </div>
              <div>
                <FileUploader
                  @file-uploaded="(url) => updateImageUrl(url, index)"
                  :label="'Görsel Yükle #' + (index + 1)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addImage" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Görsel Ekle</span>
      </button>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button type="submit" :disabled="isSaving" :aria-busy="isSaving" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {{ recordId ? 'Tümünü Güncelle' : 'Oluştur' }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" :disabled="isSaving" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          Kaydı Sil
        </button>
      </div>
    </form>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      :loading="isDeleting"
      title="Bölüm Kaydını Sil"
      message="Bu bölümdeki tüm verileri (ana metinler, özellikler ve görseller) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
      confirmText="Evet, Kaydı Sil"
      cancelText="İptal Et"
      @confirm="remove"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #3b82f6;
}
.hover\:bg-green-600:hover {
  background-color: #10b981;
}
.text-primary {
  color: #3b82f6;
}
</style>

<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('why-choose-us', 'why-choose-us', {
  mainTitle: '',
  shortDescription: '',
  closingStatement: '',
  mainImage: '',
  mainImageAlt: '',
  features: [],
});

const updateMainImageUrl = (url) => {
  form.mainImage = url
  message.value = 'Ana Görsel başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

const addFeature = () => {
  form.features.push({
    iconPath: '',
    title: '',
    description: '',
    order: form.features.length
  })
}

const removeFeature = (index) => {
  form.features.splice(index, 1)
  form.features.forEach((feature, i) => feature.order = i)
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Neden Bizi Seçmelisiniz Bölümü Yönetimi ⚙️</h1>

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
        <label for="shortDescription" class="block font-medium text-gray-700 mb-1">Kısa Açıklama Paragrafı</label>
        <textarea id="shortDescription" v-model="form.shortDescription" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="closingStatement" class="block font-medium text-gray-700 mb-1">Kapanış Cümlesi (İtalik Metin)</label>
        <input id="closingStatement" v-model="form.closingStatement" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Ana Görsel Yönetimi</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label for="mainImage" class="block font-medium text-gray-700 mb-1">Ana Görsel URL</label>
          <input
            id="mainImage"
            :value="form.mainImage"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            placeholder="URL otomatik olarak dolacak"
            readonly
          />
          <p v-if="form.mainImage" class="mt-2 text-sm text-gray-500">
            Mevcut Görsel:
            <a :href="form.mainImage" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
              {{ form.mainImage }}
            </a>
          </p>
          <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
        </div>
        <div>
          <FileUploader
            @file-uploaded="updateMainImageUrl"
            label="Yeni Görsel Yükle (JPG, PNG)"
          />
        </div>
      </div>

      <div>
        <label for="mainImageAlt" class="block font-medium text-gray-700 mb-1">
          Görsel Açıklaması (alt metni) — <span class="font-normal">isteğe bağlı</span>
        </label>
        <input
          id="mainImageAlt"
          v-model="form.mainImageAlt"
          type="text"
          maxlength="125"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Boş bırakın (önerilen)"
        />
        <p class="mt-1 text-xs text-gray-500">
          <strong>Boş bırakmanız önerilir.</strong> Bu görselin üzerinde koyu perde
          ve kapanış cümlesi var; anlattığı şey zaten o cümlede yazıyor. Boşken
          ekran okuyucular onu atlar, doldurursanız her ziyarette okunur.
        </p>
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Taşıma Özellikleri</h2>
      <p class="text-sm text-gray-500">Her özelliğin ikonu, başlığı ve kısa açıklaması.</p>

      <div class="space-y-4">
        <div
          v-for="(feature, index) in form.features"
          :key="'feature-' + (feature.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Özellik #{{ index + 1 }}</h4>
            <button :aria-label="`${index + 1}. Özelliği sil`" type="button" @click="removeFeature(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="space-y-2">
            <div>
              <label :for="'feature-icon-' + index" class="block text-sm font-medium text-gray-600">İkon URL (Örn: SVG yolu)</label>
              <input v-model="feature.iconPath" :id="'feature-icon-' + index" type="text" class="w-full p-2 border rounded" placeholder="~/assets/images/shield.svg" />
            </div>
            <div>
              <label :for="'feature-title-' + index" class="block text-sm font-medium text-gray-600">Başlık</label>
              <input v-model="feature.title" :id="'feature-title-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Güvenli Taşıma" required />
            </div>
            <div>
              <label :for="'feature-desc-' + index" class="block text-sm font-medium text-gray-600">Açıklama</label>
              <textarea v-model="feature.description" :id="'feature-desc-' + index" rows="2" class="w-full p-2 border rounded" placeholder="Özellik detayları"></textarea>
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addFeature" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Özellik Ekle</span>
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
      message="Bu bölümdeki tüm verileri (ana metinler ve tüm özellikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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

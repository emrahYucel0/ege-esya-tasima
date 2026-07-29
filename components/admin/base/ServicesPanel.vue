<script setup>
const { form, message, showDeleteModal, recordId, save, remove } = useSectionCrud('services', 'services', {
  mainTitle: '',
  description: '',
  buttonText: '',
  buttonLink: '',
  services: [],
  statistics: [],
});

const updateServiceImageUrl = (url, index) => {
  form.services[index].imagePath = url
  message.value = 'Servis görseli başarıyla güncellendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

// Yeni bir servis ekler
const addService = () => {
  form.services.push({
    imagePath: '',
    title: '',
    subtitle: '',
    description: '',
    order: form.services.length,
  })
}

// Bir servisi listeden siler
const removeService = (index) => {
  form.services.splice(index, 1)
  form.services.forEach((service, i) => service.order = i)
}

// Yeni bir istatistik ekler
const addStatistic = () => {
  form.statistics.push({
    iconPath: '',
    value: '',
    label1: '',
    label2: '',
    order: form.statistics.length,
  })
}

// Bir istatistiği listeden siler
const removeStatistic = (index) => {
  form.statistics.splice(index, 1)
  form.statistics.forEach((statistic, i) => statistic.order = i)
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Servisler Bölümü Yönetimi 🚚</h1>

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
        <textarea id="description" v-model="form.description" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
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

      <!-- SERVİSLER BÖLÜMÜ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Hizmetler</h2>
      <p class="text-sm text-gray-500">Her hizmetin görseli, başlığı, alt başlığı ve açıklaması.</p>

      <div class="space-y-6">
        <div
          v-for="(service, index) in form.services"
          :key="'service-' + (service.id || index)"
          class="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-bold text-lg text-gray-700">Hizmet #{{ index + 1 }}</h4>
            <button type="button" @click="removeService(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Görsel Yönetimi -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white rounded-lg border">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">Hizmet Görsel URL</label>
              <input
                :value="service.imagePath"
                type="url"
                class="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                placeholder="URL otomatik olarak dolacak"
                readonly
              />
              <p v-if="service.imagePath" class="mt-2 text-sm text-gray-500">
                Mevcut Görsel:
                <a :href="service.imagePath" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                  {{ service.imagePath }}
                </a>
              </p>
              <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
            </div>
            <div>
              <FileUploader
                @file-uploaded="(url) => updateServiceImageUrl(url, index)"
                :label="'Hizmet Görseli Yükle #' + (index + 1)"
              />
            </div>
          </div>

          <!-- Servis Detayları -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label :for="'service-title-' + index" class="block text-sm font-medium text-gray-600">Başlık</label>
              <input v-model="service.title" :id="'service-title-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Evden Eve Nakliyat" required />
            </div>
            <div>
              <label :for="'service-subtitle-' + index" class="block text-sm font-medium text-gray-600">Alt Başlık</label>
              <input v-model="service.subtitle" :id="'service-subtitle-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Şehir İçi & Şehirlerarası" />
            </div>
            <div class="md:col-span-2">
              <label :for="'service-desc-' + index" class="block text-sm font-medium text-gray-600">Açıklama</label>
              <textarea v-model="service.description" :id="'service-desc-' + index" rows="2" class="w-full p-2 border rounded" placeholder="Hizmet detayları"></textarea>
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addService" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Hizmet Ekle</span>
      </button>

      <!-- İSTATİSTİKLER BÖLÜMÜ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-8">İstatistikler</h2>
      <p class="text-sm text-gray-500">Sayısal değerler ve etiketler.</p>

      <div class="space-y-4">
        <div
          v-for="(statistic, index) in form.statistics"
          :key="'statistic-' + (statistic.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-bold text-lg text-gray-700">İstatistik #{{ index + 1 }}</h4>
            <button type="button" @click="removeStatistic(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label :for="'statistic-icon-' + index" class="block text-sm font-medium text-gray-600">İkon URL</label>
              <input v-model="statistic.iconPath" :id="'statistic-icon-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: ~/assets/icons/check.svg" />
            </div>
            <div>
              <label :for="'statistic-value-' + index" class="block text-sm font-medium text-gray-600">Değer</label>
              <input v-model="statistic.value" :id="'statistic-value-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: 60k" required />
            </div>
            <div>
              <label :for="'statistic-label1-' + index" class="block text-sm font-medium text-gray-600">Etiket 1</label>
              <input v-model="statistic.label1" :id="'statistic-label1-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Başarılı" required />
            </div>
            <div>
              <label :for="'statistic-label2-' + index" class="block text-sm font-medium text-gray-600">Etiket 2</label>
              <input v-model="statistic.label2" :id="'statistic-label2-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Taşıma" required />
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addStatistic" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni İstatistik Ekle</span>
      </button>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button type="submit" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-150 font-semibold">
          {{ recordId ? 'Tümünü Güncelle' : 'Oluştur' }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold">
          Kaydı Sil
        </button>
      </div>
    </form>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Bölüm Kaydını Sil"
      message="Bu bölümdeki tüm verileri (ana metinler, hizmetler ve istatistikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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

<script setup>
const { form, message, showDeleteModal, recordId, save, remove } = useSectionCrud('about-section', 'about-section', {
  mainTitle: '',
  description1: '',
  description2: '',
  description3: '',
  teamImage: '',
  teamImageAlt: '',
  historyTitle: '',
  historyText1: '',
  historyText2: '',
  historyText3: '',
  seoTitle: '',
  seoDescription: '',
  services: [],
  stats: [],
});

const updateTeamImageUrl = (url) => {
  form.teamImage = url
  message.value = 'Takım fotoğrafı başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

// Yeni bir hizmet ekler
const addService = () => {
  form.services.push({
    iconPath: '',
    iconAlt: '',
    title: '',
    description: '',
    order: form.services.length
  })
}

// Bir hizmeti listeden siler
const removeService = (index) => {
  form.services.splice(index, 1)
  form.services.forEach((service, i) => service.order = i);
}

// Yeni bir istatistik ekler
const addStat = () => {
  form.stats.push({
    value: '',
    label: '',
    order: form.stats.length
  })
}

// Bir istatistiği listeden siler
const removeStat = (index) => {
  form.stats.splice(index, 1)
  form.stats.forEach((stat, i) => stat.order = i);
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Hakkımızda Bölümü Yönetimi ⚙️</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary mb-6">Başlık ve Tanıtım</h2>

      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="form.mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label for="description1" class="block font-medium text-gray-700 mb-1">1. Paragraf</label>
        <textarea id="description1" v-model="form.description1" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="description2" class="block font-medium text-gray-700 mb-1">2. Paragraf</label>
        <textarea id="description2" v-model="form.description2" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="description3" class="block font-medium text-gray-700 mb-1">3. Paragraf</label>
        <textarea id="description3" v-model="form.description3" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">Takım Fotoğrafı</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label for="teamImage" class="block font-medium text-gray-700 mb-1">Takım Fotoğrafı URL</label>
          <input
            id="teamImage"
            :value="form.teamImage"
            type="url"
            class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            placeholder="URL otomatik olarak dolacak"
            readonly
          />
          <p v-if="form.teamImage" class="mt-2 text-sm text-gray-500">
            Mevcut Fotoğraf:
            <a :href="form.teamImage" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
              {{ form.teamImage }}
            </a>
          </p>
          <p v-else class="mt-2 text-sm text-red-500">Mevcut Fotoğraf Yok.</p>
        </div>
        <div>
          <FileUploader
            @file-uploaded="updateTeamImageUrl"
            label="Yeni Takım Fotoğrafı Yükle (JPG, PNG)"
          />
        </div>
      </div>

      <div>
        <label for="teamImageAlt" class="block font-medium text-gray-700 mb-1">Takım Fotoğrafı Alt Metni</label>
        <input id="teamImageAlt" v-model="form.teamImageAlt" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Profesyonel Nakliyat Ekibimiz İş Başında" />
      </div>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">Şirket Tarihçesi</h2>

      <div>
        <label for="historyTitle" class="block font-medium text-gray-700 mb-1">Tarihçe Başlığı</label>
        <input id="historyTitle" v-model="form.historyTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label for="historyText1" class="block font-medium text-gray-700 mb-1">Tarihçe 1. Paragraf</label>
        <textarea id="historyText1" v-model="form.historyText1" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="historyText2" class="block font-medium text-gray-700 mb-1">Tarihçe 2. Paragraf</label>
        <textarea id="historyText2" v-model="form.historyText2" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label for="historyText3" class="block font-medium text-gray-700 mb-1">Tarihçe 3. Paragraf</label>
        <textarea id="historyText3" v-model="form.historyText3" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">Hizmet Detayları</h2>
      <p class="text-sm text-gray-500 mb-4">Her hizmet için ikon, ikon alt metni, başlık ve açıklama.</p>

      <div class="space-y-4">
        <div
          v-for="(service, index) in form.services"
          :key="'service-' + (service.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Hizmet #{{ index + 1 }}</h4>
            <button type="button" @click="removeService(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label :for="'service-icon-' + index" class="block text-sm font-medium text-gray-600">İkon URL</label>
              <input v-model="service.iconPath" :id="'service-icon-' + index" type="text" class="w-full p-2 border rounded" placeholder="~/assets/images/shield.svg" />
            </div>
            <div>
              <label :for="'service-icon-alt-' + index" class="block text-sm font-medium text-gray-600">İkon Alt Metni</label>
              <input v-model="service.iconAlt" :id="'service-icon-alt-' + index" type="text" class="w-full p-2 border rounded" placeholder="Güvenli Taşıma" />
            </div>
            <div class="md:col-span-2">
              <label :for="'service-title-' + index" class="block text-sm font-medium text-gray-600">Hizmet Başlığı</label>
              <input v-model="service.title" :id="'service-title-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Sigortalı Taşıma" required />
            </div>
            <div class="md:col-span-2">
              <label :for="'service-desc-' + index" class="block text-sm font-medium text-gray-600">Hizmet Açıklaması</label>
              <textarea v-model="service.description" :id="'service-desc-' + index" rows="2" class="w-full p-2 border rounded" placeholder="Hizmet detayları"></textarea>
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addService" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Hizmet Ekle</span>
      </button>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">İstatistikler</h2>
      <p class="text-sm text-gray-500 mb-4">Her istatistik için değer ve etiket.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(stat, index) in form.stats"
          :key="'stat-' + (stat.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">İstatistik #{{ index + 1 }}</h4>
            <button type="button" @click="removeStat(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="space-y-2">
            <div>
              <label :for="'stat-value-' + index" class="block text-sm font-medium text-gray-600">Değer</label>
              <input v-model="stat.value" :id="'stat-value-' + index" type="text" class="w-full p-2 border rounded" placeholder="15+" required />
            </div>
            <div>
              <label :for="'stat-label-' + index" class="block text-sm font-medium text-gray-600">Etiket</label>
              <input v-model="stat.label" :id="'stat-label-' + index" type="text" class="w-full p-2 border rounded" placeholder="Yıllık Deneyim" required />
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addStat" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni İstatistik Ekle</span>
      </button>

      <h2 class="text-2xl font-semibold border-b pb-2 text-primary pt-6">SEO Ayarları</h2>

      <div>
        <label for="seoTitle" class="block font-medium text-gray-700 mb-1">SEO Başlığı</label>
        <input id="seoTitle" v-model="form.seoTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Hakkımızda | İstanbulun En Güvenilir Nakliyat Şirketi" />
      </div>

      <div>
        <label for="seoDescription" class="block font-medium text-gray-700 mb-1">SEO Açıklaması</label>
        <textarea id="seoDescription" v-model="form.seoDescription" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="15 yıllık nakliyat deneyimiyle..."></textarea>
      </div>

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
      title="Hakkımızda Kaydını Sil"
      message="Bu bölümdeki tüm verileri (metinler, hizmetler ve istatistikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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

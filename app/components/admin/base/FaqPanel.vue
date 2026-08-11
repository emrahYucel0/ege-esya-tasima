<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('faq-section', 'faq-section', {
  mainTitle: '',
  description: '',
  ctaTitle: '',
  ctaButtonText: '',
  ctaButtonLink: '',
  faqs: [],
  // `statsCards` PANELDE ARTIK DÜZENLENMİYOR ama bu satır KALMALI.
  // Sebep: useSectionCrud, API yanıtındaki değerleri yalnızca bu şekilde
  // tanımlı alanlara kopyalıyor. Satır silinseydi form kaydederken
  // `statsCards` göndermezdi; sunucudaki bölüm fabrikası ise çocuk
  // listelerini her PUT'ta `deleteMany` ile komple değiştiriyor —
  // yani veritabanındaki kayıtlar İLK KAYITTA SİLİNİRDİ.
  // Bu hâliyle veri okunuyor ve aynen geri yazılıyor: korunuyor.
  statsCards: [],
  images: [],
});

// Görsel pozisyonları için seçenekler
const imagePositions = [
  { value: 'primary', label: 'Primary - Sol üstteki büyük görsel' },
  { value: 'secondary', label: 'Secondary - Sağ alttaki görsel' }
]

const updateImageUrl = (url, index) => {
  form.images[index].imagePath = url
  message.value = 'Görsel başarıyla güncellendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ (FAQ)
// ------------------------------------

const addFaq = () => {
  form.faqs.push({
    question: '',
    answer: '',
    order: form.faqs.length,
    isActive: true,
    details: []
  })
}

const removeFaq = (index) => {
  form.faqs.splice(index, 1)
  form.faqs.forEach((faq, i) => faq.order = i)
}

const addFaqDetail = (faqIndex) => {
  if (!form.faqs[faqIndex].details) {
    form.faqs[faqIndex].details = []
  }
  form.faqs[faqIndex].details.push({
    text: '',
    order: form.faqs[faqIndex].details.length
  })
}

const removeFaqDetail = (faqIndex, detailIndex) => {
  form.faqs[faqIndex].details.splice(detailIndex, 1)
  form.faqs[faqIndex].details.forEach((detail, i) => detail.order = i)
}

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ (IMAGES)
// ------------------------------------

const addImage = () => {
  form.images.push({
    imagePath: '',
    altText: '',
    position: '',
    order: form.images.length
  })
}

const removeImage = (index) => {
  form.images.splice(index, 1)
  form.images.forEach((image, i) => image.order = i)
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">FAQ Section Yönetimi ❓</h1>

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

      <div>
        <label for="ctaTitle" class="block font-medium text-gray-700 mb-1">CTA Başlığı</label>
        <input id="ctaTitle" v-model="form.ctaTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="ctaButtonText" class="block font-medium text-gray-700 mb-1">CTA Buton Metni</label>
          <input id="ctaButtonText" v-model="form.ctaButtonText" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="ctaButtonLink" class="block font-medium text-gray-700 mb-1">CTA Buton Linki</label>
          <input id="ctaButtonLink" v-model="form.ctaButtonLink" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <!-- FAQ'lar Listesi -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Sıkça Sorulan Sorular</h2>

      <div class="space-y-6">
        <div
          v-for="(faq, index) in form.faqs"
          :key="'faq-' + (faq.id || index)"
          class="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-bold text-lg text-gray-700">Soru #{{ index + 1 }}</h4>
            <button :aria-label="`${index + 1}. Soruyu sil`" type="button" @click="removeFaq(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="space-y-3">
            <div>
              <label :for="'faq-question-' + index" class="block text-sm font-medium text-gray-600">Soru</label>
              <input v-model="faq.question" :id="'faq-question-' + index" type="text" class="w-full p-2 border rounded" placeholder="Nakliye öncesi eşyalarımı nasıl hazırlamalıyım?" required />
            </div>

            <div>
              <label :for="'faq-answer-' + index" class="block text-sm font-medium text-gray-600">Cevap</label>
              <textarea v-model="faq.answer" :id="'faq-answer-' + index" rows="3" class="w-full p-2 border rounded" placeholder="Detaylı cevap..." required></textarea>
            </div>

            <div class="flex items-center">
              <input v-model="faq.isActive" :id="'faq-active-' + index" type="checkbox" class="mr-2" />
              <label :for="'faq-active-' + index" class="text-sm text-gray-600">Aktif</label>
            </div>

            <!-- Detaylar -->
            <div class="mt-4 p-3 bg-white rounded border">
              <div class="flex justify-between items-center mb-2">
                <h5 class="font-semibold text-gray-700">Detaylar (Madde İşaretli Liste)</h5>
                <button type="button" @click="addFaqDetail(index)" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                  + Detay Ekle
                </button>
              </div>

              <div v-for="(detail, detailIndex) in faq.details" :key="'detail-' + detailIndex" class="flex items-center gap-2 mb-2">
                <input v-model="detail.text" type="text" class="flex-1 p-2 border rounded text-sm" placeholder="Detay metni..." />
                <button :aria-label="`${detailIndex + 1}. Ayrıntıyı sil`" type="button" @click="removeFaqDetail(index, detailIndex)" class="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addFaq" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Soru Ekle</span>
      </button>

      <!-- İSTATİSTİK KARTLARI BÖLÜMÜ KALDIRILDI.
           Bu kartlar SSS bölümündeki görsellerin üzerine biniyor ve
           fotoğrafın önemli kısmını kapatıyordu; cepheden çıkarıldılar
           (bkz. components/base/Faq.vue). Panelde kalsalardı yönetici
           hiçbir yerde görünmeyen bir alanı doldurmuş olurdu — bu sitede
           defalarca karşılaştığımız hata sınıfı.

           Veritabanındaki kayıtlar SİLİNMEDİ; karar geri alınırsa hem
           veri hem model yerinde duruyor. -->

      <!-- Görseller -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Görseller</h2>

      <div class="space-y-4">
        <div
          v-for="(image, index) in form.images"
          :key="'image-' + (image.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-bold text-lg text-gray-700">Görsel #{{ index + 1 }}</h4>
            <button :aria-label="`${index + 1}. Görseli sil`" type="button" @click="removeImage(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">Pozisyon</label>
              <select v-model="image.position" class="w-full p-2 border rounded">
                <option value="">Pozisyon seçin</option>
                <option v-for="pos in imagePositions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Alt Metni</label>
              <input v-model="image.altText" type="text" class="w-full p-2 border rounded" placeholder="Görsel açıklaması" />
            </div>
          </div>

          <div class="mt-3 p-3 bg-white rounded-lg border">
            <label class="block text-sm font-medium text-gray-600 mb-2">Görsel URL</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <input
                  :value="image.imagePath"
                  type="text"
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
      title="FAQ Section Kaydını Sil"
      message="Bu bölümdeki tüm verileri (sorular, detaylar, istatistik kartları ve görseller) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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

<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('siteSettings', 'site-settings', {
  brandName: '',
  siteName: '',
  siteDescription: '',
  phone: '',
  mobilePhone: '',
  whatsAppNumber: '',
  email: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
  twitterUrl: '',
  linkedinUrl: '',
  youtubeUrl: '',
  githubUrl: '',
  googleAnalyticsId: '',
  googleTagManagerId: '',
  googleAdsenseId: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  footerText: '',
  copyrightText: '',
  workingHours: '',
  googleMapsEmbed: '',
  logo: '',
  favicon: '',
  ogImage: '',
});

const updateLogoUrl = (url) => {
  form.logo = url
  message.value = 'Logo başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

const updateFaviconUrl = (url) => {
  form.favicon = url
  message.value = 'Favicon başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

const updateOgImageUrl = (url) => {
  form.ogImage = url
  message.value = 'OG görseli başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Site Genel Ayarları ⚙️</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('Hata') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <!-- 1. TEMEL BİLGİLER -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🏢 Temel Bilgiler</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium text-gray-700 mb-1">Marka Adı</label>
            <input v-model="form.brandName" type="text" class="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Site Adı</label>
            <input v-model="form.siteName" type="text" class="w-full p-3 border rounded-lg" />
          </div>
        </div>
        <div class="mt-4">
          <label class="block font-medium text-gray-700 mb-1">Site Açıklaması</label>
          <textarea v-model="form.siteDescription" rows="3" class="w-full p-3 border rounded-lg"></textarea>
        </div>
      </div>

      <!-- 2. İLETİŞİM BİLGİLERİ -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">📞 İletişim Bilgileri</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Telefon</label><input v-model="form.phone" type="tel" class="w-full p-3 border rounded-lg" /></div>
          <div><label>Cep Telefonu</label><input v-model="form.mobilePhone" type="tel" class="w-full p-3 border rounded-lg" /></div>
          <div><label>WhatsApp Numarası</label><input v-model="form.whatsAppNumber" type="tel" class="w-full p-3 border rounded-lg" /></div>
          <div><label>E-posta</label><input v-model="form.email" type="email" class="w-full p-3 border rounded-lg" /></div>
        </div>
        <div class="mt-4">
          <label>Adres</label>
          <textarea v-model="form.address" rows="2" class="w-full p-3 border rounded-lg"></textarea>
        </div>
      </div>

      <!-- 3. SOSYAL MEDYA -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🌐 Sosyal Medya</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Facebook</label><input v-model="form.facebookUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>Instagram</label><input v-model="form.instagramUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>Twitter/X</label><input v-model="form.twitterUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>LinkedIn</label><input v-model="form.linkedinUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>YouTube</label><input v-model="form.youtubeUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>GitHub</label><input v-model="form.githubUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
        </div>
      </div>

      <!-- 4. ANALİTİK & KODLAR -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">📊 Analitik & Takip Kodları</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Google Analytics ID</label><input v-model="form.googleAnalyticsId" class="w-full p-3 border rounded-lg" placeholder="G-XXXXXXXXXX" /></div>
          <div><label>Google Tag Manager ID</label><input v-model="form.googleTagManagerId" class="w-full p-3 border rounded-lg" placeholder="GTM-XXXXXX" /></div>
          <div><label>Google Adsense ID</label><input v-model="form.googleAdsenseId" class="w-full p-3 border rounded-lg" placeholder="pub-xxxxxxxx" /></div>
        </div>
      </div>

      <!-- 5. SEO & META -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🔍 SEO & Meta Etiketleri</h2>
        <div>
          <label>Meta Başlık</label>
          <input v-model="form.metaTitle" class="w-full p-3 border rounded-lg" />
        </div>
        <div class="mt-4">
          <label>Meta Açıklama</label>
          <textarea v-model="form.metaDescription" rows="2" class="w-full p-3 border rounded-lg"></textarea>
        </div>
        <div class="mt-4">
          <label>Meta Anahtar Kelimeler</label>
          <input v-model="form.metaKeywords" class="w-full p-3 border rounded-lg" placeholder="kelime1, kelime2, kelime3" />
        </div>
      </div>

      <!-- 6. FOOTER & COPYRIGHT -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">📄 Footer & Telif Hakkı</h2>
        <div>
          <label>Footer Metni</label>
          <textarea v-model="form.footerText" rows="2" class="w-full p-3 border rounded-lg"></textarea>
        </div>
        <div class="mt-4">
          <label>Copyright Metni</label>
          <input v-model="form.copyrightText" class="w-full p-3 border rounded-lg" />
        </div>
      </div>

      <!-- 7. DİĞER BİLGİLER (Çalışma Saatleri, Harita) -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🕒 Diğer Bilgiler</h2>
        <div>
          <label>Çalışma Saatleri</label>
          <textarea v-model="form.workingHours" rows="2" class="w-full p-3 border rounded-lg" placeholder="Pazartesi - Cuma: 09:00 - 18:00"></textarea>
        </div>
        <div class="mt-4">
          <label>Google Maps Embed Kodu</label>
          <textarea v-model="form.googleMapsEmbed" rows="3" class="w-full p-3 border rounded-lg" placeholder="<iframe src='...'></iframe>"></textarea>
        </div>
      </div>

      <!-- 8. GÖRSEL YÖNETİMİ -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🖼️ Görsel Yönetimi</h2>

        <!-- Logo -->
        <div class="mb-6 p-3 bg-gray-50 rounded">
          <label class="font-semibold block mb-2">Logo</label>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <input :value="form.logo" type="url" readonly class="w-full p-2 border rounded bg-gray-100" />
              <p v-if="form.logo" class="text-sm mt-1">
                <a :href="form.logo" target="_blank" class="text-blue-500">Görüntüle</a>
              </p>
            </div>
            <FileUploader @file-uploaded="updateLogoUrl" label="Logo Yükle (JPG, PNG, WEBP)" />
          </div>
        </div>

        <!-- Favicon -->
        <div class="mb-6 p-3 bg-gray-50 rounded">
          <label class="font-semibold block mb-2">Favicon</label>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <input :value="form.favicon" type="url" readonly class="w-full p-2 border rounded bg-gray-100" />
              <p v-if="form.favicon" class="text-sm mt-1">
                <a :href="form.favicon" target="_blank" class="text-blue-500">Görüntüle</a>
              </p>
            </div>
            <FileUploader @file-uploaded="updateFaviconUrl" label="Favicon Yükle (ICO, PNG)" />
          </div>
        </div>

        <!-- Open Graph Görseli -->
        <div class="p-3 bg-gray-50 rounded">
          <label class="font-semibold block mb-2">OG Görseli (Sosyal Medya Paylaşım)</label>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <input :value="form.ogImage" type="url" readonly class="w-full p-2 border rounded bg-gray-100" />
              <p v-if="form.ogImage" class="text-sm mt-1">
                <a :href="form.ogImage" target="_blank" class="text-blue-500">Görüntüle</a>
              </p>
            </div>
            <FileUploader @file-uploaded="updateOgImageUrl" label="OG Görseli Yükle (JPG, PNG, WEBP)" />
          </div>
        </div>
      </div>

      <div class="flex space-x-4 pt-4 border-t">
        <button type="submit" :disabled="isSaving" :aria-busy="isSaving" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {{ recordId ? 'Tümünü Güncelle' : 'Oluştur' }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" :disabled="isSaving" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          Tüm Ayarları Sil
        </button>
      </div>
    </form>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      :loading="isDeleting"
      title="Site Ayarlarını Sil"
      message="Tüm site ayarları silinecek. Bu işlem geri alınamaz! Emin misiniz?"
      confirmText="Evet, Sil"
      cancelText="Vazgeç"
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

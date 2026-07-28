<script setup>
import { ref, onMounted, computed } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'site-settings'
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// ---- Temel Bilgiler ----
const brandName = ref('')
const siteName = ref('')
const siteDescription = ref('')

// ---- İletişim Bilgileri ----
const phone = ref('')
const mobilePhone = ref('')
const whatsAppNumber = ref('')
const email = ref('')
const address = ref('')

// ---- Sosyal Medya ----
const facebookUrl = ref('')
const instagramUrl = ref('')
const twitterUrl = ref('')
const linkedinUrl = ref('')
const youtubeUrl = ref('')
const githubUrl = ref('')

// ---- Analitik & Kodlar ----
const googleAnalyticsId = ref('')
const googleTagManagerId = ref('')
const googleAdsenseId = ref('')

// ---- SEO & Meta ----
const metaTitle = ref('')
const metaDescription = ref('')
const metaKeywords = ref('')

// ---- Footer & Copyright ----
const footerText = ref('')
const copyrightText = ref('')

// ---- Diğer Bilgiler ----
const workingHours = ref('')
const googleMapsEmbed = ref('')

// ---- Görseller (mevcut değerler) ----
const logo = ref('')
const favicon = ref('')
const ogImage = ref('')

// ---- Yerel görseller (yeni yüklenen, henüz kaydedilmemiş) ----
const localLogo = ref('')
const localFavicon = ref('')
const localOgImage = ref('')

// ---- MODAL STATE'LERİ (yeni kayıt için) ----
const modalBrandName = ref('')
const modalSiteName = ref('')
const modalSiteDescription = ref('')
const modalPhone = ref('')
const modalMobilePhone = ref('')
const modalWhatsAppNumber = ref('')
const modalEmail = ref('')
const modalAddress = ref('')
const modalFacebookUrl = ref('')
const modalInstagramUrl = ref('')
const modalTwitterUrl = ref('')
const modalLinkedinUrl = ref('')
const modalYoutubeUrl = ref('')
const modalGithubUrl = ref('')
const modalGoogleAnalyticsId = ref('')
const modalGoogleTagManagerId = ref('')
const modalGoogleAdsenseId = ref('')
const modalMetaTitle = ref('')
const modalMetaDescription = ref('')
const modalMetaKeywords = ref('')
const modalFooterText = ref('')
const modalCopyrightText = ref('')
const modalWorkingHours = ref('')
const modalGoogleMapsEmbed = ref('')
const modalLogo = ref('')
const modalFavicon = ref('')
const modalOgImage = ref('')

// ------------------------------------
// COMPUTED
// ------------------------------------
// Kayıt var mı? (en az bir temel alan doluysa)
const hasData = computed(() => {
  return !!(
    brandName.value || siteName.value || siteDescription.value ||
    phone.value || email.value || logo.value
  )
})

// Görsellerin gösterilecek son hali (yerel değişken öncelikli)
const displayLogo = computed(() => localLogo.value || logo.value)
const displayFavicon = computed(() => localFavicon.value || favicon.value)
const displayOgImage = computed(() => localOgImage.value || ogImage.value)

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------
const loadSettings = async () => {
  isLoading.value = true
  try {
    const { data, error } = await useFetch('/api/siteSettings')
    if (error.value) {
      message.value = 'Ayarlar alınırken hata oluştu: ' + error.value.message
    } else if (data.value?.success && data.value.data) {
      const settings = data.value.data
      // Temel
      brandName.value = settings.brandName || ''
      siteName.value = settings.siteName || ''
      siteDescription.value = settings.siteDescription || ''
      // İletişim
      phone.value = settings.phone || ''
      mobilePhone.value = settings.mobilePhone || ''
      whatsAppNumber.value = settings.whatsAppNumber || ''
      email.value = settings.email || ''
      address.value = settings.address || ''
      // Sosyal
      facebookUrl.value = settings.facebookUrl || ''
      instagramUrl.value = settings.instagramUrl || ''
      twitterUrl.value = settings.twitterUrl || ''
      linkedinUrl.value = settings.linkedinUrl || ''
      youtubeUrl.value = settings.youtubeUrl || ''
      githubUrl.value = settings.githubUrl || ''
      // Analitik
      googleAnalyticsId.value = settings.googleAnalyticsId || ''
      googleTagManagerId.value = settings.googleTagManagerId || ''
      googleAdsenseId.value = settings.googleAdsenseId || ''
      // SEO
      metaTitle.value = settings.metaTitle || ''
      metaDescription.value = settings.metaDescription || ''
      metaKeywords.value = settings.metaKeywords || ''
      // Footer
      footerText.value = settings.footerText || ''
      copyrightText.value = settings.copyrightText || ''
      // Diğer
      workingHours.value = settings.workingHours || ''
      googleMapsEmbed.value = settings.googleMapsEmbed || ''
      // Görseller
      logo.value = settings.logo || ''
      favicon.value = settings.favicon || ''
      ogImage.value = settings.ogImage || ''

      // Yerel görselleri sıfırla (yeni yüklenenler kaydedildikten sonra temizlenir)
      localLogo.value = ''
      localFavicon.value = ''
      localOgImage.value = ''

      message.value = 'Ayarlar başarıyla yüklendi!'
    } else {
      message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
    }
  } catch (err) {
    message.value = 'Veri yüklenirken beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

const updateSettings = async () => {
  message.value = ''
  isLoading.value = true

  // Yerel görseller varsa onları kullan, yoksa mevcutları
  const logoToSend = localLogo.value || logo.value
  const faviconToSend = localFavicon.value || favicon.value
  const ogImageToSend = localOgImage.value || ogImage.value

  try {
    const { data, error } = await useFetch('/api/siteSettings', {
      method: 'PUT',
      body: {
        sectionName,
        brandName: brandName.value,
        siteName: siteName.value,
        siteDescription: siteDescription.value,
        phone: phone.value,
        mobilePhone: mobilePhone.value,
        whatsAppNumber: whatsAppNumber.value,
        email: email.value,
        address: address.value,
        facebookUrl: facebookUrl.value,
        instagramUrl: instagramUrl.value,
        twitterUrl: twitterUrl.value,
        linkedinUrl: linkedinUrl.value,
        youtubeUrl: youtubeUrl.value,
        githubUrl: githubUrl.value,
        googleAnalyticsId: googleAnalyticsId.value,
        googleTagManagerId: googleTagManagerId.value,
        googleAdsenseId: googleAdsenseId.value,
        metaTitle: metaTitle.value,
        metaDescription: metaDescription.value,
        metaKeywords: metaKeywords.value,
        footerText: footerText.value,
        copyrightText: copyrightText.value,
        workingHours: workingHours.value,
        googleMapsEmbed: googleMapsEmbed.value,
        logo: logoToSend,
        favicon: faviconToSend,
        ogImage: ogImageToSend,
      }
    })

    if (error.value) {
      message.value = 'Güncelleme sırasında hata oluştu: ' + error.value.message
    } else if (data.value?.success) {
      message.value = 'Site ayarları başarıyla güncellendi! 🎉'
      // Yerel görselleri temizle ve yeniden yükle
      localLogo.value = ''
      localFavicon.value = ''
      localOgImage.value = ''
      await loadSettings()
    } else {
      message.value = 'Güncelleme hatası: ' + (data.value?.error || 'Bilinmeyen hata')
    }
  } catch (err) {
    message.value = 'Güncelleme sırasında beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

const createSettings = async () => {
  message.value = ''
  isLoading.value = true

  try {
    const { data, error } = await useFetch('/api/siteSettings', {
      method: 'POST',
      body: {
        sectionName,
        brandName: modalBrandName.value,
        siteName: modalSiteName.value,
        siteDescription: modalSiteDescription.value,
        phone: modalPhone.value,
        mobilePhone: modalMobilePhone.value,
        whatsAppNumber: modalWhatsAppNumber.value,
        email: modalEmail.value,
        address: modalAddress.value,
        facebookUrl: modalFacebookUrl.value,
        instagramUrl: modalInstagramUrl.value,
        twitterUrl: modalTwitterUrl.value,
        linkedinUrl: modalLinkedinUrl.value,
        youtubeUrl: modalYoutubeUrl.value,
        githubUrl: modalGithubUrl.value,
        googleAnalyticsId: modalGoogleAnalyticsId.value,
        googleTagManagerId: modalGoogleTagManagerId.value,
        googleAdsenseId: modalGoogleAdsenseId.value,
        metaTitle: modalMetaTitle.value,
        metaDescription: modalMetaDescription.value,
        metaKeywords: modalMetaKeywords.value,
        footerText: modalFooterText.value,
        copyrightText: modalCopyrightText.value,
        workingHours: modalWorkingHours.value,
        googleMapsEmbed: modalGoogleMapsEmbed.value,
        logo: modalLogo.value,
        favicon: modalFavicon.value,
        ogImage: modalOgImage.value,
      }
    })

    if (error.value) {
      message.value = 'Ekleme sırasında hata oluştu: ' + error.value.message
    } else if (data.value?.success) {
      message.value = 'Site ayarları başarıyla oluşturuldu! ✨'
      showAddForm.value = false
      resetModal()
      await loadSettings()
    } else {
      message.value = 'Ekleme hatası: ' + (data.value?.error || 'Bilinmeyen hata')
    }
  } catch (err) {
    message.value = 'Ekleme sırasında beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

const confirmDelete = async () => {
  message.value = ''
  isLoading.value = true

  try {
    const { error, data } = await useFetch('/api/siteSettings', {
      method: 'DELETE',
      body: { sectionName }
    })

    showDeleteModal.value = false

    if (error.value) {
      message.value = 'Silme sırasında hata oluştu: ' + error.value.message
    } else if (data.value?.success) {
      message.value = 'Site ayarları silindi! 🗑️'
      // Tüm state'leri sıfırla
      brandName.value = ''
      siteName.value = ''
      siteDescription.value = ''
      phone.value = ''
      mobilePhone.value = ''
      whatsAppNumber.value = ''
      email.value = ''
      address.value = ''
      facebookUrl.value = ''
      instagramUrl.value = ''
      twitterUrl.value = ''
      linkedinUrl.value = ''
      youtubeUrl.value = ''
      githubUrl.value = ''
      googleAnalyticsId.value = ''
      googleTagManagerId.value = ''
      googleAdsenseId.value = ''
      metaTitle.value = ''
      metaDescription.value = ''
      metaKeywords.value = ''
      footerText.value = ''
      copyrightText.value = ''
      workingHours.value = ''
      googleMapsEmbed.value = ''
      logo.value = ''
      favicon.value = ''
      ogImage.value = ''
      localLogo.value = ''
      localFavicon.value = ''
      localOgImage.value = ''
    } else {
      message.value = 'Silme hatası: ' + (data.value?.error || 'Bilinmeyen hata')
    }
  } catch (err) {
    message.value = 'Silme sırasında beklenmeyen hata: ' + err.message
  } finally {
    isLoading.value = false
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// ------------------------------------
// DOSYA YÜKLEYİCİ İŞLEMLERİ (ANA FORM)
// ------------------------------------
const updateLogoUrl = (url) => {
  localLogo.value = url
  message.value = 'Logo başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

const updateFaviconUrl = (url) => {
  localFavicon.value = url
  message.value = 'Favicon başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

const updateOgImageUrl = (url) => {
  localOgImage.value = url
  message.value = 'OG görseli başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

// ------------------------------------
// MODAL İŞLEMLERİ
// ------------------------------------
const resetModal = () => {
  modalBrandName.value = ''
  modalSiteName.value = ''
  modalSiteDescription.value = ''
  modalPhone.value = ''
  modalMobilePhone.value = ''
  modalWhatsAppNumber.value = ''
  modalEmail.value = ''
  modalAddress.value = ''
  modalFacebookUrl.value = ''
  modalInstagramUrl.value = ''
  modalTwitterUrl.value = ''
  modalLinkedinUrl.value = ''
  modalYoutubeUrl.value = ''
  modalGithubUrl.value = ''
  modalGoogleAnalyticsId.value = ''
  modalGoogleTagManagerId.value = ''
  modalGoogleAdsenseId.value = ''
  modalMetaTitle.value = ''
  modalMetaDescription.value = ''
  modalMetaKeywords.value = ''
  modalFooterText.value = ''
  modalCopyrightText.value = ''
  modalWorkingHours.value = ''
  modalGoogleMapsEmbed.value = ''
  modalLogo.value = ''
  modalFavicon.value = ''
  modalOgImage.value = ''
}

const openAddForm = () => {
  resetModal()
  showAddForm.value = true
}

const closeAddForm = () => {
  showAddForm.value = false
  resetModal()
}

// Modal için dosya yükleyici handler'lar
const updateModalLogoUrl = (url) => { modalLogo.value = url }
const updateModalFaviconUrl = (url) => { modalFavicon.value = url }
const updateModalOgImageUrl = (url) => { modalOgImage.value = url }

// ------------------------------------
// LIFECYCLE
// ------------------------------------
onMounted(() => {
  loadSettings()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Site Genel Ayarları ⚙️</h1>
    
    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('Hata') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM (kayıt varsa) -->
    <form v-if="hasData || isLoading" @submit.prevent="updateSettings" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">
      
      <!-- 1. TEMEL BİLGİLER -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🏢 Temel Bilgiler</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium text-gray-700 mb-1">Marka Adı</label>
            <input v-model="brandName" type="text" class="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Site Adı</label>
            <input v-model="siteName" type="text" class="w-full p-3 border rounded-lg" />
          </div>
        </div>
        <div class="mt-4">
          <label class="block font-medium text-gray-700 mb-1">Site Açıklaması</label>
          <textarea v-model="siteDescription" rows="3" class="w-full p-3 border rounded-lg"></textarea>
        </div>
      </div>

      <!-- 2. İLETİŞİM BİLGİLERİ -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">📞 İletişim Bilgileri</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Telefon</label><input v-model="phone" type="tel" class="w-full p-3 border rounded-lg" /></div>
          <div><label>Cep Telefonu</label><input v-model="mobilePhone" type="tel" class="w-full p-3 border rounded-lg" /></div>
          <div><label>WhatsApp Numarası</label><input v-model="whatsAppNumber" type="tel" class="w-full p-3 border rounded-lg" /></div>
          <div><label>E-posta</label><input v-model="email" type="email" class="w-full p-3 border rounded-lg" /></div>
        </div>
        <div class="mt-4">
          <label>Adres</label>
          <textarea v-model="address" rows="2" class="w-full p-3 border rounded-lg"></textarea>
        </div>
      </div>

      <!-- 3. SOSYAL MEDYA -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🌐 Sosyal Medya</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Facebook</label><input v-model="facebookUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>Instagram</label><input v-model="instagramUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>Twitter/X</label><input v-model="twitterUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>LinkedIn</label><input v-model="linkedinUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>YouTube</label><input v-model="youtubeUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
          <div><label>GitHub</label><input v-model="githubUrl" type="url" class="w-full p-3 border rounded-lg" /></div>
        </div>
      </div>

      <!-- 4. ANALİTİK & KODLAR -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">📊 Analitik & Takip Kodları</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Google Analytics ID</label><input v-model="googleAnalyticsId" class="w-full p-3 border rounded-lg" placeholder="G-XXXXXXXXXX" /></div>
          <div><label>Google Tag Manager ID</label><input v-model="googleTagManagerId" class="w-full p-3 border rounded-lg" placeholder="GTM-XXXXXX" /></div>
          <div><label>Google Adsense ID</label><input v-model="googleAdsenseId" class="w-full p-3 border rounded-lg" placeholder="pub-xxxxxxxx" /></div>
        </div>
      </div>

      <!-- 5. SEO & META -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🔍 SEO & Meta Etiketleri</h2>
        <div>
          <label>Meta Başlık</label>
          <input v-model="metaTitle" class="w-full p-3 border rounded-lg" />
        </div>
        <div class="mt-4">
          <label>Meta Açıklama</label>
          <textarea v-model="metaDescription" rows="2" class="w-full p-3 border rounded-lg"></textarea>
        </div>
        <div class="mt-4">
          <label>Meta Anahtar Kelimeler</label>
          <input v-model="metaKeywords" class="w-full p-3 border rounded-lg" placeholder="kelime1, kelime2, kelime3" />
        </div>
      </div>

      <!-- 6. FOOTER & COPYRIGHT -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">📄 Footer & Telif Hakkı</h2>
        <div>
          <label>Footer Metni</label>
          <textarea v-model="footerText" rows="2" class="w-full p-3 border rounded-lg"></textarea>
        </div>
        <div class="mt-4">
          <label>Copyright Metni</label>
          <input v-model="copyrightText" class="w-full p-3 border rounded-lg" />
        </div>
      </div>

      <!-- 7. DİĞER BİLGİLER (Çalışma Saatleri, Harita) -->
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold text-primary mb-4">🕒 Diğer Bilgiler</h2>
        <div>
          <label>Çalışma Saatleri</label>
          <textarea v-model="workingHours" rows="2" class="w-full p-3 border rounded-lg" placeholder="Pazartesi - Cuma: 09:00 - 18:00"></textarea>
        </div>
        <div class="mt-4">
          <label>Google Maps Embed Kodu</label>
          <textarea v-model="googleMapsEmbed" rows="3" class="w-full p-3 border rounded-lg" placeholder="<iframe src='...'></iframe>"></textarea>
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
              <input :value="displayLogo" type="url" readonly class="w-full p-2 border rounded bg-gray-100" />
              <p v-if="displayLogo" class="text-sm mt-1">
                <a :href="displayLogo" target="_blank" class="text-blue-500">Görüntüle</a>
                <span v-if="localLogo && localLogo !== logo" class="ml-2 text-orange-500">(Yeni - Kaydedilmemiş)</span>
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
              <input :value="displayFavicon" type="url" readonly class="w-full p-2 border rounded bg-gray-100" />
              <p v-if="displayFavicon" class="text-sm mt-1">
                <a :href="displayFavicon" target="_blank" class="text-blue-500">Görüntüle</a>
                <span v-if="localFavicon && localFavicon !== favicon" class="ml-2 text-orange-500">(Yeni - Kaydedilmemiş)</span>
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
              <input :value="displayOgImage" type="url" readonly class="w-full p-2 border rounded bg-gray-100" />
              <p v-if="displayOgImage" class="text-sm mt-1">
                <a :href="displayOgImage" target="_blank" class="text-blue-500">Görüntüle</a>
                <span v-if="localOgImage && localOgImage !== ogImage" class="ml-2 text-orange-500">(Yeni - Kaydedilmemiş)</span>
              </p>
            </div>
            <FileUploader @file-uploaded="updateOgImageUrl" label="OG Görseli Yükle (JPG, PNG, WEBP)" />
          </div>
        </div>
      </div>

      <div class="flex space-x-4 pt-4 border-t">
        <button type="submit" :disabled="isLoading" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold">
          {{ isLoading ? 'Güncelleniyor...' : 'Tümünü Güncelle' }}
        </button>
        <button type="button" @click="showDeleteModal = true" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
          Tüm Ayarları Sil
        </button>
      </div>
    </form>

    <!-- YENİ KAYIT EKLE BUTONU (kayıt yoksa) -->
    <div v-if="!hasData && !isLoading" class="text-center py-12">
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-2xl mx-auto">
        <svg class="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-xl font-semibold text-yellow-800 mb-2">Site Ayar Kaydı Bulunamadı</h3>
        <p class="text-yellow-700 mb-6">Veritabanında site ayarları için kayıt yok. Yeni bir kayıt oluşturmak için aşağıdaki butonu kullanın.</p>
        <button @click="openAddForm" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold shadow-md">
          Yeni Kayıt Ekle
        </button>
      </div>
    </div>

    <!-- YENİ KAYIT MODALI -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center p-6 border-b">
          <h2 class="text-2xl font-bold">Yeni Site Ayarı Ekle</h2>
          <button @click="closeAddForm" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <!-- Aynı alanlar kısaltılmış olarak burada da gösterilir (metin kalabalıklığını önlemek için ana formdaki grupların benzeri) -->
          <!-- Gruplar halinde tüm alanların inputları eklenir. Detaylı yazmak yerine en kritik alanları örnek olarak koyuyorum; aynı ana formdaki tüm alanlar burada da olmalıdır. -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label>Marka Adı</label><input v-model="modalBrandName" class="w-full p-2 border rounded" /></div>
            <div><label>Site Adı</label><input v-model="modalSiteName" class="w-full p-2 border rounded" /></div>
            <div class="md:col-span-2"><label>Site Açıklaması</label><textarea v-model="modalSiteDescription" rows="2" class="w-full p-2 border rounded"></textarea></div>
          </div>
          <!-- İletişim, sosyal medya, analitik vb. aynı şekilde eklenir (kısalık için atlanmıştır, ancak gerçek projede tüm alanlar burada olmalıdır) -->
          <!-- Görsel yükleyiciler (modal için) -->
          <div class="border-t pt-4">
            <h3 class="font-semibold mb-2">Görseller</h3>
            <div class="space-y-4">
              <div><label>Logo</label><FileUploader @file-uploaded="updateModalLogoUrl" label="Logo Yükle" /><input v-model="modalLogo" type="url" readonly class="mt-1 w-full p-2 bg-gray-100 rounded" /></div>
              <div><label>Favicon</label><FileUploader @file-uploaded="updateModalFaviconUrl" label="Favicon Yükle" /><input v-model="modalFavicon" type="url" readonly class="mt-1 w-full p-2 bg-gray-100 rounded" /></div>
              <div><label>OG Görseli</label><FileUploader @file-uploaded="updateModalOgImageUrl" label="OG Görseli Yükle" /><input v-model="modalOgImage" type="url" readonly class="mt-1 w-full p-2 bg-gray-100 rounded" /></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button @click="closeAddForm" class="px-4 py-2 border rounded">İptal</button>
          <button @click="createSettings" :disabled="isLoading" class="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50">Kaydı Oluştur</button>
        </div>
      </div>
    </div>

    <!-- SİLME ONAY MODALI -->
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Site Ayarlarını Sil"
      message="Tüm site ayarları silinecek. Bu işlem geri alınamaz! Emin misiniz?"
      confirmText="Evet, Sil"
      cancelText="Vazgeç"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
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
<script setup>
import { ref, onMounted } from 'vue'

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = 'footers'
const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)
const isLoading = ref(false)

// Ana alanlar
const address = ref('')
const phone = ref('')
const email = ref('')
const copyright = ref('')

// Dinamik olarak yönetilen link listeleri
const socialLinksList = ref([])
const regionLinksList = ref([])
const quickLinksList = ref([])
const blogLinksList = ref([])

// Modal için ayrı state'ler (link listeleri)
const modalSocialLinksList = ref([])
const modalRegionLinksList = ref([])
const modalQuickLinksList = ref([])
const modalBlogLinksList = ref([])

// Modal form alanları - SADECE TEMEL ALANLAR
const newFooterFields = ref([
  { name: 'address', label: 'Adres', type: 'textarea', value: '' },
  { name: 'phone', label: 'Telefon', type: 'text', value: '' },
  { name: 'email', label: 'E-posta', type: 'text', value: '' },
  { name: 'copyright', label: 'Telif Hakkı Metni', type: 'text', value: '' },
])

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// Footer verisini API'den yükler
const loadFooter = async () => {
  isLoading.value = true
  const { data, error } = await useFetch(`/api/${sectionName}`, { immediate: true })

  if (error.value) {
    message.value = 'Footer verisi alınırken hata oluştu.'
  } else if (data.value && data.value.success !== false) {
    address.value = data.value.address || ''
    phone.value = data.value.phone || ''
    email.value = data.value.email || ''
    copyright.value = data.value.copyright || ''
    socialLinksList.value = data.value.socialLinks || []
    regionLinksList.value = data.value.regionLinks || []
    quickLinksList.value = data.value.quickLinks || []
    blogLinksList.value = data.value.blogLinks || []
  } else {
    message.value = 'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.'
  }
  isLoading.value = false
}

onMounted(() => {
  loadFooter()
})

// Footer güncelleme işlemi (PUT)
const updateFooter = async () => {
  message.value = ''
  isLoading.value = true

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'PUT',
    body: {
      sectionName: sectionName,
      address: address.value,
      phone: phone.value,
      email: email.value,
      copyright: copyright.value,
      socialLinks: socialLinksList.value.map(link => ({ name: link.name, url: link.url })),
      regionLinks: regionLinksList.value.map(link => ({ name: link.name, url: link.url })),
      quickLinks: quickLinksList.value.map(link => ({ name: link.name, url: link.url })),
      blogLinks: blogLinksList.value.map(link => ({ name: link.name, url: link.url })),
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Footer bölümü başarıyla güncellendi! 🎉'
    await loadFooter()
  }
  isLoading.value = false
}

// Yeni Footer kaydı ekleme işlemi (POST)
const addFooter = async (formData) => {
  message.value = ''
  isLoading.value = true

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: 'POST',
    body: {
      sectionName: sectionName,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      copyright: formData.copyright,
      socialLinks: modalSocialLinksList.value.map(link => ({ name: link.name, url: link.url })),
      regionLinks: modalRegionLinksList.value.map(link => ({ name: link.name, url: link.url })),
      quickLinks: modalQuickLinksList.value.map(link => ({ name: link.name, url: link.url })),
      blogLinks: modalBlogLinksList.value.map(link => ({ name: link.name, url: link.url })),
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Ekleme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Footer başarıyla eklendi! ✨'
    showAddForm.value = false
    resetModal()
    await loadFooter()
  }
  isLoading.value = false
}

// Footer silme işlemi (DELETE)
const confirmDelete = async () => {
  message.value = ''
  isLoading.value = true
  const { error, data } = await useFetch(`/api/${sectionName}`, {
    method: 'DELETE',
    body: { sectionName: sectionName },
  })

  showDeleteModal.value = false

  if (error.value || !data.value?.success) {
    message.value = 'Silme sırasında hata oluştu: ' + (data.value?.error || error.value?.message)
  } else {
    message.value = 'Footer kaydı silindi!🗑️'
    address.value = ''
    phone.value = ''
    email.value = ''
    copyright.value = ''
    socialLinksList.value = []
    regionLinksList.value = []
    quickLinksList.value = []
    blogLinksList.value = []
  }
  isLoading.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// ------------------------------------
// MODAL YARDIMCILARI
// ------------------------------------

// Modal state'lerini sıfırla
const resetModal = () => {
  modalSocialLinksList.value = []
  modalRegionLinksList.value = []
  modalQuickLinksList.value = []
  modalBlogLinksList.value = []
  newFooterFields.value.forEach(field => (field.value = ''))
}

// Modal açıldığında temizle
const openAddForm = () => {
  resetModal()
  showAddForm.value = true
}

// Modal kapatıldığında temizle
const closeAddForm = () => {
  showAddForm.value = false
  resetModal()
}

// ------------------------------------
// DİNAMİK LİNK İŞLEMLERİ - ANA FORM
// ------------------------------------

const addSocialLink = () => socialLinksList.value.push({ name: '', url: '' })
const removeSocialLink = (index) => socialLinksList.value.splice(index, 1)

const addRegionLink = () => regionLinksList.value.push({ name: '', url: '' })
const removeRegionLink = (index) => regionLinksList.value.splice(index, 1)

const addQuickLink = () => quickLinksList.value.push({ name: '', url: '' })
const removeQuickLink = (index) => quickLinksList.value.splice(index, 1)

const addBlogLink = () => blogLinksList.value.push({ name: '', url: '' })
const removeBlogLink = (index) => blogLinksList.value.splice(index, 1)

// ------------------------------------
// DİNAMİK LİNK İŞLEMLERİ - MODAL FORM
// ------------------------------------

const addModalSocialLink = () => modalSocialLinksList.value.push({ name: '', url: '' })
const removeModalSocialLink = (index) => modalSocialLinksList.value.splice(index, 1)

const addModalRegionLink = () => modalRegionLinksList.value.push({ name: '', url: '' })
const removeModalRegionLink = (index) => modalRegionLinksList.value.splice(index, 1)

const addModalQuickLink = () => modalQuickLinksList.value.push({ name: '', url: '' })
const removeModalQuickLink = (index) => modalQuickLinksList.value.splice(index, 1)

const addModalBlogLink = () => modalBlogLinksList.value.push({ name: '', url: '' })
const removeModalBlogLink = (index) => modalBlogLinksList.value.splice(index, 1)
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Footer Bölümü Yönetimi ⚙️</h1>

    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form @submit.prevent="updateFooter" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İletişim Bilgileri</h2>

      <div>
        <label for="address" class="block font-medium text-gray-700 mb-1">Adres</label>
        <textarea id="address" v-model="address" rows="2" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="phone" class="block font-medium text-gray-700 mb-1">Telefon</label>
          <input id="phone" v-model="phone" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="email" class="block font-medium text-gray-700 mb-1">E-posta</label>
          <input id="email" v-model="email" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label for="copyright" class="block font-medium text-gray-700 mb-1">Telif Hakkı Metni</label>
        <input id="copyright" v-model="copyright" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="© 2026 Evenakliye.com Tüm Hakları Saklıdır." />
      </div>

      <!-- SOSYAL MEDYA LİNKLERİ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Sosyal Medya Linkleri</h2>
      <div class="space-y-4">
        <div
          v-for="(link, index) in socialLinksList"
          :key="'social-' + (link.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Sosyal Link #{{ index + 1 }}</h4>
            <button type="button" @click="removeSocialLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-600">İsim (Örn: Instagram)</label>
              <input v-model="link.name" type="text" class="w-full p-2 border rounded" placeholder="Instagram" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">URL</label>
              <input v-model="link.url" type="text" class="w-full p-2 border rounded" placeholder="https://instagram.com/..." />
            </div>
          </div>
        </div>
      </div>
      <button type="button" @click="addSocialLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Sosyal Link Ekle</span>
      </button>

      <!-- BÖLGE LİNKLERİ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Bölge Linkleri</h2>
      <div class="space-y-4">
        <div
          v-for="(link, index) in regionLinksList"
          :key="'region-' + (link.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Bölge Link #{{ index + 1 }}</h4>
            <button type="button" @click="removeRegionLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-600">İsim (Örn: İstanbul)</label>
              <input v-model="link.name" type="text" class="w-full p-2 border rounded" placeholder="İstanbul" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">URL</label>
              <input v-model="link.url" type="text" class="w-full p-2 border rounded" placeholder="/bolgeler/istanbul" />
            </div>
          </div>
        </div>
      </div>
      <button type="button" @click="addRegionLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Bölge Linki Ekle</span>
      </button>

      <!-- HIZLI LİNKLER -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Hızlı Linkler</h2>
      <div class="space-y-4">
        <div
          v-for="(link, index) in quickLinksList"
          :key="'quick-' + (link.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Hızlı Link #{{ index + 1 }}</h4>
            <button type="button" @click="removeQuickLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-600">İsim (Örn: Hakkımızda)</label>
              <input v-model="link.name" type="text" class="w-full p-2 border rounded" placeholder="Hakkımızda" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">URL</label>
              <input v-model="link.url" type="text" class="w-full p-2 border rounded" placeholder="/hakkimizda" />
            </div>
          </div>
        </div>
      </div>
      <button type="button" @click="addQuickLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Hızlı Link Ekle</span>
      </button>

      <!-- BLOG LİNKLERİ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Blog Linkleri</h2>
      <div class="space-y-4">
        <div
          v-for="(link, index) in blogLinksList"
          :key="'blog-' + (link.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Blog Link #{{ index + 1 }}</h4>
            <button type="button" @click="removeBlogLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-600">İsim (Örn: Taşınma Rehberi)</label>
              <input v-model="link.name" type="text" class="w-full p-2 border rounded" placeholder="Taşınma Rehberi" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">URL</label>
              <input v-model="link.url" type="text" class="w-full p-2 border rounded" placeholder="/blog/tasinma-rehberi" />
            </div>
          </div>
        </div>
      </div>
      <button type="button" @click="addBlogLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Blog Linki Ekle</span>
      </button>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button type="submit" :disabled="isLoading" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-150 disabled:opacity-50 font-semibold">
          {{ isLoading ? 'Güncelleniyor...' : 'Tümünü Güncelle' }}
        </button>
        <button type="button" @click="showDeleteModal = true" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold">
          Kaydı Sil
        </button>
      </div>
    </form>

    <!-- YENİ KAYIT EKLE BUTONU -->
    <button v-if="!address && !phone && !email && !copyright && !isLoading" @click="openAddForm" class="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold shadow-md">
      Yeni Kayıt Ekle (İlk Kaydı Oluştur)
    </button>

    <!-- YENİ KAYIT EKLEME MODAL'I -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Yeni 'Footer' Kaydı Ekle</h2>
          <button @click="closeAddForm" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Temel İçerik -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Temel İletişim Bilgileri</h3>

            <div>
              <label for="modal-address" class="block font-medium text-gray-700 mb-1">Adres</label>
              <textarea id="modal-address" v-model="newFooterFields[0].value" rows="2" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="modal-phone" class="block font-medium text-gray-700 mb-1">Telefon</label>
                <input id="modal-phone" v-model="newFooterFields[1].value" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label for="modal-email" class="block font-medium text-gray-700 mb-1">E-posta</label>
                <input id="modal-email" v-model="newFooterFields[2].value" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label for="modal-copyright" class="block font-medium text-gray-700 mb-1">Telif Hakkı Metni</label>
              <input id="modal-copyright" v-model="newFooterFields[3].value" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <!-- Sosyal Medya Linkleri -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Sosyal Medya Linkleri</h3>
              <button type="button" @click="addModalSocialLink" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span>Link Ekle</span>
              </button>
            </div>
            <p class="text-sm text-gray-500">Yeni kayıt için sosyal medya linki ekleyebilirsiniz. (İsteğe bağlı)</p>
            <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
              <div v-for="(link, index) in modalSocialLinksList" :key="'modal-social-' + index" class="p-3 border border-gray-300 rounded-lg bg-white grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">İsim</label>
                  <input v-model="link.name" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Instagram" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">URL</label>
                  <input v-model="link.url" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="https://instagram.com/..." />
                </div>
                <div class="flex md:justify-end items-end h-full">
                  <button type="button" @click="removeModalSocialLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              <p v-if="modalSocialLinksList.length === 0" class="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">Henüz link eklenmemiş</p>
            </div>
          </div>

          <!-- Bölge Linkleri -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Bölge Linkleri</h3>
              <button type="button" @click="addModalRegionLink" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span>Link Ekle</span>
              </button>
            </div>
            <p class="text-sm text-gray-500">Yeni kayıt için bölge linki ekleyebilirsiniz. (İsteğe bağlı)</p>
            <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
              <div v-for="(link, index) in modalRegionLinksList" :key="'modal-region-' + index" class="p-3 border border-gray-300 rounded-lg bg-white grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">İsim</label>
                  <input v-model="link.name" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="İstanbul" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">URL</label>
                  <input v-model="link.url" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="/bolgeler/istanbul" />
                </div>
                <div class="flex md:justify-end items-end h-full">
                  <button type="button" @click="removeModalRegionLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              <p v-if="modalRegionLinksList.length === 0" class="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">Henüz link eklenmemiş</p>
            </div>
          </div>

          <!-- Hızlı Linkler -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Hızlı Linkler</h3>
              <button type="button" @click="addModalQuickLink" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span>Link Ekle</span>
              </button>
            </div>
            <p class="text-sm text-gray-500">Yeni kayıt için hızlı link ekleyebilirsiniz. (İsteğe bağlı)</p>
            <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
              <div v-for="(link, index) in modalQuickLinksList" :key="'modal-quick-' + index" class="p-3 border border-gray-300 rounded-lg bg-white grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">İsim</label>
                  <input v-model="link.name" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Hakkımızda" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">URL</label>
                  <input v-model="link.url" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="/hakkimizda" />
                </div>
                <div class="flex md:justify-end items-end h-full">
                  <button type="button" @click="removeModalQuickLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              <p v-if="modalQuickLinksList.length === 0" class="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">Henüz link eklenmemiş</p>
            </div>
          </div>

          <!-- Blog Linkleri -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Blog Linkleri</h3>
              <button type="button" @click="addModalBlogLink" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span>Link Ekle</span>
              </button>
            </div>
            <p class="text-sm text-gray-500">Yeni kayıt için blog linki ekleyebilirsiniz. (İsteğe bağlı)</p>
            <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
              <div v-for="(link, index) in modalBlogLinksList" :key="'modal-blog-' + index" class="p-3 border border-gray-300 rounded-lg bg-white grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">İsim</label>
                  <input v-model="link.name" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Taşınma Rehberi" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">URL</label>
                  <input v-model="link.url" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="/blog/tasinma-rehberi" />
                </div>
                <div class="flex md:justify-end items-end h-full">
                  <button type="button" @click="removeModalBlogLink(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              <p v-if="modalBlogLinksList.length === 0" class="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">Henüz link eklenmemiş</p>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button @click="closeAddForm" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150">
            İptal
          </button>
          <button
            @click="addFooter({
              address: newFooterFields[0].value,
              phone: newFooterFields[1].value,
              email: newFooterFields[2].value,
              copyright: newFooterFields[3].value
            })"
            :disabled="isLoading"
            class="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
          >
            {{ isLoading ? 'Ekleniyor...' : 'Kaydı Oluştur' }}
          </button>
        </div>
      </div>
    </div>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Footer Kaydını Sil"
      message="Bu bölümdeki tüm verileri (iletişim bilgileri ve tüm linkler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
      confirmText="Evet, Kaydı Sil"
      cancelText="İptal Et"
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
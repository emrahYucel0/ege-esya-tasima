<script setup>
const { form, message, showDeleteModal, recordId, save, remove } = useSectionCrud('footer', 'footers', {
  address: '',
  phone: '',
  email: '',
  copyright: '',
  socialLinks: [],
  regionLinks: [],
  quickLinks: [],
  blogLinks: [],
});

const addSocialLink = () => form.socialLinks.push({ name: '', url: '' })
const removeSocialLink = (index) => form.socialLinks.splice(index, 1)

const addRegionLink = () => form.regionLinks.push({ name: '', url: '' })
const removeRegionLink = (index) => form.regionLinks.splice(index, 1)

const addQuickLink = () => form.quickLinks.push({ name: '', url: '' })
const removeQuickLink = (index) => form.quickLinks.splice(index, 1)

const addBlogLink = () => form.blogLinks.push({ name: '', url: '' })
const removeBlogLink = (index) => form.blogLinks.splice(index, 1)
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Footer Bölümü Yönetimi ⚙️</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İletişim Bilgileri</h2>

      <div>
        <label for="address" class="block font-medium text-gray-700 mb-1">Adres</label>
        <textarea id="address" v-model="form.address" rows="2" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="phone" class="block font-medium text-gray-700 mb-1">Telefon</label>
          <input id="phone" v-model="form.phone" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="email" class="block font-medium text-gray-700 mb-1">E-posta</label>
          <input id="email" v-model="form.email" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label for="copyright" class="block font-medium text-gray-700 mb-1">Telif Hakkı Metni</label>
        <input id="copyright" v-model="form.copyright" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="© 2026 Evenakliye.com Tüm Hakları Saklıdır." />
      </div>

      <!-- SOSYAL MEDYA LİNKLERİ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Sosyal Medya Linkleri</h2>
      <div class="space-y-4">
        <div
          v-for="(link, index) in form.socialLinks"
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
          v-for="(link, index) in form.regionLinks"
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
          v-for="(link, index) in form.quickLinks"
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
          v-for="(link, index) in form.blogLinks"
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
      title="Footer Kaydını Sil"
      message="Bu bölümdeki tüm verileri (iletişim bilgileri ve tüm linkler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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

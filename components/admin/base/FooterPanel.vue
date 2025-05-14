<script setup>
import { ref, onMounted } from 'vue'
import { AdminModalDynamicDeleteModal, AdminModalDynamicModalForm } from '#components'

const address = ref('')
const phone = ref('')
const email = ref('')
const copyright = ref('')

const socialLinksList = ref([])
const regionLinksList = ref([])
const quickLinksList = ref([])
const blogLinksList = ref([])

const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)

// Yeni Footer kaydı eklemek için modal form alanları
const newFooterFields = ref([
  { name: 'address', label: 'Adres', type: 'text', value: '' },
  { name: 'phone', label: 'Telefon', type: 'text', value: '' },
  { name: 'email', label: 'Email', type: 'email', value: '' },
  { name: 'copyright', label: 'Telif Hakkı', type: 'text', value: '' },
  { name: 'socialLinks', label: 'Sosyal Linkler (name|url, virgülle ayırın)', type: 'text', value: '' },
  { name: 'regionLinks', label: 'Bölge Linkleri (name|url, virgülle ayırın)', type: 'text', value: '' },
  { name: 'quickLinks', label: 'Hızlı Linkler (name|url, virgülle ayırın)', type: 'text', value: '' },
  { name: 'blogLinks', label: 'Blog Linkleri (name|url, virgülle ayırın)', type: 'text', value: '' }
])

// API'den Footer verisini yükler
const loadFooter = async () => {
  const { data, error } = await useFetch('/api/footer', { immediate: true })
  if (error.value) {
    message.value = 'Footer verisi alınırken hata oluştu.'
  } else if (data.value) {
    address.value = data.value.address
    phone.value = data.value.phone
    email.value = data.value.email
    copyright.value = data.value.copyright
    socialLinksList.value = data.value.socialLinks || []
    regionLinksList.value = data.value.regionLinks || []
    quickLinksList.value = data.value.quickLinks || []
    blogLinksList.value = data.value.blogLinks || []
  }
}

onMounted(() => {
  loadFooter()
})

// Footer güncelleme işlemi (ilişkili linkler önce silinip, yenileri ekleniyor)
const updateFooter = async () => {
  const { data, error } = await useFetch('/api/footer', {
    method: 'PUT',
    body: {
      sectionName: "footers",
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

  if (error.value || !data.value.success) {
    message.value = 'Güncelleme sırasında hata oluştu.'
  } else {
    message.value = 'Footer başarıyla güncellendi!'
    loadFooter()
  }
}

// Modal form üzerinden yeni Footer ekleme işlemi
const addFooter = async (formData) => {
  const parseLinks = (linksStr) => {
    return linksStr
      ? linksStr.split(',').map(item => {
          const [name, url] = item.split('|').map(s => s.trim())
          return { name, url }
        })
      : []
  }

  const { data, error } = await useFetch('/api/footer', {
    method: 'POST',
    body: {
      sectionName: "footers",
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      copyright: formData.copyright,
      socialLinks: parseLinks(formData.socialLinks),
      regionLinks: parseLinks(formData.regionLinks),
      quickLinks: parseLinks(formData.quickLinks),
      blogLinks: parseLinks(formData.blogLinks),
    },
  })

  if (error.value) {
    message.value = 'Ekleme sırasında hata oluştu.'
  } else {
    message.value = 'Footer başarıyla eklendi!'
    showAddForm.value = false
    loadFooter()
  }
}

// Footer silme işlemi
const confirmDelete = async () => {
  const { error } = await useFetch('/api/footer', {
    method: 'DELETE',
    body: { sectionName: "footers" },
  })

  showDeleteModal.value = false

  if (error.value) {
    message.value = 'Silme sırasında hata oluştu.'
  } else {
    message.value = 'Footer kaydı silindi!'
    address.value = ''
    phone.value = ''
    email.value = ''
    copyright.value = ''
    socialLinksList.value = []
    regionLinksList.value = []
    quickLinksList.value = []
    blogLinksList.value = []
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// Dinamik olarak link ekleme ve silme fonksiyonları
const addSocialLink = () => {
  socialLinksList.value.push({ name: '', url: '' })
}
const removeSocialLink = (index) => {
  socialLinksList.value.splice(index, 1)
}

const addRegionLink = () => {
  regionLinksList.value.push({ name: '', url: '' })
}
const removeRegionLink = (index) => {
  regionLinksList.value.splice(index, 1)
}

const addQuickLink = () => {
  quickLinksList.value.push({ name: '', url: '' })
}
const removeQuickLink = (index) => {
  quickLinksList.value.splice(index, 1)
}

const addBlogLink = () => {
  blogLinksList.value.push({ name: '', url: '' })
}
const removeBlogLink = (index) => {
  blogLinksList.value.splice(index, 1)
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Footer Güncelleme Paneli</h1>
    
    <!-- Güncelleme Formu -->
    <form @submit.prevent="updateFooter" class="space-y-6 mb-6">
      <div>
        <label for="address" class="block font-medium">Adres:</label>
        <input id="address" v-model="address" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="phone" class="block font-medium">Telefon:</label>
        <input id="phone" v-model="phone" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="email" class="block font-medium">Email:</label>
        <input id="email" v-model="email" type="email" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="copyright" class="block font-medium">Telif Hakkı:</label>
        <input id="copyright" v-model="copyright" type="text" class="w-full p-2 border rounded" />
      </div>
      
      <!-- Sosyal Linkler -->
      <div>
        <h3 class="font-bold mb-2">Sosyal Linkler</h3>
        <div v-for="(link, index) in socialLinksList" :key="'social-' + index" class="flex items-center space-x-2 mb-2">
          <input
            v-model="link.name"
            type="text"
            class="w-1/3 p-2 border rounded"
            placeholder="Link Adı"
          />
          <input
            v-model="link.url"
            type="text"
            class="w-1/2 p-2 border rounded"
            placeholder="URL"
          />
          <button type="button" @click="removeSocialLink(index)" class="px-2 py-1 bg-red-500 text-white rounded">
            Sil
          </button>
        </div>
        <button type="button" @click="addSocialLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Yeni Sosyal Link Ekle
        </button>
      </div>
      
      <!-- Bölge Linkleri -->
      <div>
        <h3 class="font-bold mb-2">Bölge Linkleri</h3>
        <div v-for="(link, index) in regionLinksList" :key="'region-' + index" class="flex items-center space-x-2 mb-2">
          <input
            v-model="link.name"
            type="text"
            class="w-1/3 p-2 border rounded"
            placeholder="Link Adı"
          />
          <input
            v-model="link.url"
            type="text"
            class="w-1/2 p-2 border rounded"
            placeholder="URL"
          />
          <button type="button" @click="removeRegionLink(index)" class="px-2 py-1 bg-red-500 text-white rounded">
            Sil
          </button>
        </div>
        <button type="button" @click="addRegionLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Yeni Bölge Linki Ekle
        </button>
      </div>
      
      <!-- Hızlı Linkler -->
      <div>
        <h3 class="font-bold mb-2">Hızlı Linkler</h3>
        <div v-for="(link, index) in quickLinksList" :key="'quick-' + index" class="flex items-center space-x-2 mb-2">
          <input
            v-model="link.name"
            type="text"
            class="w-1/3 p-2 border rounded"
            placeholder="Link Adı"
          />
          <input
            v-model="link.url"
            type="text"
            class="w-1/2 p-2 border rounded"
            placeholder="URL"
          />
          <button type="button" @click="removeQuickLink(index)" class="px-2 py-1 bg-red-500 text-white rounded">
            Sil
          </button>
        </div>
        <button type="button" @click="addQuickLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Yeni Hızlı Link Ekle
        </button>
      </div>
      
      <!-- Blog Linkleri -->
      <div>
        <h3 class="font-bold mb-2">Blog Linkleri</h3>
        <div v-for="(link, index) in blogLinksList" :key="'blog-' + index" class="flex items-center space-x-2 mb-2">
          <input
            v-model="link.name"
            type="text"
            class="w-1/3 p-2 border rounded"
            placeholder="Link Adı"
          />
          <input
            v-model="link.url"
            type="text"
            class="w-1/2 p-2 border rounded"
            placeholder="URL"
          />
          <button type="button" @click="removeBlogLink(index)" class="px-2 py-1 bg-red-500 text-white rounded">
            Sil
          </button>
        </div>
        <button type="button" @click="addBlogLink" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Yeni Blog Linki Ekle
        </button>
      </div>
      
      <div class="flex space-x-4 mt-4">
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded">
          Güncelle
        </button>
        <button type="button" @click="showDeleteModal = true" class="px-4 py-2 bg-red-500 text-white rounded">
          Sil
        </button>
      </div>
    </form>
    
    <!-- Mesaj Gösterimi -->
    <p class="mt-4 text-green-600" v-if="message">{{ message }}</p>
    
    <!-- Yeni Kayıt Ekleme Butonu -->
    <button @click="showAddForm = true" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
      Yeni Kayıt Ekle
    </button>
    
    <!-- Dynamic Modal Form ile Yeni Footer Kaydı Ekleme -->
    <AdminModalDynamicModalForm
      :show="showAddForm"
      title="Yeni Footer Kaydı Ekle"
      :fields="newFooterFields"
      @submit="addFooter"
      @close="showAddForm = false"
    />
    
    <!-- Dynamic Delete Modal ile Silme Onayı -->
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Footer Kaydını Sil"
      message="Bu footer kaydını silmek istediğinize emin misiniz?"
      confirmText="Sil"
      cancelText="İptal"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.fixed {
  z-index: 1000;
}
</style>

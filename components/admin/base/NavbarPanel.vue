<script setup>
import { ref, onMounted } from 'vue'
import { AdminModalDynamicDeleteModal, AdminModalDynamicModalForm } from '#components'

const logo = ref('')

const socialLinksList = ref([])
const contactsList = ref([])

const message = ref('')
const showAddForm = ref(false)
const showDeleteModal = ref(false)

// Yeni Navbar kaydı eklemek için modal form alanları
const newNavbarFields = ref([
  { name: 'logo', label: 'Logo URL', type: 'text', value: '' },
  { name: 'socialLinks', label: 'Sosyal Linkler (name|url, virgülle ayırın)', type: 'text', value: '' },
  { name: 'contacts', label: 'İletişim Bilgileri (phone|mail|address, virgülle ayırın)', type: 'text', value: '' }
])

// API'den Navbar verisini yükler
const loadNavbar = async () => {
  const { data, error } = await useFetch('/api/navbar', { immediate: true })
  if (error.value) {
    message.value = 'Navbar verisi alınırken hata oluştu.'
  } else if (data.value) {
    logo.value = data.value.logo || ''
    socialLinksList.value = data.value.socialLinks || []
    contactsList.value = data.value.contacts || []
  }
}

onMounted(() => {
  loadNavbar()
})

// Navbar güncelleme işlemi
const updateNavbar = async () => {
  const { data, error } = await useFetch('/api/navbar', {
    method: 'PUT',
    body: {
      sectionName: "navbars",
      logo: logo.value,
      socialLinks: socialLinksList.value.map(link => ({ 
        name: link.name, 
        url: link.url 
      })),
      contacts: contactsList.value.map(contact => ({
        phone: contact.phone,
        mail: contact.mail,
        address: contact.address
      })),
    },
  })

  if (error.value || !data.value?.success) {
    message.value = 'Güncelleme sırasında hata oluştu.'
  } else {
    message.value = 'Navbar başarıyla güncellendi!'
    loadNavbar()
  }
}

// Modal form üzerinden yeni Navbar ekleme işlemi
const addNavbar = async (formData) => {
  const parseSocialLinks = (linksStr) => {
    return linksStr
      ? linksStr.split(',').map(item => {
          const [name, url] = item.split('|').map(s => s.trim())
          return { name, url }
        })
      : []
  }

  const parseContacts = (contactsStr) => {
    return contactsStr
      ? contactsStr.split(',').map(item => {
          const [phone, mail, address] = item.split('|').map(s => s.trim())
          return { phone, mail, address }
        })
      : []
  }

  const { data, error } = await useFetch('/api/navbar', {
    method: 'POST',
    body: {
      sectionName: "navbars",
      logo: formData.logo,
      socialLinks: parseSocialLinks(formData.socialLinks),
      contacts: parseContacts(formData.contacts),
    },
  })

  if (error.value) {
    message.value = 'Ekleme sırasında hata oluştu.'
  } else {
    message.value = 'Navbar başarıyla eklendi!'
    showAddForm.value = false
    loadNavbar()
  }
}

// Navbar silme işlemi
const confirmDelete = async () => {
  const { error } = await useFetch('/api/navbar', {
    method: 'DELETE',
    body: { sectionName: "navbars" },
  })

  showDeleteModal.value = false

  if (error.value) {
    message.value = 'Silme sırasında hata oluştu.'
  } else {
    message.value = 'Navbar kaydı silindi!'
    logo.value = ''
    socialLinksList.value = []
    contactsList.value = []
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// Dinamik olarak link ve iletişim bilgisi ekleme/silme fonksiyonları
const addSocialLink = () => {
  socialLinksList.value.push({ name: '', url: '' })
}
const removeSocialLink = (index) => {
  socialLinksList.value.splice(index, 1)
}

const addContact = () => {
  contactsList.value.push({ phone: '', mail: '', address: '' })
}
const removeContact = (index) => {
  contactsList.value.splice(index, 1)
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Navbar Güncelleme Paneli</h1>
    
    <!-- Güncelleme Formu -->
    <form @submit.prevent="updateNavbar" class="space-y-6 mb-6">
      <div>
        <label for="logo" class="block font-medium">Logo URL:</label>
        <input id="logo" v-model="logo" type="text" class="w-full p-2 border rounded" />
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
      
      <!-- İletişim Bilgileri -->
      <div>
        <h3 class="font-bold mb-2">İletişim Bilgileri</h3>
        <div v-for="(contact, index) in contactsList" :key="'contact-' + index" class="space-y-2 mb-4 p-3 border rounded">
          <div class="flex items-center space-x-2">
            <input
              v-model="contact.phone"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Telefon"
            />
          </div>
          <div class="flex items-center space-x-2">
            <input
              v-model="contact.mail"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Email"
            />
          </div>
          <div class="flex items-center space-x-2">
            <input
              v-model="contact.address"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Adres"
            />
            <button type="button" @click="removeContact(index)" class="px-2 py-1 bg-red-500 text-white rounded">
              Sil
            </button>
          </div>
        </div>
        <button type="button" @click="addContact" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Yeni İletişim Bilgisi Ekle
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
    
    <!-- Dynamic Modal Form ile Yeni Navbar Kaydı Ekleme -->
    <AdminModalDynamicModalForm
      :show="showAddForm"
      title="Yeni Navbar Kaydı Ekle"
      :fields="newNavbarFields"
      @submit="addNavbar"
      @close="showAddForm = false"
    />
    
    <!-- Dynamic Delete Modal ile Silme Onayı -->
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Navbar Kaydını Sil"
      message="Bu navbar kaydını silmek istediğinize emin misiniz?"
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
<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('navbar', 'navbars', {
  logo: '',
  socialLinks: [],
  contacts: [],
});

// Dinamik olarak link ve iletişim bilgisi ekleme/silme fonksiyonları
const addSocialLink = () => {
  form.socialLinks.push({ name: '', url: '' })
}
const removeSocialLink = (index) => {
  form.socialLinks.splice(index, 1)
}

const addContact = () => {
  form.contacts.push({ phone: '', mail: '', address: '' })
}
const removeContact = (index) => {
  form.contacts.splice(index, 1)
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Navbar Yönetim Paneli</h1>

    <form @submit.prevent="save" class="space-y-6 mb-6">
      <div>
        <label for="logo" class="block font-medium">Logo URL:</label>
        <input id="logo" v-model="form.logo" type="text" class="w-full p-2 border rounded" />
      </div>

      <!-- Sosyal Linkler -->
      <div>
        <h3 class="font-bold mb-2">Sosyal Linkler</h3>
        <div v-for="(link, index) in form.socialLinks" :key="'social-' + index" class="flex items-center space-x-2 mb-2">
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
        <div v-for="(contact, index) in form.contacts" :key="'contact-' + index" class="space-y-2 mb-4 p-3 border rounded">
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
        <button type="submit" :disabled="isSaving" :aria-busy="isSaving" class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">
          {{ recordId ? 'Güncelle' : 'Oluştur' }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" :disabled="isSaving" class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">
          Sil
        </button>
      </div>
    </form>

    <!-- Mesaj Gösterimi -->
    <p class="mt-4 text-green-600" v-if="message">{{ message }}</p>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      :loading="isDeleting"
      title="Navbar Kaydını Sil"
      message="Bu navbar kaydını silmek istediğinize emin misiniz?"
      confirmText="Sil"
      cancelText="İptal"
      @confirm="remove"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

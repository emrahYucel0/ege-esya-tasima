<script setup>
const { form, message, showDeleteModal, save, remove } = useSectionCrud('quote', 'quotes', {
  title: '',
  subtitle: '',
  description: '',
  phoneLabel: '',
  phone: '',
});
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">QuoteRequest Yönetim Paneli</h1>

    <form @submit.prevent="save" class="space-y-4 mb-6">
      <div>
        <label for="title" class="block font-medium">Başlık:</label>
        <input id="title" v-model="form.title" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="subtitle" class="block font-medium">Alt Başlık:</label>
        <input id="subtitle" v-model="form.subtitle" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="description" class="block font-medium">Açıklama:</label>
        <input id="description" v-model="form.description" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="phoneLabel" class="block font-medium">Telefon Etiketi:</label>
        <input id="phoneLabel" v-model="form.phoneLabel" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="phone" class="block font-medium">Telefon:</label>
        <input id="phone" v-model="form.phone" type="text" class="w-full p-2 border rounded" />
      </div>
      <div class="flex space-x-4">
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded">
          Kaydet
        </button>
        <button type="button" @click="showDeleteModal = true" class="px-4 py-2 bg-red-500 text-white rounded">
          Sil
        </button>
      </div>
    </form>

    <!-- Mesaj Gösterimi -->
    <p class="mt-4 text-green-600" v-if="message">{{ message }}</p>

    <!-- Dynamic Delete Modal ile Silme Onayı -->
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="QuoteRequest Kaydını Sil"
      message="Bu QuoteRequest kaydını silmek istediğinize emin misiniz?"
      confirmText="Sil"
      cancelText="İptal"
      @confirm="remove"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

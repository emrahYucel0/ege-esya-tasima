<script setup>
import { AdminModalDynamicDeleteModal } from '#components';

// Mevcut QuoteRequest verileri
const sectionName = ref('quotes');
const subtitle = ref('');
const title = ref('');
const description = ref('');
const phoneLabel = ref('');
const phone = ref('');
const message = ref('');

// Modal kontrol değişkenleri
const showAddForm = ref(false);
const showDeleteModal = ref(false);

// Yeni QuoteRequest ekleme formu için alan tanımları
const newQuoteFields = ref([
  { name: 'title', label: 'Başlık', type: 'text', value: '' },
  { name: 'subtitle', label: 'Alt Başlık', type: 'text', value: '' },
  { name: 'description', label: 'Açıklama', type: 'text', value: '' },
  { name: 'phoneLabel', label: 'Telefon Etiketi', type: 'text', value: '' },
  { name: 'phone', label: 'Telefon', type: 'text', value: '' },
]);

// API'den QuoteRequest verisini yükleyen fonksiyon
const loadQuoteRequest = async () => {
  const { data, error } = await useFetch('/api/quote', { immediate: true });
  if (error.value) {
    message.value = 'QuoteRequest verisi alınırken hata oluştu.';
  } else if (data.value) {
    title.value = data.value.title;
    subtitle.value = data.value.subtitle;
    description.value = data.value.description;
    phoneLabel.value = data.value.phoneLabel;
    phone.value = data.value.phone;
  }
};

onMounted(() => {
  loadQuoteRequest();
});

// QuoteRequest güncelleme fonksiyonu
const updateQuoteRequest = async () => {
  const { data, error } = await useFetch('/api/quote', {
    method: 'PUT',
    body: {
      sectionName: sectionName.value,
      title: title.value,
      subtitle: subtitle.value,
      description: description.value,
      phoneLabel: phoneLabel.value,
      phone: phone.value,
    },
  });

  if (error.value || !data.value.success) {
    message.value = 'Güncelleme sırasında hata oluştu.';
  } else {
    message.value = 'QuoteRequest başarıyla güncellendi!';
    loadQuoteRequest();
  }
};

// Yeni QuoteRequest ekleme işlemi (DynamicModalForm üzerinden)
const addQuoteRequest = async (formData) => {
  const { data, error } = await useFetch('/api/quote', {
    method: 'POST',
    body: {
      sectionName: sectionName.value,
      ...formData,
    },
  });
  if (error.value) {
    message.value = 'Ekleme sırasında hata oluştu.';
  } else {
    message.value = 'QuoteRequest başarıyla eklendi!';
    showAddForm.value = false;
    loadQuoteRequest();
  }
};

// Silme işlemi (DynamicDeleteModal üzerinden)
const confirmDelete = async () => {
  const { error } = await useFetch('/api/quote', {
    method: 'DELETE',
    body: { sectionName: sectionName.value },
  });

  showDeleteModal.value = false;

  if (error.value) {
    message.value = 'Silme sırasında hata oluştu.';
  } else {
    message.value = 'QuoteRequest kaydı silindi!';
    title.value = '';
    subtitle.value = '';
    description.value = '';
    phoneLabel.value = '';
    phone.value = '';
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">QuoteRequest Güncelleme Paneli</h1>
    
    <!-- Güncelleme Formu -->
    <form @submit.prevent="updateQuoteRequest" class="space-y-4 mb-6">
      <div>
        <label for="title" class="block font-medium">Başlık:</label>
        <input id="title" v-model="title" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="subtitle" class="block font-medium">Alt Başlık:</label>
        <input id="subtitle" v-model="subtitle" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="description" class="block font-medium">Açıklama:</label>
        <input id="description" v-model="description" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="phoneLabel" class="block font-medium">Telefon Etiketi:</label>
        <input id="phoneLabel" v-model="phoneLabel" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="phone" class="block font-medium">Telefon:</label>
        <input id="phone" v-model="phone" type="text" class="w-full p-2 border rounded" />
      </div>
      <div class="flex space-x-4">
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
    <button
      @click="showAddForm = true"
      class="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Yeni Kayıt Ekle
    </button>
    
    <!-- Dynamic Modal Form ile Yeni QuoteRequest Kaydı Ekleme -->
    <AdminModalDynamicModalForm
      :show="showAddForm"
      title="Yeni QuoteRequest Kaydı Ekle"
      :fields="newQuoteFields"
      @submit="addQuoteRequest"
      @close="showAddForm = false"
    />
    
    <!-- Dynamic Delete Modal ile Silme Onayı -->
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="QuoteRequest Kaydını Sil"
      message="Bu QuoteRequest kaydını silmek istediğinize emin misiniz?"
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

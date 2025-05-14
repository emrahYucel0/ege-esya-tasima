<script setup>
import { AdminModalDynamicDeleteModal } from '#components';


// Mevcut navbar verileri
const title = ref('');
const subtitle = ref('');
const phone = ref('');
const message = ref('');

// Modal kontrol değişkenleri
const showAddForm = ref(false);
const showDeleteModal = ref(false);

// Yeni navbar ekleme formu için alan tanımları
const newNavbarFields = ref([
  { name: 'title', label: 'Başlık', type: 'text', value: '' },
  { name: 'subtitle', label: 'Alt Başlık', type: 'text', value: '' },
  { name: 'phone', label: 'Telefon', type: 'text', value: '' },
]);

// API'den navbar verisini yükleyen fonksiyon
const loadNavbar = async () => {
  const { data, error } = await useFetch('/api/navbar', { immediate: true });
  if (error.value) {
    message.value = 'Navbar verisi alınırken hata oluştu.';
  } else if (data.value) {
    title.value = data.value.title;
    subtitle.value = data.value.subtitle;
    phone.value = data.value.phone;
  }
};

onMounted(() => {
  loadNavbar();
});

// Navbar güncelleme fonksiyonu
const updateNavbar = async () => {
  const { data, error } = await useFetch('/api/navbar', {
    method: 'PUT',
    body: {
      sectionName: "navbars",
      title: title.value,
      subtitle: subtitle.value,
      phone: phone.value,
    },
  });

  if (error.value || !data.value.success) {
    message.value = 'Güncelleme sırasında hata oluştu.';
  } else {
    message.value = 'Navbar başarıyla güncellendi!';
    loadNavbar();
  }
};

// Yeni navbar ekleme işlemi (DynamicModalForm üzerinden)
const addNavbar = async (formData) => {
  const { data, error } = await useFetch('/api/navbar', {
    method: 'POST',
    body: {
      sectionName: "navbars",
      ...formData,
    },
  });
  if (error.value) {
    message.value = 'Ekleme sırasında hata oluştu.';
  } else {
    message.value = 'Navbar başarıyla eklendi!';
    showAddForm.value = false;
    loadNavbar();
  }
};

// Silme işlemi (DynamicDeleteModal üzerinden)
const confirmDelete = async () => {
  const { error } = await useFetch('/api/navbar', {
    method: 'DELETE',
    body: { sectionName: "navbars" },
  });

  showDeleteModal.value = false;

  if (error.value) {
    message.value = 'Silme sırasında hata oluştu.';
  } else {
    message.value = 'Navbar kaydı silindi!';
    title.value = '';
    subtitle.value = '';
    phone.value = '';
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Navbar Güncelleme Paneli</h1>
    
    <!-- Güncelleme Formu -->
    <form @submit.prevent="updateNavbar" class="space-y-4 mb-6">
      <div>
        <label for="title" class="block font-medium">Başlık:</label>
        <input id="title" v-model="title" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="subtitle" class="block font-medium">Alt Başlık:</label>
        <input id="subtitle" v-model="subtitle" type="text" class="w-full p-2 border rounded" />
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

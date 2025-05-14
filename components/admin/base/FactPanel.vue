<script setup>
import { ref, onMounted } from 'vue'
import { AdminModalDynamicDeleteModal, AdminModalDynamicModalForm } from '#components'

// Fact verisine ait alanlar
const subtitle = ref('')
const title = ref('')
const description = ref('')
const phoneLabel = ref('')
const phone = ref('')
const message = ref('')
// İlişkili istatistikleri tutacak dizi (her eleman { title: string } şeklinde)
const statisticsList = ref([])

// Modal kontrol değişkenleri
const showAddForm = ref(false)
const showDeleteModal = ref(false)

// Yeni Fact ekleme formu için alan tanımları (istatistikler, virgülle ayrılmış metin olarak girilecek)
const newFactFields = ref([
  { name: 'title', label: 'Başlık', type: 'text', value: '' },
  { name: 'subtitle', label: 'Alt Başlık', type: 'text', value: '' },
  { name: 'description', label: 'Açıklama', type: 'textarea', value: '' },
  { name: 'phoneLabel', label: 'Telefon Etiketi', type: 'text', value: '' },
  { name: 'phone', label: 'Telefon', type: 'text', value: '' },
  { name: 'statistics', label: 'İstatistikler (virgülle ayırın)', type: 'text', value: '' },
])

// API'den Fact verisini yükleyen fonksiyon
const loadFact = async () => {
  const { data, error } = await useFetch('/api/fact', { immediate: true })
  if (error.value) {
    message.value = 'Fact verisi alınırken hata oluştu.'
  } else if (data.value) {
    subtitle.value = data.value.subtitle
    title.value = data.value.title
    description.value = data.value.description
    phoneLabel.value = data.value.phoneLabel
    phone.value = data.value.phone
    statisticsList.value = data.value.statistics || []
  }
}

onMounted(() => {
  loadFact()
})

// Fact güncelleme fonksiyonu (istatistikler de güncelleniyor)
// API'de update işlemi yapılırken, mevcut tüm istatistikler silinip yeni veriler ekleniyor.
const updateFact = async () => {
  const { data, error } = await useFetch('/api/fact', {
    method: 'PUT',
    body: {
      sectionName: "facts",
      subtitle: subtitle.value,
      title: title.value,
      description: description.value,
      phoneLabel: phoneLabel.value,
      phone: phone.value,
      statistics: statisticsList.value.map(stat => ({ title: stat.title }))
    },
  })

  if (error.value || !data.value.success) {
    message.value = 'Güncelleme sırasında hata oluştu.'
  } else {
    message.value = 'Fact başarıyla güncellendi!'
    loadFact()
  }
}

// Yeni Fact ekleme işlemi (dinamik modal form üzerinden)
// İstatistikler, formData.statistics alanında virgülle ayrılmış metin olarak beklenir.
const addFact = async (formData) => {
  const stats = formData.statistics
    ? formData.statistics.split(',').map(s => ({ title: s.trim() }))
    : []
  const { data, error } = await useFetch('/api/fact', {
    method: 'POST',
    body: {
      sectionName: "facts",
      subtitle: formData.subtitle,
      title: formData.title,
      description: formData.description,
      phoneLabel: formData.phoneLabel,
      phone: formData.phone,
      statistics: stats
    },
  })
  if (error.value) {
    message.value = 'Ekleme sırasında hata oluştu.'
  } else {
    message.value = 'Fact başarıyla eklendi!'
    showAddForm.value = false
    loadFact()
  }
}

// Fact silme işlemi
const confirmDelete = async () => {
  const { error } = await useFetch('/api/fact', {
    method: 'DELETE',
    body: { sectionName: "facts" },
  })

  showDeleteModal.value = false

  if (error.value) {
    message.value = 'Silme sırasında hata oluştu.'
  } else {
    message.value = 'Fact kaydı silindi!'
    // Alanları temizliyoruz
    subtitle.value = ''
    title.value = ''
    description.value = ''
    phoneLabel.value = ''
    phone.value = ''
    statisticsList.value = []
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// İstatistikler için ekleme/silme işlemleri (güncelleme formunda)
const addStatistic = () => {
  statisticsList.value.push({ title: '' })
}

const removeStatistic = (index) => {
  statisticsList.value.splice(index, 1)
}
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Fact Güncelleme Paneli</h1>
    
    <!-- Güncelleme Formu -->
    <form @submit.prevent="updateFact" class="space-y-4 mb-6">
      <div>
        <label for="subtitle" class="block font-medium">Alt Başlık:</label>
        <input id="subtitle" v-model="subtitle" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="title" class="block font-medium">Başlık:</label>
        <input id="title" v-model="title" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="description" class="block font-medium">Açıklama:</label>
        <textarea id="description" v-model="description" class="w-full p-2 border rounded"></textarea>
      </div>
      <div>
        <label for="phoneLabel" class="block font-medium">Telefon Etiketi:</label>
        <input id="phoneLabel" v-model="phoneLabel" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="phone" class="block font-medium">Telefon:</label>
        <input id="phone" v-model="phone" type="text" class="w-full p-2 border rounded" />
      </div>
      
      <!-- İstatistikler Bölümü -->
      <div>
        <h3 class="font-bold mb-2">İstatistikler</h3>
        <div v-for="(stat, index) in statisticsList" :key="index" class="flex items-center space-x-2 mb-2">
          <input
            v-model="statisticsList[index].title"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="İstatistik Başlığı"
          />
          <button type="button" @click="removeStatistic(index)" class="px-2 py-1 bg-red-500 text-white rounded">
            Sil
          </button>
        </div>
        <button type="button" @click="addStatistic" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Yeni İstatistik Ekle
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
    
    <!-- Dynamic Modal Form ile Yeni Fact Kaydı Ekleme -->
    <AdminModalDynamicModalForm
      :show="showAddForm"
      title="Yeni Fact Kaydı Ekle"
      :fields="newFactFields"
      @submit="addFact"
      @close="showAddForm = false"
    />
    
    <!-- Dynamic Delete Modal ile Silme Onayı -->
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Fact Kaydını Sil"
      message="Bu fact kaydını silmek istediğinize emin misiniz?"
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

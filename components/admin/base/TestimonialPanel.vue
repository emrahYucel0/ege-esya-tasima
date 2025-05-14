<script setup>
import { ref, onMounted } from 'vue'
import { AdminModalDynamicDeleteModal, AdminModalDynamicModalForm } from '#components'

// Testimonial verisine ait alanlar
const title = ref('')
const subtitle = ref('')
// Testimonial detayları; her biri { name, profession, description } şeklinde
const testimonialDetailsList = ref([])

// İşlem mesajı
const message = ref('')

// Modal kontrol değişkenleri
const showAddForm = ref(false)
const showDeleteModal = ref(false)

// Yeni Testimonial ekleme formu için alan tanımları
// Detaylar, kullanıcı tarafından multiline bir textarea içine; 
// her satır "İsim, Meslek, Açıklama" şeklinde girilecek
const newTestimonialFields = ref([
  { name: 'title', label: 'Başlık', type: 'text', value: '' },
  { name: 'subtitle', label: 'Alt Başlık', type: 'text', value: '' },
  { name: 'testimonialDetails', label: 'Testimonial Detayları (her satırda: İsim, Meslek, Açıklama - virgülle ayrılmış)', type: 'textarea', value: '' },
])

// API'den Testimonial verisini yükleyen fonksiyon
const loadTestimonial = async () => {
  const { data, error } = await useFetch('/api/testimonial', { immediate: true })
  if (error.value) {
    message.value = 'Testimonial verisi alınırken hata oluştu.'
  } else if (data.value) {
    title.value = data.value.title
    subtitle.value = data.value.subtitle
    testimonialDetailsList.value = data.value.testimonialDetails || []
  }
}

onMounted(() => {
  loadTestimonial()
})

// Testimonial güncelleme fonksiyonu
const updateTestimonial = async () => {
  const { data, error } = await useFetch('/api/testimonial', {
    method: 'PUT',
    body: {
      sectionName: "testimonials",
      title: title.value,
      subtitle: subtitle.value,
      testimonialDetails: testimonialDetailsList.value.map(detail => ({
        name: detail.name,
        profession: detail.profession,
        description: detail.description
      }))
    }
  })

  if (error.value || !data.value.success) {
    message.value = 'Güncelleme sırasında hata oluştu.'
  } else {
    message.value = 'Testimonial başarıyla güncellendi!'
    loadTestimonial()
  }
}

// Yeni Testimonial ekleme fonksiyonu
const addTestimonial = async (formData) => {
  // formData.testimonialDetails; her satırda "İsim, Meslek, Açıklama" olacak şekilde parse ediliyor.
  const details = formData.testimonialDetails
    ? formData.testimonialDetails.split('\n').map(line => {
        const parts = line.split(',')
        return { 
          name: parts[0]?.trim() || '', 
          profession: parts[1]?.trim() || '', 
          description: parts[2]?.trim() || '' 
        }
      }).filter(detail => detail.name) // boş satırları filtrele
    : []

  const { data, error } = await useFetch('/api/testimonial', {
    method: 'POST',
    body: {
      sectionName: "testimonials",
      title: formData.title,
      subtitle: formData.subtitle,
      testimonialDetails: details
    }
  })

  if (error.value) {
    message.value = 'Ekleme sırasında hata oluştu.'
  } else {
    message.value = 'Testimonial başarıyla eklendi!'
    showAddForm.value = false
    loadTestimonial()
  }
}

// Testimonial silme fonksiyonu
const confirmDelete = async () => {
  const { error } = await useFetch('/api/testimonial', {
    method: 'DELETE',
    body: { sectionName: "testimonials" },
  })

  showDeleteModal.value = false

  if (error.value) {
    message.value = 'Silme sırasında hata oluştu.'
  } else {
    message.value = 'Testimonial kaydı silindi!'
    // Alanları temizle
    title.value = ''
    subtitle.value = ''
    testimonialDetailsList.value = []
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

// Güncelleme formundaki testimonial detayları için ekleme/silme işlemleri
const addTestimonialDetail = () => {
  testimonialDetailsList.value.push({ name: '', profession: '', description: '' })
}

const removeTestimonialDetail = (index) => {
  testimonialDetailsList.value.splice(index, 1)
}
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Testimonial Güncelleme Paneli</h1>
    
    <!-- Güncelleme Formu -->
    <form @submit.prevent="updateTestimonial" class="space-y-4 mb-6">
      <div>
        <label for="title" class="block font-medium">Başlık:</label>
        <input id="title" v-model="title" type="text" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label for="subtitle" class="block font-medium">Alt Başlık:</label>
        <input id="subtitle" v-model="subtitle" type="text" class="w-full p-2 border rounded" />
      </div>
      
      <!-- Testimonial Detayları Bölümü -->
      <div>
        <h3 class="font-bold mb-2">Testimonial Detayları</h3>
        <div v-for="(detail, index) in testimonialDetailsList" :key="index" class="border p-2 mb-2 rounded">
          <div>
            <label class="block font-medium">İsim:</label>
            <input
              v-model="testimonialDetailsList[index].name"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="İsim"
            />
          </div>
          <div>
            <label class="block font-medium">Meslek:</label>
            <input
              v-model="testimonialDetailsList[index].profession"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Meslek"
            />
          </div>
          <div>
            <label class="block font-medium">Açıklama:</label>
            <textarea
              v-model="testimonialDetailsList[index].description"
              class="w-full p-2 border rounded"
              placeholder="Açıklama"
            ></textarea>
          </div>
          <button type="button" @click="removeTestimonialDetail(index)" class="mt-2 px-2 py-1 bg-red-500 text-white rounded">
            Detay Sil
          </button>
        </div>
        <button type="button" @click="addTestimonialDetail" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Yeni Detay Ekle
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
    
    <!-- Yeni Kayıt Ekle Butonu -->
    <button @click="showAddForm = true" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
      Yeni Kayıt Ekle
    </button>
    
    <!-- Dynamic Modal Form ile Yeni Testimonial Kaydı Ekleme -->
    <AdminModalDynamicModalForm
      :show="showAddForm"
      title="Yeni Testimonial Kaydı Ekle"
      :fields="newTestimonialFields"
      @submit="addTestimonial"
      @close="showAddForm = false"
    />
    
    <!-- Dynamic Delete Modal ile Silme Onayı -->
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Testimonial Kaydını Sil"
      message="Bu testimonial kaydını silmek istediğinize emin misiniz?"
      confirmText="Sil"
      cancelText="İptal"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
/* Özel stil tanımlamaları isteğe bağlı */
</style>
    
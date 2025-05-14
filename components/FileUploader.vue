<script setup>
import { ref } from 'vue'

// Parent bileşene event göndermek için defineEmits kullanıyoruz
const emit = defineEmits(['file-uploaded'])

const selectedFile = ref(null)
const previewUrl = ref(null)

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const uploadFile = async () => {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    // API isteği: dosya yüklendiğinde backend, dosyanın URL bilgisini içeren bir response döndürecek.
    const response = await $fetch('/api/files', {
      method: 'POST',
      body: formData
    })

    // Örneğin response.file.url = "/api/files/abc-123-xyz.jpg"
    // Parent bileşene URL bilgisini event olarak gönderiyoruz.
    emit('file-uploaded', response.file.url)

  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    alert('Dosya yüklenemedi: ' + error.data?.message)
  }
}
</script>

<template>
  <div class="file-uploader">
    <input type="file" accept="image/jpeg, image/png, image/webp" @change="handleFileUpload">
    <button class="upload" @click="uploadFile" :disabled="!selectedFile">Resmi Yükle</button>
    <div v-if="previewUrl" class="preview">
      <img :src="previewUrl" alt="Önizleme" style="max-width: 300px;">
    </div>
  </div>
</template>

<style scoped>
.upload {
    background-color: red;
    color: white;
}
</style>

<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('process', 'process-section', {
  mainTitle: '',
  description: '',
  steps: [],
});

const addStep = () => {
  form.steps.push({
    title: '',
    description: '',
    iconPath: '',
    order: form.steps.length,
  })
}

const removeStep = (index) => {
  form.steps.splice(index, 1)
  form.steps.forEach((step, i) => step.order = i)
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Taşınma Sürecimiz Bölümü Yönetimi ⚙️</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('sorun') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>

      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1">Ana Başlık</label>
        <input id="mainTitle" v-model="form.mainTitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama Paragrafı</label>
        <textarea id="description" v-model="form.description" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Süreç Adımları</h2>
      <p class="text-sm text-gray-500">Sıralaması yukarıdan aşağıya doğru gösterim sırasıdır (1. adım, 2. adım...).</p>

      <div class="space-y-4">
        <div
          v-for="(step, index) in form.steps"
          :key="'step-' + (step.id || index)"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg text-gray-700">Adım #{{ index + 1 }}</h4>
            <button :aria-label="`${index + 1}. Adımı sil`" type="button" @click="removeStep(index)" class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="space-y-2">
            <div>
              <label :for="'step-icon-' + index" class="block text-sm font-medium text-gray-600">İkon URL (isteğe bağlı)</label>
              <input v-model="step.iconPath" :id="'step-icon-' + index" type="text" class="w-full p-2 border rounded" placeholder="/images/icon.svg" />
            </div>
            <div>
              <label :for="'step-title-' + index" class="block text-sm font-medium text-gray-600">Başlık</label>
              <input v-model="step.title" :id="'step-title-' + index" type="text" class="w-full p-2 border rounded" placeholder="Örn: Ücretsiz Keşif ve Planlama" required />
            </div>
            <div>
              <label :for="'step-desc-' + index" class="block text-sm font-medium text-gray-600">Açıklama</label>
              <textarea v-model="step.description" :id="'step-desc-' + index" rows="3" class="w-full p-2 border rounded" placeholder="Adımın detaylı anlatımı" required></textarea>
            </div>
          </div>
        </div>
      </div>

      <button type="button" @click="addStep" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        <span>Yeni Adım Ekle</span>
      </button>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button type="submit" :disabled="isSaving" :aria-busy="isSaving" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isSaving ? 'Kaydediliyor...' : (recordId ? 'Tümünü Güncelle' : 'Oluştur') }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" :disabled="isSaving" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          Kaydı Sil
        </button>
      </div>
    </form>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      :loading="isDeleting"
      title="Süreç Bölümü Kaydını Sil"
      message="Bu bölümdeki tüm verileri (ana metinler ve tüm adımlar) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
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

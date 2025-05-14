<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Silme Onayı',
  },
  message: {
    type: String,
    default: 'Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
  },
  confirmText: {
    type: String,
    default: 'Sil',
  },
  cancelText: {
    type: String,
    default: 'İptal',
  },
});

const emits = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 text-black rounded">
          {{ cancelText }}
        </button>
        <button @click="$emit('confirm')" class="px-4 py-2 bg-red-500 text-white rounded">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  z-index: 1000;
}
</style>

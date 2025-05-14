<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Form',
  },
  fields: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(['submit', 'close']);

const formData = reactive({});

// props.fields üzerinden formData'yı başlatıyoruz
const initializeForm = () => {
  props.fields.forEach(field => {
    formData[field.name] = field.value || '';
  });
};

// Modal açıldığında form verilerini sıfırlıyoruz
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      initializeForm();
    }
  },
  { immediate: true }
);

const submitForm = () => {
  emits('submit', { ...formData });
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div v-for="field in fields" :key="field.name">
          <label :for="field.name" class="block font-medium">{{ field.label }}:</label>
          <input
            :id="field.name"
            v-model="formData[field.name]"
            :type="field.type || 'text'"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-black rounded">
            İptal
          </button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  z-index: 1000;
}
</style>

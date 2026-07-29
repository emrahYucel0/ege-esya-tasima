<script setup>
defineProps({
  message: {
    type: String,
    default: "Şu anda gösterilecek bir içerik bulunmuyor.",
  },
});
</script>

<template>
  <div role="status" class="text-center py-12 px-4">
    <svg
      class="w-10 h-10 mx-auto mb-3 text-stone-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M9 13h6m-6-4h6m2 9H7a2 2 0 01-2-2V4a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2z"
      />
    </svg>
    <p class="text-stone-500 text-lg">{{ message }}</p>
  </div>
</template>

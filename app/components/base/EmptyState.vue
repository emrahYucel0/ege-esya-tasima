<script setup>
/**
 * Boş durum kutusu.
 *
 * DÜZELTİLEN HATA — KONTRAST
 * Metin `text-stone-500` idi; beyaz zeminde ölçümde 4.26:1 çıkıyordu ve
 * WCAG AA normal metin eşiği 4.5:1. Design system'in `ink-muted` tonu aynı
 * zeminde 5.5:1 veriyor. Ham stone paleti yerine token'lara bağlandı, tek
 * kullanımlık inline SVG de ortak <ui-icon> bileşenine taşındı.
 */
defineProps({
  message: {
    type: String,
    default: "Şu anda gösterilecek bir içerik bulunmuyor.",
  },
});
</script>

<template>
  <div role="status" class="px-4 py-12 text-center">
    <ui-icon name="info" :size="40" class="mx-auto mb-3 text-line-strong" aria-hidden="true" />
    <p class="text-lead text-ink-muted">{{ message }}</p>
  </div>
</template>

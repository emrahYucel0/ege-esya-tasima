<script setup>
// Metin veritabanından geliyor (Admin > Politika Metinleri).
// Başlık/açıklama varsayılanı app/utils/sayfa-meta.ts kütüğünde.
await usePageSeo('gizlilik-politikasi', sayfaMetasi('gizlilik-politikasi'))
</script>

<template>
  <policy-view slug="gizlilik-politikasi" />
</template>

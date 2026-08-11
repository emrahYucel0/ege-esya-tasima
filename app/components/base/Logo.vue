<script setup>
/**
 * MARKA SEMBOLÜ — "çatılı ev, sarı kapı".
 *
 * NEDEN BİLEŞEN, NEDEN <img> DEĞİL
 * Sembol navbar ve footer'da KOYU zeminde, panelde/açık yüzeylerde AÇIK
 * zeminde kullanılıyor. Dosya olarak konsaydı her zemin için ayrı dosya
 * ve ayrı HTTP isteği gerekirdi. Burada ev gövdesi `currentColor` — yani
 * bulunduğu yerin metin rengini alıyor, kapı ise her zaman marka sarısı.
 * Tek kaynak, sıfır istek.
 *
 * NEDEN KAMYON DEĞİL
 * Nakliyat logolarının çoğu kamyon çiziyor; kamyon aracı anlatır, işi
 * değil. Buradaki şekil taşınan şeyin kendisini anlatıyor: ev.
 *
 * NEDEN İÇİNDE YAZI YOK
 * Marka adı Site Ayarları'ndan geliyor ve panelden değiştirilebiliyor.
 * Sembole yazılsaydı ad değiştiğinde logo eski adda kalırdı — bu oturumda
 * kaldırdığımız hatanın aynısı. Ad her zaman sembolün YANINDA, metin
 * olarak render ediliyor.
 *
 * KÜÇÜK BOYUT KISITI
 * Şekil 16px'te de okunmak zorunda (favicon). Bu yüzden çatı ÇİZGİ DEĞİL
 * DOLU: ince çizgili varyantlar 16px'e indirildiğinde gövdeden kopuyordu,
 * ölçüldü. Dolu çatı tek parça kütle olarak tutunuyor.
 */
defineProps({
  /** Kenar uzunluğu (px). Kare oran sabit. */
  size: { type: [Number, String], default: 28 },
})
</script>

<template>
  <!-- aria-hidden: sembol her zaman marka adının yanında duruyor, ad zaten
       metin olarak okunuyor. Ayrıca isimlendirmek ekran okuyucuya aynı şeyi
       iki kez söyletirdi. -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    focusable="false"
    class="marka-logo"
  >
    <path
      d="M16 3.6 L29.4 15.2 a1.4 1.4 0 0 1 -0.9 2.5 H3.5 a1.4 1.4 0 0 1 -0.9 -2.5 Z"
      fill="currentColor"
    />
    <rect x="6.4" y="17.6" width="19.2" height="10.8" rx="2" fill="currentColor" />
    <path d="M13 28.4 v-4.4 a3 3 0 0 1 6 0 v4.4 z" fill="rgb(var(--c-accent-400))" />
  </svg>
</template>

<style scoped>
.marka-logo {
  display: block;
  flex: none;
}
</style>

<script setup>
/**
 * UiStatValue — bir istatistik değerini yazar, görünür olunca sayarak artırır.
 *
 * Değer sunucudan gelen HTML'de NİHAİ HALİYLE bulunur; useCountUp yalnızca
 * bir sunum katmanıdır. JS kapalıysa, IntersectionObserver yoksa veya
 * kullanıcı hareket azaltma tercih ediyorsa rakam olduğu gibi görünür —
 * hiçbir koşulda "0" ya da boş kalmaz.
 *
 * "12.400+", "%100", "4,9/5" gibi ön ek/son ekli yazımlar korunur; yalnızca
 * sayısal kısım animasyonlanır (bkz. composables/useCountUp.ts).
 */
const props = defineProps({
  value: { type: [String, Number], default: '' },
})

const el = ref(null)
useCountUp(el)
</script>

<template>
  <span ref="el" class="tabular-nums">{{ props.value }}</span>
</template>

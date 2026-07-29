<script setup>
/**
 * UiSection — sayfa ritmini tek noktadan yöneten kap.
 *
 * ÇÖZDÜĞÜ SORUN
 * Önceden dikey boşluk İKİ yerden geliyordu: pages/index.vue her bölüme
 * `mb-20 mt-20` veriyordu, bölümlerin kendisi de ayrıca `py-16 md:py-24`
 * taşıyordu. Bu ikisi breakpoint'lerde birbirini tutmuyordu ve Hero'da
 * `-mt-10` gibi düzeltme hack'leri gerekiyordu.
 *
 * Artık kural net: dikey boşluk YALNIZCA bu component'ten gelir
 * (--space-section token'ı, akışkan clamp değeri).
 *
 * ERİŞİLEBİLİRLİK
 * `labelledby` verildiğinde <section aria-labelledby> üretilir; ekran
 * okuyucu bölümü başlığıyla anons eder. Başlık yoksa `label` ile düz metin
 * etiket verilebilir.
 */
import { computed } from 'vue'

const props = defineProps({
  /** Bölüm zemini */
  tone: {
    type: String,
    default: 'default', // 'default' | 'sunken' | 'brand' | 'none'
    validator: (v) => ['default', 'sunken', 'brand', 'none'].includes(v),
  },
  /** Dikey boşluk ölçüsü */
  size: {
    type: String,
    default: 'default', // 'default' | 'compact' | 'flush'
    validator: (v) => ['default', 'compact', 'flush'].includes(v),
  },
  /** İçerik genişliği */
  width: {
    type: String,
    default: 'container', // 'container' | 'wide' | 'full'
    validator: (v) => ['container', 'wide', 'full'].includes(v),
  },
  /** aria-labelledby için başlık elemanının id'si */
  labelledby: { type: String, default: undefined },
  /** Başlık yoksa kullanılacak düz metin etiket */
  label: { type: String, default: undefined },
})

const toneClass = computed(
  () =>
    ({
      default: '',
      sunken: 'bg-surface-sunken',
      brand: 'bg-brand-900 text-ink-inverse',
      none: '',
    })[props.tone]
)

const sizeClass = computed(
  () =>
    ({
      default: 'py-section',
      compact: 'py-section-sm',
      flush: '',
    })[props.size]
)

const widthClass = computed(
  () =>
    ({
      container: 'container',
      wide: 'mx-auto w-full max-w-wide px-gutter',
      full: 'w-full',
    })[props.width]
)
</script>

<template>
  <section
    :class="[toneClass, sizeClass]"
    :aria-labelledby="labelledby"
    :aria-label="labelledby ? undefined : label"
  >
    <div :class="widthClass">
      <slot />
    </div>
  </section>
</template>

<script setup>
/**
 * UiCard — sitedeki tüm kart benzeri yüzeylerin ortak kabı.
 *
 * Tasarım kuralı (bkz. assets/css/main.css → .card):
 * kenarlık ve gölge AYNI ANDA kullanılmaz. Gölge zaten kenarı tanımlar;
 * ikisi birlikte karta ucuz bir çerçeve hissi verir. Bu yüzden burada
 * `border` prop'u yok — yalnızca yüzey tonu ve etkileşim seçilir.
 *
 * `to` verildiğinde kartın TAMAMI tıklanabilir bir bağlantı olur; bu
 * durumda içeride ayrıca bir bağlantı bulundurulmamalıdır (iç içe
 * interaktif eleman erişilebilirlik hatasıdır).
 */
import { computed } from 'vue'

const props = defineProps({
  tone: {
    type: String,
    default: 'surface', // 'surface' | 'sunken'
    validator: (v) => ['surface', 'sunken'].includes(v),
  },
  /** Hover'da kalkma + gölge derinleşmesi */
  interactive: { type: Boolean, default: false },
  /** Öne çıkan kart (fiyat planı gibi) — marka kenarlığı + daha derin gölge */
  featured: { type: Boolean, default: false },
  /** İç boşluk */
  padding: {
    type: String,
    default: 'md', // 'none' | 'sm' | 'md' | 'lg'
    validator: (v) => ['none', 'sm', 'md', 'lg'].includes(v),
  },
  to: { type: [String, Object], default: undefined },
  as: { type: String, default: 'div' },
})

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.as))

const paddingClass = computed(
  () => ({ none: '', sm: 'p-5', md: 'p-6 sm:p-8', lg: 'p-8 sm:p-10' })[props.padding]
)

const classes = computed(() => [
  props.tone === 'sunken' ? 'card-sunken' : 'card',
  paddingClass.value,
  (props.interactive || props.to) && 'card-interactive',
  props.to && 'group block',
  props.featured && 'ring-2 ring-brand-600 shadow-lifted',
])
</script>

<template>
  <component :is="tag" :to="to" :class="classes">
    <slot />
  </component>
</template>

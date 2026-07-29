<script setup>
/**
 * UiIcon — sitedeki TEK ikon kaynağı.
 *
 * Önceden ikonlar her component'in içine inline SVG olarak dağılmıştı
 * (Faq'ta 4, Testimonial'da 5, Pricing'de 2, Key'de 5 ayrı tanım) ve her
 * biri farklı stroke kalınlığı / viewBox kullanıyordu. Artık tek bir görsel
 * dil var: 24px grid, 1.5px stroke, yuvarlak uç ve köşe.
 *
 * Yeni ikon eklerken: 24x24 viewBox'a göre, sadece stroke ile çizilmiş
 * (fill yok) bir path yaz. Dolgu gerektiren ikonlar `filled` listesinde.
 */
import { computed } from 'vue'

const props = defineProps({
  /** paths tablosundaki anahtar */
  name: { type: String, required: true },
  /** px cinsinden kare boyut */
  size: { type: [Number, String], default: 24 },
  /** çizgi kalınlığı */
  stroke: { type: [Number, String], default: 1.5 },
})

// Sadece bu ikonlar dolgu (fill) ile çizilir; geri kalanı çizgi (stroke).
const filled = new Set(['star', 'quote'])

const paths = {
  // Güven / durum
  shield: 'M12 21.6c4.2-1.9 7-6 7-10.6V5.9l-7-2.9-7 2.9v5.1c0 4.6 2.8 8.7 7 10.6Z',
  'shield-check': 'M12 21.6c4.2-1.9 7-6 7-10.6V5.9l-7-2.9-7 2.9v5.1c0 4.6 2.8 8.7 7 10.6ZM9 11.8l2.1 2.1L15.3 9.7',
  check: 'M4.5 12.5 9 17 19.5 6.5',
  'check-circle': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8.5 12.2l2.4 2.4 4.6-5',
  close: 'M6 6l12 12M18 6 6 18',
  star: 'M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z',
  award:
    'M12 14.5a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4ZM8.6 13.6 7.2 21l4.8-2.6 4.8 2.6-1.4-7.4',

  // Nakliyat
  truck:
    'M2.8 6.4h9.9v9.9H2.8zM12.7 9.9h3.6l3.7 3.4v3h-7.3zM7.3 19.4a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM17.2 19.4a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z',
  box: 'M20.5 8.3v7.4a1.8 1.8 0 0 1-.9 1.6l-6.7 3.8a1.8 1.8 0 0 1-1.8 0l-6.7-3.8a1.8 1.8 0 0 1-.9-1.6V8.3a1.8 1.8 0 0 1 .9-1.6l6.7-3.8a1.8 1.8 0 0 1 1.8 0l6.7 3.8a1.8 1.8 0 0 1 .9 1.6ZM3.6 7.4 12 12.2l8.4-4.8M12 21V12.2',
  home: 'M3.5 10.2 12 3.4l8.5 6.8V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9.8ZM9.4 21v-6.4h5.2V21',
  building:
    'M4.5 21V4.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1V21M15.5 9.5H19a1 1 0 0 1 1 1V21M3 21h18M8 8h1.5M8 12h1.5M8 16h1.5M12 8h1.5M12 12h1.5M12 16h1.5',
  elevator:
    'M5.5 3.2h13a1 1 0 0 1 1 1v15.6a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V4.2a1 1 0 0 1 1-1ZM12 3.2v17.6M8.2 10.6 9.6 8.8l1.4 1.8M8.2 13.4l1.4 1.8 1.4-1.8',
  sofa: 'M4.5 11V8.2a1.8 1.8 0 0 1 1.8-1.8h11.4a1.8 1.8 0 0 1 1.8 1.8V11M3 11.9a1.7 1.7 0 0 1 3.4 0v3.4h11.2v-3.4a1.7 1.7 0 0 1 3.4 0v5.2H3v-5.2ZM5.6 17.1V19M18.4 17.1V19',
  package:
    'M20.5 8.3v7.4a1.8 1.8 0 0 1-.9 1.6l-6.7 3.8a1.8 1.8 0 0 1-1.8 0l-6.7-3.8a1.8 1.8 0 0 1-.9-1.6V8.3a1.8 1.8 0 0 1 .9-1.6l6.7-3.8a1.8 1.8 0 0 1 1.8 0l6.7 3.8a1.8 1.8 0 0 1 .9 1.6ZM7.8 4.9l8.4 4.8M3.6 7.4 12 12.2l8.4-4.8M12 21V12.2',
  tools:
    'M14.2 6.4a3.6 3.6 0 0 0 4.7 4.7l-7.4 7.4a2.3 2.3 0 0 1-3.3-3.3l7.4-7.4ZM6.6 3.4l2.9 2.9-2.1 2.1-2.9-2.9a2 2 0 0 1 2.1-2.1Z',
  route:
    'M6.5 8.8a2.6 2.6 0 1 0 0-5.3 2.6 2.6 0 0 0 0 5.3ZM17.5 20.5a2.6 2.6 0 1 0 0-5.3 2.6 2.6 0 0 0 0 5.3ZM6.5 8.8v3.4a2.6 2.6 0 0 0 2.6 2.6h5.8a2.6 2.6 0 0 1 2.6 2.6',

  // İletişim / bilgi
  phone:
    'M20.5 16.9v2.4a1.6 1.6 0 0 1-1.8 1.6 16.2 16.2 0 0 1-7-2.5 15.9 15.9 0 0 1-4.9-4.9 16.2 16.2 0 0 1-2.5-7.1A1.6 1.6 0 0 1 5.9 4.6h2.4a1.6 1.6 0 0 1 1.6 1.4c.1.8.3 1.6.6 2.3a1.6 1.6 0 0 1-.4 1.7l-1 1a12.8 12.8 0 0 0 4.9 4.9l1-1a1.6 1.6 0 0 1 1.7-.4c.7.3 1.5.5 2.3.6a1.6 1.6 0 0 1 1.5 1.8Z',
  mail: 'M4.2 5.4h15.6a1.4 1.4 0 0 1 1.4 1.4v10.4a1.4 1.4 0 0 1-1.4 1.4H4.2a1.4 1.4 0 0 1-1.4-1.4V6.8a1.4 1.4 0 0 1 1.4-1.4ZM21.2 6.9 12 13.1 2.8 6.9',
  'map-pin': 'M20 10.4c0 5.6-8 12-8 12s-8-6.4-8-12a8 8 0 0 1 16 0ZM12 13.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5.3l3.4 2',
  calendar:
    'M5 5.4h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1ZM8 3.2v4.4M16 3.2v4.4M4 10.6h16',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5.2M12 7.9h.01',
  search: 'M11 18.4a7.4 7.4 0 1 0 0-14.8 7.4 7.4 0 0 0 0 14.8ZM20.5 20.5l-4.2-4.2',
  quote:
    'M9.4 5.6C6.1 6.8 4 9.9 4 13.6V19h6.2v-6.2H7.5c0-2.4 1.3-4.2 2.9-5l-1-2.2ZM19.6 5.6c-3.3 1.2-5.4 4.3-5.4 8V19h6.2v-6.2h-2.7c0-2.4 1.3-4.2 2.9-5l-1-2.2Z',

  // Yön
  'arrow-right': 'M4.5 12h15M13.5 6l6 6-6 6',
  'arrow-left': 'M19.5 12h-15M10.5 18l-6-6 6-6',
  'chevron-down': 'M6 9.5 12 15.5l6-6',
  'chevron-right': 'M9.5 6l6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
}

const d = computed(() => paths[props.name] ?? paths.info)
const isFilled = computed(() => filled.has(props.name))
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="isFilled ? 'currentColor' : 'none'"
    :stroke="isFilled ? 'none' : 'currentColor'"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
  >
    <path :d="d" />
  </svg>
</template>

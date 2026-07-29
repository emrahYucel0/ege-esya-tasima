<script setup>
/**
 * UiHeading — bölüm başlığı bloğu (etiket + başlık + açıklama).
 *
 * Her bölümün başlığını kendi başına kurgulaması, sitede 4 farklı başlık
 * boyutu (text-3xl / text-4xl / text-5xl) ve 3 farklı alt-çizgi süsü
 * oluşmasına yol açmıştı. Bu component tek bir tipografik ritim dayatır.
 *
 * `id` verilmesi önerilir: UiSection'ın `labelledby` prop'u bu id'ye
 * bağlanınca bölüm ekran okuyucularda başlığıyla anons edilir.
 */
import { computed } from 'vue'

const props = defineProps({
  /** Başlığın üstündeki küçük etiket (ör. "HİZMETLERİMİZ") */
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  /** Vurgulu kelime için sınırlı HTML (<span>, <br> …). İçeride
   *  sanitizeHtml'den geçirilir; admin panelinden gelen veri doğrudan
   *  buraya bağlanabilir. */
  titleHtml: { type: String, default: '' },
  description: { type: String, default: '' },
  align: {
    type: String,
    default: 'center', // 'center' | 'left'
    validator: (v) => ['center', 'left'].includes(v),
  },
  /** Başlık seviyesi — sayfada tek h1 olsun diye ayarlanabilir */
  as: { type: String, default: 'h2' },
  id: { type: String, default: undefined },
})

const isCenter = computed(() => props.align === 'center')

// Admin panelinden gelen içerik güvenilmez kabul edilir; XSS'e karşı
// her durumda temizlenir (bkz. utils/sanitizeHtml.ts).
const safeTitleHtml = computed(() =>
  props.titleHtml ? sanitizeHtml(props.titleHtml) : ''
)
</script>

<template>
  <div
    class="mb-block flex flex-col gap-4"
    :class="isCenter ? 'items-center text-center' : 'items-start text-left'"
  >
    <span
      v-if="eyebrow"
      data-reveal="fade"
      class="eyebrow"
      :class="{ 'eyebrow-center': isCenter }"
    >
      {{ eyebrow }}
    </span>

    <component
      :is="as"
      v-if="title || titleHtml"
      :id="id"
      data-reveal="blur"
      class="text-h2 text-ink"
    >
      <span v-if="safeTitleHtml" v-html="safeTitleHtml" />
      <template v-else>{{ title }}</template>
    </component>

    <p
      v-if="description"
      data-reveal
      class="measure text-lead text-ink-muted"
      :class="{ 'mx-auto': isCenter }"
    >
      {{ description }}
    </p>

    <!-- Başlık bloğunun altına ek içerik (rozet, buton vb.) koymak için -->
    <slot />
  </div>
</template>

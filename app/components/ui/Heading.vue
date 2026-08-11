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
  /**
   * 'center' — kısa açıklamalar için (2-3 satır).
   * 'left'   — sola hizalı tek sütun.
   * 'split'  — başlık solda, açıklama sağda iki sütun. UZUN açıklamalar
   *            için: 3 satırı geçen ortalanmış metin okunması zor bir
   *            bloğa dönüşür, çünkü her satırın başlangıcı farklı yerde
   *            olduğu için göz satır başını her seferinde aramak zorunda
   *            kalır. Bölünmüş düzende metin sola hizalı ve dar bir
   *            sütunda kalır.
   */
  align: {
    type: String,
    default: 'center', // 'center' | 'left' | 'split'
    validator: (v) => ['center', 'left', 'split'].includes(v),
  },
  /** Başlık seviyesi — sayfada tek h1 olsun diye ayarlanabilir */
  as: { type: String, default: 'h2' },
  id: { type: String, default: undefined },
})

const isCenter = computed(() => props.align === 'center')
const isSplit = computed(() => props.align === 'split')

// Admin panelinden gelen içerik güvenilmez kabul edilir; XSS'e karşı
// her durumda temizlenir (bkz. utils/sanitizeHtml.ts).
const safeTitleHtml = computed(() =>
  props.titleHtml ? sanitizeHtml(props.titleHtml) : ''
)
</script>

<template>
  <div
    class="mb-block"
    :class="
      isSplit
        ? 'grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12'
        : ['flex flex-col gap-4', isCenter ? 'items-center text-center' : 'items-start text-left']
    "
  >
    <div
      class="flex flex-col gap-4"
      :class="[
        isSplit && 'lg:col-span-6',
        isCenter ? 'items-center text-center' : 'items-start text-left',
      ]"
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
    </div>

    <div
      class="flex flex-col gap-4"
      :class="[
        isSplit && 'lg:col-span-6',
        isCenter ? 'items-center text-center' : 'items-start text-left',
      ]"
    >
      <p
        v-if="description"
        data-reveal
        class="text-pretty text-ink-muted"
        :class="[isSplit ? 'text-base' : 'measure text-lead', isCenter && 'mx-auto']"
      >
        {{ description }}
      </p>

      <!-- Başlık bloğunun altına ek içerik (rozet, buton vb.) koymak için -->
      <slot />
    </div>
  </div>
</template>

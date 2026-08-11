<script setup>
/**
 * YAZI DETAYI
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. LCP GÖRSELİ TEMBEL YÜKLENİYORDU. Kapak görseli sayfanın en üstünde,
 *    ekranda ilk görünen büyük öğe — yani LCP adayı — ama `loading="lazy"`
 *    işaretliydi. Tarayıcı bu görseli düzen hesaplanana kadar indirmeye
 *    başlamıyordu. `loading="eager"` + `preload` ile ilk kareye alındı.
 *
 * 2. "null Görseli". Alt metni `post.shortTitle + ' Görseli'` idi;
 *    `shortTitle` şemada opsiyonel, boş olduğunda ekran okuyucuya
 *    "null Görseli" okunuyordu.
 *
 * 3. TARİH VE YAZAR YOKTU. Blog listesinde gösterilen tarih/yazar bilgisi
 *    yazının kendi sayfasında hiç yer almıyordu.
 *
 * 4. SAYFANIN NEREDE OLDUĞU BELLİ DEĞİLDİ. Yazı doğrudan bir kartla
 *    başlıyor, "Blog"a dönüş bağlantısı bulunmuyordu.
 *
 * TASARIM KARARI — okuma genişliği
 * Metin sütunu ~68 karakterle sınırlandı. Eski düzende içerik 1152px'lik
 * kabın tamamına yayılıyordu; bu genişlikte göz satır sonundan satır
 * başına dönerken sık sık satır kaybediyor.
 */
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
  previous: { type: Object, default: null },
  next: { type: Object, default: null },
  authorFallback: { type: String, default: '' },
  /** Yazının metniyle eşleşen hizmet sayfaları (iç bağlantı köprüsü). */
  relatedServices: { type: Array, default: () => [] },
  /** Bölge sayfalarına giden etiketler. */
  relatedRegions: { type: Array, default: () => [] },
})

const author = computed(() => props.post.author || props.authorFallback)

const formattedDate = computed(() => {
  if (!props.post.createdAt) return ''
  const date = new Date(props.post.createdAt)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
})

const isoDate = computed(() => {
  if (!props.post.createdAt) return undefined
  const date = new Date(props.post.createdAt)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
})

// Panelden girilen metin varsa o kullanılır; yoksa bugünkü otomatik metin.
const imageAlt = computed(() => {
  const elleYazilan = props.post.imageAlt?.trim()
  if (elleYazilan) return elleYazilan

  return props.post.shortTitle?.trim()
    ? `${props.post.shortTitle} konulu yazının kapak görseli`
    : 'Yazının kapak görseli'
})
</script>

<template>
  <ui-section tone="surface" labelledby="yazi-baslik">
    <article class="article">
      <NuxtLink to="/blog" class="article__back">
        <ui-icon name="arrow-left" :size="16" />
        Tüm yazılar
      </NuxtLink>

      <header class="article__header">
        <h1 id="yazi-baslik" class="text-h1 text-ink">{{ post.title }}</h1>

        <p v-if="post.excerpt" class="mt-4 text-pretty text-lead text-ink-muted">
          {{ post.excerpt }}
        </p>

        <p class="article__meta">
          <span v-if="author">{{ author }}</span>
          <span v-if="author && formattedDate" aria-hidden="true">·</span>
          <time v-if="formattedDate" :datetime="isoDate">{{ formattedDate }}</time>
        </p>
      </header>

      <figure v-if="post.image" class="article__figure">
        <NuxtImg
          format="webp"
          quality="78"
          :src="post.image"
          :alt="imageAlt"
          class="article__img"
          sizes="xs:100vw lg:900px"
          loading="eager"
          fetchpriority="high"
          preload
          decoding="async"
        />
      </figure>

      <article-prose :html="post.content" class="article__body" />

      <!-- İç bağlantı köprüsü: yazıdan hizmet ve bölge sayfalarına.
           Öncesinde blog yazıları hiçbir hizmet/bölge sayfasına bağlanmıyordu. -->
      <article-related-links :services="relatedServices" :regions="relatedRegions" />

      <article-pager-nav :previous="previous" :next="next" kind="yazı" class="article__pager" />
    </article>
  </ui-section>
</template>

<style scoped>
.article {
  --okuma-genisligi: 68ch;
  margin: 0 auto;
  max-width: 52rem;
}

.article__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgb(var(--c-brand-600));
  transition: color var(--dur-fast) var(--ease-soft);
}

.article__back:hover {
  color: rgb(var(--c-brand-800));
}

.article__header {
  margin-top: 1.5rem;
  max-width: var(--okuma-genisligi);
}

.article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  font-size: 0.9375rem;
  color: rgb(var(--c-ink-muted));
}

.article__figure {
  margin: 2.5rem 0;
  overflow: hidden;
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-lg);
}

.article__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Okuma sütunu: 68 karakter. Kapak görseli ve gezinme tam genişlikte
   kalırken yalnızca metin daralıyor. */
.article__body {
  max-width: var(--okuma-genisligi);
}
</style>

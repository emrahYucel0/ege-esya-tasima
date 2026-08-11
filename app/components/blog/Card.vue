<script setup>
/**
 * Blog kartı.
 *
 * KALDIRILAN ÖLÜ BAĞLAMALAR
 * Eski kart `post.category` ve `post.authorImage` alanlarını kullanıyordu;
 * ikisi de Post modelinde YOK (bkz. prisma/schema.prisma). Sonuç: kategori
 * rozeti her yazıda değişmez biçimde "Genel" yazıyor, yazar avatarı her
 * zaman harf yedeğine düşüyordu. İkisi de kaldırıldı — var olmayan bir
 * alanın yedeğini göstermek, alanın var olduğu izlenimi veriyor.
 *
 * KALDIRILAN "3 dk okuma"
 * Bu değer şablona sabit yazılmıştı: 400 kelimelik de 2.000 kelimelik de
 * yazı "3 dk" diyordu. Gerçek okuma süresi `content` uzunluğundan
 * hesaplanır ama liste isteği (`?light=true`) o alanı bilerek çekmiyor —
 * yazı başına onlarca KB olabiliyor. Yanlış bir sayı göstermektense
 * göstermemeyi seçtim.
 */
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
  authorFallback: { type: String, default: '' },
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
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10)
})
</script>

<template>
  <ui-card as="article" padding="none" interactive class="blog-card">
    <div class="blog-card__media">
      <NuxtImg
        format="webp"
        quality="70"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px"
        class="blog-card__img"
        :src="post.image || '/img/default-blog.jpg'"
        :alt="post.imageAlt?.trim() || post.shortTitle || post.title || 'Blog yazısı görseli'"
      />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <!-- `ink-subtle` DEĞİL: beyaz zeminde 3.04:1 veriyor, WCAG AA eşiği
           4.5:1. `ink-muted` 5.5:1. (İlk yazdığımda subtle kullanmıştım,
           kontrast taramasında yakalandı.) -->
      <time v-if="formattedDate" :datetime="isoDate" class="text-sm text-ink-muted">
        {{ formattedDate }}
      </time>

      <h3 class="mt-2 text-h4 text-ink">
        <!-- Kartın TAMAMI değil, yalnızca başlık bağlantı: kart tamamen
             tıklanabilir yapılsaydı içindeki "Devamını oku" bağlantısı iç
             içe interaktif eleman olurdu. `::after` ile tıklama alanı yine
             kartın tamamına yayılıyor. -->
        <NuxtLink :to="`/${post.slug}`" class="blog-card__link">{{ post.title }}</NuxtLink>
      </h3>

      <!-- `mb-5`: alt bandın `margin-top: auto`'su kart dolduğunda sıfıra
           düşüyor ve kırpılmış üçüncü satır ayırıcı çizgiye yapışıyordu. -->
      <p v-if="post.excerpt" class="mb-5 mt-3 line-clamp-3 text-pretty text-ink-muted">
        {{ post.excerpt }}
      </p>

      <div class="blog-card__footer">
        <span v-if="author" class="flex min-w-0 items-center gap-2">
          <span class="blog-card__avatar" aria-hidden="true">{{ author.charAt(0) }}</span>
          <span class="truncate text-sm text-ink-muted">{{ author }}</span>
        </span>
        <span class="blog-card__more" aria-hidden="true">
          Devamını oku
          <ui-icon name="arrow-right" :size="16" class="nudge-x" />
        </span>
      </div>
    </div>
  </ui-card>
</template>

<style scoped>
.blog-card {
  position: relative; /* `.blog-card__link::after` bunu kapsayıcı olarak alır */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.blog-card__media {
  overflow: hidden;
}

.blog-card__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out);
}

.blog-card:hover .blog-card__img {
  transform: scale(1.05);
}

.blog-card__link {
  color: inherit;
}

/* Tıklama alanını kartın tamamına yayar; odak halkası yine yalnızca
   başlığın etrafında çizilir, yani klavye kullanıcısı nereye bastığını
   görür. */
.blog-card__link::after {
  content: "";
  position: absolute;
  inset: 0;
}

.blog-card__link:hover {
  color: rgb(var(--c-brand-700));
}

.blog-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid rgb(var(--c-line));
}

.blog-card__avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-brand-600) / 0.12);
  color: rgb(var(--c-brand-700));
  font-size: 0.75rem;
  font-weight: 700;
}

.blog-card__more {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  color: rgb(var(--c-brand-600));
  font-size: 0.875rem;
  font-weight: 600;
}
</style>

<script setup>
/**
 * Önceki / sonraki içerik gezinmesi.
 *
 * Eskiden bu blok yazı ve bölge şablonlarında ayrı ayrı, birbirinin kopyası
 * olarak duruyordu (~50 satır × 2). Tek bileşene alındı.
 *
 * DÜZELTİLEN HATA — "null" etiketi
 * Bağlantı metni doğrudan `shortTitle` (yazı) ve `subtitle` (bölge)
 * alanlarından geliyordu; ikisi de şemada opsiyonel. Boşsa düğmede
 * boşluk, `aria-label`'da ise "Önceki: undefined" yazıyordu. Artık
 * yedekleme zinciri var ve etiketsiz kayıt hiç render edilmiyor.
 */
import { computed } from 'vue'

const props = defineProps({
  previous: { type: Object, default: null },
  next: { type: Object, default: null },
  /** Erişilebilir isimde kullanılacak tür adı: "yazı" / "bölge" */
  kind: { type: String, default: 'yazı' },
})

const labelOf = (item) =>
  item?.shortTitle?.trim() || item?.subtitle?.trim() || item?.title?.trim() || ''

const prev = computed(() =>
  props.previous && labelOf(props.previous)
    ? { slug: props.previous.slug, label: labelOf(props.previous) }
    : null
)

const nxt = computed(() =>
  props.next && labelOf(props.next)
    ? { slug: props.next.slug, label: labelOf(props.next) }
    : null
)

/**
 * Türkçe çoğul eki — ünlü uyumuna göre -lar / -ler.
 *
 * Öncesinde şablonda düz `${kind}lar` yazıyordu ve ekran okuyucuya
 * "Diğer hizmetlar", "Diğer bölgelar" diye okunuyordu. Son ünlü kalınsa
 * (a, ı, o, u) -lar; inceyse (e, i, ö, ü) -ler.
 */
const cogul = (kelime) => {
  const unluler = [...String(kelime)].filter((h) => 'aeıioöuüAEIİOÖUÜ'.includes(h))
  const son = (unluler.at(-1) || 'e').toLocaleLowerCase('tr-TR')
  return `${kelime}${'aıou'.includes(son) ? 'lar' : 'ler'}`
}
</script>

<template>
  <nav v-if="prev || nxt" class="pager" :aria-label="`Diğer ${cogul(kind)}`">
    <!-- ETİKET SIRASI: görünen metin iki parçadan oluşuyor — "Önceki" + başlık.
         Etiket de aynı sırayı BİTİŞİK vermeli (WCAG 2.5.3). Öncesinde araya
         içerik türü giriyordu ("Önceki bölge: Maltepe") ve ekranda görünen
         "Önceki Maltepe" dizesi etiketin içinde bütün hâlde geçmiyordu; sesle
         kontrol eşleşmiyordu. Tür sona alındı. -->
    <NuxtLink
      v-if="prev"
      :to="`/${prev.slug}`"
      class="pager__link pager__link--prev"
      :aria-label="`Önceki ${prev.label} — ${kind}`"
    >
      <ui-icon name="arrow-left" :size="18" class="pager__icon" />
      <span class="min-w-0">
        <span class="pager__hint">Önceki</span>
        <span class="pager__title">{{ prev.label }}</span>
      </span>
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="nxt"
      :to="`/${nxt.slug}`"
      class="pager__link pager__link--next"
      :aria-label="`Sonraki ${nxt.label} — ${kind}`"
    >
      <span class="min-w-0 text-right">
        <span class="pager__hint">Sonraki</span>
        <span class="pager__title">{{ nxt.label }}</span>
      </span>
      <ui-icon name="arrow-right" :size="18" class="pager__icon" />
    </NuxtLink>
  </nav>
</template>

<style scoped>
.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: var(--space-block);
  padding-top: 1.5rem;
  border-top: 1px solid rgb(var(--c-line));
}

.pager__link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-lg);
  background: rgb(var(--c-surface));
  transition:
    border-color var(--dur-base) var(--ease-soft),
    box-shadow var(--dur-base) var(--ease-soft),
    transform var(--dur-base) var(--ease-out);
}

.pager__link:hover {
  border-color: rgb(var(--c-brand-600) / 0.4);
  box-shadow: var(--shadow-sm);
  transform: translateY(var(--lift));
}

.pager__link--next {
  justify-content: flex-end;
  grid-column: 2;
}

.pager__icon {
  flex-shrink: 0;
  color: rgb(var(--c-brand-600));
}

.pager__hint {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(var(--c-ink-muted));
}

.pager__title {
  display: block;
  margin-top: 0.125rem;
  font-weight: 600;
  color: rgb(var(--c-ink));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 639px) {
  .pager {
    grid-template-columns: 1fr;
  }

  .pager__link--next {
    grid-column: 1;
  }
}
</style>

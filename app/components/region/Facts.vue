<script setup>
/**
 * BÖLGE KÜNYESİ — taşınmayı etkileyen yerel koşulların özeti.
 *
 * NE İŞE YARIYOR
 * Ziyaretçinin gerçekten merak ettiği şey ("binamda asansör yoksa ne olur",
 * "araç sokağıma girer mi") düz metin içinde paragraflara dağılmış hâlde
 * zor bulunuyor. Buradaki etiket/değer listesi aynı bilgiyi taranabilir
 * hâle getiriyor.
 *
 * NEDEN `<dl>` — tablo değil
 * Bu bir veri tablosu değil, terim-tanım eşleşmesi: tek bir "satır" ve iki
 * sütun yok, her biri bağımsız bir etiket ve karşılığı var. `<dl>` ekran
 * okuyucuda "tanım listesi, 5 öğe" olarak anons ediliyor ve etiketle değer
 * ilişkisi tablo başlığı/`scope` kurulumuna gerek kalmadan doğru kuruluyor.
 */
defineProps({
  /** [{ label, value }] */
  items: { type: Array, default: () => [] },
  title: { type: String, required: true },
  headingId: { type: String, required: true },
})
</script>

<template>
  <section v-if="items.length" class="region-facts" :aria-labelledby="headingId">
    <h2 :id="headingId" class="region-facts__title">{{ title }}</h2>

    <dl class="region-facts__list">
      <div v-for="(item, index) in items" :key="index" class="region-facts__row">
        <dt class="region-facts__label">{{ item.label }}</dt>
        <dd class="region-facts__value">{{ item.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.region-facts {
  margin-top: var(--space-block);
}

.region-facts__title {
  margin-bottom: 1.25rem;
  font-size: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.018em;
  color: rgb(var(--c-ink));
  scroll-margin-top: 6rem;
}

.region-facts__list {
  margin: 0;
  padding: 1.5rem;
  border-radius: var(--r-2xl);
  background: rgb(var(--c-surface-muted));
}

.region-facts__row {
  display: grid;
  gap: 0.25rem 1.5rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid rgb(var(--c-line));
}

.region-facts__row:first-child {
  padding-top: 0;
}

.region-facts__row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

/* Geniş ekranda iki sütun; dar ekranda etiket üstte, değer altta. */
@media (min-width: 30rem) {
  .region-facts__row {
    grid-template-columns: minmax(9rem, 14rem) 1fr;
    align-items: baseline;
  }
}

.region-facts__label {
  font-weight: 600;
  color: rgb(var(--c-ink));
}

.region-facts__value {
  margin: 0;
  color: rgb(var(--c-ink-muted));
  line-height: 1.65;
  text-wrap: pretty;
}
</style>

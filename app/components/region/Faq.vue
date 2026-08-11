<script setup>
/**
 * BÖLGEYE ÖZGÜ SIK SORULANLAR
 *
 * NEDEN AYRI BİR SSS BİLEŞENİ (base/Faq.vue varken)
 * base/Faq.vue ana sayfanın bölüm bileşeni: kendi başlığını, görselini ve
 * istatistik kartlarını da yönetiyor, veriyi kendi çekiyor. Buradaki ihtiyaç
 * ise bir makalenin içine gömülen, veriyi prop olarak alan sade bir liste.
 *
 * NEDEN `<details>` — JavaScript'li akordeon değil
 * 1. Açılır kapanır davranış, klavye erişimi ve ekran okuyucu anonsu
 *    tarayıcıdan geliyor; yazılacak ve bozulabilecek kod yok.
 * 2. JavaScript çalışmadan da açılıyor.
 * 3. Cevap metni her hâlükârda HTML'de: Google kapalı akordeon içindeki
 *    metni de okur, ama `<details>` ile tarayıcının "sayfa içinde bul"
 *    özelliği de kapalı içeriği bulup açabiliyor.
 *
 * YAPISAL VERİ BURADA DEĞİL
 * FAQPage JSON-LD'si sayfa seviyesinde (pages/[...slug].vue) üretiliyor.
 * Bileşen iki kez render edilirse iki FAQPage şeması çıkması — Google'ın
 * yapısal veri hatası olarak işaretlediği bir durum — bu sayede imkânsız.
 */
defineProps({
  /** [{ question, answer }] */
  items: { type: Array, default: () => [] },
  /** Bölüm başlığı; anahtar kelimeyi taşıdığı için dışarıdan veriliyor. */
  title: { type: String, required: true },
  /** Başlığın çapa id'si (içindekiler bağlantısının hedefi) */
  headingId: { type: String, required: true },
})
</script>

<template>
  <section v-if="items.length" class="region-faq" :aria-labelledby="headingId">
    <h2 :id="headingId" class="region-faq__title">{{ title }}</h2>

    <div class="region-faq__list">
      <details v-for="(item, index) in items" :key="index" class="region-faq__item">
        <summary class="region-faq__question">
          <span>{{ item.question }}</span>
          <ui-icon name="chevron-down" :size="18" class="region-faq__icon" aria-hidden="true" />
        </summary>
        <div class="region-faq__answer">
          <p>{{ item.answer }}</p>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.region-faq {
  margin-top: var(--space-block);
}

.region-faq__title {
  margin-bottom: 1.5rem;
  font-size: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.018em;
  color: rgb(var(--c-ink));
  /* Yapışkan menünün altında kalmasın diye çapa hedefine üst boşluk. */
  scroll-margin-top: 6rem;
}

.region-faq__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.region-faq__item {
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-lg);
  background: rgb(var(--c-surface));
  overflow: hidden;
}

.region-faq__item[open] {
  border-color: rgb(var(--c-brand-600) / 0.35);
}

.region-faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  font-weight: 600;
  color: rgb(var(--c-ink));
  list-style: none; /* Firefox */
  transition: color var(--dur-fast) var(--ease-soft);
}

/* Varsayılan açılır üçgeni gizle — yerine kendi ikonumuz var. */
.region-faq__question::-webkit-details-marker {
  display: none;
}

.region-faq__question:hover {
  color: rgb(var(--c-brand-700));
}

.region-faq__icon {
  flex-shrink: 0;
  color: rgb(var(--c-brand-600));
  transition: transform var(--dur-base) var(--ease-out);
}

.region-faq__item[open] .region-faq__icon {
  transform: rotate(180deg);
}

.region-faq__answer {
  padding: 0 1.25rem 1.25rem;
  color: rgb(var(--c-ink-muted));
  line-height: 1.75;
  text-wrap: pretty;
}

/*
 * Hareket azaltma tercihinde ikon dönüşü kapanır. Açılma/kapanma davranışı
 * tarayıcıya ait olduğu için ayrıca durdurulacak bir animasyon yok.
 */
@media (prefers-reduced-motion: reduce) {
  .region-faq__icon {
    transition: none;
  }
}
</style>

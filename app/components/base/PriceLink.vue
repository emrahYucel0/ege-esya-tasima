<script setup>
/**
 * FİYAT HESAPLAMA KÖPRÜSÜ — /fiyat-hesaplama sayfasına giden ortak bağlantı.
 *
 * NEDEN AYRI BİLEŞEN
 * Araç sayfası ayrı bir sayfa olarak kuruldu (fiyat niyetli aramalarda kendi
 * başına sıralanabilsin diye) ama sitede TEK bir giriş noktası vardı: bölge
 * sayfaları. Ana sayfada, hizmet sayfalarında, blog yazılarında ve footer'da
 * hiç bağlantı yoktu — yani sayfaya ancak 120 bölge sayfasından birine giren
 * ziyaretçi ulaşabiliyordu.
 *
 * Aynı işaretleme ve stili beş yere kopyalamak yerine tek bileşen: metin
 * bağlama göre değişiyor (bölge sayfasında "Kartal için…", hizmet sayfasında
 * hizmet adıyla), görünüm her yerde aynı kalıyor.
 */
defineProps({
  /** Bağlantı metni. Bağlama göre özelleştirilir. */
  label: {
    type: String,
    default: 'Tahmini taşınma fiyatınızı hesaplayın',
  },
  /**
   * 'pill'  → çerçeveli düğme görünümü (içerik gövdesi içinde kullanılır)
   * 'plain' → düz metin bağlantısı (footer gibi dar alanlar için)
   */
  variant: {
    type: String,
    default: 'pill',
    validator: (v) => ['pill', 'plain'].includes(v),
  },
})
</script>

<template>
  <NuxtLink to="/fiyat-hesaplama" class="fiyat-bag" :class="`fiyat-bag--${variant}`">
    <ui-icon name="calculator" :size="17" class="fiyat-bag__ikon" aria-hidden="true" />
    <span>{{ label }}</span>
    <ui-icon name="arrow-right" :size="16" class="nudge-x" aria-hidden="true" />
  </NuxtLink>
</template>

<style scoped>
.fiyat-bag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: rgb(var(--c-brand-700));
  transition: border-color var(--dur-fast) var(--ease-soft),
    color var(--dur-fast) var(--ease-soft);
}

.fiyat-bag__ikon {
  flex-shrink: 0;
}

.fiyat-bag--pill {
  padding: 0.6875rem 1.25rem;
  border: 1px solid rgb(var(--c-brand-600) / 0.35);
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
}

.fiyat-bag--pill:hover {
  border-color: rgb(var(--c-brand-600));
}

.fiyat-bag--plain {
  font-weight: 500;
  color: rgb(var(--c-ink-muted));
}

.fiyat-bag--plain:hover {
  color: rgb(var(--c-brand-700));
}
</style>

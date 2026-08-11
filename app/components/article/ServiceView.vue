<script setup>
/**
 * HİZMET DETAYI — /asansorlu-nakliyat gibi kök adreslerde yayınlanır.
 *
 * Bölge sayfasıyla aynı iskeleti paylaşıyor (kırılım yolu, içindekiler,
 * çapa bağlantıları, SSS, yapısal veri) çünkü ikisi de aynı işi yapıyor:
 * tek bir arama niyetini karşılayan, derinlemesine bir hizmet sayfası.
 * Farkı içerik bölümlerinde:
 *     bölge  → künye · mahalleler · güzergâhlar · fiyat faktörleri
 *     hizmet → kapsam (neler dahil) · nerelerde veriliyor (bölge bağlantıları)
 *
 * NEREDE HİZMET VERİYORUZ BÖLÜMÜ
 * Bu bölüm iki yönlü bir iç bağlantı köprüsü kuruyor: hizmet sayfasından
 * bölge sayfalarına, bölge sayfalarından da hizmete. 120 bölge sayfası
 * zaten bu hizmetlerden söz ediyordu ama bağlantı vermiyordu; artık
 * "asansörlü nakliyat" araması yapan biri hizmet sayfasından kendi
 * ilçesine, ilçe sayfasından da hizmete geçebiliyor.
 */
import { computed } from 'vue'

const props = defineProps({
  service: { type: Object, required: true },
  /** Bağlantı verilecek öne çıkan bölgeler (hafif kayıtlar). */
  regions: { type: Array, default: () => [] },
  previous: { type: Object, default: null },
  next: { type: Object, default: null },
})

const includes = computed(() =>
  parseJsonArray(props.service?.includes).filter((item) => String(item || '').trim())
)

const faqs = computed(() =>
  parseJsonArray(props.service?.faqs).filter((item) => item?.question && item?.answer)
)

const sections = computed(() =>
  [
    { id: 'kapsam', label: 'Hizmetin kapsamı', show: Boolean(props.service?.content) },
    { id: 'dahil', label: 'Neler dahil', show: includes.value.length > 0 },
    { id: 'bolgeler', label: 'Nerede veriyoruz', show: props.regions.length > 0 },
    { id: 'sss', label: 'Sık sorulanlar', show: faqs.value.length > 0 },
  ].filter((section) => section.show)
)

// Panelden girilen metin varsa o kullanılır. Otomatik metin SAYFAYI tarif
// ediyor, resmi değil — bu yüzden panelde elle yazılması öneriliyor.
const imageAlt = computed(
  () => props.service?.imageAlt?.trim() || `${props.service?.title || 'Hizmet'} çalışmamız`
)
</script>

<template>
  <ui-section tone="surface" labelledby="hizmet-baslik">
    <article class="service">
      <nav class="service__breadcrumb" aria-label="Kırılım yolu">
        <ol>
          <li><NuxtLink to="/">Ana sayfa</NuxtLink></li>
          <li><NuxtLink to="/hizmetlerimiz">Hizmetlerimiz</NuxtLink></li>
          <li aria-current="page">{{ service.title }}</li>
        </ol>
      </nav>

      <header class="service__header">
        <h1 id="hizmet-baslik" class="text-h1 text-ink">{{ service.title }}</h1>
        <p v-if="service.subtitle" class="mt-3 font-medium text-brand-700">
          {{ service.subtitle }}
        </p>
        <p v-if="service.excerpt" class="mt-4 text-pretty text-lead text-ink-muted">
          {{ service.excerpt }}
        </p>
      </header>

      <figure v-if="service.imagePath" class="service__figure">
        <NuxtImg
          format="webp"
          quality="78"
          :src="service.imagePath"
          :alt="imageAlt"
          class="service__img"
          sizes="xs:100vw lg:900px"
          loading="eager"
          fetchpriority="high"
          preload
          decoding="async"
        />
      </figure>

      <nav v-if="sections.length > 1" class="service__toc" aria-label="Bu sayfada">
        <p class="service__toc-title">Bu sayfada</p>
        <ul>
          <li v-for="section in sections" :key="section.id">
            <a :href="`#${section.id}`">{{ section.label }}</a>
          </li>
        </ul>
      </nav>

      <template v-if="service.content">
        <h2 id="kapsam" class="service__section-title">{{ service.title }} Nasıl Yapılıyor?</h2>
        <article-prose :html="service.content" class="service__body" />
      </template>

      <!-- Neler dahil -->
      <section v-if="includes.length" class="service__block" aria-labelledby="dahil">
        <h2 id="dahil" class="service__section-title">{{ service.title }} Hizmetine Neler Dahil?</h2>
        <ul class="service__includes">
          <li v-for="item in includes" :key="item" class="service__include">
            <ui-icon name="check" :size="17" class="service__include-icon" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <!-- Nerede hizmet veriyoruz: hizmet <-> bölge iç bağlantı köprüsü -->
      <section v-if="regions.length" class="service__block" aria-labelledby="bolgeler">
        <h2 id="bolgeler" class="service__section-title">
          {{ service.title }} Hizmeti Verdiğimiz Bölgeler
        </h2>
        <p class="service__block-lead">
          Bu hizmeti Türkiye genelinde veriyoruz. Bölgenizi seçerseniz orada nasıl çalıştığımızı
          ayrıntısıyla okuyabilirsiniz.
        </p>
        <ul class="service__chips">
          <li v-for="region in regions" :key="region.slug">
            <NuxtLink :to="`/${region.slug}`" class="service__chip">
              {{ region.subtitle || region.shortTitle || region.title }}
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink to="/bolgelerimiz" class="service__all-regions">
          Tüm hizmet bölgelerimiz
          <ui-icon name="arrow-right" :size="16" class="nudge-x" />
        </NuxtLink>
      </section>

      <!-- Fiyat aracına köprü — koşulsuz, her hizmet sayfasında. -->
      <p class="service__hesap">
        <base-price-link :label="`${service.title} için tahmini fiyat hesaplayın`" />
      </p>
    </article>

    <div class="service__footer">
      <region-faq
        :items="faqs"
        :title="`${service.title} Hakkında Sık Sorulan Sorular`"
        heading-id="sss"
      />

      <!-- Yazı ve bölge sayfalarındaki gezinmenin aynısı; sıralama hizmetin
           `order` alanından geliyor, yani panelde sürüklenen sıra burada da
           geçerli. -->
      <article-pager-nav :previous="previous" :next="next" kind="hizmet" />
    </div>
  </ui-section>
</template>

<style scoped>
.service {
  --okuma-genisligi: 68ch;
  margin: 0 auto;
  max-width: 52rem;
}

.service__footer {
  margin: 0 auto;
  max-width: 52rem;
}

.service__hesap {
  margin: var(--space-block) 0 0;
}

.service__breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-muted));
}

.service__breadcrumb li + li::before {
  content: '›';
  margin-right: 0.375rem;
  color: rgb(var(--c-ink-subtle));
}

.service__breadcrumb a {
  color: rgb(var(--c-brand-700));
  font-weight: 500;
}

.service__breadcrumb a:hover {
  text-decoration: underline;
}

.service__breadcrumb [aria-current='page'] {
  color: rgb(var(--c-ink));
  font-weight: 600;
}

.service__header {
  margin-top: 1.5rem;
  max-width: var(--okuma-genisligi);
}

.service__figure {
  margin: 2.5rem 0;
  overflow: hidden;
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-lg);
}

.service__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.service__toc {
  margin-bottom: 2.5rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-xl);
  background: rgb(var(--c-surface-muted));
}

.service__toc-title {
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--c-ink-muted));
}

.service__toc ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.service__toc a {
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgb(var(--c-brand-700));
}

.service__toc a:hover {
  text-decoration: underline;
}

.service__section-title {
  max-width: var(--okuma-genisligi);
  margin-bottom: 1.25rem;
  font-size: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.018em;
  color: rgb(var(--c-ink));
  /* Yapışkan menünün altında kalmasın diye çapa hedefine üst boşluk. */
  scroll-margin-top: 6rem;
}

.service__body {
  max-width: var(--okuma-genisligi);
}

.service__block {
  margin-top: var(--space-block);
}

.service__block-lead {
  max-width: var(--okuma-genisligi);
  margin-bottom: 1.25rem;
  color: rgb(var(--c-ink-muted));
  line-height: 1.75;
  text-wrap: pretty;
}

/* --- Neler dahil --- */

.service__includes {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 1.5rem;
  list-style: none;
  border-radius: var(--r-2xl);
  background: rgb(var(--c-surface-muted));
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

.service__include {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  color: rgb(var(--c-ink));
  line-height: 1.6;
}

.service__include-icon {
  flex-shrink: 0;
  margin-top: 0.1875rem;
  color: rgb(var(--c-brand-600));
}

/* --- Bölge etiketleri --- */

.service__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.service__chip {
  display: inline-block;
  padding: 0.4375rem 0.875rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--c-ink));
  transition:
    border-color var(--dur-fast) var(--ease-soft),
    color var(--dur-fast) var(--ease-soft);
}

.service__chip:hover {
  border-color: rgb(var(--c-brand-600) / 0.45);
  color: rgb(var(--c-brand-800));
}

.service__all-regions {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1.25rem;
  font-weight: 600;
  color: rgb(var(--c-brand-700));
}

.service__all-regions:hover {
  text-decoration: underline;
}
</style>

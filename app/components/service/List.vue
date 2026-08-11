<script setup>
/**
 * HİZMETLER DİZİNİ — /hizmetlerimiz sayfasının gövdesi.
 *
 * NEDEN AYRI BİR SAYFA
 * "asansörlü nakliyat", "parça eşya taşıma", "ofis taşıma", "eşya depolama"
 * gibi HİZMET niyetli aramalar, "{yer} evden eve nakliyat" biçimindeki
 * KONUM niyetli aramalardan ayrı bir küme. Site bu küme için tek bir sayfa
 * taşımıyordu; bu ifadeler yalnızca bölge sayfalarının SSS'lerinde geçiyordu.
 *
 * BU SAYFA HANGİ TERİMİ HEDEFLİYOR
 * "evden eve nakliyat hizmetleri" — yani ana hizmetin kendisini burada tam
 * olarak anlatıyoruz. Ana sayfa baş terimi ("evden eve nakliyat"), 120 bölge
 * sayfası konum biçimini hedeflediği için AYRICA bir /evden-eve-nakliyat
 * sayfası açılmadı: aynı terim için üçüncü bir sayfa, Google'ın hangisini
 * sıralayacağına karar verememesine ve üçünün de zayıflamasına yol açardı
 * (anahtar kelime yamyamlığı).
 *
 * SAYFASI OLMAYAN HİZMETLER
 * `slug` boş olan hizmetler yine kart olarak listeleniyor ama bağlantı
 * üretilmiyor. Var olmayan bir sayfaya bağlantı vermek hem ziyaretçiyi
 * 404'e götürür hem tarama bütçesini boşa harcar.
 */
import { computed } from 'vue'

const props = defineProps({
  services: { type: Array, default: () => [] },
  heading: { type: String, default: 'Nakliyat Hizmetlerimiz' },
  description: { type: String, default: '' },
})

const items = computed(() =>
  [...props.services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
)
</script>

<template>
  <ui-section tone="surface" labelledby="hizmetler-dizin-baslik">
    <ui-heading
      id="hizmetler-dizin-baslik"
      eyebrow="Hizmetlerimiz"
      :title="heading"
      :description="description"
      align="split"
    />

    <base-empty-state
      v-if="!items.length"
      message="Hizmetler yakında burada listelenecek."
    />

    <ul v-else class="service-grid">
      <li v-for="(service, index) in items" :key="service.id || index">
        <ui-card as="article" padding="none" interactive class="service-tile">
          <div class="service-tile__media">
            <NuxtImg
              format="webp"
              quality="70"
              :loading="index < 3 ? 'eager' : 'lazy'"
              :fetchpriority="index < 3 ? 'high' : undefined"
              decoding="async"
              sizes="xs:100vw sm:50vw lg:380px"
              class="service-tile__img"
              :src="service.imagePath || '/img/default-blog.jpg'"
              :alt="service.imageAlt?.trim() || `${service.title} hizmeti`"
            />
          </div>

          <div class="service-tile__body">
            <h3 class="service-tile__title">
              <NuxtLink v-if="service.slug" :to="`/${service.slug}`" class="service-tile__link">
                {{ service.title }}
              </NuxtLink>
              <template v-else>{{ service.title }}</template>
            </h3>

            <p v-if="service.subtitle" class="service-tile__subtitle">{{ service.subtitle }}</p>

            <p v-if="service.excerpt || service.description" class="service-tile__excerpt">
              {{ service.excerpt || service.description }}
            </p>

            <span v-if="service.slug" class="service-tile__more" aria-hidden="true">
              Ayrıntılı bilgi
              <ui-icon name="arrow-right" :size="15" class="nudge-x" />
            </span>
          </div>
        </ui-card>
      </li>
    </ul>
  </ui-section>
</template>

<style scoped>
.service-grid {
  display: grid;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
}

.service-grid > li {
  display: flex;
}

.service-grid > li > * {
  width: 100%;
}

.service-tile {
  position: relative; /* `.service-tile__link::after` bunu kapsayıcı alır */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.service-tile__media {
  overflow: hidden;
}

.service-tile__img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out);
}

.service-tile:hover .service-tile__img {
  transform: scale(1.05);
}

/* Tailwind yardımcı sınıfı kullanılmıyor: scoped stiller Tailwind'den SONRA
   enjekte ediliyor ve eşit özgüllükte kazanıyor; ikisini karıştırmak dar
   ekran kurallarında sessiz çakışmalara yol açıyor. */
.service-tile__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem;
}

.service-tile__title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.012em;
  color: rgb(var(--c-ink));
}

.service-tile__link {
  color: inherit;
}

.service-tile__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.service-tile__link:hover {
  color: rgb(var(--c-brand-700));
}

.service-tile__subtitle {
  margin-top: 0.375rem;
  font-weight: 500;
  color: rgb(var(--c-brand-600));
}

/* `ink-subtle` DEĞİL: beyaz zeminde 3.04:1, WCAG AA eşiği 4.5:1. */
.service-tile__excerpt {
  margin-top: 0.75rem;
  color: rgb(var(--c-ink-muted));
  line-height: 1.7;
  text-wrap: pretty;
}

.service-tile__more {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: auto;
  padding-top: 1.25rem;
  color: rgb(var(--c-brand-600));
  font-size: 0.875rem;
  font-weight: 600;
}

@media (prefers-reduced-motion: reduce) {
  .service-tile__img {
    transition: none;
    transform: none !important;
  }
}
</style>

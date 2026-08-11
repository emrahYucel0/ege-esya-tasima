<script setup>
/**
 * BÖLGE KARTI — il ve ilçe listelerinde kullanılan ortak kart.
 *
 * Blog kartıyla aynı görsel dili paylaşıyor (görsel + başlık + özet + alt
 * bant) ama iki yerde bilinçli olarak ayrılıyor:
 *
 * 1. TARİH VE YAZAR YOK. Bir bölge sayfası haber değil; "3 gün önce
 *    yayınlandı" bilgisi ziyaretçiye hiçbir şey söylemez. Yerine, o bölge
 *    hakkında gerçekten karar verdirecek bir bilgi konuyor: ilin kaç ilçe
 *    sayfası olduğu ya da bağlı olduğu coğrafi bölge.
 *
 * 2. BAŞLIK OLARAK `title` DEĞİL `subtitle`. `title` alanı
 *    "Kadıköy Evden Eve Nakliyat" biçiminde; bu metin <h1> ve <title> için
 *    doğru ama 39 kartın yan yana dizildiği bir ızgarada her kartta
 *    "Evden Eve Nakliyat" tekrar eder ve gözün ayırt etmesi gereken tek
 *    kelime (yer adı) kalabalıkta kaybolur. Kartta yalnızca yer adı var.
 */
import { computed } from 'vue'

const props = defineProps({
  region: { type: Object, required: true },
  /** Alt bantta görünen küçük etiket (ör. "Marmara Bölgesi", "39 ilçe") */
  meta: { type: String, default: '' },
  /**
   * Izgaradaki ilk satır dışındaki kartlar tembel yüklenir. Görünür alandaki
   * kartların `lazy` olması LCP'yi geciktiriyor; bunu ızgarayı kuran bileşen
   * bildiği için karar dışarıdan veriliyor.
   */
  eager: { type: Boolean, default: false },
})

/** Kartta yer adı gösterilir; `subtitle` boşsa uzun başlığa düşülür. */
const label = computed(
  () => props.region.subtitle?.trim() || props.region.shortTitle?.trim() || props.region.title
)

const imageAlt = computed(
  () => props.region.imageAlt?.trim() || `${label.value} bölgesinde evden eve nakliyat`
)
</script>

<template>
  <ui-card as="article" padding="none" interactive class="region-card">
    <div class="region-card__media">
      <NuxtImg
        format="webp"
        quality="70"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : undefined"
        decoding="async"
        sizes="xs:100vw sm:50vw lg:340px"
        class="region-card__img"
        :src="region.image || '/img/default-blog.jpg'"
        :alt="imageAlt"
      />
    </div>

    <!--
      Bu blokta Tailwind yardımcı sınıfı KULLANILMIYOR (dolgu, satır kırpma
      vb. hepsi aşağıdaki scoped CSS'te). Sebebi: scoped stiller Tailwind
      yardımcılarından SONRA enjekte ediliyor ve eşit özgüllükte kazanıyor.
      İkisi aynı özelliği paylaşınca dar ekran kuralları sessizce Tailwind'i
      eziyor ya da tam tersi oluyor. Tek yerde tutmak bu belirsizliği
      tamamen kaldırıyor.
    -->
    <div class="region-card__body">
      <h4 class="region-card__title">
        <!-- Yalnızca başlık bağlantı; `::after` tıklama alanını kartın
             tamamına yayıyor. Kartın kendisi bağlantı yapılsaydı içine
             ileride ikinci bir bağlantı eklenemezdi. -->
        <NuxtLink :to="`/${region.slug}`" class="region-card__link">{{ label }}</NuxtLink>
      </h4>

      <p v-if="region.excerpt" class="region-card__excerpt">{{ region.excerpt }}</p>

      <div class="region-card__footer">
        <span v-if="meta" class="region-card__meta">{{ meta }}</span>
        <span class="region-card__more" aria-hidden="true">
          İncele
          <ui-icon name="arrow-right" :size="15" class="nudge-x" />
        </span>
      </div>
    </div>
  </ui-card>
</template>

<style scoped>
.region-card {
  position: relative; /* `.region-card__link::after` bunu kapsayıcı alır */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.region-card__media {
  overflow: hidden;
}

.region-card__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out);
}

.region-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem;
}

.region-card__title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.008em;
  color: rgb(var(--c-ink));
}

.region-card__excerpt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  margin: 0.5rem 0 1rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgb(var(--c-ink-muted));
  text-wrap: pretty;
}

.region-card:hover .region-card__img {
  transform: scale(1.05);
}

.region-card__link {
  color: inherit;
}

.region-card__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.region-card__link:hover {
  color: rgb(var(--c-brand-700));
}

.region-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.875rem;
  border-top: 1px solid rgb(var(--c-line));
}

/* `ink-subtle` DEĞİL: beyaz zeminde 3.04:1, WCAG AA eşiği 4.5:1. */
.region-card__meta {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8125rem;
  color: rgb(var(--c-ink-muted));
}

.region-card__more {
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
  flex-shrink: 0;
  color: rgb(var(--c-brand-600));
  font-size: 0.8125rem;
  font-weight: 600;
}

/*
 * DAR EKRANDA YATAY KART
 *
 * Dikey kart tek sütuna düştüğünde her kart ~470px yer kaplıyordu; 81 il
 * kartı mobilde 37.900 piksellik bir sayfa demekti (ölçüldü). Küçük bir
 * küçük resim + yanında metin düzeni kartı ~120 piksele indiriyor ve aynı
 * liste üçte birinden kısa oluyor. Kart sayısını azaltmak (sayfalama)
 * yerine bu yol seçildi: her il ana dizinden doğrudan bağlantı almaya
 * devam ediyor.
 */
@media (max-width: 39.9375rem) {
  .region-card {
    flex-direction: row;
    align-items: stretch;
  }

  .region-card__media {
    flex: 0 0 7rem;
  }

  .region-card__img {
    height: 100%;
    aspect-ratio: auto;
  }

  .region-card__body {
    min-width: 0; /* uzun kelimeler kartı taşırmasın */
    padding: 0.875rem 1rem;
  }

  .region-card__title {
    font-size: 1rem;
  }

  .region-card__excerpt {
    -webkit-line-clamp: 2;
    line-clamp: 2;
    margin: 0.375rem 0 0.75rem;
    font-size: 0.8125rem;
  }

  .region-card__footer {
    padding-top: 0.625rem;
  }
}
</style>

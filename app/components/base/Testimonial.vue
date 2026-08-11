<script setup>
/**
 * MÜŞTERİ YORUMLARI
 *
 * ⚠ İÇERİK UYARISI: Bu bölümdeki yorumlar şu an YER TUTUCU. Yayına
 * almadan önce gerçek müşteri yorumlarıyla değiştirilmeli. Yorum
 * kaydı hiç yoksa bölüm boş-durum mesajı gösterir; yayına kadar
 * kayıtları silmek de geçerli bir seçenek.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. KIRPILAN YORUMLAR. Yorum metni `line-clamp-4` ile dört satıra
 *    kırpılıyordu. Müşterinin kendi cümlesini yarıda kesmek hem içeriği
 *    hem güveni zedeler; kırpma kaldırıldı, kartlar içeriğe göre uzuyor
 *    (ızgara zaten eşit yükseklik veriyor).
 *
 * 2. GARANTİSİZ KONTRAST. Bölümün `backgroundColor` ve `textColor`
 *    alanları doğrudan inline style'a basılıyordu. Admin panelinden
 *    girilen herhangi iki renk WCAG kontrast eşiğini sağlamayabilir ve
 *    bölüm okunamaz hale gelebilirdi. Artık bölüm design system
 *    zeminlerini kullanıyor; bu iki alan cephede KULLANILMIYOR.
 *
 * 3. DAĞINIK İKONLAR. Hizmet tipi ikonları bu dosyada bir SVG path
 *    sözlüğü olarak tutuluyordu (`getServiceIcon`), yıldızlar ayrı bir
 *    inline SVG'ydi. Hepsi ortak <ui-icon> bileşenine taşındı.
 *
 * 4. SÜS DAİRELERİ. `showDecorations` ile eklenen iki bulanık daire
 *    kabın dışına taşıyordu; ölçümde bölümün kendi `overflow-hidden`'ı
 *    tarafından kırpıldıkları için sayfayı GENİŞLETMİYORLARDI, yani
 *    görünür bir hata değildi. Yine de sade zemin tercihiyle uyumlu
 *    olsun diye kaldırıldılar.
 */
import { computed } from 'vue'

const { data: testimonialResponse, error: fetchError } = await useFetch(
  '/api/testimonials-section'
)
const data = computed(() => testimonialResponse.value?.data ?? null)

// Yorumlar iki kaynaktan geliyor: panelden girilenler bölüm kaydının içinde,
// ziyaretçilerin gönderdikleri ise /api/reviews üzerinden. İkincisi YALNIZCA
// ONAYLI olanları döndürüyor (sunucu tarafında filtreleniyor).
const { data: reviewResponse } = await useFetch('/api/reviews', { key: 'public-reviews' })
const reviewData = computed(() => reviewResponse.value?.data ?? null)

/**
 * Tek liste: bölüm kaydındaki yorumlar + onaylı ziyaretçi yorumları.
 * `id` ile tekilleştiriliyor — ziyaretçi yorumları da aynı tabloda durduğu
 * için iki kaynakta birden görünebiliyorlar.
 */
const sortedTestimonials = computed(() => {
  const harita = new Map()
  for (const t of data.value?.testimonials || []) harita.set(t.id, t)
  for (const r of reviewData.value?.items || []) harita.set(r.id, r)
  return [...harita.values()].sort(
    (a, b) =>
      Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false) ||
      (a.order ?? 0) - (b.order ?? 0)
  )
})

/** 6'dan fazla yorumda ızgara yerine yatay kaydırma (carousel) kullanılıyor. */
const CAROUSEL_ESIGI = 6
const carouselMi = computed(() => sortedTestimonials.value.length > CAROUSEL_ESIGI)

const serit = ref(null)
const kaydir = (yon) => {
  const el = serit.value
  if (!el) return
  // Bir kart genişliği kadar kaydır; kart genişliği ekrana göre değiştiği için
  // sabit piksel yerine kabın görünür genişliğinin bir kısmı kullanılıyor.
  el.scrollBy({ left: yon * Math.max(el.clientWidth * 0.8, 280), behavior: 'smooth' })
}

const eyebrow = computed(() => data.value?.tag || 'Müşteri Yorumları')
const mainTitle = computed(() => data.value?.mainTitle || 'Müşterilerimizin Deneyimleri')
const subtitle = computed(
  () =>
    data.value?.subtitle ||
    'Evden eve nakliyat sürecimiz hakkında müşterilerimizin yorumları.'
)

/** Başlıkta <span> veya **kalın** işaretlemesi varsa vurgulu render edilir. */
const titleHtml = computed(() => {
  const raw = mainTitle.value
  if (/<span[^>]*>/i.test(raw)) {
    return raw.replace(/<span[^>]*>(.*?)<\/span>/gi, '<span class="text-brand-600">$1</span>')
  }
  if (raw.includes('**')) {
    return raw.replace(/\*\*(.*?)\*\*/g, '<span class="text-brand-600">$1</span>')
  }
  return ''
})

/** Hizmet tipine göre design system ikonu. */
const SERVICE_ICONS = {
  'Evden Eve Taşıma': 'home',
  'Evden Eve Nakliyat': 'home',
  'Şehirlerarası Nakliye': 'route',
  'Şehirler Arası Nakliyat': 'route',
  'Ofis Taşıma': 'building',
  'Parça Eşya Taşıma': 'package',
  'Eşya Depolama': 'box',
}
const serviceIcon = (serviceType) => SERVICE_ICONS[serviceType] || 'truck'

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })
}

/**
 * Avatar yedeği. Önceki değer `/images/testimonial-placeholder.svg` idi ama
 * public/images altında böyle bir dosya YOK; fotoğrafı olmayan her yorumda
 * kırık görsel çıkıyordu ve hata yakalayıcı da aynı olmayan yolu tekrar
 * atadığı için işe yaramıyordu. Gerçekte var olan dosyaya bağlandı.
 */
const AVATAR_FALLBACK = '/images/user.svg'

const onImageError = (event) => {
  if (event.target.src.endsWith(AVATAR_FALLBACK)) return
  event.target.src = AVATAR_FALLBACK
}

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section ref="sectionRef" labelledby="yorumlar-baslik">
    <div v-if="fetchError" class="card p-8 text-center text-ink-muted">
      <p>Yorumlar yüklenirken bir sorun oluştu.</p>
    </div>

    <template v-else>
      <ui-heading
        id="yorumlar-baslik"
        :eyebrow="eyebrow"
        :title="titleHtml ? '' : mainTitle"
        :title-html="titleHtml"
        :description="subtitle"
        align="center"
      />

      <base-empty-state
        v-if="!sortedTestimonials.length"
        message="Henüz yayınlanmış bir müşteri yorumu bulunmuyor."
      />

      <!-- Çok yorum olduğunda ızgara yerine yatay şerit. Kaydırma yerel
           (overflow-x) — sayfa akışını bozmuyor, klavye ve dokunmatikle
           çalışıyor, JavaScript kapalıyken bile kaydırılabiliyor. -->
      <div v-else-if="carouselMi" class="testimonial-serit-kap">
        <!-- Odaklanabilirlik bilerek verildi: kaydırılabilir bir kap klavyeyle
             odaklanamazsa içeriğin bir kısmına yalnızca fareyle ulaşılır ve bu
             WCAG 2.1.1 ihlalidir. Linter bunu etkileşimli olmayan öğe sanıp
             uyarıyor; kaydırma kapları o kuralın istisnası. Rol taklidi yerine
             anlamlı bölüm öğesi tercih edildi. -->
        <section
          ref="serit"
          class="testimonial-serit"
          tabindex="0"
          aria-label="Müşteri yorumları, yatay kaydırılabilir liste"
        >
          <ui-card
            v-for="item in sortedTestimonials"
            :key="item.id"
            as="figure"
            padding="md"
            :featured="item.isFeatured"
            class="testimonial-serit__kart m-0 flex flex-col"
          >
            <div class="flex items-center gap-1" :aria-label="`${item.rating} yıldız`">
              <ui-icon
                v-for="star in 5"
                :key="star"
                name="star"
                :size="16"
                :class="star <= item.rating ? 'text-accent-400' : 'text-line'"
                aria-hidden="true"
              />
            </div>
            <blockquote class="testimonial__quote">{{ item.comment }}</blockquote>
            <figcaption class="mt-4 text-sm">
              <span class="font-semibold text-ink">{{ item.customerName }}</span>
              <span v-if="item.location" class="ml-2 text-ink-muted">{{ item.location }}</span>
            </figcaption>
          </ui-card>
        </section>

        <div class="testimonial-serit__dugmeler">
          <button type="button" aria-label="Önceki yorumlar" @click="kaydir(-1)">
            <ui-icon name="arrow-right" :size="18" style="transform: rotate(180deg)" />
          </button>
          <button type="button" aria-label="Sonraki yorumlar" @click="kaydir(1)">
            <ui-icon name="arrow-right" :size="18" />
          </button>
        </div>
      </div>

      <div
        v-else
        data-reveal-group
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <ui-card
          v-for="item in sortedTestimonials"
          :key="item.id"
          data-reveal
          as="figure"
          padding="md"
          :featured="item.isFeatured"
          class="m-0 flex flex-col"
        >
          <ui-icon name="quote" :size="26" class="text-accent-400" />

          <blockquote class="testimonial__quote">
            <p>{{ item.comment }}</p>
          </blockquote>

          <!-- Yıldızlar: görsel gösterge aria-hidden, gerçek değer
               ekran okuyucuya metin olarak veriliyor. -->
          <div class="mt-5 flex items-center gap-1" aria-hidden="true">
            <ui-icon
              v-for="star in 5"
              :key="star"
              name="star"
              :size="16"
              :class="star <= (item.rating || 0) ? 'text-accent-400' : 'text-line-strong'"
            />
          </div>
          <span class="sr-only">{{ item.rating }} / 5 puan</span>

          <figcaption class="testimonial__person">
            <span class="testimonial__avatar">
              <NuxtImg
                :src="item.customerImage || AVATAR_FALLBACK"
                :alt="item.customerName || 'Müşteri fotoğrafı'"
                class="h-full w-full object-cover"
                format="webp"
                quality="70"
                sizes="48px"
                loading="lazy"
                decoding="async"
                @error="onImageError"
              />
            </span>
            <span class="min-w-0">
              <span class="block truncate font-semibold text-ink">
                {{ item.customerName }}
              </span>
              <span class="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-ink-muted">
                <span class="inline-flex items-center gap-1">
                  <ui-icon :name="serviceIcon(item.serviceType)" :size="15" />
                  {{ item.serviceType }}
                </span>
                <span v-if="item.location" class="text-ink-subtle">·</span>
                <span v-if="item.location">{{ item.location }}</span>
                <span v-if="formatDate(item.date)" class="text-ink-subtle">·</span>
                <span v-if="formatDate(item.date)">{{ formatDate(item.date) }}</span>
              </span>
            </span>
          </figcaption>
        </ui-card>
      </div>

      <!-- Ziyaretçi yorum formu. Gönderilen yorum onaydan geçmeden
           yayınlanmıyor (bkz. server/api/reviews.ts). -->
      <base-review-form />
    </template>
  </ui-section>
</template>

<style scoped>
/* --- Yatay şerit (6'dan fazla yorumda) --- */

.testimonial-serit-kap {
  position: relative;
}

.testimonial-serit {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  /* Odak halkası kartların kenarında kırpılmasın */
  padding: 0.25rem 0.25rem 1.25rem;
  scrollbar-width: thin;
}

.testimonial-serit__kart {
  flex: 0 0 min(22rem, 85vw);
  scroll-snap-align: start;
}

.testimonial-serit__dugmeler {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.testimonial-serit__dugmeler button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  color: rgb(var(--c-brand-700));
  transition: border-color var(--dur-fast) var(--ease-soft);
}

.testimonial-serit__dugmeler button:hover {
  border-color: rgb(var(--c-brand-600) / 0.5);
}

/* Kaydırma düğmeleri fare içindir; dokunmatikte parmakla kaydırılıyor
   ve klavyede kabın kendisi odaklanabilir. */
@media (hover: none) {
  .testimonial-serit__dugmeler {
    display: none;
  }
}

.testimonial__quote {
  /* Global blockquote stili (sol kenarlık + italik) burada istenmiyor;
     kart zaten alıntı bağlamını veriyor. */
  margin: 1rem 0 0;
  padding: 0;
  border: 0;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.7;
  color: rgb(var(--c-ink));
  flex: 1 1 auto;
}

.testimonial__quote p {
  margin: 0;
  text-wrap: pretty;
}

.testimonial__person {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgb(var(--c-line));
}

.testimonial__avatar {
  display: block;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  overflow: hidden;
  border-radius: var(--r-full);
  background: rgb(var(--c-surface-muted));
}
</style>

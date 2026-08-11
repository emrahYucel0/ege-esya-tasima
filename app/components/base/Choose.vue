<script setup>
/**
 * NEDEN BİZ — farkı anlatan uzun metin + 4 özellik kartı + kapanış bandı.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. TAŞAN SÜS. `dots-yellow.svg` 256x224px bir kutuydu ve
 *    `-translate-x-[40%] -translate-y-[350%]` ile kabın çok dışına
 *    taşıyordu. Ölçümde 1024px ve üzeri ekranlarda sayfaya +138px yatay
 *    taşma ekleyen öğeydi (`body { overflow-x: hidden }` yatay çubuğu
 *    gizlediği için gözle fark edilmiyordu). Kaldırıldı.
 *
 * 2. METNİN ÜSTÜNE BİNEN KÖŞE SÜSLERİ. Metin sütununun sol üst ve sağ alt
 *    köşesinde mutlak konumlu iki dekoratif çerçeve parçası vardı
 *    (`-top-4 -left-4 w-16 h-16 border-l-4 border-t-4`). Dar ekranlarda
 *    başlığın ve kapanış cümlesinin üzerine biniyorlardı. Kaldırıldı.
 *
 * 3. SARI ALT ÇİZGİ. `.section-title::after` ile başlığın altına sabit
 *    60x4px sarı bir çubuk çiziliyordu; artık bölüm etiketi (eyebrow)
 *    aynı işi design system diliyle yapıyor.
 *
 * 4. İKON YERİNE FOTOĞRAF. Özelliklerin `iconPath` alanı 48x48px bir
 *    <img> olarak basılıyordu ama veritabanındaki değerler fotoğraf
 *    (.jpg). 48px'e küçültülmüş bir fotoğraf okunmuyor. Çözüm kalıcı:
 *    değer bir vektör ikon (.svg) ise olduğu gibi gösteriliyor, değilse
 *    design system ikonuna düşülüyor. Gerçek ikonlar yüklendiğinde kod
 *    değişmeden otomatik devreye girer.
 */
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (eski "tanımla ve await etmeden çağır" deseni sunucu/istemci
// render'larının birbirini tutmamasına ve hydration mismatch'ine yol
// açıyordu).
const { data: whyChooseUsResponse, error: fetchError } = await useFetch('/api/why-choose-us')
const whyChooseUsData = computed(() => whyChooseUsResponse.value?.data ?? null)
const featuresList = computed(() => whyChooseUsData.value?.features || [])

// Panelden girilen metinlerde marka adı `{marka}` / `{marka'yı}` yer
// tutucusuyla yazılıyor; canlı ad burada konuyor. Önceden ad bu üç alana
// ELLE yazılmıştı ve Site Ayarları'ndan değiştirilince burası eski adda
// kalıyordu. (bkz. utils/marka-metni.ts)
const { brandName } = await useSiteSettings()
const marka = (metin) => markaMetni(metin, brandName.value)

const mainTitle = computed(() => marka(whyChooseUsData.value?.mainTitle))
const shortDescription = computed(() => marka(whyChooseUsData.value?.shortDescription))
const closingStatement = computed(() => marka(whyChooseUsData.value?.closingStatement))
const mainImage = computed(() => whyChooseUsData.value?.mainImage || '/images/nakliye2.jpg')

/**
 * Kapanış görselinin alt metni — varsayılan olarak BOŞ (dekoratif).
 * Görsel, üzerinde koyu perde ve alıntı metni olan bir zemin; taşıdığı bilgi
 * zaten alıntıda yazıyor. `alt=""` olan bir <img> erişilebilirlik ağacından
 * çıkar, bu yüzden ayrıca `aria-hidden` gerekmiyordu — kaldırıldı.
 * Panelden metin girilirse görsel bilinçli olarak anlamlı sayılır.
 * (Aynı gerekçe: components/base/Hero.vue)
 */
const kapanisGorselAlt = computed(() => whyChooseUsData.value?.mainImageAlt?.trim() || '')

// Başlıkta satır sonu varsa dar ekranda kırılma noktası olarak kullanılır.
const titleHtml = computed(() =>
  mainTitle.value.includes('\n')
    ? mainTitle.value.replaceAll('\n', '<br class="block lg:hidden" />')
    : ''
)

/**
 * Özellik sırasına göre yedek ikon. `iconPath` gerçek bir vektör ikon
 * olduğunda bu kullanılmaz.
 */
const FALLBACK_ICONS = ['shield-check', 'award', 'search', 'clock']

const isVectorIcon = (path) => typeof path === 'string' && /\.svg($|\?)/i.test(path)

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section ref="sectionRef" tone="surface" labelledby="neden-biz-baslik">
    <div v-if="fetchError" class="card p-8 text-center text-ink-muted">
      <p>Bölüm verileri yüklenirken bir sorun oluştu.</p>
    </div>

    <template v-else-if="whyChooseUsData">
      <!-- Başlık solda, uzun açıklama sağda: 615 karakterlik metin
           ortalandığında okunması zor bir bloğa dönüşüyor. -->
      <div class="mb-block grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div class="flex flex-col gap-4 lg:col-span-5">
          <span data-reveal="fade" class="eyebrow">Farkımız</span>
          <h2 id="neden-biz-baslik" data-reveal="blur" class="text-h2 text-ink">
            <span v-if="titleHtml" v-html="sanitizeHtml(titleHtml)" />
            <template v-else>{{ mainTitle }}</template>
          </h2>
        </div>
        <p data-reveal class="text-pretty text-ink-muted lg:col-span-7">
          {{ shortDescription }}
        </p>
      </div>

      <!-- 4 özellik: 2x2 ızgara. Her açıklama 160-245 karakter, bu
           genişlikte (~570px) 4-5 satır ediyor. -->
      <div
        v-if="featuresList.length"
        data-reveal-group
        class="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8"
      >
        <div
          v-for="(feature, index) in featuresList"
          :key="feature.id || index"
          data-reveal
          class="flex gap-4"
        >
          <span class="choose-icon" aria-hidden="true">
            <img
              v-if="isVectorIcon(feature.iconPath)"
              :src="feature.iconPath"
              alt=""
              class="h-6 w-6"
              loading="lazy"
            />
            <ui-icon
              v-else
              :name="FALLBACK_ICONS[index % FALLBACK_ICONS.length]"
              :size="24"
            />
          </span>
          <div>
            <h3 class="text-h4 text-ink">{{ feature.title }}</h3>
            <p class="mt-2 text-pretty text-ink-muted">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Kapanış cümlesi: görsel + koyu perde üzerinde tek satırlık
           vurgu. Bölümün `mainImage` alanı burada değerlendiriliyor. -->
      <figure v-if="closingStatement" data-reveal="scale" class="closing mt-block">
        <NuxtImg
          :src="mainImage"
          :alt="kapanisGorselAlt"
          class="closing__img"
          format="webp"
          quality="70"
          sizes="(max-width: 1279px) 100vw, 1280px"
          loading="lazy"
          decoding="async"
        />
        <blockquote class="closing__quote">
          <ui-icon name="quote" :size="28" class="closing__mark" />
          <p>{{ closingStatement }}</p>
        </blockquote>
      </figure>
    </template>

    <div v-else class="card p-8 text-center text-ink-muted">
      <p>Bölüm verisi bulunamadı. Lütfen yönetim panelinden bu bölüm için bir kayıt oluşturun.</p>
    </div>
  </ui-section>
</template>

<style scoped>
.choose-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: var(--r-md);
  background: rgb(var(--c-brand-600) / 0.08);
  color: rgb(var(--c-brand-600));
}

/* ---- Kapanış bandı ------------------------------------------------- */
.closing {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: var(--r-2xl);
  margin: 0;
}

.closing__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

/* Perde: metnin kontrastını fotoğraftan bağımsız garantiye alır.
   (Hero'daki aynı yaklaşım — fotoğraf değişse bile metin okunur kalır.)
   Metin en fazla 52ch genişliğinde ve solda kaldığı için sağ üçte bir
   açık bırakılabiliyor; fotoğraf orada görünür oluyor. */
.closing::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    100deg,
    rgb(var(--c-brand-950) / 0.93) 0%,
    rgb(var(--c-brand-950) / 0.88) 48%,
    rgb(var(--c-brand-900) / 0.6) 76%,
    rgb(var(--c-brand-900) / 0.32) 100%
  );
}

/* Dar ekranda metin bandın tamamını kaplıyor; perde her yerde koyu
   kalmalı, aksi halde alt satırlar fotoğrafın üstüne denk gelir. */
@media (max-width: 767px) {
  .closing::before {
    background: linear-gradient(
      180deg,
      rgb(var(--c-brand-950) / 0.92) 0%,
      rgb(var(--c-brand-950) / 0.88) 100%
    );
  }
}

.closing__quote {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: clamp(1.75rem, 1rem + 3vw, 3.5rem);
  border: 0;
  margin: 0;
  color: rgb(var(--c-ink-inverse));
  font-style: normal;
}

.closing__quote p {
  margin: 0;
  max-width: 52ch;
  font-size: clamp(1.125rem, 1rem + 0.7vw, 1.5rem);
  line-height: 1.5;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.closing__mark {
  flex-shrink: 0;
  margin-top: 0.125rem;
  color: rgb(var(--c-accent-400));
}
</style>

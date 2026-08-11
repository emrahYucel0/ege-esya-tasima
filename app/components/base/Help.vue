<script setup>
/**
 * SÜRECİ KOLAYLAŞTIRIYORUZ — görsel kolaj + hizmet kontrol listesi.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. MAVİ BUTON. Bu dosyanın scoped <style> bloğunda `.btn`,
 *    `.btn-primary` ve hover halleri MAVİ (#3b82f6) olarak yeniden
 *    tanımlanmıştı. Scoped stiller elemana bir data-attribute eklediği
 *    için özgüllükleri global `.btn-primary` kuralından yüksekti ve onu
 *    eziyordu: sitedeki tek mavi öğe buydu. Artık ortak <ui-button>
 *    kullanılıyor, yerel buton stili yok.
 *
 * 2. TAŞAN SÜS. `dots-green.svg` 256x224px bir kutuydu ve
 *    `-translate-x-[40%]` ile kabın dışına taşıyordu; ölçümde
 *    1024px ve üzeri ekranlarda sayfaya +138px yatay taşma ekleyen
 *    öğelerden biriydi. `body { overflow-x: hidden }` yatay çubuğu
 *    gizlediği için gözle fark edilmiyordu ama içerik kırpılıyordu.
 *    Süs tamamen kaldırıldı.
 *
 * 3. SINIF ADI ÇAKIŞMASI. Kolajdaki kutular `class="grid grid-1 …"`
 *    kullanıyordu; `grid` aynı zamanda Tailwind'in `display:grid`
 *    utility'si. Mutlak konumlu bu kutularda tesadüfen zarar vermiyordu
 *    ama bir tuzaktı.
 *
 * 4. KIRILGAN KOLAJ. Üç görsel `w-[66.666%] h-[77.777%]`,
 *    `left-[48.148%]` gibi mutlak yüzdelerle konumlanıyordu ve mobilde
 *    kabın yüksekliği ayrı bir media query ile 300px'e sabitleniyordu.
 *    Yerine iki sütunlu CSS grid: hiçbir sabit yüzde yok, her ekranda
 *    kendiliğinden ölçekleniyor.
 *
 * 5. ÖLÜ BAĞLANTI. Buton varsayılanı /hizmetlerimiz idi — o sayfa yok.
 *    Varsayılan /iletisim oldu (canlı veri zaten oraya işaret ediyor).
 */
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (bkz. Services.vue'daki aynı düzeltmenin gerekçesi — eski "tanımla ve
// await etmeden çağır" deseni Vue hydration mismatch'ine ve istemci
// tarafında gereksiz bir ikinci isteğe yol açıyordu).
const { data: weHelpResponse, error: fetchError } = await useFetch('/api/we-help-section')
const weHelpData = computed(() => weHelpResponse.value?.data ?? null)
const featuresList = computed(() => weHelpData.value?.features || [])
const imagesList = computed(() => weHelpData.value?.images || [])

const { brandName } = await useSiteSettings()

const mainTitle = computed(
  () => weHelpData.value?.mainTitle || `${brandName.value}: Taşınma Sürecinizi Kolaylaştırıyoruz`
)
const description = computed(
  () =>
    weHelpData.value?.description ||
    'Taşınma sadece eşyaları bir kamyona yükleyip indirmek değildir. Doğru planlama, doğru ambalaj malzemesi ve doğru ekip bir araya geldiğinde, taşınma gününü stresli değil sakin geçirirsiniz.'
)
const buttonText = computed(() => weHelpData.value?.buttonText || 'Ücretsiz Teklif Al')
const buttonLink = computed(() => weHelpData.value?.buttonLink || '/iletisim')

// Başlıkta satır sonu varsa dar ekranda kırılma noktası olarak kullanılır.
// UiHeading içeriği sanitizeHtml'den geçirdiği için ham veri güvenli.
const titleHtml = computed(() =>
  mainTitle.value.includes('\n')
    ? mainTitle.value.replaceAll('\n', '<br class="block lg:hidden" />')
    : ''
)

const defaultFeatures = [
  { text: 'Ücretsiz Ekspertiz ve Detaylı Taşınma Planlaması' },
  { text: 'Profesyonel Paketleme ve Özel Ambalaj Malzemeleri' },
  { text: 'Mobilya Demontaj ve Montaj Hizmetleri' },
  { text: 'Asansörlü Nakliyat İmkanı (Yüksek Katlarda)' },
  { text: 'Sigortalı ve Kayıt Altında Takip Edilebilir Taşımacılık' },
]

const displayFeatures = computed(() =>
  featuresList.value.length > 0 ? featuresList.value : defaultFeatures
)

/** Kolajdaki üç yuva; veri yoksa aynı varsayılan görsele düşer. */
const collage = computed(() => {
  const byPosition = (position, fallbackAlt) => {
    const found = imagesList.value.find((image) => image.position === position)
    return {
      src: found?.imagePath || '/images/nakliye2.jpg',
      alt: found?.altText || fallbackAlt,
    }
  }
  return {
    main: byPosition('grid-1', `${brandName.value} profesyonel eşya paketleme çalışması`),
    top: byPosition('grid-2', `${brandName.value} ambalaj detayı`),
    bottom: byPosition('grid-3', `${brandName.value} mobilya taşıma süreci`),
  }
})

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section ref="sectionRef" tone="surface" labelledby="kolaylik-baslik">
    <div v-if="fetchError" class="card p-8 text-center text-ink-muted">
      <p>Bölüm verileri yüklenirken bir sorun oluştu.</p>
    </div>

    <div v-else-if="weHelpData" class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <!-- ── Görsel kolajı ───────────────────────────────────────────
           İki sütunlu grid: solda tam yükseklikte ana görsel, sağda üst
           üste iki küçük görsel. Mutlak konumlandırma ve sabit yüzde yok;
           en-boy oranları görseller yüklenmeden yer tuttuğu için CLS 0. -->
      <div data-reveal="left" class="lg:col-span-6">
        <div class="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
          <div class="col-span-3 row-span-2 overflow-hidden rounded-card shadow-float">
            <NuxtImg
              :src="collage.main.src"
              :alt="collage.main.alt"
              class="h-full w-full object-cover"
              format="webp"
              quality="70"
              sizes="xs:55vw lg:340px"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="col-span-2 overflow-hidden rounded-card shadow-float">
            <NuxtImg
              :src="collage.top.src"
              :alt="collage.top.alt"
              class="aspect-[4/3] h-full w-full object-cover"
              format="webp"
              quality="70"
              sizes="xs:36vw lg:220px"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="col-span-2 overflow-hidden rounded-card shadow-float">
            <NuxtImg
              :src="collage.bottom.src"
              :alt="collage.bottom.alt"
              class="aspect-[4/3] h-full w-full object-cover"
              format="webp"
              quality="70"
              sizes="xs:36vw lg:220px"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <!-- ── Metin ─────────────────────────────────────────────────── -->
      <div class="lg:col-span-6">
        <div class="flex flex-col gap-4">
          <span data-reveal="fade" class="eyebrow">Sizin Yerinize Düşünüyoruz</span>
          <h2 id="kolaylik-baslik" data-reveal="blur" class="text-h2 text-ink">
            <span v-if="titleHtml" v-html="sanitizeHtml(titleHtml)" />
            <template v-else>{{ mainTitle }}</template>
          </h2>
          <p data-reveal class="text-pretty text-ink-muted">{{ description }}</p>
        </div>

        <ul data-reveal-group class="mt-8 flex flex-col gap-3">
          <li
            v-for="(feature, index) in displayFeatures"
            :key="feature.id || index"
            data-reveal
            class="flex items-start gap-3"
          >
            <ui-icon name="check-circle" :size="20" class="mt-0.5 text-brand-600" />
            <span class="text-ink">{{ feature.text }}</span>
          </li>
        </ul>

        <div data-reveal class="mt-9">
          <ui-button
            :to="buttonLink"
            variant="primary"
            size="lg"
            magnetic
            trailing-icon="arrow-right"
          >
            {{ buttonText }}
          </ui-button>
        </div>
      </div>
    </div>

    <div v-else class="card p-8 text-center text-ink-muted">
      <p>Bölüm verisi bulunamadı. Lütfen yönetim panelinden bu bölüm için bir kayıt oluşturun.</p>
    </div>
  </ui-section>
</template>

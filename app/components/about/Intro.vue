<script setup>
/**
 * HAKKIMIZDA — giriş: kim olduğumuz + ekip görseli + rakamlar.
 *
 * Bu bölüm, eski `components/navbar/About.vue` dosyasının ilk üçte birinin
 * yerini alıyor. Eski dosyada düzeltilen hatalar:
 *
 * 1. SAYFADA İKİ <h1>. Sayfa başlığı zaten `fixed-page-header` içinde
 *    <h1> olarak basılıyordu; bu bölüm ikinci bir <h1> daha açıyordu.
 *    Belge ana hattı bozuluyor, ekran okuyucu "sayfanın konusu ne?"
 *    sorusuna iki farklı cevap alıyordu. Artık <h2>.
 *
 * 2. ZİYARETÇİYE GÖSTERİLEN YÖNETİM MESAJLARI. Veri yokken sayfada
 *    "Hizmet detayları henüz eklenmemiş." / "İstatistikler henüz
 *    eklenmemiş." / "Hakkımızda verisi bulunamadı. Lütfen yönetim
 *    panelinden…" yazıyordu. Bunlar admin'e söylenecek şeyler; ziyaretçi
 *    için bölüm ya doludur ya da hiç görünmez.
 *
 * 3. ÇELİŞKİLİ İÇERİK. Koda gömülü varsayılanlar sitenin geri kalanıyla
 *    çakışıyordu: sayfa meta'sı "20 yılı aşkın deneyim", metin "2008
 *    yılından bu yana", tarihçe başlığı "15 Yıllık Deneyim", ana sayfa
 *    ise "12+ Yıllık Deneyim" diyordu. İçerik artık veritabanından
 *    geliyor ve ana sayfadaki rakamlarla aynı.
 *
 * 4. HAM RENK PALETİ. `text-gray-800`, `bg-white`, `#3b82f6` (mavi!)
 *    doğrudan yazılıydı; hepsi token'a bağlandı.
 */
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, default: null },
})

const mainTitle = computed(() => props.data?.mainTitle || '')
const paragraphs = computed(() =>
  [props.data?.description1, props.data?.description2, props.data?.description3].filter(
    (text) => text && text.trim()
  )
)
const teamImage = computed(() => props.data?.teamImage || '')
const teamImageAlt = computed(() => props.data?.teamImageAlt || '')
const stats = computed(() => (props.data?.stats || []).filter((stat) => stat.value))

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section ref="sectionRef" tone="surface" labelledby="hakkimizda-baslik">
    <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-6">
        <span data-reveal="fade" class="eyebrow">Biz Kimiz</span>
        <h2 id="hakkimizda-baslik" data-reveal="blur" class="mt-4 text-h2 text-ink">
          {{ mainTitle }}
        </h2>
      </div>

      <div data-reveal-group class="flex flex-col gap-4 lg:col-span-6">
        <p v-for="(text, index) in paragraphs" :key="index" data-reveal class="text-pretty text-ink-muted">
          {{ text }}
        </p>
      </div>
    </div>

    <figure v-if="teamImage" data-reveal="scale" class="about-figure mt-block">
      <NuxtImg
        :src="teamImage"
        :alt="teamImageAlt"
        class="about-figure__img"
        format="webp"
        quality="72"
        sizes="xs:100vw xl:1280px"
        loading="eager"
        decoding="async"
      />
    </figure>

    <!-- Rakamlar: değerler sunucudan NİHAİ hâliyle geliyor, sayma yalnızca
         bir sunum katmanı (bkz. components/ui/StatValue.vue). -->
    <dl v-if="stats.length" data-reveal-group class="about-stats mt-block">
      <div v-for="(stat, index) in stats" :key="stat.id || index" data-reveal class="about-stat">
        <dt class="text-sm font-medium text-ink-muted">{{ stat.label }}</dt>
        <dd class="mt-1 text-stat text-brand-600">
          <ui-stat-value :value="stat.value" />
        </dd>
      </div>
    </dl>
  </ui-section>
</template>

<style scoped>
.about-figure {
  margin: 0;
  overflow: hidden;
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-lg);
}

.about-figure__img {
  display: block;
  width: 100%;
  aspect-ratio: 21 / 9;
  object-fit: cover;
}

@media (max-width: 767px) {
  .about-figure__img {
    aspect-ratio: 4 / 3;
  }
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.5rem;
}

@media (min-width: 768px) {
  .about-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.about-stat {
  position: relative;
  padding-left: 1.25rem;
  border-left: 2px solid rgb(var(--c-brand-600) / 0.25);
}
</style>

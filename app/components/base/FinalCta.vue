<script setup>
/**
 * KAPANIŞ ÇAĞRISI — sayfanın son bandı.
 *
 * NEDEN VAR
 * Ana sayfa daha önce SSS'nin ardından doğrudan footer'a düşüyordu: 10
 * bölüm boyunca kurulan güvenin sonunda net bir "şimdi şunu yapın" cümlesi
 * yoktu. Hero'daki çağrıyı gören ama o an harekete geçmeyen ziyaretçi,
 * sayfanın sonuna geldiğinde ikinci bir fırsat bulamıyordu.
 *
 * VERİ KAYNAĞI — yeni şema YOK
 * Buton metni ve hedefi Hero'nun `primaryButton`/`primaryLink` alanlarından
 * geliyor; yani admin panelinden zaten yönetilebiliyor ve sayfanın başıyla
 * sonu kendiliğinden aynı çağrıyı gösteriyor. Telefon numarası Site
 * Ayarları'ndan okunuyor.
 *
 * İKİNCİ BUTON — koşullu
 * SSS bölümünün yapışkan kartı da "Bize Ulaşın" diyerek /iletisim'e
 * gidiyor. İki bölüm arka arkaya AYNI eylemi tekrarlamasın diye buradaki
 * ikinci buton doğrudan ARAMA eylemi: Site Ayarları'nda telefon girildiği
 * anda görünür, girilmediğinde hiç render edilmez (çalışmayan bir tel:
 * bağlantısı göstermek yerine).
 */
import { computed } from 'vue'

// Ortak anahtar — bkz. components/base/Hero.vue'daki gerekçe.
const { data: heroResponse } = await useFetch('/api/hero', { key: 'hero-section' })
const hero = computed(() => heroResponse.value?.data ?? null)

const { settings, brandName } = await useSiteSettings()

const buttonText = computed(() => hero.value?.primaryButton || 'Ücretsiz Keşif Talep Et')
const buttonLink = computed(() => hero.value?.primaryLink || '/iletisim')

const phone = computed(() => settings.value?.phone || settings.value?.mobilePhone || '')
/** tel: bağlantısı için boşluk/parantez temizliği. */
const phoneHref = computed(() => `tel:${phone.value.replace(/[^\d+]/g, '')}`)

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <!-- Koyu zeminde odak halkasını beyaza çeviren `on-dark` sınıfı burada elle
       yazılıyordu; artık `tone="brand"` ile birlikte geliyor
       (bkz. ui/Section.vue) — unutulma ihtimali kalmasın diye tona taşındı. -->
  <ui-section
    ref="sectionRef"
    tone="brand"
    labelledby="kapanis-baslik"
    class="final-cta"
  >
    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      <h2 id="kapanis-baslik" data-reveal="blur" class="text-h2">
        Taşınma gününüzü bugünden planlayalım
      </h2>

      <p data-reveal class="mt-5 text-pretty text-lead text-white/75">
        Ücretsiz keşifle eşyalarınızı yerinde görüyor, size yazılı ve kesin bir
        fiyat veriyoruz. Teklif taşıma gününe kadar geçerli kalır.
      </p>

      <div data-reveal-group class="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <ui-button
          data-reveal
          :to="buttonLink"
          variant="secondary"
          size="lg"
          magnetic
          trailing-icon="arrow-right"
        >
          {{ buttonText }}
        </ui-button>

        <!-- Numara ETİKETİN BAŞINDA: butonun görünen yazısı da o. Önce marka
             adı geliyordu; eşleşme çalışıyordu ama sesle kontrol kullanan
             kişi komutunu söylerken gereksiz gecikme oluşuyordu. -->
        <ui-button
          v-if="phone"
          data-reveal
          :href="phoneHref"
          variant="white-outline"
          size="lg"
          icon="phone"
          :aria-label="`${phone} numarasını ara — ${brandName}`"
        >
          {{ phone }}
        </ui-button>
      </div>
    </div>
  </ui-section>
</template>

<style scoped>
/* Düz koyu bir dikdörtgen yerine merkezden dışa açılan yumuşak bir ışık.
   Tek bir radial-gradient; hareket eden ya da dikkat dağıtan bir öğe yok. */
.final-cta {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.final-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(60% 80% at 50% 0%, rgb(var(--c-brand-600) / 0.45), transparent 70%),
    radial-gradient(40% 60% at 85% 100%, rgb(var(--c-accent-400) / 0.12), transparent 70%);
}
</style>

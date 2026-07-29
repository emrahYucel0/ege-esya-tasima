<script setup>
/**
 * HERO — ana sayfanın ilk ekranı.
 *
 * TASARIM KARARLARI
 *
 * 1. Perde (scrim) yerine YÖNLÜ GRADIENT.
 *    Önceki sürüm arka plan fotoğrafını `bg-primary/50 backdrop-blur-sm` ile
 *    baştan sona örtüyordu: fotoğraf tanınmaz hale geliyor, buna rağmen
 *    metnin kontrastı fotoğrafın hangi bölgeye denk geldiğine göre
 *    değişiyordu. Artık gradient soldan (metnin olduğu yer) koyu başlayıp
 *    sağa doğru açılıyor — hem metin kontrastı GARANTİ (WCAG AA), hem
 *    fotoğraf sağ tarafta görünür kalıyor. Blur tamamen kalktı
 *    (backdrop-blur tam ekran alanda pahalı bir efekttir).
 *
 * 2. Metin ve görsel ayrı katmanlarda.
 *    Görsel kabı iki iç içe elemandan oluşuyor: dıştaki fare parallax'ını
 *    (transform) taşır, içteki clip-reveal animasyonunu. Aynı elemana
 *    verilseydi CSS animasyonu transform'u ezerdi.
 *
 * 3. Giriş animasyonu saf CSS (.enter-*), scroll gözlemcisi YOK.
 *    Hero sayfa açılışında zaten ekranda; gözlemci beklemek gereksiz
 *    gecikme ve "önce görünüp sonra kaybolma" (flash) riski demek.
 *    Başlık .enter-rise kullanır: opaklığa dokunmaz, yalnızca kaydırır —
 *    başlık LCP adayı olduğu için opacity:0 ile başlayan bir animasyon
 *    LCP ölçümünü animasyonun bitişine kadar geciktirirdi.
 *
 * 4. Açıklama KIRPILMIYOR — çünkü artık kırpılacak kadar uzun değil.
 *    Veritabanındaki metin 695 karakterdi ve hero'da 8-11 satır tutuyordu.
 *    İkiye bölündü: kanca cümleleri (223 karakter) burada kaldı, detay
 *    cümleleri (471 karakter) Hero'nun hemen altındaki güven bandına
 *    taşındı (bkz. components/base/TrustBar.vue). Toplam metin birebir
 *    aynı; ana sayfadan tek kelime eksilmedi.
 */
const { data: heroResponse } = await useFetch("/api/hero");
const { brandName } = await useSiteSettings();

const heroData = ref({
  title: "",
  subtitle: "",
  description: "",
  primaryButton: "",
  primaryLink: "",
  secondaryButton: "",
  secondaryLink: "",
  image: "",
  backgroundImage: "",
  ...heroResponse.value?.data,
});

// API'den kayıt gelmezse varsayılanlar
if (!heroResponse.value?.data) {
  heroData.value = {
    title: `${brandName.value} İle`,
    subtitle: "Güvenli ve Profesyonel Nakliyat",
    description:
      "Evden eve taşınma süreci gözünüzde büyümesin. Eşyalarınızı sigortalı, ambalajlı ve uzman ekibimizle yeni adresinize güvenle taşıyoruz.",
    primaryButton: "Ücretsiz Teklif Al",
    primaryLink: "/iletisim",
    secondaryButton: "Hizmetlerimizi Keşfet",
    secondaryLink: "/blog",
    image: "/images/nakliye3.png",
    backgroundImage: "/images/nakliye2.jpg",
  };
}

/**
 * Güven rozetleri — ilk ekranda "bu firmaya neden güveneyim?" sorusuna
 * verilen en kısa cevap. Şu an sabit; hizmet vaadi bildirdikleri için
 * (istatistik/puan DEĞİL) uydurma bir iddia içermezler. İleride admin
 * panelinden yönetilmeleri gerekirse Hero modeline bir alt liste eklenir —
 * kod tabanındaki `defaultServices` / `defaultFaqs` deseniyle aynı mantık.
 */
const trustBadges = [
  { icon: "shield-check", label: "Sigortalı taşıma" },
  { icon: "check-circle", label: "Yazılı sözleşme" },
  { icon: "truck", label: "Kendi araç filomuz" },
];

// Fare parallax'ı: görsel, imleç HERO BOYUNCA gezinirken en fazla 10px
// kayar. Composable dokunmatik cihazlarda ve reduced-motion'da hiç
// devreye girmez.
const heroRef = ref(null);
const imageRef = ref(null);
useMagnetic(imageRef, { strength: 10, area: heroRef });

// Birincil CTA'nın imleci hafifçe çekmesi.
const ctaRef = ref(null);
useMagnetic(ctaRef, { strength: 6 });
</script>

<template>
  <section
    ref="heroRef"
    class="hero relative isolate flex items-center overflow-hidden"
  >
    <!-- Arka plan görseli -->
    <div class="absolute inset-0 -z-10">
      <NuxtImg
        v-if="heroData.backgroundImage"
        :src="heroData.backgroundImage"
        alt=""
        aria-hidden="true"
        class="h-full w-full object-cover object-center"
        provider="imgix"
        format="webp"
        quality="60"
        loading="eager"
        sizes="100vw"
        decoding="async"
        fetchpriority="high"
      />
      <div v-else class="h-full w-full bg-brand-800"></div>

      <!-- Yönlü perde: metin tarafı koyu, fotoğraf tarafı açık.
           Mobilde metin ortalandığı için perde dikey ve daha yoğun. -->
      <div class="hero-scrim absolute inset-0"></div>
    </div>

    <div class="container relative py-16 md:py-20 lg:py-24">
      <div
        class="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12"
      >
        <!-- ── Metin ─────────────────────────────────────────────── -->
        <div class="text-center lg:col-span-7 lg:text-left xl:col-span-6">
          <p class="enter-fade hero-eyebrow">
            <ui-icon name="map-pin" :size="14" />
            <span>Şehir içi ve şehirler arası evden eve nakliyat</span>
          </p>

          <!-- Başlık `text-display` DEĞİL `text-h1` ölçeğinde: veritabanındaki
               gerçek başlık+alt başlık ~90 karakter ve display ölçeğinde
               (72px) sol sütunda 12 satıra çıkıyordu. Alt başlık da H1'in
               içinde kalıyor (anahtar kelime değeri korunsun diye) ama
               tipografik olarak destekleyici satır seviyesine indirildi. -->
          <h1 class="enter-rise mt-6 text-h1 text-white" style="--reveal-i: 1">
            {{ heroData.title || "Evden Eve Nakliyat:" }}
            <span
              class="mt-3 block text-lead font-semibold leading-snug tracking-normal text-accent-300 sm:text-xl"
            >
              {{
                heroData.subtitle ||
                "Hızlı, Güvenilir ve Profesyonel Taşımacılık"
              }}
            </span>
          </h1>

          <p
            class="enter-up mx-auto mt-6 max-w-xl text-lead text-white/85 lg:mx-0"
            style="--reveal-i: 2"
          >
            {{
              heroData.description ||
              "Evden eve taşınma süreci gözünüzde büyümesin. Eşyalarınızı sigortalı, ambalajlı ve uzman ekibimizle yeni adresinize güvenle taşıyoruz."
            }}
          </p>

          <div
            class="enter-up mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            style="--reveal-i: 3"
          >
            <ui-button
              v-if="heroData.primaryLink && heroData.primaryButton"
              ref="ctaRef"
              :to="heroData.primaryLink"
              variant="secondary"
              size="lg"
              trailing-icon="arrow-right"
            >
              {{ heroData.primaryButton }}
            </ui-button>
            <ui-button
              v-if="heroData.secondaryLink && heroData.secondaryButton"
              :to="heroData.secondaryLink"
              variant="white-outline"
              size="lg"
            >
              {{ heroData.secondaryButton }}
            </ui-button>
          </div>

          <!-- Güven rozetleri -->
          <!-- Dar ekranda alt alta: 3 rozeti 375px'e sığdırmaya çalışmak
               hem sıkışık görünüyor hem taşma riski taşıyor. -->
          <ul
            class="enter-up mt-10 flex flex-col items-center gap-3 border-t border-white/15 pt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start"
            style="--reveal-i: 4"
          >
            <li
              v-for="badge in trustBadges"
              :key="badge.label"
              class="flex items-center gap-2 text-sm font-medium text-white/80"
            >
              <ui-icon :name="badge.icon" :size="18" class="text-accent-300" />
              {{ badge.label }}
            </li>
          </ul>
        </div>

        <!-- ── Görsel ────────────────────────────────────────────── -->
        <div class="lg:col-span-5 xl:col-span-6">
          <!-- Dış kap: fare parallax'ı (transform) -->
          <div ref="imageRef" class="hero-visual relative mx-auto max-w-xl lg:max-w-none">
            <!-- İç kap: clip-reveal animasyonu -->
            <div class="enter-clip overflow-hidden rounded-hero shadow-deep" style="--reveal-i: 2">
              <NuxtImg
                v-if="heroData.image"
                :src="heroData.image"
                alt="Profesyonel nakliyat ekibimiz eşyaları paketlerken"
                class="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
                provider="imgix"
                format="webp"
                quality="70"
                loading="eager"
                sizes="(max-width: 1023px) 90vw, 55vw"
                decoding="async"
              />
              <div v-else class="aspect-[4/3] w-full bg-brand-700"></div>
            </div>

            <!-- Cam bilgi kartı: sayısal bir iddia DEĞİL, hizmet vaadi.
                 (Uydurma puan/yorum sayısı yazmıyoruz.) -->
            <div
              class="enter-up hero-glass absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs"
              style="--reveal-i: 5"
            >
              <span class="hero-glass__icon">
                <ui-icon name="search" :size="20" />
              </span>
              <span>
                <strong class="block text-sm font-semibold text-white">
                  Ücretsiz ekspertiz
                </strong>
                <span class="block text-xs leading-snug text-white/75">
                  Eve gelip ölçüyor, net fiyat veriyoruz
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  /* svh: mobil tarayıcı çubuğu açılıp kapandığında yüksekliğin zıplamasını
     engeller. Üst sınır, çok uzun ekranlarda hero'nun absürt büyümemesi
     için. Fallback (svh desteklemeyen tarayıcı) hemen üstte. */
  min-height: 620px;
  min-height: min(88svh, 820px);
}

/* Yönlü perde.
   lg altı: metin ortalı olduğu için perde dikey ve daha yoğun.
   lg üstü: metin solda olduğu için perde soldan sağa açılır. */
.hero-scrim {
  background:
    linear-gradient(
      to bottom,
      rgb(var(--c-brand-950) / 0.82) 0%,
      rgb(var(--c-brand-900) / 0.72) 55%,
      rgb(var(--c-brand-950) / 0.86) 100%
    );
}

@media (min-width: 1024px) {
  .hero-scrim {
    background:
      linear-gradient(
        100deg,
        rgb(var(--c-brand-950) / 0.94) 0%,
        rgb(var(--c-brand-950) / 0.86) 34%,
        rgb(var(--c-brand-900) / 0.55) 62%,
        rgb(var(--c-brand-900) / 0.25) 100%
      );
  }
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4375rem 0.875rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-surface) / 0.1);
  border: 1px solid rgb(var(--c-surface) / 0.18);
  color: rgb(var(--c-surface) / 0.92);
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1;
}

/* Cam kart. backdrop-filter yalnızca bu küçük alanda kullanılıyor —
   tam ekran uygulandığında ciddi bir render maliyeti oluyor. */
.hero-glass {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1.125rem;
  border-radius: var(--r-lg);
  background: rgb(var(--c-brand-950) / 0.55);
  border: 1px solid rgb(var(--c-surface) / 0.16);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(12px);
}

.hero-glass__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-accent-400) / 0.18);
  color: rgb(var(--c-accent-300));
}

/* Görselin altındaki cam kart kabın dışına taştığı için alt boşluk. */
.hero-visual {
  margin-bottom: 1.75rem;
}
</style>

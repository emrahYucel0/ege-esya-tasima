<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showScrollButton = ref(false);

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 400;
};

const scrollToTop = () => {
  // Hareket hassasiyeti olan kullanıcı için anlık atlama; aksi halde yumuşak.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
};

// passive: tarayıcıya "bu dinleyici preventDefault çağırmayacak" der; kaydırma
// bu sayede dinleyiciyi beklemeden ilerler.
onMounted(() => window.addEventListener("scroll", handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const { settings } = await useSiteSettings();

// wa.me sadece rakam ister; Site Ayarları'na +90 532 ... gibi biçimlendirilmiş
// girilse bile buradan temizlenip kullanılıyor.
const whatsAppHref = computed(() => {
  const raw = settings.value?.whatsAppNumber || "905326454289";
  const digitsOnly = raw.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=Merhaba`;
});

// Analitik/takip script'leri sadece production'da VE Site Ayarları'nda
// ilgili ID gerçekten doldurulduğunda enjekte edilir — hem geliştirme
// trafiğinin analytics verisini kirletmemesi hem de ID girilmediğinde
// gereksiz üçüncü taraf istek yapılmaması için.
const isProd = process.env.NODE_ENV === "production";
const analyticsId = settings.value?.googleAnalyticsId || "";
const tagManagerId = settings.value?.googleTagManagerId || "";
const adsenseId = settings.value?.googleAdsenseId || "";

const trackingScripts = [];
const trackingNoscripts = [];

if (isProd && analyticsId) {
  trackingScripts.push(
    { src: `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`, async: true },
    {
      innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analyticsId}');`,
    }
  );
}

if (isProd && tagManagerId) {
  trackingScripts.push({
    innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tagManagerId}');`,
  });
  trackingNoscripts.push({
    tagPosition: "bodyOpen",
    children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${tagManagerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
  });
}

if (isProd && adsenseId) {
  trackingScripts.push({
    src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`,
    async: true,
    crossorigin: "anonymous",
  });
}

/**
 * SEKME İKONU.
 *
 * Panelden özel bir favicon yüklendiyse YALNIZCA o kullanılır. Yüklenmediyse
 * ürettiğimiz set devreye girer: SVG (modern tarayıcı, her boyutta net),
 * 32/16 PNG (eski tarayıcı) ve apple-touch-icon (iOS ana ekran).
 *
 * SVG NEDEN KOŞULLU: Chrome, hem SVG hem PNG bildirildiğinde SVG'yi tercih
 * ediyor. Koşulsuz bıraksaydık yönetici panelden favicon yüklediğinde
 * kendi yüklediği görsel Chrome'da hiç görünmezdi — sessiz ve tuhaf bir hata.
 */
const faviconLinkleri = computed(() => {
  const ozel = settings.value?.favicon?.trim()
  if (ozel) {
    return [{ rel: "icon", href: ozel }]
  }
  return [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  ]
})

useHead({
  link: faviconLinkleri,
  script: trackingScripts,
  noscript: trackingNoscripts,
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <a
      :href="whatsAppHref"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp üzerinden bize yazın"
      class="float-btn float-btn--whatsapp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        width="30"
        height="30"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
        />
      </svg>
    </a>

    <!-- Buton DOM'dan silinip eklenmiyor, yalnızca görünürlüğü değişiyor:
         `v-if` ile oluşturulan bir elemanda CSS geçişi (transition) hiçbir
         zaman çalışmaz — eleman zaten son durumuyla doğuyor. Bu yüzden
         belirme/kaybolma animasyonu tanımlıydı ama hiç görünmüyordu. -->
    <button
      type="button"
      aria-label="Sayfanın başına dön"
      :tabindex="showScrollButton ? 0 : -1"
      :aria-hidden="showScrollButton ? undefined : 'true'"
      class="float-btn float-btn--top"
      :class="{ 'is-visible': showScrollButton }"
      @click="scrollToTop"
    >
      <ui-icon name="arrow-right" :size="24" class="-rotate-90" />
    </button>
  </div>
</template>

<style>
/* ---------------------------------------------------------------------------
   YÜZEN EYLEM BUTONLARI (WhatsApp + başa dön)
   ---------------------------------------------------------------------------
   Buradaki stiller kasıtlı olarak global (scoped değil): iki buton da
   <NuxtLayout>'un dışında, uygulama kökünde duruyor.

   Bu bloktan KALDIRILANLAR ve gerekçeleri:

   • `* { outline: none }` — sitedeki TÜM elemanların odak halkasını yok
     ediyordu. Klavyeyle gezinen kullanıcı nerede olduğunu göremiyordu
     (WCAG 2.4.7 ihlali). Üstelik katmansız (unlayered) yazıldığı için,
     cascade layer kuralları gereği main.css'teki `@layer base` içindeki
     `:focus-visible` kuralını ÖZGÜLLÜKTEN BAĞIMSIZ olarak eziyordu —
     yani odak halkası düzeltmesi hiç devreye girmiyordu.
     `* { margin/padding/box-sizing }` kısmı da gereksizdi: Tailwind
     Preflight bunları zaten ve daha doğru biçimde yapıyor.

   • `body { background: <mermer gradient> }` — token tabanlı zemine
     taşındı (bkz. assets/css/main.css).

   • `.section-title { color: black }` — iki bölümün başlık rengini
     token'ların dışından eziyordu.

   • `blockquote` + sarı tırnak ::before/::after — design system'e taşındı.
   ------------------------------------------------------------------------ */

.float-btn {
  position: fixed;
  right: 1.25rem;
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border: none;
  border-radius: var(--r-full);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: transform var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out),
    opacity var(--dur-base) var(--ease-out),
    visibility var(--dur-base) var(--ease-out);
}

.float-btn:hover {
  transform: translateY(-3px) scale(1.04);
}

.float-btn:active {
  transform: translateY(0) scale(0.97);
}

/* WhatsApp marka rengi — bilinçli olarak paletin dışında bırakıldı, çünkü
   bu butonun tanınırlığı renginden geliyor.
   Parlak yeşil (#25d366) yerine WhatsApp'ın koyu marka yeşilinin bir tonu
   kullanılıyor: beyaz ikon parlak yeşil üzerinde yalnızca 1.9:1 kontrast
   veriyordu — WCAG'ın grafik öğeler için istediği 3:1 eşiğinin bile
   altında. Bu tonda oran 5.2:1, yani metin eşiğini (4.5:1) de geçiyor.
   Ayrıca sitenin koyu yeşil paletiyle çok daha uyumlu duruyor. */
.float-btn--whatsapp {
  bottom: 5.75rem;
  z-index: var(--z-overlay);
  background-color: #0f7a6c;
  color: #fff;
}

.float-btn--whatsapp:hover {
  background-color: #0b6357;
}

.float-btn--top {
  bottom: 1.5rem;
  z-index: var(--z-sticky);
  background-color: rgb(var(--c-brand-600));
  color: rgb(var(--c-ink-inverse));
  /* Görünür olana kadar tıklanamaz ve okuyuculardan gizli. */
  opacity: 0;
  visibility: hidden;
  transform: translateY(0.5rem);
}

.float-btn--top:hover {
  background-color: rgb(var(--c-brand-700));
}

.float-btn--top.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Küçük ekranda biraz daha kenara ve birbirine yakın. */
@media (max-width: 640px) {
  .float-btn {
    right: 0.875rem;
    width: 3rem;
    height: 3rem;
  }

  .float-btn--whatsapp {
    bottom: 4.75rem;
  }

  .float-btn--top {
    bottom: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .float-btn,
  .float-btn:hover,
  .float-btn:active {
    transition: opacity var(--dur-base) linear, visibility var(--dur-base) linear;
    transform: none;
  }
}
</style>

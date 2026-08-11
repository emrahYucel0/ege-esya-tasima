<script setup>
/**
 * NAVBAR — üst iletişim çubuğu + yapışkan ana menü + mobil açılır menü.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. LOGO YERİNE "Logo." YAZIYORDU. Marka alanı `navbarData.logo`'ya
 *    bağlıydı; navbar kaydı veritabanında olmadığı için ekrana literal
 *    olarak "Logo." basılıyordu. Artık sıra: navbar kaydı > Site Ayarları
 *    marka adı. (Footer'da da aynı kaynak kullanılıyor, ikisi artık
 *    birbirini tutuyor.)
 *
 * 2. MASAÜSTÜ MENÜ KIRPILIYORDU. `.custom-navbar-nav` kuralı
 *    (`max-height: calc(100vh - 120px); overflow-y: auto`) MOBİL menü için
 *    yazılmıştı ama sınıf masaüstü listesinde de kullanılıyordu. Sonuç:
 *    masaüstünde <ul> bir kaydırma kabına dönüşüyor ve içeriğini 4px
 *    kırpıyordu — aktif bağlantının altındaki sarı çizginin bir kısmı bu
 *    yüzden kesikti. Kaydırma artık yalnızca mobil menüde.
 *
 * 3. İSTEMCİ TARAFI VERİ ÇEKME → DÜZEN KAYMASI. Veri `onMounted` içinde
 *    `$fetch` ile çekiliyordu; iletişim bilgileri girildiği anda üst çubuk
 *    hydration'dan SONRA belirip sayfanın tamamını aşağı itecekti (aynı
 *    hatanın "Yükleniyor..." şeridi biçimindeki hâlini production
 *    ölçümünde CLS 0.023 olarak yakalamıştık). `useFetch` ile sunucuda
 *    çekiliyor: HTML ilk gelişinde doğru yükseklikte ve arama motorları
 *    iletişim bilgisini görebiliyor.
 *
 * 4. ESC ÇALIŞMIYORDU. Mobil menü açıkken Esc kapatmıyor, kapanınca odak
 *    da kaybolup sayfanın başına düşüyordu. Esc eklendi; menü kapanınca
 *    odak açan butona geri veriliyor (WAI-ARIA "disclosure" deseni).
 *    NOT: bilerek focus trap YAPILMADI — bu bir modal değil, açılır liste;
 *    APG modal olmayan disclosure için tuzak istemiyor, Esc + odağın geri
 *    verilmesi yeterli.
 *
 * 5. EKSİK ARIA. Hamburger butonunda `aria-expanded` vardı ama
 *    `aria-controls` yoktu; menünün id'si de şablondan kalma
 *    "navbarsFurni" idi. Ayrıca `<nav>` etiketi İngilizce
 *    ("Navigation bar") olduğu için ekran okuyucu Türkçe sayfada
 *    "Navigation bar navigasyon" diye anons ediyordu.
 *
 * 6. AKTİF BAĞLANTI YANLIŞTI. `$route.path === link.path` tam eşitlik
 *    arıyordu: /blog/bir-yazi adresindeyken "Blog" bağlantısı aktif
 *    görünmüyordu. Artık ana sayfa dışındaki bağlantılar alt yollarda da
 *    aktif ve `aria-current="page"` veriliyor.
 *
 * 7. ÖLÜ HTML KURALI. Scoped stilde `html { scroll-behavior: smooth }`
 *    vardı; Vue bunu `html[data-v-…]` hâline getirdiği için hiçbir zaman
 *    eşleşmiyordu. Kural zaten assets/css/main.css içinde (ve orada
 *    prefers-reduced-motion istisnasıyla birlikte) doğru şekilde var.
 *
 * 8. ÖLÜ KOD. `pending` / `error` ref'leri (gösterildikleri şeritler
 *    kaldırılmıştı), hiçbir yerden çağrılmayan `defineExpose({
 *    refreshNavbarData })` ve Tailwind'in kendi `.transition-colors`
 *    utility'sini yeniden tanımlayan blok kaldırıldı.
 *
 * 9. SABİT RENKLER. `#3b5d50`, `#f9bf29`, `z-50` gibi değerler doğrudan
 *    yazılıydı; hepsi token'a bağlandı.
 *
 * EKLENEN
 * • Kaydırınca beliren gölge: en üstteyken düz, sayfa kaydıkça navbar
 *   içerikten ayrışıyor. (Şeffaf→opak geçişi BİLEREK yapılmadı: hero'su
 *   koyu olmayan sayfalarda beyaz menü metni okunmaz hâle gelirdi.)
 * • Menüde "teklif al" butonu — metni ve hedefi Hero'nun
 *   `primaryButton`/`primaryLink` alanlarından, yani yeni şema yok ve
 *   admin panelinden zaten yönetiliyor. Yapışkan menüde durduğu için
 *   sayfanın her yerinden erişilebilir.
 */
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'

const { data: navbarResponse } = await useFetch('/api/navbar', { key: 'navbar-section' })
const navbarData = computed(() => navbarResponse.value?.data ?? null)

// Menüdeki teklif butonunun metni/hedefi Hero kaydından geliyor: yeni şema
// gerekmiyor, admin panelinden zaten yönetiliyor ve sayfanın başı, menüsü ve
// kapanışı aynı çağrıyı gösteriyor. Ortak `key` sayesinde Hero ve FinalCta
// ile TEK istek paylaşılıyor.
const { data: heroResponse } = await useFetch('/api/hero', { key: 'hero-section' })
const ctaText = computed(() => heroResponse.value?.data?.primaryButton || 'Ücretsiz Keşif')
const ctaLink = computed(() => heroResponse.value?.data?.primaryLink || '/iletisim')

const { brandName } = await useSiteSettings()
const brandLabel = computed(() => navbarData.value?.logo || brandName.value)

const contact = computed(() => navbarData.value?.contacts?.[0] ?? null)

// Admin bir sosyal medya satırı ekleyip url'siz bırakabiliyor — url'siz kayıt
// gerçek bir bağlantı değil, tıklanamaz "#" href'i ve isimsiz erişilebilir ad
// (aria-label="") üretiyordu. Sadece gerçek url'si olan kayıtlar render edilir.
const validSocialLinks = computed(
  () => navbarData.value?.socialLinks?.filter((social) => social.url) || []
)

/**
 * Üst bilgi çubuğu yalnızca gösterecek bir şey varsa render edilir.
 * İçindeki dört öğenin dördü de gizliyken çubuk boş bir şerit olarak
 * kalıyordu.
 */
const hasTopBarContent = computed(() =>
  Boolean(
    contact.value?.phone ||
      contact.value?.mail ||
      contact.value?.address ||
      validSocialLinks.value.length
  )
)

const telHref = (value) => `tel:${String(value).replace(/[^\d+]/g, '')}`

/**
 * Sıra bilinçli: "Hizmetlerimiz" ve "Bölgelerimiz" ticari olarak en değerli
 * iki bölüm, bu yüzden menünün ortasında yan yana duruyorlar. Hizmet
 * niyetli aramalar ("asansörlü nakliyat") konum niyetli aramalardan ayrı
 * bir küme; ikisinin de menüde kendi girişi var.
 */
const NAV_LINKS = [
  { path: '/', title: 'Anasayfa' },
  { path: '/hakkimizda', title: 'Hakkımızda' },
  { path: '/hizmetlerimiz', title: 'Hizmetlerimiz' },
  { path: '/bolgelerimiz', title: 'Bölgelerimiz' },
  { path: '/blog', title: 'Blog' },
  { path: '/iletisim', title: 'İletişim' },
]

const route = useRoute()

/** Ana sayfa tam eşleşme ister; diğerleri alt yollarında da aktiftir. */
const isActive = (path) =>
  path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`)

// ---- Mobil menü ----------------------------------------------------------
const MENU_ID = 'mobil-menu'
const isMenuOpen = ref(false)
const togglerRef = ref(null)
const navRef = ref(null)

const closeMenu = ({ restoreFocus = false } = {}) => {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  if (restoreFocus) togglerRef.value?.focus()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

watch(() => route.path, () => closeMenu())

// ---- Kaydırma durumu -----------------------------------------------------
// Sayfa en üstteyken navbar düz; kaydıkça gölgeyle içerikten ayrışıyor.
const isScrolled = ref(false)

const onScroll = () => {
  isScrolled.value = window.scrollY > 8
}

const onKeydown = (event) => {
  if (event.key === 'Escape') closeMenu({ restoreFocus: true })
}

const onPointerDown = (event) => {
  if (navRef.value && !navRef.value.contains(event.target)) closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerDown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
  <!-- ── Üst iletişim çubuğu ───────────────────────────────────────────
       `v-if`: içindeki her öğe kendi koşuluna sahipti ama ÇUBUĞUN KENDİSİ
       koşulsuzdu; veri girilmediğinde sayfanın tepesinde bomboş bir yeşil
       şerit kalıyordu. -->
  <div v-if="hasTopBarContent" class="topbar">
    <div class="container flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
      <ul class="flex flex-wrap items-center gap-x-5 gap-y-1">
        <li v-if="contact?.phone">
          <a :href="telHref(contact.phone)" class="topbar__item">
            <ui-icon name="phone" :size="14" />
            <span>{{ contact.phone }}</span>
          </a>
        </li>
        <li v-if="contact?.mail">
          <a :href="`mailto:${contact.mail}`" class="topbar__item">
            <ui-icon name="mail" :size="14" />
            <span>{{ contact.mail }}</span>
          </a>
        </li>
        <li v-if="contact?.address" class="topbar__item">
          <ui-icon name="map-pin" :size="14" />
          <span>{{ contact.address }}</span>
        </li>
      </ul>

      <ul v-if="validSocialLinks.length" class="flex items-center gap-4">
        <li v-for="social in validSocialLinks" :key="social.id">
          <a
            :href="social.url"
            class="topbar__item"
            :aria-label="`Bizi ${social.name || 'sosyal medya'} üzerinden takip edin`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <base-social-icon :name="social.name" class="h-4 w-4" />
          </a>
        </li>
      </ul>
    </div>
  </div>

  <!-- ── Ana menü ──────────────────────────────────────────────────────
       aria-label Türkçe: eskisi "Navigation bar" olduğu için ekran okuyucu
       "Navigation bar navigasyon" diye anons ediyordu. -->
  <nav ref="navRef" class="navbar" :class="{ 'is-scrolled': isScrolled }" aria-label="Ana menü">
    <div class="container flex items-center justify-between gap-4">
      <!-- Sembol + yazı. Sembol `currentColor` kullandığı için buradaki
           beyaz metin rengini alıyor; ayrı bir "koyu zemin sürümü" dosyası
           gerekmiyor (bkz. base/Logo.vue). -->
      <NuxtLink to="/" class="navbar__brand">
        <base-logo :size="30" />
        <span>{{ brandLabel }}<span class="navbar__brand-dot">.</span></span>
      </NuxtLink>

      <!-- Masaüstü menü -->
      <ul class="navbar__list">
        <li v-for="link in NAV_LINKS" :key="link.path">
          <NuxtLink
            :to="link.path"
            class="navbar__link"
            :class="{ 'is-active': isActive(link.path) }"
            :aria-current="isActive(link.path) ? 'page' : undefined"
          >
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <!--
          `xl:` (1280px) — `lg:` DEĞİL. Menü 6 bağlantıya çıkınca marka +
          bağlantılar + bu buton 1024px'lik kapsayıcıya sığmıyor ve sayfada
          yatay taşma oluşuyordu (ölçüldü: +45px, bağlantılar sıkıştırılınca
          +17px).

          Bağlantıları daha da daraltıp sığdırmak mümkündü ama kalıcı
          değildi: buton metni panelden geliyor (Hero → primaryButton), yani
          "Ücretsiz Keşif" yerine daha uzun bir metin yazıldığında düzeltme
          yeniden bozulurdu. Butonu bu aralıkta gizlemek metin uzunluğundan
          bağımsız çalışıyor.

          Teklif çağrısı bu aralıkta kaybolmuyor: üst bantta telefon ve
          e-posta, her sayfanın altında FinalCTA bölümü, ayrıca sabit
          WhatsApp düğmesi duruyor.
        -->
        <ui-button :to="ctaLink" variant="secondary" size="sm" class="hidden xl:inline-flex">
          {{ ctaText }}
        </ui-button>

        <button
          ref="togglerRef"
          type="button"
          class="navbar__toggler"
          :class="{ 'is-active': isMenuOpen }"
          :aria-expanded="isMenuOpen"
          :aria-controls="MENU_ID"
          :aria-label="isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'"
          @click="toggleMenu"
        >
          <span class="navbar__toggler-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <!-- Mobil menü -->
    <Transition name="menu">
      <div v-if="isMenuOpen" :id="MENU_ID" class="mobile-menu">
        <ul class="mobile-menu__list">
          <li v-for="link in NAV_LINKS" :key="link.path">
            <NuxtLink
              :to="link.path"
              class="mobile-menu__link"
              :class="{ 'is-active': isActive(link.path) }"
              :aria-current="isActive(link.path) ? 'page' : undefined"
              @click="closeMenu()"
            >
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>

        <div class="mobile-menu__footer">
          <ui-button :to="ctaLink" variant="secondary" block @click="closeMenu()">
            {{ ctaText }}
          </ui-button>

          <a v-if="contact?.phone" :href="telHref(contact.phone)" class="mobile-menu__contact">
            <ui-icon name="phone" :size="16" />
            <span>{{ contact.phone }}</span>
          </a>
          <a v-if="contact?.mail" :href="`mailto:${contact.mail}`" class="mobile-menu__contact">
            <ui-icon name="mail" :size="16" />
            <span>{{ contact.mail }}</span>
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* ---- Üst iletişim çubuğu -------------------------------------------- */
.topbar {
  background: rgb(var(--c-brand-800));
  color: rgb(var(--c-ink-inverse) / 0.85);
  padding-block: 0.5rem;
  font-size: 0.8125rem;
}

.topbar ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.topbar__item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: inherit;
  transition: color var(--dur-fast) var(--ease-soft);
}

a.topbar__item:hover {
  color: rgb(var(--c-accent-300));
}

/* ---- Ana menü -------------------------------------------------------- */
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  padding-block: 0.75rem;
  background: rgb(var(--c-brand-600) / 0.92);
  backdrop-filter: blur(8px);
  transition: box-shadow var(--dur-base) var(--ease-soft),
    background-color var(--dur-base) var(--ease-soft);
}

/* Sayfa kaydıkça menü içerikten ayrışır. Şeffaf→opak geçişi bilerek yok:
   hero'su koyu olmayan sayfalarda beyaz menü metni okunmaz olurdu. */
.navbar.is-scrolled {
  background: rgb(var(--c-brand-600) / 0.97);
  box-shadow: var(--shadow-md);
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: rgb(var(--c-ink-inverse));
  /* Uzun marka adları dar ekranda menü düğmesini itmesin. */
  min-width: 0;
}

.navbar__brand > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navbar__brand-dot {
  color: rgb(var(--c-accent-300));
}

@media (min-width: 640px) {
  .navbar__brand {
    font-size: 1.5rem;
  }
}

.navbar__list {
  display: none;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (min-width: 1024px) {
  .navbar__list {
    display: flex;
  }
}

/*
 * 1024–1279 ARALIĞINDA DARALTMA
 *
 * Menü 5 bağlantıyken 479px, 6. bağlantı ("Hizmetlerimiz") eklenince 612px
 * oluyor (ölçüldü). Bu aralıkta yazı boyutu ve yatay dolgu bir tık küçülüyor
 * ki bağlantılar rahat sığsın; 1280px ve üzerinde tam ölçüye dönüyor.
 *
 * Asıl taşmayı yaratan teklif butonu ayrıca bu aralıkta gizleniyor
 * (bkz. şablondaki `xl:inline-flex` notu) — buradaki daraltma tek başına
 * yeterli değildi ve buton metni panelden değiştirilebildiği için kalıcı
 * bir çözüm de olmazdı.
 */
@media (min-width: 1024px) and (max-width: 1279px) {
  .navbar__link {
    padding-inline: 0.4375rem;
    font-size: 0.9375rem;
  }

  .navbar__link::after {
    left: 0.4375rem;
    right: 0.4375rem;
  }
}

.navbar__link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  color: rgb(var(--c-ink-inverse));
  font-weight: 500;
  transition: color var(--dur-fast) var(--ease-soft);
}

/* Alt çizgi: eskiden her bağlantının içine ayrı bir <span> konuyordu.
   Pseudo-element aynı işi işaretleme kalabalığı olmadan yapıyor. */
.navbar__link::after {
  content: "";
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.125rem;
  height: 2px;
  border-radius: 2px;
  background: rgb(var(--c-accent-400));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--dur-base) var(--ease-out);
}

/* METİN rengi accent-400 DEĞİL accent-300.
   Ölçüm: accent-400 marka yeşili zeminde 4.36:1 veriyor, WCAG AA normal
   metin eşiği 4.5:1 — aktif menü bağlantısı eşiğin altında kalıyordu.
   accent-300 aynı zeminde 4.9:1. Alt çizgi ve odak halkası accent-400
   kalabiliyor: onlar metin değil, eşikleri 3:1. */
.navbar__link:hover,
.navbar__link.is-active {
  color: rgb(var(--c-accent-300));
}

.navbar__link:hover::after,
.navbar__link.is-active::after {
  transform: scaleX(1);
}

/* ---- Hamburger ------------------------------------------------------- */
/* Gizleme burada, `lg:hidden` ile DEĞİL: scoped stiller Tailwind
   utility'lerinden SONRA enjekte ediliyor ve özgüllükleri eşit olduğu için
   buradaki `display: grid`, `.lg\:hidden`'ın `display: none`'ını eziyordu —
   hamburger butonu masaüstünde de görünüyordu. */
.navbar__toggler {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.navbar__toggler-icon,
.navbar__toggler-icon::before,
.navbar__toggler-icon::after {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: rgb(var(--c-ink-inverse));
  transition: transform var(--dur-base) var(--ease-soft),
    background-color var(--dur-fast) var(--ease-soft);
}

.navbar__toggler-icon {
  position: relative;
}

.navbar__toggler-icon::before,
.navbar__toggler-icon::after {
  content: "";
  position: absolute;
  left: 0;
}

.navbar__toggler-icon::before {
  top: -7px;
}

.navbar__toggler-icon::after {
  top: 7px;
}

.is-active .navbar__toggler-icon {
  background: transparent;
}

.is-active .navbar__toggler-icon::before {
  transform: translateY(7px) rotate(45deg);
}

.is-active .navbar__toggler-icon::after {
  transform: translateY(-7px) rotate(-45deg);
}

@media (min-width: 1024px) {
  .navbar__toggler,
  .mobile-menu {
    display: none;
  }
}

/* ---- Mobil menü ------------------------------------------------------ */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgb(var(--c-brand-700));
  border-top: 1px solid rgb(var(--c-accent-400) / 0.2);
  box-shadow: var(--shadow-lg);
  /* Kaydırma SADECE burada. Eskiden aynı sınıf masaüstü listesinde de
     kullanıldığı için orada da kaydırma kabı oluşuyor ve içeriği 4px
     kırpıyordu. */
  max-height: calc(100svh - 100%);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.mobile-menu__list {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
}

.mobile-menu__link {
  display: block;
  padding: 0.875rem 1.25rem;
  color: rgb(var(--c-ink-inverse));
  font-weight: 500;
  border-left: 3px solid transparent;
  transition: background-color var(--dur-fast) var(--ease-soft),
    color var(--dur-fast) var(--ease-soft);
}

.mobile-menu__link:hover {
  background: rgb(var(--c-ink-inverse) / 0.06);
}

.mobile-menu__link.is-active {
  color: rgb(var(--c-accent-300));
  border-left-color: rgb(var(--c-accent-400));
  background: rgb(var(--c-ink-inverse) / 0.08);
}

.mobile-menu__footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.25rem 1.25rem;
  border-top: 1px solid rgb(var(--c-ink-inverse) / 0.12);
}

.mobile-menu__contact {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(var(--c-ink-inverse) / 0.85);
  font-size: 0.9375rem;
}

.mobile-menu__contact:hover {
  color: rgb(var(--c-accent-300));
}

/* ---- Odak halkası ----------------------------------------------------
   Bilerek sitenin geri kalanından FARKLI renkte: global :focus-visible
   kuralı marka yeşilini kullanıyor, menünün zemini de zaten marka yeşili
   olduğu için o halka görünmezdi. Sarı bu zeminde 4.6:1 kontrast veriyor —
   WCAG 2.2'nin odak göstergesi için istediği 3:1 eşiğinin üzerinde. */
/* Menüdeki teklif butonu SARI; etrafındaki halka `outline-offset` yüzünden
   butonun değil, YEŞİL zeminin üzerine düşüyor. Global yeşil halka orada
   görünmez olurdu, sarı halka da sarı butonun hemen yanında kaybolurdu —
   beyaz ikisinden de ayrışıyor (yeşil zeminde 7.7:1). */
.navbar :deep(.btn:focus-visible),
.mobile-menu :deep(.btn:focus-visible) {
  outline: 2px solid rgb(var(--c-ink-inverse));
  outline-offset: 2px;
}

.navbar__link:focus-visible,
.navbar__toggler:focus-visible,
.navbar__brand:focus-visible,
.mobile-menu__link:focus-visible,
.mobile-menu__contact:focus-visible,
.topbar__item:focus-visible {
  outline: 2px solid rgb(var(--c-accent-400));
  outline-offset: 2px;
}

/* ---- Açılış geçişi --------------------------------------------------- */
.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<script setup>
/**
 * FOOTER
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. MAVİ. Bu dosyanın scoped <style> bloğunda `.text-primary`,
 *    `.bg-primary` ve hover halleri MAVİ (#3b82f6) olarak tanımlanmıştı;
 *    footer'daki her ikon, her bağlantı hover'ı ve marka noktası mavi
 *    çıkıyordu. Help.vue'da düzelttiğim aynı hatanın ikinci kopyası —
 *    sitedeki son mavi öğeler buradaydı. Tamamen kaldırıldı.
 *
 * 2. SAYFAYI GENİŞLETEN KOLTUK. Sağ üstteki dekoratif `sofa.png`,
 *    `absolute right-0 translate-x-8 lg:translate-x-16 -translate-y-16`
 *    ile kabın 64px SAĞINA ve 64px YUKARISINA taşıyordu. Ölçümde sayfanın
 *    tek yatay taşma kaynağı buydu (360-1280px arası her genişlikte
 *    +32/+64px) ve yukarı taşan kısmı bir üstteki bölümün — artık koyu
 *    kapanış bandının — içine 63px giriyordu. Ayrıca bir mobilya mağazası
 *    şablonundan kalmaydı; nakliyat sitesinde anlamı yok. Kaldırıldı;
 *    `overflow: visible !important` hack'i de onunla birlikte gitti.
 *
 * 3. MOBİLYA MAĞAZASI METNİ. Footer açıklamasının varsayılanı "Kaliteli
 *    mobilya ve dekorasyon ürünleriyle yaşam alanlarınızı
 *    güzelleştiriyoruz." idi. Footer kaydı veritabanında HİÇ olmadığı için
 *    canlıda görünen metin buydu.
 *
 * 4. BOŞ SÜTUNLAR. Menü / Bölgelerimiz / Diğer Hizmetler başlıkları
 *    bağlantı olmasa da render ediliyordu; kayıt olmadığı için footer üç
 *    boş başlıktan ibaretti. Artık dolu olan sütun gösteriliyor.
 *
 * 5. İLETİŞİM BİLGİSİ HİÇ GÖRÜNMÜYORDU. Adres/telefon/e-posta yalnızca
 *    Footer kaydından okunuyordu. O kayıt yoksa — ki yok — Site
 *    Ayarları'nda girili bilgiler olsa bile footer'da hiçbir iletişim
 *    bilgisi çıkmıyordu. Artık Footer kaydı > Site Ayarları sırası var.
 *
 * 6. TEPKİSİZ VERİ. `const footerData = ref(null)` bir kez doldurulup
 *    bırakılıyordu; istemci tarafı gezinmede veri sonradan gelirse
 *    güncellenmiyordu. computed'a çevrildi.
 *
 * 7. DAĞINIK İKONLAR. Saat/konum/telefon/zarf ikonları inline SVG olarak
 *    tutuluyordu; ortak <ui-icon> bileşenine taşındı.
 */
import { computed } from 'vue'

const { data: footerResponse, error: fetchError } = await useFetch('/api/footer')
const footerData = computed(() => footerResponse.value?.data ?? null)

if (fetchError.value) {
  console.error('Footer verisi çekilirken hata oluştu:', fetchError.value)
}

const { brandName, settings } = await useSiteSettings()

const description = computed(
  () =>
    settings.value?.footerText ||
    `${brandName.value}, evden eve nakliyat ve şehirler arası taşımacılıkta sigortalı, şeffaf fiyatlı ve zamanında teslimat esasına dayalı hizmet verir.`
)

/** Footer kaydı > Site Ayarları. İkisi de boşsa satır hiç render edilmez. */
const address = computed(() => footerData.value?.address || settings.value?.address || '')
const phone = computed(
  () => footerData.value?.phone || settings.value?.phone || settings.value?.mobilePhone || ''
)
const email = computed(() => footerData.value?.email || settings.value?.email || '')
const workingHours = computed(() => settings.value?.workingHours || '')

const telHref = computed(() => `tel:${phone.value.replace(/[^\d+]/g, '')}`)

/**
 * Sosyal bağlantılar: Footer kaydındakiler öncelikli, yoksa Site
 * Ayarları'ndaki tekil alanlardan kurulur. Admin bir satır ekleyip url'siz
 * bırakabildiği için url'si olmayan kayıt elenir (boş href üretiyordu).
 */
const SETTINGS_SOCIALS = [
  ['facebookUrl', 'Facebook'],
  ['instagramUrl', 'Instagram'],
  ['twitterUrl', 'X'],
  ['linkedinUrl', 'LinkedIn'],
  ['youtubeUrl', 'YouTube'],
]

const socialLinks = computed(() => {
  const fromFooter = (footerData.value?.socialLinks || []).filter((social) => social.url)
  if (fromFooter.length) return fromFooter
  return SETTINGS_SOCIALS.filter(([key]) => settings.value?.[key]).map(([key, name]) => ({
    id: key,
    name,
    url: settings.value[key],
  }))
})

/** Yalnızca dolu sütunlar render edilir. */
const linkColumns = computed(() =>
  [
    { title: 'Hizmetlerimiz', links: footerData.value?.quickLinks || [] },
    { title: 'Bölgelerimiz', links: footerData.value?.regionLinks || [] },
    { title: 'Diğer Hizmetler', links: footerData.value?.blogLinks || [] },
  ].filter((column) => column.links.length)
)

const LEGAL_LINKS = [
  { to: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
  { to: '/kullanim-sartlari', label: 'Kullanım Şartları' },
  { to: '/cerez-politikasi', label: 'Çerez Politikası' },
]

const copyright = computed(
  () =>
    footerData.value?.copyright ||
    settings.value?.copyrightText ||
    `© ${new Date().getFullYear()} ${brandName.value}. Tüm Hakları Saklıdır.`
)
</script>

<template>
  <footer class="footer">
    <div class="container py-section-sm">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- ── Marka + iletişim ──────────────────────────────────────── -->
        <div class="lg:col-span-5">
          <NuxtLink to="/" class="footer__brand">
            <base-logo :size="30" />
            <span>{{ brandName }}<span class="footer__brand-dot">.</span></span>
          </NuxtLink>

          <p class="mt-4 max-w-md text-pretty text-ink-muted">{{ description }}</p>

          <ul class="mt-6 flex flex-col gap-2.5">
            <li v-if="address" class="footer__contact">
              <ui-icon name="map-pin" :size="18" class="footer__contact-icon" />
              <span>{{ address }}</span>
            </li>
            <li v-if="phone" class="footer__contact">
              <ui-icon name="phone" :size="18" class="footer__contact-icon" />
              <a :href="telHref" class="footer__link">{{ phone }}</a>
            </li>
            <li v-if="email" class="footer__contact">
              <ui-icon name="mail" :size="18" class="footer__contact-icon" />
              <a :href="`mailto:${email}`" class="footer__link">{{ email }}</a>
            </li>
            <li v-if="workingHours" class="footer__contact">
              <ui-icon name="clock" :size="18" class="footer__contact-icon" />
              <span>{{ workingHours }}</span>
            </li>
          </ul>

          <!--
            FİYAT ARACI — sabit, veritabanına bağlı DEĞİL.
            Bağlantı sütunları Footer kaydından geliyor ve o kayıt yoksa
            (şu an yok) sütunların tamamı gizleniyor. Araca giden kalıcı
            bir giriş noktasının admin'in bir satır girmesine bağlı olmaması
            gerekiyordu; bu yüzden marka sütununda, koşulsuz duruyor.
          -->
          <p class="mt-6">
            <base-price-link variant="plain" label="Fiyat hesaplama aracı" />
          </p>

          <ul v-if="socialLinks.length" class="mt-6 flex flex-wrap gap-2.5">
            <li v-for="social in socialLinks" :key="social.id">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__social"
                :aria-label="`Bizi ${social.name || 'sosyal medya'} üzerinden takip edin`"
              >
                <base-social-icon :name="social.name" class="h-[18px] w-[18px]" />
              </a>
            </li>
          </ul>
        </div>

        <!-- ── Bağlantı sütunları ────────────────────────────────────── -->
        <nav
          v-if="linkColumns.length"
          class="grid gap-8 sm:grid-cols-3 lg:col-span-7"
          aria-label="Alt bilgi bağlantıları"
        >
          <div v-for="column in linkColumns" :key="column.title">
            <h3 class="footer__heading">{{ column.title }}</h3>
            <ul class="mt-4 flex flex-col gap-2.5">
              <li v-for="link in column.links" :key="link.id">
                <NuxtLink :to="link.url" class="footer__link">{{ link.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <!-- ── Alt bant ────────────────────────────────────────────────── -->
      <div class="footer__bottom">
        <!-- ink-subtle burada KULLANILMIYOR: beyaz üzerinde 3.0:1 kontrast
             veriyor, WCAG AA normal metin eşiği 4.5:1. -->
        <p class="text-sm text-ink-muted">{{ copyright }}</p>
        <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <li v-for="link in LEGAL_LINKS" :key="link.to">
            <NuxtLink :to="link.to" class="footer__link text-sm">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: rgb(var(--c-surface));
  border-top: 1px solid rgb(var(--c-line));
}

.footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: rgb(var(--c-ink));
}

.footer__brand-dot {
  color: rgb(var(--c-accent-400));
}

.footer__heading {
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgb(var(--c-ink));
}

.footer__contact {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  color: rgb(var(--c-ink-muted));
}

.footer__contact-icon {
  flex-shrink: 0;
  margin-top: 0.1875rem;
  color: rgb(var(--c-brand-600));
}

.footer__link {
  color: rgb(var(--c-ink-muted));
  transition: color var(--dur-fast) var(--ease-soft);
}

.footer__link:hover {
  color: rgb(var(--c-brand-700));
}

.footer__social {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-surface-muted));
  color: rgb(var(--c-ink-muted));
  transition:
    background-color var(--dur-fast) var(--ease-soft),
    color var(--dur-fast) var(--ease-soft);
}

.footer__social:hover {
  background: rgb(var(--c-brand-600));
  color: rgb(var(--c-ink-inverse));
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(var(--c-line));
  text-align: center;
}

@media (min-width: 768px) {
  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>

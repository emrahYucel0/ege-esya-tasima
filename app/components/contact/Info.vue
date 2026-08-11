<script setup>
/**
 * İLETİŞİM KANALLARI
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. ⚠ BAŞKASININ TELEFON NUMARASI EKRANDAYDI. Eski şablonda numaralar
 *    yedek değer olarak SABİT yazılmıştı:
 *        :href="`tel:${quoteData?.phoneLabel || '0216 315 38 85'}`"
 *        :href="`tel:${quoteData?.phone || '0532 645 42 89'}`"
 *    Veritabanında `quotes` kaydı hiç olmadığı için ziyaretçinin gördüğü ve
 *    aradığı numaralar bunlardı — şablonla gelen, bu işletmeye ait olmayan
 *    numaralar. Artık hiçbir numara koda gömülü değil: veri yoksa o satır
 *    hiç render edilmiyor. Yanlış numara göstermektense numara
 *    göstermemek doğru davranış.
 *
 * 2. E-POSTA ALANI OLARAK `subtitle` KULLANILIYORDU.
 *        {{ quoteData?.subtitle || settings?.email }}
 *    `subtitle` bir başlık alanı; `mailto:` içine konuyordu. Admin oraya
 *    normal bir alt başlık yazsa sayfada e-posta adresi diye görünecekti.
 *    E-posta artık yalnızca Site Ayarları'ndan geliyor.
 *
 * 3. ÇALIŞMA SAATLERİ İKİ YERDEN GELİYORDU. Burada "Pazartesi-Cuma
 *    08:00-19:00" gibi üç satır SABİT yazılıydı; pages/iletisim.vue ise
 *    ayrıca Site Ayarları'ndaki `workingHours` alanını basıyordu. İkisi
 *    birbirini tutmayabilirdi. Tek kaynak: Site Ayarları.
 *
 * 4. DÖRT ÖLÜ SOSYAL MEDYA BAĞLANTISI. Hepsi `href="#"` idi. Artık
 *    Site Ayarları'ndaki gerçek adreslerden üretiliyor, adres yoksa bölüm
 *    hiç görünmüyor.
 *
 * 5. KONTRAST. Kartlar `bg-primary` üzerine `text-secondary` (yeşil zemin
 *    üzerine sarı) küçük etiket metni kullanıyordu — ölçülen 4.4:1, WCAG AA
 *    eşiği 4.5:1. Kartlar açık zemine alındı.
 */
import { computed } from 'vue'

const props = defineProps({
  quote: { type: Object, default: null },
})

const { settings } = await useSiteSettings()

const telHref = (value) => `tel:${String(value).replace(/[^\d+]/g, '')}`

/**
 * Kanallar veriden üretiliyor; boş olan hiç render edilmiyor.
 * Sıra: Quote kaydı (bu sayfaya özel) > Site Ayarları (site geneli).
 */
const channels = computed(() => {
  const landline = props.quote?.phoneLabel || settings.value?.phone || ''
  const mobile = props.quote?.phone || settings.value?.mobilePhone || ''
  const email = settings.value?.email || ''
  const address = settings.value?.address || ''

  const list = []
  if (landline) {
    list.push({ icon: 'phone', label: 'Telefon', value: landline, href: telHref(landline) })
  }
  if (mobile && mobile !== landline) {
    list.push({ icon: 'phone', label: 'Cep telefonu', value: mobile, href: telHref(mobile) })
  }
  if (email) {
    list.push({ icon: 'mail', label: 'E-posta', value: email, href: `mailto:${email}` })
  }
  if (address) {
    list.push({ icon: 'map-pin', label: 'Adres', value: address, href: null })
  }
  return list
})

const workingHours = computed(() => settings.value?.workingHours || '')

const SETTINGS_SOCIALS = [
  ['facebookUrl', 'Facebook'],
  ['instagramUrl', 'Instagram'],
  ['twitterUrl', 'X'],
  ['linkedinUrl', 'LinkedIn'],
  ['youtubeUrl', 'YouTube'],
]

const socialLinks = computed(() =>
  SETTINGS_SOCIALS.filter(([key]) => settings.value?.[key]).map(([key, name]) => ({
    id: key,
    name,
    url: settings.value[key],
  }))
)

const hasAnything = computed(
  () => channels.value.length || workingHours.value || socialLinks.value.length
)
</script>

<template>
  <div v-if="hasAnything" class="flex flex-col gap-5">
    <ui-card v-if="channels.length" padding="md">
      <h3 class="text-h4 text-ink">İletişim Bilgilerimiz</h3>

      <ul class="mt-5 flex flex-col gap-4">
        <li v-for="channel in channels" :key="channel.label" class="contact-row">
          <span class="contact-row__icon" aria-hidden="true">
            <ui-icon :name="channel.icon" :size="20" />
          </span>
          <span class="min-w-0">
            <span class="block text-sm text-ink-muted">{{ channel.label }}</span>
            <a v-if="channel.href" :href="channel.href" class="contact-row__value">
              {{ channel.value }}
            </a>
            <span v-else class="contact-row__value">{{ channel.value }}</span>
          </span>
        </li>
      </ul>
    </ui-card>

    <ui-card v-if="workingHours" padding="md">
      <h3 class="flex items-center gap-2.5 text-h4 text-ink">
        <ui-icon name="clock" :size="20" class="text-brand-600" aria-hidden="true" />
        Çalışma Saatlerimiz
      </h3>
      <p class="mt-3 text-pretty text-ink-muted">{{ workingHours }}</p>
    </ui-card>

    <ui-card v-if="socialLinks.length" padding="md">
      <h3 class="text-h4 text-ink">Sosyal Medya</h3>
      <ul class="mt-4 flex flex-wrap gap-2.5">
        <li v-for="social in socialLinks" :key="social.id">
          <a
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-social"
            :aria-label="`Bizi ${social.name} üzerinden takip edin`"
          >
            <base-social-icon :name="social.name" class="h-[18px] w-[18px]" />
          </a>
        </li>
      </ul>
    </ui-card>
  </div>
</template>

<style scoped>
.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.contact-row__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--r-md);
  background: rgb(var(--c-brand-600) / 0.08);
  color: rgb(var(--c-brand-600));
}

.contact-row__value {
  display: block;
  font-size: 1.0625rem;
  font-weight: 600;
  color: rgb(var(--c-ink));
  overflow-wrap: anywhere;
}

a.contact-row__value {
  transition: color var(--dur-fast) var(--ease-soft);
}

a.contact-row__value:hover {
  color: rgb(var(--c-brand-700));
}

.contact-social {
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

.contact-social:hover {
  background: rgb(var(--c-brand-600));
  color: rgb(var(--c-ink-inverse));
}
</style>

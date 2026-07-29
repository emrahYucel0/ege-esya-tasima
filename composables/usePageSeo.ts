// composables/usePageSeo.ts
// Sayfa seviyesinde meta/OG/canonical yönetiminin TEK giriş noktası.
//
// Neden bu composable var: bölüm bileşenleri (Pricing.vue, Testimonial.vue,
// navbar/About.vue vb.) daha önce kendi useHead/useSeoMeta çağrılarını
// yapıyordu. Vue/unhead tekil etiketleri (title, meta[name=description])
// "son kayıt kazanır" mantığıyla çözdüğü için, sayfanın KENDİ meta verisi
// alt bileşenler tarafından sessizce eziliyordu — admin panelden girilen
// başlık/açıklama hiçbir zaman siteye yansımıyordu. Kural: useSeoMeta/useHead
// SADECE `pages/*.vue` içinden, SADECE bu composable üzerinden çağrılmalı.
//
// Öncelik sırası (en yükseğe en düşük): admin panelden bu sayfa için
// girilen Meta kaydı > çağıranın verdiği sayfaya özgü varsayılan >
// Site Ayarları'ndaki site geneli varsayılan.
export interface PageSeoFallback {
  title: string
  description: string
  image?: string
}

export interface PageSeoOptions {
  /** Paylaşılan bölüm bileşeni (örn. Region.vue) kendi canonical/prev/next
   * mantığını yönetiyorsa, çakışmaması için burada canonical atlanır. */
  skipCanonical?: boolean
}

export async function usePageSeo(pageKey: string, fallback: PageSeoFallback, options: PageSeoOptions = {}) {
  const { settings, brandName, siteUrl, ogImage: siteOgImage, metaDescriptionDefault, socialLinks } =
    await useSiteSettings()

  const { data: metaResponse } = await useAsyncData(`meta-${pageKey}`, async () => {
    const response = await $fetch<{ success: boolean; data: { title?: string; description?: string } | null }>(
      `/api/meta?page=${pageKey}`
    )
    return response?.data ?? null
  })

  const title = computed(() => metaResponse.value?.title || fallback.title)
  const description = computed(
    () => metaResponse.value?.description || fallback.description || metaDescriptionDefault.value
  )
  const image = computed(() => fallback.image || siteOgImage.value)

  const route = useRoute()
  const canonicalUrl = computed(() => `${siteUrl.value}${route.path}`)

  useSeoMeta({
    title,
    description,
    keywords: () => settings.value?.metaKeywords || undefined,
    author: brandName,
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: canonicalUrl,
    ogSiteName: brandName,
    ogLocale: 'tr_TR',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    robots: 'index, follow',
  })

  if (!options.skipCanonical) {
    useHead({
      link: [{ rel: 'canonical', href: canonicalUrl }],
    })
  }

  return { settings, brandName, siteUrl, title, description, image, canonicalUrl, socialLinks }
}

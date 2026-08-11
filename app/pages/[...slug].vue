<script setup>
/**
 * YAZI VE BÖLGE DETAY SAYFASI
 *
 * YÖNLENDİRME DEĞİŞMEDİ. Hem blog yazıları hem hizmet bölgeleri KÖK
 * adreste yayınlanıyor — /blog/... veya /bolgelerimiz/... öneki yok:
 *     /evden-eve-nakliyat-fiyatlari-neye-gore-belirlenir
 *     /kadikoy-evden-eve-nakliyat
 * Gelen slug ile iki tabloya birden bakılıyor; hangisi eşleşirse onun
 * görünümü render ediliyor, ikisi de eşleşmezse gerçek bir 404 dönülüyor
 * (soft 404 değil — Search Console bunu hatalı sayfa olarak işaretler).
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. ⚠ SAYFA BAŞLIĞI YANLIŞTI. `<title>` etiketi yazının BAŞLIĞINI değil
 *    ALT BAŞLIĞINI kullanıyordu:
 *        const title = post.value ? data.subtitle : data.shortTitle
 *    Ölçüm (canlı sayfa):
 *        <title>  Poliçeye bakarken görmeniz gereken maddeler ve …
 *        <h1>     Nakliyat Sigortası Neyi Kapsar, Neyi Kapsamaz?
 *    Google arama sonuçlarında gösterdiği metin `<title>`. Yani 15 yazının
 *    tamamı aramada yanlış başlıkla çıkacaktı. Artık başlık gerçek
 *    başlıktan geliyor, marka adı da sonuna ekleniyor.
 *
 * 2. YAPISAL VERİ YOKTU. Yazılar için Article/BlogPosting şeması hiç
 *    üretilmiyordu; blog listesi sayfasında `Blog` şeması var ama
 *    yazıların kendisinde yoktu.
 *
 * 3. HAM HATA MESAJI ZİYARETÇİYE GÖSTERİLİYORDU
 *    ("Post yüklenirken hata: {{ postError.message }}"). Teknik ayrıntı
 *    artık konsola gidiyor.
 *
 * 4. 744 SATIRLIK TEK DOSYA. Yazı ve bölge şablonları, gezinme blokları ve
 *    iki ayrı tipografi tanımı hep buradaydı. Dört bileşene ayrıldı:
 *    article-post-view · article-region-view · article-prose ·
 *    article-pager-nav.
 */
const route = useRoute()
const slug = computed(() => route.params.slug)

const { brandName, siteUrl, ogImage: siteOgImage, settings } = await useSiteSettings()

/**
 * Hizmet/bölge şemalarındaki `provider` düğümü.
 *
 * Önceden yalnızca `name` ve `url` içeriyordu — 130 sayfada işletme
 * düğümü neredeyse boştu. Yerel aramada en çok işe yarayacak sayfalar
 * bunlar; telefon ve adres olmadan Google'a "burada hizmet veren bir
 * firma var" demek dışında bir şey söylemiyorlardı.
 *
 * Boş ayarlar `undefined` bırakılıyor — JSON.stringify onları atıyor.
 */
const saglayici = computed(() => ({
  '@type': 'MovingCompany',
  name: brandName.value,
  url: siteUrl.value,
  telephone: settings.value?.phone || settings.value?.mobilePhone || undefined,
  email: settings.value?.email || undefined,
  address: settings.value?.address
    ? { '@type': 'PostalAddress', streetAddress: settings.value.address, addressCountry: 'TR' }
    : undefined,
  priceRange: settings.value?.priceRange || undefined,
}))

// Dördü birbirinden bağımsız olduğu için paralel çalıştırılıyor; sıralı
// beklemek sunucu yanıt süresini (dolayısıyla LCP'yi) ~4 katına çıkarıyordu.
const [
  { data: postData, error: postError },
  { data: regionData, error: regionError },
  { data: allRegionsData },
  { data: allPostsData },
  { data: servicesData },
] = await Promise.all([
  useFetch(`/api/posts?slug=${slug.value}`),
  useFetch(`/api/regions?slug=${slug.value}`),
  // "İlgili bölgeler" / gezinme listeleri için sadece slug/başlık/görsel
  // gibi hafif alanlar gerekiyor — ?light=true ağır `content` sütununu
  // sorgudan tamamen çıkarır.
  useFetch('/api/regions?light=true'),
  useFetch('/api/posts?light=true'),
  // Hizmetler tek bir bölüm kaydında toplu geliyor; slug ile ayrı bir uç
  // nokta yok. Kayıt sayısı tek haneli olduğu için tamamını çekip burada
  // eşleştirmek, yeni bir API rotası açmaktan daha sade.
  useFetch('/api/services', { key: 'services-section' }),
])

const post = computed(() => (postData.value?.success ? postData.value.data : null))
const region = computed(() => (regionData.value?.success ? regionData.value.data : null))

/**
 * Hizmet sayfaları da yazılar ve bölgeler gibi KÖK adreste yayınlanıyor
 * (/asansorlu-nakliyat). Eşleşme sırası: yazı → bölge → hizmet.
 *
 * Aynı slug birden fazla türde bulunamaz: yazı ve bölge tablolarında slug
 * zaten UNIQUE, Service.slug sütununa da UNIQUE indeks eklendi. Türler
 * ARASINDA çakışma olursa (ör. "depolama" adlı bir bölge ve bir hizmet)
 * bu sıra hangisinin gösterileceğini belirliyor; böyle bir durumda sayfa
 * sessizce yanlış içeriği göstermek yerine ilk eşleşeni gösterir ve
 * çakışma panelde slug değiştirilerek çözülür.
 */
const service = computed(() => {
  if (post.value || region.value) return null
  const list = servicesData.value?.data?.services || []
  // `route.params.slug` catch-all rotada DİZİ döner (['asansorlu-nakliyat']).
  // Yazı ve bölge sorguları bunu şablon dizesi içinde kullandığı için fark
  // edilmiyordu (dizi otomatik metne çevriliyor); burada doğrudan
  // karşılaştırma yapıldığı için açıkça metne çevrilmesi gerekiyor —
  // aksi hâlde eşleşme hiçbir zaman tutmuyor ve sayfa 404 veriyor.
  const current = String(slug.value)
  return list.find((item) => item.slug && item.slug === current) || null
})

if (postError.value || regionError.value) {
  // Teknik ayrıntı ziyaretçiye GÖSTERİLMEZ.
  console.error('İçerik yüklenemedi:', postError.value || regionError.value)
}

if (!post.value && !region.value && !service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Sayfa Bulunamadı', fatal: true })
}

// ---- Bölge yardımcıları --------------------------------------------------
const allRegions = computed(() => allRegionsData.value?.data || [])

const relatedRegions = computed(() => {
  if (!region.value) return []
  const currentCities = parseCityIds(region.value.cities)
  if (!currentCities.length) return []

  return allRegions.value.filter((other) => {
    if (other.slug === region.value.slug || !other.isActive) return false
    return parseCityIds(other.cities).some((cityId) => currentCities.includes(cityId))
  })
})

// ---- Önceki / sonraki ----------------------------------------------------
const byDate = (list) =>
  [...(list || [])].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

const adjacent = (currentSlug, items) => {
  const index = items.findIndex((item) => item.slug === currentSlug)
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : null,
  }
}

const postNav = computed(() =>
  post.value ? adjacent(post.value.slug, byDate(allPostsData.value?.data)) : {}
)
const regionNav = computed(() =>
  region.value ? adjacent(region.value.slug, byDate(allRegions.value)) : {}
)

// ---- Meta ----------------------------------------------------------------
const content = computed(() => post.value || region.value || service.value)
const canonical = computed(() => `${siteUrl.value}/${content.value?.slug || ''}`)
// Hizmet kaydında görsel alanı `image` değil `imagePath`.
const shareImage = computed(
  () => content.value?.image || content.value?.imagePath || siteOgImage.value
)

/**
 * Hizmet sayfasında bağlantı verilecek bölgeler. Türkiye genelinde 120
 * bölge var; hepsini listelemek sayfayı bir dizine çevirirdi. Bunun yerine
 * İstanbul ilçelerinden ve büyük illerden sınırlı bir seçki gösteriliyor,
 * altında da tüm bölgeler dizinine bağlantı var.
 */
/**
 * Hizmetler arası önceki/sonraki gezinmesi. Yazılarda tarih, bölgelerde de
 * tarih sırası kullanılıyor; hizmetlerde ise panelde belirlenen `order`
 * anlamlı olan tek sıra (hizmetler kronolojik bir akış değil, bir menü).
 */
const serviceNav = computed(() => {
  if (!service.value) return {}
  const list = [...(servicesData.value?.data?.services || [])]
    .filter((item) => item.slug)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const index = list.findIndex((item) => item.slug === service.value.slug)

  /**
   * Yalnızca `slug` ve `title` aktarılıyor — kaydın tamamı DEĞİL.
   * article-pager-nav etiketi `shortTitle → subtitle → title` sırasıyla
   * seçiyor. Hizmetlerde `subtitle` bir slogan ("Dar merdiven ve yüksek
   * katlar için"), kısa ad değil; kaydın tamamı geçilseydi gezinme
   * düğmesinde hizmetin adı yerine sloganı görünürdü.
   */
  const etiketle = (item) => (item ? { slug: item.slug, title: item.title } : null)

  return {
    previous: etiketle(index > 0 ? list[index - 1] : null),
    next: etiketle(index >= 0 && index < list.length - 1 ? list[index + 1] : null),
  }
})

/**
 * Yazı sayfaları için ilgili hizmetler.
 *
 * Ölçüldü: blog yazılarında 120 bölge ve 7 hizmet sayfasına TEK bağlantı
 * yoktu — yazılar konu otoritesi üretip hiçbir yere aktarmıyordu.
 *
 * Eşleştirme yazının başlığı + gövdesinde hizmet adının geçip geçmediğine
 * bakıyor. Karşılaştırma slug'a indirgenerek yapılıyor: "Asansörlü" ile
 * "asansörlü" ve "asansorlu" aynı sayılsın diye (Türkçe büyük/küçük harf
 * dönüşümü `I/ı` yüzünden güvenilmez).
 */
const postServices = computed(() => {
  if (!post.value) return []
  const list = (servicesData.value?.data?.services || []).filter((s) => s.slug)
  const metin = slugify(`${post.value.title || ''} ${post.value.content || ''}`)

  const eslesen = list.filter((s) => {
    const ad = slugify(s.title || '')
    return ad.length > 3 && metin.includes(ad)
  })

  // Hiç eşleşme yoksa yazı yine de yalıtılmış kalmasın: sıradaki ilk üç hizmet.
  const secilen = eslesen.length
    ? eslesen
    : [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).slice(0, 3)

  return secilen.slice(0, 4)
})

/**
 * Yazı sayfaları için bölge etiketleri.
 *
 * Liste her yazıda FARKLI bir yerden başlıyor. Alfabetik ilk 10 alınsaydı 10
 * yazının hepsi aynı bölgelere bağlanır, bağlantı değeri o birkaç sayfada
 * yığılır, kalan 110 bölge sayfası hiç bağlantı almazdı. Başlangıç noktası
 * yazının slug'ından türetiliyor: rastgele değil, aynı yazı her zaman aynı
 * bölgeleri gösteriyor (sunucu ve istemci aynı sonucu üretmek zorunda,
 * yoksa hidrasyon uyuşmazlığı olur).
 */
const postRegions = computed(() => {
  if (!post.value) return []
  const collator = new Intl.Collator('tr-TR')
  const liste = allRegions.value
    .filter((item) => item.isActive && !isProvincePage(item))
    .sort((a, b) => collator.compare(a.subtitle || a.title || '', b.subtitle || b.title || ''))

  if (liste.length === 0) return []

  // Slug'dan deterministik bir sayı
  const tohum = [...String(post.value.slug || '')].reduce((t, c) => t + c.charCodeAt(0), 0)
  const bas = tohum % liste.length

  return Array.from({ length: Math.min(10, liste.length) }, (_, i) => liste[(bas + i) % liste.length])
})

const serviceRegions = computed(() => {
  if (!service.value) return []
  const all = allRegions.value.filter((item) => item.isActive)
  const collator = new Intl.Collator('tr-TR')
  const provinces = all.filter((item) => isProvincePage(item))
  const districts = all.filter((item) => !isProvincePage(item))
  const pick = (list, n) =>
    [...list]
      .sort((a, b) => collator.compare(a.subtitle || a.title || '', b.subtitle || b.title || ''))
      .slice(0, n)
  return [...pick(districts, 12), ...pick(provinces, 12)]
})

useHead(() => {
  const data = content.value
  if (!data) return {}

  /**
   * ARAMA AÇIKLAMASI — `metaDescription` > `excerpt`.
   *
   * `excerpt` dört işi birden yapıyordu: sayfanın giriş paragrafı, kart
   * metni, arama açıklaması ve paylaşım açıklaması. İlk ikisi doğal
   * okunmak ister, son ikisi tıklanma üretmek. Ölçüldü: 120 bölge
   * excerpt'inin HİÇBİRİNDE "evden eve nakliyat" geçmiyordu — yani arama
   * sonucunda ne hizmetin adı ne de tıklamak için bir sebep vardı.
   *
   * Artık ayrı bir alan var; boşsa `excerpt`e düşülüyor, böylece
   * doldurulmamış sayfa açıklamasız kalmıyor.
   */
  const aramaAciklamasi = data.metaDescription || data.excerpt || undefined

  return {
    // Başlık ARTIK gerçek başlıktan geliyor (bkz. dosya başındaki 1. madde).
    title: `${data.title} | ${brandName.value}`,
    meta: [
      { name: 'description', content: aramaAciklamasi },
      { name: 'author', content: brandName.value },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: data.title },
      { property: 'og:description', content: aramaAciklamasi },
      { property: 'og:image', content: shareImage.value },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonical.value },
      { property: 'og:site_name', content: brandName.value },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'canonical', href: canonical.value }],
  }
})

// ---- Yapısal veri --------------------------------------------------------
//
// Bölge sayfalarında üç şema birden üretiliyor ve hepsi TEK bir @graph
// içinde veriliyor. Ayrı ayrı <script> etiketleri de geçerli olurdu, ama
// @graph düğümler arasında `@id` ile ilişki kurmayı mümkün kılıyor ve
// Google'ın Zengin Sonuç Testi'nde tek bir bütün olarak görünüyor.

/** Bölgenin il/ilçe kırılımı — BreadcrumbList için. */
const regionProvince = computed(() => {
  if (!region.value || isProvincePage(region.value)) return null
  const cityId = parseCityIds(region.value.cities)[0]
  const cityName = turkishCities.find((city) => city.id === cityId)?.name
  if (!cityName) return null
  return allRegions.value.find((item) => item.slug === slugify(cityName)) || null
})

const breadcrumbItems = computed(() => {
  const trail = [
    { name: 'Ana sayfa', url: siteUrl.value || '/' },
    { name: 'Bölgelerimiz', url: `${siteUrl.value}/bolgelerimiz` },
  ]
  if (regionProvince.value) {
    trail.push({
      name: regionProvince.value.subtitle || regionProvince.value.title,
      url: `${siteUrl.value}/${regionProvince.value.slug}`,
    })
  }
  trail.push({ name: region.value?.subtitle || region.value?.title, url: canonical.value })
  return trail
})

/**
 * FAQPage — yalnızca gerçekten soru-cevap varsa.
 *
 * Boş bir FAQPage ya da soru/cevabı eksik bir öğe, Search Console'da
 * yapısal veri hatası üretir ve zengin sonuç hakkını tümden kaybettirir.
 * Bu yüzden hem burada hem görünümde aynı filtre uygulanıyor.
 */
const regionFaqs = computed(() =>
  parseJsonArray(region.value?.faqs).filter((item) => item?.question && item?.answer)
)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => {
        const data = content.value
        if (!data) return '{}'

        const shared = {
          headline: data.title,
          description: data.excerpt || undefined,
          image: shareImage.value,
          url: canonical.value,
          publisher: { '@type': 'Organization', name: brandName.value },
        }

        if (post.value) {
          return JSON.stringify({
            '@context': 'https://schema.org',
            ...shared,
            '@type': 'BlogPosting',
            author: { '@type': 'Organization', name: data.author || brandName.value },
            datePublished: data.createdAt || undefined,
            dateModified: data.updatedAt || data.createdAt || undefined,
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical.value },
          })
        }

        // --- Hizmet sayfası ---
        if (service.value) {
          const serviceGraph = [
            {
              '@type': 'Service',
              '@id': `${canonical.value}#hizmet`,
              name: data.title,
              serviceType: data.title,
              description: data.excerpt || data.description || undefined,
              provider: saglayici.value,
              areaServed: { '@type': 'Country', name: 'Türkiye' },
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonical.value}#kirilim`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: siteUrl.value },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Hizmetlerimiz',
                  item: `${siteUrl.value}/hizmetlerimiz`,
                },
                { '@type': 'ListItem', position: 3, name: data.title, item: canonical.value },
              ],
            },
          ]

          const serviceFaqs = parseJsonArray(data.faqs).filter((i) => i?.question && i?.answer)
          if (serviceFaqs.length) {
            serviceGraph.push({
              '@type': 'FAQPage',
              '@id': `${canonical.value}#sss`,
              mainEntity: serviceFaqs.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            })
          }

          return JSON.stringify({ '@context': 'https://schema.org', '@graph': serviceGraph })
        }

        const areaName = data.subtitle || data.title

        const graph = [
          {
            '@type': 'Service',
            '@id': `${canonical.value}#hizmet`,
            name: data.title,
            serviceType: 'Evden eve nakliyat',
            description: data.excerpt || undefined,
            provider: saglayici.value,
            areaServed: { '@type': 'Place', name: areaName },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical.value}#kirilim`,
            itemListElement: breadcrumbItems.value.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          },
        ]

        if (regionFaqs.value.length) {
          graph.push({
            '@type': 'FAQPage',
            '@id': `${canonical.value}#sss`,
            mainEntity: regionFaqs.value.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          })
        }

        return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
      },
    },
  ],
})
</script>

<template>
  <main>
    <article-post-view
      v-if="post"
      :post="post"
      :previous="postNav.previous"
      :next="postNav.next"
      :author-fallback="`${brandName} Ekibi`"
      :related-services="postServices"
      :related-regions="postRegions"
    />

    <article-region-view
      v-else-if="region"
      :region="region"
      :related="relatedRegions"
      :all-regions="allRegions"
      :previous="regionNav.previous"
      :next="regionNav.next"
    />

    <article-service-view
      v-else-if="service"
      :service="service"
      :regions="serviceRegions"
      :previous="serviceNav.previous"
      :next="serviceNav.next"
    />

    <base-final-cta />
  </main>
</template>

<script setup>
/**
 * BÖLGE BULUCU — ana sayfada hizmetler bölümünün yerini aldı.
 *
 * NEDEN HİZMETLER BÖLÜMÜ KALKTI
 * Hizmetler artık navbar'da kendi girişine ve /hizmetlerimiz altında yedi
 * ayrı sayfaya sahip. Ana sayfada aynı üç-yedi kartı tekrar göstermek, o
 * ekranı ikinci bir menüye çeviriyordu.
 *
 * NEDEN YERİNE BU GELDİ
 * İki gerçek boşluğu birden kapatıyor:
 *
 * 1. ZİYARETÇİ TARAFI — bir nakliyat sitesine gelen kişinin ilk sorusu
 *    "benim bölgemde hizmet veriyor musunuz" oluyor. Bu soru sitede
 *    yalnızca /bolgelerimiz sayfasında, yani bir tık ötede cevaplanıyordu.
 *
 * 2. SEO TARAFI — 120 bölge sayfası vardı ve ANA SAYFA bunların hiçbirine
 *    bağlantı vermiyordu. Ana sayfa sitenin en yetkili sayfası; oradan
 *    gelen bağlantı, bölge sayfalarının taranma önceliğini doğrudan
 *    besliyor.
 *
 * ERİŞİLEBİLİRLİK — ARIA combobox deseni
 * Yazarken açılan liste `role="listbox"`, seçenekler `role="option"`.
 * Klavye: ↓/↑ gezinir, Enter seçer, Esc kapatır. Odak inputta kalır,
 * "hangi seçenek etkin" bilgisi `aria-activedescendant` ile taşınır —
 * odağı listeye taşımak, yazmaya devam etmeyi imkânsız kılardı.
 * Sonuç sayısı ayrıca `<output>` ile duyuruluyor.
 *
 * JAVASCRIPT ÇALIŞMAZSA
 * Alttaki öne çıkan bölge etiketleri ve "tüm bölgeler" bağlantısı düz
 * `<a>` — arama kutusu çalışmasa da bölge sayfalarına erişim ve iç
 * bağlantı ağı ayakta kalıyor.
 */
import { computed, ref } from 'vue'

const { data: response } = await useFetch('/api/regions?light=true', { key: 'regions-light' })

const regions = computed(() => (response.value?.success ? response.value.data || [] : []))

const labelOf = (region) =>
  region.subtitle?.trim() || region.shortTitle?.trim() || region.title || region.slug

const cityNameOf = (region) => {
  const id = parseCityIds(region.cities)[0]
  return turkishCities.find((city) => city.id === id)?.name || ''
}

/**
 * Öne çıkan bölgeler — EDİTÖRYAL bir seçim, veriden türetilmiyor.
 * Veride "arama hacmi" ya da "talep" diye bir alan yok; bu liste sektörde
 * en çok taşınma yapılan yerlerden seçildi. Panelden bölge silinirse
 * eşleşmeyen slug sessizce düşüyor (aşağıdaki filtre), kırık bağlantı
 * oluşmuyor.
 */
const ONE_CIKAN_SLUGLAR = [
  'istanbul',
  'kadikoy',
  'besiktas',
  'sisli',
  'umraniye',
  'pendik',
  'bakirkoy',
  'ankara',
  'izmir',
  'bursa',
  'antalya',
  'kocaeli',
]

const featured = computed(() => {
  const bySlug = new Map(regions.value.map((region) => [region.slug, region]))
  const secilen = ONE_CIKAN_SLUGLAR.map((slug) => bySlug.get(slug)).filter(Boolean)
  if (secilen.length) return secilen

  // Yedek: öne çıkan slug'ların hiçbiri yoksa (ör. veri henüz girilmemişse)
  // alfabetik ilk on iki bölge gösteriliyor — bölüm boş kalmıyor.
  const collator = new Intl.Collator('tr-TR')
  return [...regions.value]
    .sort((a, b) => collator.compare(labelOf(a), labelOf(b)))
    .slice(0, 12)
})

/* ------------------------------------------------------------ arama */

const query = ref('')
const isOpen = ref(false)
const activeIndex = ref(-1)
const inputRef = ref(null)

/**
 * Arama ASCII'ye indirgenmiş metin üzerinden: "kadikoy" yazan da "Kadıköy"
 * yazan da bulsun. Türkçe'ye duyarlı karşılaştırma ikincisini bulur ama
 * birincisini bulmaz ve telefondan Türkçe karakter yazmayan ziyaretçi
 * hiçbir sonuç göremez.
 */
const haystacks = computed(() => {
  const map = new Map()
  regions.value.forEach((region) => {
    map.set(region.slug, slugify([labelOf(region), cityNameOf(region), region.slug].join(' ')))
  })
  return map
})

const GORUNEN_SONUC = 8

/**
 * Eşleşenler ALAKAYA göre sıralanıyor, alfabetik değil.
 *
 * Düz "içeriyor mu" araması yanıltıcı sonuç veriyordu: "kar" yazıldığında
 * listenin başına Afyonkarahisar ve Ankara geliyor, aranan Karabük ve
 * Kartal aşağıda kalıyordu — çünkü ikisi de metnin İÇİNDE "kar" barındırıyor.
 *
 * Sıra: (1) adı yazılanla BAŞLAYANLAR, (2) bağlı olduğu ilin adı
 * yazılanla başlayanlar, (3) yalnızca içinde geçenler. Her grup kendi
 * içinde Türkçe alfabetik.
 */
const collator = new Intl.Collator('tr-TR')

const ranked = computed(() => {
  const term = slugify(query.value)
  if (!term) return []

  return regions.value
    .filter((region) => (haystacks.value.get(region.slug) || '').includes(term))
    .map((region) => {
      const ad = slugify(labelOf(region))
      const il = slugify(cityNameOf(region))
      let oncelik = 2
      if (ad.startsWith(term)) oncelik = 0
      else if (il.startsWith(term)) oncelik = 1
      return { region, oncelik }
    })
    .sort(
      (a, b) =>
        a.oncelik - b.oncelik || collator.compare(labelOf(a.region), labelOf(b.region))
    )
    .map((item) => item.region)
})

const matches = computed(() => ranked.value.slice(0, GORUNEN_SONUC))
const totalMatches = computed(() => ranked.value.length)

const isSearching = computed(() => slugify(query.value).length > 0)
const LIST_ID = 'bolge-bulucu-liste'
const optionId = (index) => `bolge-bulucu-secenek-${index}`

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
  activeIndex.value = -1
}

const go = (region) => {
  if (!region) return
  close()
  navigateTo(`/${region.slug}`)
}

const onInput = () => {
  activeIndex.value = -1
  open()
}

const move = (delta) => {
  if (!matches.value.length) return
  open()
  const count = matches.value.length
  activeIndex.value = (activeIndex.value + delta + count) % count
}

const onEnter = () => {
  // Etkin bir seçenek varsa ona git; yoksa tek sonuç varsa doğrudan ona.
  if (activeIndex.value >= 0) return go(matches.value[activeIndex.value])
  if (matches.value.length === 1) return go(matches.value[0])
}
</script>

<template>
  <ui-section tone="default" labelledby="bolge-bulucu-baslik">
    <ui-heading
      id="bolge-bulucu-baslik"
      eyebrow="Hizmet Bölgelerimiz"
      title="Bölgenizde Hizmet Veriyor muyuz?"
      description="81 ilde ve İstanbul'un 39 ilçesinde çalışıyoruz. İlçenizi ya da ilinizi yazın; o bölgede nasıl çalıştığımızı, hangi koşulların taşınmayı zorlaştırdığını ve fiyatı neyin belirlediğini anlattığımız sayfaya gidin."
      align="split"
    />

    <div class="finder">
      <div class="finder__box">
        <label for="bolge-bulucu" class="sr-only">İlçe veya il ara</label>

        <div class="finder__field">
          <ui-icon name="search" :size="20" class="finder__icon" aria-hidden="true" />
          <input
            id="bolge-bulucu"
            ref="inputRef"
            v-model="query"
            type="text"
            class="finder__input"
            placeholder="Örn: Kadıköy, Bursa, Ümraniye…"
            autocomplete="off"
            role="combobox"
            :aria-expanded="isOpen && matches.length > 0"
            :aria-controls="LIST_ID"
            aria-autocomplete="list"
            :aria-activedescendant="activeIndex >= 0 ? optionId(activeIndex) : undefined"
            @input="onInput"
            @focus="open"
            @keydown.down.prevent="move(1)"
            @keydown.up.prevent="move(-1)"
            @keydown.enter.prevent="onEnter"
            @keydown.esc="close"
          >
        </div>

        <!--
          Sonuç listesi. `v-show` değil `v-if`: kapalı liste DOM'da kalsaydı
          ekran okuyucu ve klavye için görünmez bir tuzak oluşurdu.

          NEDEN `<datalist>` DEĞİL: yerel `<datalist>` seçeneklerin
          görünümünü biçimlendirmeye izin vermiyor ve her satırda ikinci bir
          bilgi (ilçenin bağlı olduğu il) göstermeyi imkânsız kılıyor —
          "Merkez" adlı onlarca kayıt arasında hangisinin hangi ile ait
          olduğu ancak böyle ayırt edilebiliyor. Ayrıca tarayıcılar arası
          görünümü tutarsız. Bu yüzden WAI-ARIA combobox deseni elle
          uygulandı: listbox/option rolleri, aria-activedescendant ve
          ok/Enter/Esc tuş desteği ile.
        -->
        <ul
          v-if="isOpen && matches.length"
          :id="LIST_ID"
          class="finder__list"
          role="listbox"
          aria-label="Bölge önerileri"
        >
          <li
            v-for="(region, index) in matches"
            :id="optionId(index)"
            :key="region.slug"
            role="option"
            :aria-selected="index === activeIndex"
            class="finder__option"
            :class="{ 'is-active': index === activeIndex }"
            @mousedown.prevent="go(region)"
            @mousemove="activeIndex = index"
          >
            <span class="finder__option-name">{{ labelOf(region) }}</span>
            <span v-if="cityNameOf(region) !== labelOf(region)" class="finder__option-city">
              {{ cityNameOf(region) }}
            </span>
          </li>
        </ul>

      </div>

      <!--
        Sonuç sayısı GÖRÜNMEZ, yalnızca ekran okuyucuya gidiyor: gören
        kullanıcı için açılır listenin kendisi zaten geri bildirim, sayıyı
        ayrıca yazmak hem gereksiz hem de listeyi aşağı iten bir satır
        ekliyordu. `output` etiketi canlı bölgeyi örtük olarak sağlıyor.
      -->
      <output class="sr-only">
        <template v-if="isSearching && totalMatches">{{ totalMatches }} bölge bulundu.</template>
      </output>

      <!-- Sonuç yokken mesaj GÖRÜNÜR: burada gösterilecek liste olmadığı
           için ekranda hiçbir geri bildirim kalmazdı. -->
      <p v-if="isSearching && !totalMatches" class="finder__empty">
        <strong>“{{ query }}”</strong> için kayıtlı bir sayfa bulunamadı — ama yine de hizmet
        veriyor olabiliriz.
        <NuxtLink to="/iletisim" class="finder__empty-link">Bize sorun</NuxtLink>.
      </p>

      <div class="finder__featured">
        <p class="finder__featured-title">Sık aranan bölgeler</p>
        <ul class="finder__chips">
          <li v-for="region in featured" :key="region.slug">
            <NuxtLink :to="`/${region.slug}`" class="finder__chip">{{ labelOf(region) }}</NuxtLink>
          </li>
        </ul>

        <NuxtLink to="/bolgelerimiz" class="finder__all">
          Tüm hizmet bölgelerimiz
          <ui-icon name="arrow-right" :size="16" class="nudge-x" />
        </NuxtLink>
      </div>
    </div>
  </ui-section>
</template>

<style scoped>
.finder {
  max-width: 44rem;
  margin: 0 auto;
}

.finder__box {
  position: relative;
}

.finder__field {
  position: relative;
  display: flex;
  align-items: center;
}

.finder__icon {
  position: absolute;
  left: 1.125rem;
  color: rgb(var(--c-ink-subtle));
  pointer-events: none;
}

.finder__input {
  width: 100%;
  padding: 1.125rem 1.25rem 1.125rem 3.25rem;
  border: 1px solid rgb(var(--c-line-strong));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  color: rgb(var(--c-ink));
  font-size: 1.0625rem;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--dur-fast) var(--ease-soft);
}

.finder__input::placeholder {
  color: rgb(var(--c-ink-subtle));
}

.finder__input:hover {
  border-color: rgb(var(--c-brand-600) / 0.5);
}

/*
 * Liste akış DIŞINDA (absolute): akış içinde olsaydı her tuşa basışta
 * altındaki bölüm aşağı-yukarı zıplardı.
 */
.finder__list {
  position: absolute;
  z-index: 10;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  max-height: 20rem;
  overflow-y: auto;
  margin: 0;
  padding: 0.375rem;
  list-style: none;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-xl);
  background: rgb(var(--c-surface));
  box-shadow: var(--shadow-lg);
}

.finder__option {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--r-md);
  cursor: pointer;
  color: rgb(var(--c-ink));
}

/* Etkin seçenek yalnızca renkle değil zeminle de ayrılıyor. */
.finder__option.is-active {
  background: rgb(var(--c-brand-600) / 0.1);
  color: rgb(var(--c-brand-800));
}

.finder__option-name {
  font-weight: 600;
}

.finder__option-city {
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: rgb(var(--c-ink-muted));
}

.finder__empty {
  margin-top: 0.875rem;
  text-align: center;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgb(var(--c-ink-muted));
  text-wrap: pretty;
}

.finder__empty-link {
  font-weight: 600;
  color: rgb(var(--c-brand-700));
}

.finder__empty-link:hover {
  text-decoration: underline;
}

.finder__featured {
  margin-top: 1.5rem;
  text-align: center;
}

.finder__featured-title {
  margin-bottom: 0.875rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--c-ink-muted));
}

.finder__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.finder__chip {
  display: inline-block;
  padding: 0.4375rem 0.9375rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--c-ink));
  transition:
    border-color var(--dur-fast) var(--ease-soft),
    color var(--dur-fast) var(--ease-soft);
}

.finder__chip:hover {
  border-color: rgb(var(--c-brand-600) / 0.45);
  color: rgb(var(--c-brand-800));
}

.finder__all {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1.5rem;
  font-weight: 600;
  color: rgb(var(--c-brand-700));
}

.finder__all:hover {
  text-decoration: underline;
}
</style>

<script setup>
/**
 * BÖLGELER DİZİNİ — il düzeyi
 *
 * İKİ KATMANLI YAPI
 * Bu sayfa yalnızca 81 İL kartını gösterir. İlçe kartları o ilin kendi
 * sayfasında listelenir (/istanbul içinde 39 İstanbul ilçesi, ileride
 * /ankara içinde Ankara ilçeleri — bkz. components/region/DistrictGrid.vue).
 *
 * NEDEN BÖYLE: hedef, tüm Türkiye'nin ilçelerinin doldurulması, yani
 * ~1.054 bölge sayfası. Hepsi tek dizine konsaydı ya 40+ sayfalık bir
 * sayfalama gerekirdi (2. sayfadan sonrası iç bağlantı ağının dışında kalır,
 * taranma önceliğini kaybeder) ya da yüz ekran uzunluğunda tek bir sayfa
 * oluşurdu. İki katmanda hiçbir sayfa 81 kartı geçmiyor ve her bölge en
 * fazla iki tıklama uzakta kalıyor.
 *
 * SAYFALAMA: YOK, ÇÜNKÜ GEREKMİYOR
 * İl sayısı 81'de sabit — Türkiye'ye yeni il eklenmiyor. Bu tavan
 * aşılmadığı sürece sayfalama, her ile ana dizinden doğrudan bağlantı
 * vermenin SEO faydasını karşılıksız harcamak olurdu. Uzunluk sorunu
 * bunun yerine coğrafi bölge süzgeciyle çözülüyor: bir bölge seçildiğinde
 * ekranda en fazla 18 kart kalıyor.
 *
 * SÜZGEÇ ADRESTE TUTULUYOR (`?bolge=ege`)
 * Bileşen içi `ref` yerine URL kullanılıyor; böylece süzülmüş görünüm
 * paylaşılabiliyor, geri tuşu beklendiği gibi çalışıyor ve sunucu
 * render'ında da doğru liste üretiliyor.
 *
 * ÖNCEKİ SÜRÜMDEN KORUNAN DÜZELTMELER
 * - `title` opsiyoneldir; başlıksız kayıt aramayı çökertmemeli.
 * - Arama ASCII'ye indirgenmiş metin üzerinde: "kadikoy" da "Kadıköy" de bulur.
 * - Boş durum, hata durumu ve "sonuç yok" durumu ayrı ayrı ele alınır.
 * - Anlık filtrelemenin sonucu `aria-live` ile duyurulur.
 */
import { computed } from 'vue'

const route = useRoute()

const {
  data: response,
  error,
  pending,
} = await useFetch('/api/regions?light=true', { key: 'regions-light' })

const regions = computed(() => (response.value?.success ? response.value.data || [] : []))

const cityIdOf = (region) => parseCityIds(region.cities)[0]
const cityNameOf = (region) =>
  turkishCities.find((city) => city.id === cityIdOf(region))?.name || ''

const labelOf = (region) =>
  region.subtitle?.trim() || region.shortTitle?.trim() || region.title || region.slug

const collator = new Intl.Collator('tr-TR')
const sortByLabel = (items) => [...items].sort((a, b) => collator.compare(labelOf(a), labelOf(b)))

/* ------------------------------------------------------ il / ilçe ayrımı */

/** İl başına ilçe sayısı — kartta "39 ilçe sayfası" rozeti için. */
const districtCounts = computed(() => {
  const counts = new Map()
  regions.value.forEach((region) => {
    if (isProvincePage(region)) return
    const name = cityNameOf(region)
    if (name) counts.set(name, (counts.get(name) || 0) + 1)
  })
  return counts
})

/**
 * Dizine girecek kayıtlar: il sayfaları.
 *
 * FAİL-SAFE: bir ilin ilçe sayfaları var ama ilin KENDİ sayfası henüz
 * yoksa, o ilçeler dizinden tamamen kaybolurdu. Bu durumda ilçeler
 * doğrudan dizine alınıyor — eksik bir il sayfası yüzünden hiçbir kayıt
 * erişilemez hâle gelmiyor.
 */
const indexRecords = computed(() => {
  const provinceCities = new Set(
    regions.value.filter(isProvincePage).map((region) => cityNameOf(region))
  )
  return regions.value.filter(
    (region) => isProvincePage(region) || !provinceCities.has(cityNameOf(region))
  )
})

/* --------------------------------------------------------------- arama */

const search = computed(() => String(route.query.ara || ''))
const isSearching = computed(() => slugify(search.value).length > 0)

/**
 * Arama ASCII'ye indirgenmiş metin üzerinden yapılır: Türkçe'ye duyarlı
 * karşılaştırma "Kadıköy" için çalışıyor ama "kadikoy" için çalışmıyordu ve
 * telefondan Türkçe karakter yazmayan ziyaretçi hiçbir sonuç göremiyordu.
 */
const haystacks = computed(() => {
  const map = new Map()
  indexRecords.value.forEach((region) => {
    const geo = cityIdToGeographicRegion[cityIdOf(region)]?.name || ''
    map.set(
      region.slug,
      slugify([region.title, region.subtitle, region.shortTitle, cityNameOf(region), geo].join(' '))
    )
  })
  return map
})

/* ------------------------------------------------------------- süzgeç */

const activeGeo = computed(() => {
  const key = String(route.query.bolge || '')
  return geographicRegions.some((geo) => geo.key === key) ? key : ''
})

/** Süzgeç şeridi — her bölgenin yanında o bölgedeki il sayısı. */
const geoTabs = computed(() => {
  const counts = new Map()
  indexRecords.value.forEach((region) => {
    const geo = cityIdToGeographicRegion[cityIdOf(region)]
    if (geo) counts.set(geo.key, (counts.get(geo.key) || 0) + 1)
  })
  return [
    { key: '', name: 'Tümü', count: indexRecords.value.length },
    ...geographicRegions
      .filter((geo) => counts.get(geo.key))
      .map((geo) => ({ key: geo.key, name: geo.name, count: counts.get(geo.key) })),
  ]
})

/** Süzgeç bağlantıları arama terimini korur, aksi hâlde arama sıfırlanırdı. */
const geoLink = (key) => ({
  path: '/bolgelerimiz',
  query: { ...(key ? { bolge: key } : {}), ...(search.value ? { ara: search.value } : {}) },
})

const filtered = computed(() => {
  const term = slugify(search.value)
  return indexRecords.value.filter((region) => {
    if (term && !(haystacks.value.get(region.slug) || '').includes(term)) return false
    if (activeGeo.value) {
      const geo = cityIdToGeographicRegion[cityIdOf(region)]
      if (geo?.key !== activeGeo.value) return false
    }
    return true
  })
})

/** Coğrafi bölge başlıkları altında gruplanmış kartlar. */
const groups = computed(() => {
  const result = geographicRegions
    .map((geo) => ({
      key: geo.key,
      name: geo.name,
      items: sortByLabel(
        filtered.value.filter((region) => geo.cityIds.includes(cityIdOf(region)))
      ),
    }))
    .filter((group) => group.items.length)

  // Plaka kodu tanınmayan ya da hiç il seçilmemiş kayıtlar kaybolmasın.
  const known = new Set(geographicRegions.flatMap((geo) => geo.cityIds))
  const orphans = sortByLabel(filtered.value.filter((region) => !known.has(cityIdOf(region))))
  if (orphans.length) result.push({ key: 'diger', name: 'Diğer', items: orphans })

  return result
})

/**
 * Karttaki alt bant etiketi — YALNIZCA ilçe sayfası olan illerde dolu.
 *
 * Başta coğrafi bölge adı da yazılıyordu ("Ege Bölgesi"), ama kartların
 * üstündeki grup başlığı zaten aynı şeyi söylüyordu: sekiz kartın hepsinde
 * tekrarlanan bir etiket bilgi taşımıyor, sadece gürültü ekliyordu.
 * Geriye gerçekten karar verdiren tek bilgi kaldı: o ilde ilçe kırılımı
 * var mı.
 */
const metaFor = (region) => {
  const count = districtCounts.value.get(cityNameOf(region))
  return count ? `${count} ilçe sayfası` : ''
}

const searchInput = computed({
  get: () => search.value,
  set: (value) =>
    navigateTo(
      {
        path: '/bolgelerimiz',
        query: {
          ...(activeGeo.value ? { bolge: activeGeo.value } : {}),
          ...(value ? { ara: value } : {}),
        },
      },
      { replace: true }
    ),
})
</script>

<template>
  <ui-section tone="surface" labelledby="bolgeler-baslik">
    <ui-heading
      id="bolgeler-baslik"
      eyebrow="Hizmet Bölgelerimiz"
      title="Nereye Taşınıyorsunuz?"
      description="Her bölgenin kendine göre zorlukları var: dar sokak, asansörsüz bina, araç yanaşamayan cadde, uzun güzergâh. İlinizi seçin, o bölgede nasıl çalıştığımızı anlatalım; ilçe sayfası olan illerde ilçenize kadar inebilirsiniz."
      align="split"
    />

    <div class="mx-auto mb-8 max-w-xl">
      <label for="bolge-arama" class="sr-only">Bölge veya il ara</label>
      <div class="region-search">
        <ui-icon name="search" :size="18" class="region-search__icon" aria-hidden="true" />
        <input
          id="bolge-arama"
          v-model.lazy="searchInput"
          type="search"
          class="region-search__input"
          placeholder="İl adı yazın…"
          autocomplete="off"
        />
      </div>

      <!-- Anlık filtrelemenin sonucu ekran okuyucuya da bildirilsin diye
           canlı bölge. Output etiketi bunu örtük olarak sağlar; ayrıca bir
           erişilebilirlik niteliği eklemeye gerek kalmıyor. -->
      <output class="region-search__status">
        <template v-if="isSearching">{{ filtered.length }} sonuç bulundu.</template>
      </output>
    </div>

    <div v-if="pending" class="py-16 text-center text-ink-muted">
      <p>Bölgeler yükleniyor…</p>
    </div>

    <div v-else-if="error" class="card p-8 text-center text-ink-muted">
      <p>Bölgeler yüklenirken bir sorun oluştu.</p>
    </div>

    <template v-else>
      <base-empty-state
        v-if="!regions.length"
        message="Hizmet bölgeleri yakında burada listelenecek."
      />

      <template v-else>
        <nav class="region-tabs" aria-label="Coğrafi bölgeye göre süz">
          <NuxtLink
            v-for="tab in geoTabs"
            :key="tab.key || 'tumu'"
            :to="geoLink(tab.key)"
            class="region-tabs__link"
            :class="{ 'is-active': tab.key === activeGeo }"
            :aria-current="tab.key === activeGeo ? 'true' : undefined"
          >
            {{ tab.name }}
            <span class="region-tabs__count">{{ tab.count }}</span>
          </NuxtLink>
        </nav>

        <base-empty-state
          v-if="!filtered.length"
          :message="
            isSearching
              ? `“${search}” için sonuç bulunamadı. Farklı bir il adı deneyebilirsiniz.`
              : 'Bu bölgede henüz listelenmiş bir il yok.'
          "
        />

        <div v-else class="flex flex-col gap-12">
          <section v-for="group in groups" :key="group.key" :aria-labelledby="`bolge-${group.key}`">
            <h3 :id="`bolge-${group.key}`" class="region-group__title">
              <ui-icon name="map-pin" :size="18" class="text-brand-600" aria-hidden="true" />
              {{ group.name }}
              <span class="region-group__count">{{ group.items.length }} il</span>
            </h3>

            <ul class="region-grid">
              <li v-for="(region, index) in group.items" :key="region.slug">
                <region-card
                  :region="region"
                  :meta="metaFor(region)"
                  :eager="group.key === groups[0].key && index < 4"
                />
              </li>
            </ul>
          </section>
        </div>
      </template>
    </template>
  </ui-section>
</template>

<style scoped>
.region-search {
  position: relative;
  display: flex;
  align-items: center;
}

.region-search__icon {
  position: absolute;
  left: 1rem;
  color: rgb(var(--c-ink-subtle));
  pointer-events: none;
}

.region-search__input {
  width: 100%;
  padding: 0.875rem 1.25rem 0.875rem 3rem;
  border: 1px solid rgb(var(--c-line-strong));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  color: rgb(var(--c-ink));
  transition: border-color var(--dur-fast) var(--ease-soft);
}

.region-search__input::placeholder {
  color: rgb(var(--c-ink-subtle));
}

.region-search__input:hover {
  border-color: rgb(var(--c-brand-600) / 0.5);
}

/* Sayaç boşken de yer kaplar; aksi hâlde ilk aramada beliren metin
   altındaki listeyi aşağı iter (düzen kayması). */
.region-search__status {
  display: block; /* output satır içi bir eleman */
  min-height: 1.5rem;
  padding-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-muted));
}

.region-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.region-tabs__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  padding: 0.4375rem 0.875rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgb(var(--c-ink-muted));
  transition:
    border-color var(--dur-fast) var(--ease-soft),
    background-color var(--dur-fast) var(--ease-soft),
    color var(--dur-fast) var(--ease-soft);
}

.region-tabs__link:hover {
  border-color: rgb(var(--c-brand-600) / 0.45);
  color: rgb(var(--c-brand-800));
}

/* Seçili sekme rengi tek başına taşımıyor: kenarlık + zemin + kalınlık
   birlikte değişiyor, böylece renk körlüğünde de ayırt ediliyor. */
.region-tabs__link.is-active {
  border-color: rgb(var(--c-brand-600));
  background: rgb(var(--c-brand-600));
  color: rgb(var(--c-ink-inverse));
}

.region-tabs__count {
  padding: 0 0.375rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-ink) / 0.08);
  font-size: 0.6875rem;
}

.region-tabs__link.is-active .region-tabs__count {
  background: rgb(255 255 255 / 0.22);
}

.region-group__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgb(var(--c-line));
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(var(--c-ink));
  scroll-margin-top: 6rem;
}

.region-group__count {
  padding: 0.125rem 0.5rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-surface-muted));
  color: rgb(var(--c-ink-muted));
  font-size: 0.75rem;
  font-weight: 600;
}

.region-grid {
  display: grid;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

.region-grid > li {
  display: flex;
}

.region-grid > li > * {
  width: 100%;
}
</style>

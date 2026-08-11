<script setup>
/**
 * FİYAT TAHMİN ARACI.
 *
 * NE YAPAR / NE YAPMAZ
 * Kesin fiyat VERMEZ, aralık verir. Nakliyat fiyatını belirleyen değişkenler
 * (asansör durumu, park mesafesi, eşya cinsi, kat) yerinde görülmeden kesin
 * rakam söylemek yanıltıcı olur ve müşteri güvenini bozar. Araç bunu açıkça
 * söylüyor ve teklif formuna yönlendiriyor.
 *
 * HESAPLAMA TAMAMEN İSTEMCİDE
 * Sunucuya istek gitmiyor: paylaşımlı hosting'de her hesaplama bir istek
 * demek olurdu ve tahminin gizli tutulacak bir tarafı yok. Ayrıca anında
 * tepki veriyor, bu da aracın kullanılma oranını artırıyor.
 *
 * KATSAYILAR PANELDEN geliyor (Admin > Fiyat Hesaplama). Fiyatlar akaryakıt,
 * işçilik ve sezona göre değişiyor; her değişiklik için kod düzenleyip yeniden
 * dağıtım yapmak sürdürülebilir değildi.
 */
import { computed, ref } from 'vue'

const { data: ayarResponse } = await useFetch('/api/price-estimator', {
  key: 'price-estimator',
})
const ayar = computed(() => ayarResponse.value?.data ?? null)

/**
 * Panel boşsa ya da API'ye ulaşılamazsa kullanılan yedek değerler.
 * Aracın hiç çalışmaması, biraz eski bir rakam göstermesinden kötü.
 */
const YEDEK = {
  floorFee: 450,
  packingMultiplier: 1.18,
  storageFee: 3500,
  rangePercent: 15,
  roundTo: 500,
  sizes: [
    { id: 'y1', label: '1+0 / Stüdyo', basePrice: 6000 },
    { id: 'y2', label: '1+1', basePrice: 8500 },
    { id: 'y3', label: '2+1', basePrice: 12000 },
    { id: 'y4', label: '3+1', basePrice: 16000 },
    { id: 'y5', label: '4+1 ve üzeri', basePrice: 21000 },
    { id: 'y6', label: 'Ofis / İşyeri', basePrice: 18000 },
  ],
  distances: [
    { id: 'm1', label: 'Aynı şehir içinde', multiplier: 1 },
    { id: 'm2', label: 'Komşu şehir (0–300 km)', multiplier: 1.45 },
    { id: 'm3', label: 'Orta mesafe (300–700 km)', multiplier: 1.85 },
    { id: 'm4', label: 'Uzun mesafe (700 km+)', multiplier: 2.3 },
  ],
}

const ODALAR = computed(() => (ayar.value?.sizes?.length ? ayar.value.sizes : YEDEK.sizes))
const MESAFELER = computed(() =>
  ayar.value?.distances?.length ? ayar.value.distances : YEDEK.distances
)
const sayi = (alan) => Number(ayar.value?.[alan] ?? YEDEK[alan])

const not = computed(
  () =>
    ayar.value?.note ||
    'Bu bir ön tahmindir, teklif değildir. Kesin fiyat; eşya miktarı, park mesafesi, asansör uygunluğu ve montaj ihtiyacına göre ücretsiz keşif sonrasında netleşir.'
)

const form = ref({
  odaId: null,
  mesafeId: null,
  cikisKat: 2,
  cikisAsansor: true,
  varisKat: 2,
  varisAsansor: true,
  paketleme: false,
  depolama: false,
})

/** Seçim yapılmamışsa makul bir varsayılan (2+1 / şehir içi konumundakiler). */
const seciliOda = computed(
  () => ODALAR.value.find((o) => o.id === form.value.odaId) ?? ODALAR.value[2] ?? ODALAR.value[0]
)
const seciliMesafe = computed(
  () => MESAFELER.value.find((m) => m.id === form.value.mesafeId) ?? MESAFELER.value[0]
)

/** Asansörsüz her kat için ek yük; zemin ve 1. kat ücretsiz sayılıyor. */
const katEki = (kat, asansor) => {
  if (asansor) return 0
  return Math.max(0, Number(kat) - 1) * sayi('floorFee')
}

const sonuc = computed(() => {
  const taban = Number(seciliOda.value?.basePrice ?? 0)
  const carpan = Number(seciliMesafe.value?.multiplier ?? 1)

  let tutar = taban * carpan
  tutar += katEki(form.value.cikisKat, form.value.cikisAsansor)
  tutar += katEki(form.value.varisKat, form.value.varisAsansor)

  if (form.value.paketleme) tutar *= sayi('packingMultiplier')
  if (form.value.depolama) tutar += sayi('storageFee')

  // Aralık: ±rangePercent. Nakliyatta kesin rakam yerinde görmeden verilemez.
  const pay = sayi('rangePercent') / 100
  const yuvarla = Math.max(1, sayi('roundTo'))
  const alt = Math.round((tutar * (1 - pay)) / yuvarla) * yuvarla
  const ust = Math.round((tutar * (1 + pay)) / yuvarla) * yuvarla
  return { alt, ust }
})

const tl = (n) => n.toLocaleString('tr-TR')
</script>

<template>
  <div class="hesaplayici">
    <div class="hesaplayici__form">
      <div class="hesaplayici__alan">
        <label for="hs-oda">Evinizin büyüklüğü</label>
        <select id="hs-oda" v-model="form.odaId">
          <option v-for="o in ODALAR" :key="o.id" :value="o.id">{{ o.label }}</option>
        </select>
      </div>

      <div class="hesaplayici__alan">
        <label for="hs-mesafe">Mesafe</label>
        <select id="hs-mesafe" v-model="form.mesafeId">
          <option v-for="m in MESAFELER" :key="m.id" :value="m.id">{{ m.label }}</option>
        </select>
      </div>

      <fieldset class="hesaplayici__grup">
        <legend>Çıkış adresi</legend>
        <div class="hesaplayici__ikili">
          <div class="hesaplayici__alan">
            <label for="hs-cikis-kat">Kat</label>
            <input id="hs-cikis-kat" v-model.number="form.cikisKat" type="number" min="0" max="30" />
          </div>
          <label class="hesaplayici__onay">
            <input v-model="form.cikisAsansor" type="checkbox" />
            <span>Asansör var</span>
          </label>
        </div>
      </fieldset>

      <fieldset class="hesaplayici__grup">
        <legend>Varış adresi</legend>
        <div class="hesaplayici__ikili">
          <div class="hesaplayici__alan">
            <label for="hs-varis-kat">Kat</label>
            <input id="hs-varis-kat" v-model.number="form.varisKat" type="number" min="0" max="30" />
          </div>
          <label class="hesaplayici__onay">
            <input v-model="form.varisAsansor" type="checkbox" />
            <span>Asansör var</span>
          </label>
        </div>
      </fieldset>

      <div class="hesaplayici__ekler">
        <label class="hesaplayici__onay">
          <input v-model="form.paketleme" type="checkbox" />
          <span>Paketlemeyi siz yapın</span>
        </label>
        <label class="hesaplayici__onay">
          <input v-model="form.depolama" type="checkbox" />
          <span>Eşyalarım bir süre depoda kalacak</span>
        </label>
      </div>
    </div>

    <div class="hesaplayici__sonuc">
      <p class="hesaplayici__etiket">Tahmini fiyat aralığı</p>
      <output class="hesaplayici__tutar">
        {{ tl(sonuc.alt) }} – {{ tl(sonuc.ust) }} <span class="hesaplayici__birim">TL</span>
      </output>

      <p class="hesaplayici__uyari">{{ not }}</p>

      <NuxtLink to="/iletisim" class="hesaplayici__cta">
        Ücretsiz keşif talep edin
        <ui-icon name="arrow-right" :size="18" class="nudge-x" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.hesaplayici {
  display: grid;
  gap: 1.5rem;
  align-items: start;
}

@media (min-width: 60rem) {
  .hesaplayici {
    grid-template-columns: 1.15fr 1fr;
    gap: 2.5rem;
  }
}

.hesaplayici__form {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-2xl);
  background: rgb(var(--c-surface));
}

.hesaplayici__alan {
  display: flex;
  flex-direction: column;
}

.hesaplayici__alan label {
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--c-ink));
}

.hesaplayici__alan select,
.hesaplayici__alan input {
  padding: 0.625rem 0.75rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-lg);
  background: rgb(var(--c-surface));
  color: rgb(var(--c-ink));
  font: inherit;
}

.hesaplayici__grup {
  margin: 0;
  padding: 1rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-xl);
  background: rgb(var(--c-surface-muted));
}

.hesaplayici__grup legend {
  padding: 0 0.375rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgb(var(--c-ink-muted));
}

.hesaplayici__ikili {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.hesaplayici__onay {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.5rem;
  font-size: 0.9375rem;
  color: rgb(var(--c-ink));
  cursor: pointer;
}

.hesaplayici__ekler {
  display: grid;
  gap: 0.25rem;
}

.hesaplayici__sonuc {
  padding: 1.75rem;
  border-radius: var(--r-2xl);
  background: rgb(var(--c-brand-800));
  color: #fff;
}

.hesaplayici__etiket {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.75;
}

.hesaplayici__tutar {
  display: block;
  margin-top: 0.5rem;
  font-size: clamp(1.75rem, 1.3rem + 2vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hesaplayici__birim {
  font-size: 0.5em;
  font-weight: 600;
  opacity: 0.8;
}

.hesaplayici__uyari {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.65;
  opacity: 0.85;
  text-wrap: pretty;
}

.hesaplayici__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.8125rem 1.5rem;
  border-radius: var(--r-full);
  background: #fff;
  font-weight: 700;
  color: rgb(var(--c-brand-800));
}

.hesaplayici__cta:hover {
  opacity: 0.92;
}
</style>

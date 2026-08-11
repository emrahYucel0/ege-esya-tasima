<script setup>
/**
 * FİYAT HESAPLAMA paneli — /fiyat-hesaplama sayfasındaki aracın katsayıları.
 *
 * Buradaki rakamlar ziyaretçiye GÖSTERİLİYOR. Yanlış bir değer yanlış fiyat
 * beklentisi yaratır, o yüzden ekranda canlı bir önizleme var: değeri
 * değiştirdiğinizde örnek hesabın ne olacağını anında görüyorsunuz.
 */
import { computed, onMounted, ref } from 'vue'

const form = ref({
  sectionName: 'price-estimator',
  floorFee: 450,
  packingMultiplier: 1.18,
  storageFee: 3500,
  rangePercent: 15,
  roundTo: 500,
  note: '',
  sizes: [],
  distances: [],
})

const yukleniyor = ref(true)
const kaydediliyor = ref(false)
const durum = ref('')
const hata = ref('')

const getir = async () => {
  yukleniyor.value = true
  hata.value = ''
  try {
    const cevap = await $fetch('/api/price-estimator')
    const d = cevap?.data ?? cevap
    if (d?.id) {
      form.value = {
        sectionName: d.sectionName || 'price-estimator',
        floorFee: d.floorFee ?? 450,
        packingMultiplier: d.packingMultiplier ?? 1.18,
        storageFee: d.storageFee ?? 3500,
        rangePercent: d.rangePercent ?? 15,
        roundTo: d.roundTo ?? 500,
        note: d.note || '',
        sizes: (d.sizes || []).map((s) => ({ label: s.label, basePrice: s.basePrice, order: s.order })),
        distances: (d.distances || []).map((x) => ({ label: x.label, multiplier: x.multiplier, order: x.order })),
      }
    }
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Veri alınamadı'
  } finally {
    yukleniyor.value = false
  }
}

const kaydet = async () => {
  kaydediliyor.value = true
  durum.value = ''
  hata.value = ''
  try {
    form.value.sizes.forEach((s, i) => (s.order = i))
    form.value.distances.forEach((d, i) => (d.order = i))
    const cevap = await $fetch('/api/price-estimator', { method: 'PUT', body: form.value })
    if (cevap?.success === false) throw new Error(cevap.error || 'Kaydedilemedi')
    durum.value = 'Kaydedildi. Değişiklik sitede anında geçerli.'
    await getir()
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Kaydedilemedi'
  } finally {
    kaydediliyor.value = false
  }
}

const boyutEkle = () => form.value.sizes.push({ label: '', basePrice: 0, order: form.value.sizes.length })
const boyutSil = (i) => form.value.sizes.splice(i, 1)
const mesafeEkle = () => form.value.distances.push({ label: '', multiplier: 1, order: form.value.distances.length })
const mesafeSil = (i) => form.value.distances.splice(i, 1)

/**
 * CANLI ÖNİZLEME — sitedeki hesapla AYNI formül.
 * Örnek durum: listedeki 3. büyüklük (yoksa ilk), şehir içi, çıkışta
 * asansörsüz 3. kat, varışta asansörlü.
 */
const onizleme = computed(() => {
  const oda = form.value.sizes[2] ?? form.value.sizes[0]
  const mesafe = form.value.distances[0]
  if (!oda || !mesafe) return null

  let tutar = Number(oda.basePrice || 0) * Number(mesafe.multiplier || 1)
  tutar += Math.max(0, 3 - 1) * Number(form.value.floorFee || 0)

  const pay = Number(form.value.rangePercent || 0) / 100
  const yuvarla = Math.max(1, Number(form.value.roundTo || 1))
  return {
    oda: oda.label,
    mesafe: mesafe.label,
    alt: Math.round((tutar * (1 - pay)) / yuvarla) * yuvarla,
    ust: Math.round((tutar * (1 + pay)) / yuvarla) * yuvarla,
  }
})

const tl = (n) => Number(n).toLocaleString('tr-TR')

onMounted(getir)
</script>

<template>
  <section class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Fiyat Hesaplama</h1>
      <p class="mt-1 text-sm text-gray-500">
        /fiyat-hesaplama sayfasındaki aracın katsayıları.
      </p>
    </header>

    <div class="mb-6 rounded border-2 border-amber-300 bg-amber-50 p-4">
      <p class="font-semibold text-amber-900">Bu rakamlar müşteriye gösteriliyor.</p>
      <p class="mt-1 text-sm text-amber-800">
        Yanlış bir değer yanlış fiyat beklentisi yaratır. Kaydetmeden önce aşağıdaki
        <strong>canlı önizlemeyi</strong> kontrol edin.
      </p>
    </div>

    <p v-if="hata" class="mb-4 rounded bg-red-50 p-3 text-sm text-red-700" role="alert">{{ hata }}</p>
    <output v-if="durum" class="mb-4 block rounded bg-green-50 p-3 text-sm text-green-700">{{ durum }}</output>
    <p v-if="yukleniyor" class="py-10 text-center text-gray-500">Yükleniyor…</p>

    <template v-else>
      <!-- Canlı önizleme -->
      <div v-if="onizleme" class="mb-8 rounded-lg bg-gray-900 p-5 text-white">
        <p class="text-xs font-bold uppercase tracking-wider opacity-70">Canlı önizleme</p>
        <p class="mt-1 text-sm opacity-80">
          {{ onizleme.oda }} · {{ onizleme.mesafe }} · çıkışta asansörsüz 3. kat
        </p>
        <p class="mt-2 text-3xl font-extrabold">
          {{ tl(onizleme.alt) }} – {{ tl(onizleme.ust) }} <span class="text-lg opacity-70">TL</span>
        </p>
      </div>

      <!-- Ev büyüklükleri -->
      <div class="mb-8">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="font-semibold text-gray-800">Ev Büyüklüğü ve Taban Ücret</h2>
          <button class="rounded bg-gray-800 px-3 py-1.5 text-sm text-white" @click="boyutEkle">+ Satır ekle</button>
        </div>
        <p class="mb-3 text-sm text-gray-500">
          Taban ücret; şehir içi, asansörlü ve zemin kat varsayımıyla girilmeli. Diğer etkenler bunun üzerine ekleniyor.
        </p>
        <div v-for="(s, i) in form.sizes" :key="'s' + i" class="mb-2 flex gap-2">
          <input v-model="s.label" type="text" class="w-full rounded border p-2" placeholder="2+1" />
          <input v-model.number="s.basePrice" type="number" min="0" step="500" class="w-40 rounded border p-2" placeholder="12000" />
          <button class="shrink-0 rounded border border-red-300 px-3 text-sm text-red-700" @click="boyutSil(i)">Sil</button>
        </div>
      </div>

      <!-- Mesafe çarpanları -->
      <div class="mb-8">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="font-semibold text-gray-800">Mesafe Çarpanları</h2>
          <button class="rounded bg-gray-800 px-3 py-1.5 text-sm text-white" @click="mesafeEkle">+ Satır ekle</button>
        </div>
        <p class="mb-3 text-sm text-gray-500">
          Taban ücret bu sayıyla çarpılıyor. Şehir içi genelde <strong>1</strong>; 1.45 → %45 daha pahalı.
        </p>
        <div v-for="(d, i) in form.distances" :key="'d' + i" class="mb-2 flex gap-2">
          <input v-model="d.label" type="text" class="w-full rounded border p-2" placeholder="Komşu şehir (0–300 km)" />
          <input v-model.number="d.multiplier" type="number" min="0.1" max="10" step="0.05" class="w-40 rounded border p-2" />
          <button class="shrink-0 rounded border border-red-300 px-3 text-sm text-red-700" @click="mesafeSil(i)">Sil</button>
        </div>
      </div>

      <!-- Diğer katsayılar -->
      <h2 class="mb-3 font-semibold text-gray-800">Diğer Katsayılar</h2>
      <div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label for="pe-kat" class="mb-1 block text-sm font-medium text-gray-600">Asansörsüz kat başı ek (TL)</label>
          <input id="pe-kat" v-model.number="form.floorFee" type="number" min="0" step="50" class="w-full rounded border p-2" />
          <p class="mt-1 text-xs text-gray-500">Zemin ve 1. kat ücretsiz sayılıyor.</p>
        </div>
        <div>
          <label for="pe-paket" class="mb-1 block text-sm font-medium text-gray-600">Paketleme çarpanı</label>
          <input id="pe-paket" v-model.number="form.packingMultiplier" type="number" min="1" max="3" step="0.01" class="w-full rounded border p-2" />
          <p class="mt-1 text-xs text-gray-500">1.18 → %18 ek.</p>
        </div>
        <div>
          <label for="pe-depo" class="mb-1 block text-sm font-medium text-gray-600">Depolama eki (TL)</label>
          <input id="pe-depo" v-model.number="form.storageFee" type="number" min="0" step="500" class="w-full rounded border p-2" />
        </div>
        <div>
          <label for="pe-aralik" class="mb-1 block text-sm font-medium text-gray-600">Aralık genişliği (%)</label>
          <input id="pe-aralik" v-model.number="form.rangePercent" type="number" min="0" max="50" class="w-full rounded border p-2" />
          <p class="mt-1 text-xs text-gray-500">15 → alt/üst sınır ±%15.</p>
        </div>
        <div>
          <label for="pe-yuvarla" class="mb-1 block text-sm font-medium text-gray-600">Yuvarlama (TL)</label>
          <input id="pe-yuvarla" v-model.number="form.roundTo" type="number" min="1" step="100" class="w-full rounded border p-2" />
          <p class="mt-1 text-xs text-gray-500">500 → en yakın 500 TL'ye yuvarlanır.</p>
        </div>
      </div>

      <div class="mb-6">
        <label for="pe-not" class="mb-1 block text-sm font-medium text-gray-600">Sonucun altındaki açıklama</label>
        <textarea id="pe-not" v-model="form.note" rows="3" class="w-full rounded border p-2"></textarea>
      </div>

      <button
        class="rounded bg-blue-600 px-5 py-2.5 font-medium text-white disabled:opacity-50"
        :disabled="kaydediliyor"
        @click="kaydet"
      >
        {{ kaydediliyor ? 'Kaydediliyor…' : 'Kaydet' }}
      </button>
    </template>
  </section>
</template>

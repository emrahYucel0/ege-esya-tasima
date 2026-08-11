<script setup>
/**
 * GÜVEN BANDI paneli — ana sayfada Hero'nun hemen altındaki rakamlar şeridi.
 *
 * Bu içerik önceden "Hizmetler" panelinin içindeydi; ana sayfadaki hizmetler
 * bölümü kaldırılınca o bağ anlamsız kaldı ve iki alakasız şey aynı ekranda
 * duruyordu. Artık kendi bölümü.
 */
import { onMounted, ref } from 'vue'

const BOS_OGE = () => ({ iconPath: '', value: '', label1: '', label2: '', order: 0 })

const form = ref({ sectionName: 'trust-bar', intro: '', items: [] })
const yukleniyor = ref(true)
const kaydediliyor = ref(false)
const durum = ref('')
const hata = ref('')

const getir = async () => {
  yukleniyor.value = true
  hata.value = ''
  try {
    const cevap = await $fetch('/api/trust-bar')
    const d = cevap?.data ?? cevap
    if (d && d.id) {
      form.value = {
        sectionName: d.sectionName || 'trust-bar',
        intro: d.intro || '',
        items: (d.items || []).map((i) => ({
          iconPath: i.iconPath || '',
          value: i.value || '',
          label1: i.label1 || '',
          label2: i.label2 || '',
          order: i.order ?? 0,
        })),
      }
    }
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Veri alınamadı'
  } finally {
    yukleniyor.value = false
  }
}

const ekle = () => form.value.items.push({ ...BOS_OGE(), order: form.value.items.length })
const sil = (i) => {
  form.value.items.splice(i, 1)
  form.value.items.forEach((o, n) => (o.order = n))
}
const tasi = (i, yon) => {
  const h = i + yon
  if (h < 0 || h >= form.value.items.length) return
  const [o] = form.value.items.splice(i, 1)
  form.value.items.splice(h, 0, o)
  form.value.items.forEach((x, n) => (x.order = n))
}

const kaydet = async () => {
  kaydediliyor.value = true
  durum.value = ''
  hata.value = ''
  try {
    const cevap = await $fetch('/api/trust-bar', { method: 'PUT', body: form.value })
    if (cevap?.success === false) throw new Error(cevap.error || 'Kaydedilemedi')
    durum.value = 'Kaydedildi.'
    await getir()
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Kaydedilemedi'
  } finally {
    kaydediliyor.value = false
  }
}

onMounted(getir)
</script>

<template>
  <section class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Güven Bandı</h1>
      <p class="mt-1 text-sm text-gray-500">
        Ana sayfada, ana görselin hemen altındaki rakamlar şeridi.
      </p>
    </header>

    <p v-if="hata" class="mb-4 rounded bg-red-50 p-3 text-sm text-red-700" role="alert">{{ hata }}</p>
    <output v-if="durum" class="mb-4 block rounded bg-green-50 p-3 text-sm text-green-700">{{ durum }}</output>

    <p v-if="yukleniyor" class="py-10 text-center text-gray-500">Yükleniyor…</p>

    <template v-else>
      <div class="mb-6">
        <label for="tb-intro" class="mb-1 block font-medium text-gray-700">Giriş Paragrafı</label>
        <textarea
          id="tb-intro"
          v-model="form.intro"
          rows="4"
          class="w-full rounded-lg border border-gray-300 p-3"
          placeholder="Rakamların yanında görünen kısa tanıtım metni"
        ></textarea>
      </div>

      <div class="mb-3 flex items-center justify-between">
        <h2 class="font-semibold text-gray-800">Rakamlar</h2>
        <button class="rounded bg-gray-800 px-3 py-1.5 text-sm text-white" @click="ekle">+ Rakam ekle</button>
      </div>

      <p v-if="!form.items.length" class="rounded border border-gray-200 bg-white py-8 text-center text-gray-500">
        Henüz rakam yok.
      </p>

      <ul class="space-y-3">
        <li v-for="(oge, i) in form.items" :key="i" class="rounded-lg border border-gray-200 bg-white p-4">
          <div class="grid gap-3 sm:grid-cols-4">
            <div>
              <label :for="`tb-value-${i}`" class="mb-1 block text-sm text-gray-600">Değer</label>
              <input :id="`tb-value-${i}`" v-model="oge.value" type="text" placeholder="12+" class="w-full rounded border border-gray-300 p-2" />
            </div>
            <div>
              <label :for="`tb-l1-${i}`" class="mb-1 block text-sm text-gray-600">Etiket 1. satır</label>
              <input :id="`tb-l1-${i}`" v-model="oge.label1" type="text" placeholder="Yıllık" class="w-full rounded border border-gray-300 p-2" />
            </div>
            <div>
              <label :for="`tb-l2-${i}`" class="mb-1 block text-sm text-gray-600">Etiket 2. satır</label>
              <input :id="`tb-l2-${i}`" v-model="oge.label2" type="text" placeholder="Deneyim" class="w-full rounded border border-gray-300 p-2" />
            </div>
            <div>
              <label :for="`tb-icon-${i}`" class="mb-1 block text-sm text-gray-600">İkon yolu (isteğe bağlı)</label>
              <input :id="`tb-icon-${i}`" v-model="oge.iconPath" type="text" placeholder="/images/shield.svg" class="w-full rounded border border-gray-300 p-2" />
            </div>
          </div>

          <div class="mt-3 flex gap-2">
            <button class="rounded border border-gray-300 px-2 py-1 text-sm" :disabled="i === 0" @click="tasi(i, -1)">↑</button>
            <button class="rounded border border-gray-300 px-2 py-1 text-sm" :disabled="i === form.items.length - 1" @click="tasi(i, 1)">↓</button>
            <button class="ml-auto rounded border border-red-300 px-3 py-1 text-sm text-red-700" @click="sil(i)">Sil</button>
          </div>
        </li>
      </ul>

      <button
        class="mt-6 rounded bg-blue-600 px-5 py-2.5 font-medium text-white disabled:opacity-50"
        :disabled="kaydediliyor"
        @click="kaydet"
      >
        {{ kaydediliyor ? 'Kaydediliyor…' : 'Kaydet' }}
      </button>
    </template>
  </section>
</template>

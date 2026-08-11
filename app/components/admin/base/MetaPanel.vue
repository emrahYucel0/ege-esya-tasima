<script setup>
/**
 * META PANELİ — sabit sayfaların arama sonucu başlığı ve açıklaması.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. SAYFA LİSTESİ EKSİKTİ. Liste elle yazılmıştı ve yalnızca 5 anahtar
 *    içeriyordu: home, about, region, blog, contact. Hizmetlerimiz
 *    (`services`) ve Fiyat Hesaplama (`fiyat-hesaplama`) sayfaları
 *    `usePageSeo` çağırdıkları hâlde burada seçilemiyordu — başlıkları
 *    panelden değiştirilemiyor, yani sabit gidiyordu. Üç politika
 *    sayfasının ise hiç meta verisi yoktu. Liste artık
 *    app/utils/sayfa-meta.ts kütüğünden geliyor; sayfa eklendiğinde
 *    burada da kendiliğinden çıkıyor.
 *
 * 2. HAM ANAHTARLAR GÖSTERİLİYORDU. Açılır listede "home", "region" gibi
 *    İngilizce anahtarlar yazıyordu; hangi sayfa olduğu belli değildi.
 *    Artık Türkçe ad ve sitedeki yolu görünüyor.
 *
 * 3. VARSAYILAN GÖRÜNMÜYORDU. Kaydı olmayan bir sayfa seçildiğinde form
 *    bomboş açılıyordu; admin o sayfada ŞU AN ne yayında olduğunu
 *    bilmiyordu ve boş alanı doldurmanın bir şeyi bozup bozmayacağını
 *    kestiremiyordu. Artık yürürlükteki varsayılan metin gösteriliyor ve
 *    tek tıkla forma alınabiliyor.
 *
 * 4. UZUNLUK UYARISI YOKTU. Google başlığı ~60, açıklamayı ~155 karakterden
 *    sonra kesiyor. Sayaç eklendi.
 *
 * 5. alert() KULLANILIYORDU. Diğer panellerin hiçbiri kullanmıyor; satır
 *    içi durum mesajına çevrildi.
 *
 * 6. VARSAYILANA DÖNÜŞ YOLU YOKTU. Kayıt bir kez oluşturulunca silinemiyordu
 *    (API'de DELETE vardı ama panelde düğmesi yoktu). Artık var.
 */
import { computed, onMounted, ref } from 'vue'

const secili = ref(SAYFA_METALARI[0].anahtar)
const form = ref({ title: '', description: '' })
const kayitliSayfalar = ref([])

const yukleniyor = ref(true)
const kaydediliyor = ref(false)
const durum = ref('')
const hata = ref('')

/** Seçili sayfanın kütükteki varsayılanı — kaydı yoksa siteye bu çıkıyor. */
const varsayilan = computed(() => sayfaMetasi(secili.value))

/** Bu sayfanın panelden girilmiş kendi kaydı var mı? */
const kaydiVar = computed(() => kayitliSayfalar.value.includes(secili.value))

const sayfaninKaydiVar = (anahtar) => kayitliSayfalar.value.includes(anahtar)

/** Kayıtlı sayfaların listesi — hangi sayfada özel metin var, tek bakışta. */
const kayitlariGetir = async () => {
  try {
    const cevap = await $fetch('/api/meta')
    const liste = cevap?.data ?? []
    kayitliSayfalar.value = Array.isArray(liste) ? liste.map((r) => r.page) : []
  } catch {
    kayitliSayfalar.value = []
  }
}

/**
 * $fetch kasıtlı (useFetch DEĞİL): sayfalar arasında geçiş yapıldığında
 * useFetch URL bazlı önbellekten eski veriyi döndürüyordu.
 */
const sayfayiGetir = async (anahtar) => {
  yukleniyor.value = true
  durum.value = ''
  hata.value = ''
  try {
    const cevap = await $fetch(`/api/meta?page=${encodeURIComponent(anahtar)}`)
    // Kayıt yoksa API `success:false` dönüyor — bu bir HATA DEĞİL, sayfanın
    // henüz özel metni yok demek. Form boş açılır, varsayılan yayındadır.
    form.value = cevap?.success
      ? { title: cevap.data?.title || '', description: cevap.data?.description || '' }
      : { title: '', description: '' }
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Veri alınamadı'
    form.value = { title: '', description: '' }
  } finally {
    yukleniyor.value = false
  }
}

const sayfaDegisti = async () => {
  await sayfayiGetir(secili.value)
}

/** Varsayılan metni forma alır — admin üzerinde düzenleyerek ilerleyebilsin. */
const varsayilaniAl = () => {
  form.value = {
    title: varsayilan.value.title,
    description: varsayilan.value.description,
  }
}

const kaydet = async () => {
  if (!form.value.title.trim()) {
    hata.value = 'Başlık boş bırakılamaz. Varsayılana dönmek için "Varsayılana dön" düğmesini kullanın.'
    return
  }
  kaydediliyor.value = true
  durum.value = ''
  hata.value = ''
  try {
    const cevap = await $fetch('/api/meta', {
      // Kayıt varsa güncelle, yoksa oluştur.
      method: kaydiVar.value ? 'PUT' : 'POST',
      body: {
        sectionName: 'metas',
        page: secili.value,
        title: form.value.title.trim(),
        description: form.value.description.trim(),
      },
    })
    if (cevap?.success === false) throw new Error(cevap.error || 'Kaydedilemedi')
    durum.value = 'Kaydedildi. Değişiklik sitede anında geçerli.'
    await kayitlariGetir()
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Kaydedilemedi'
  } finally {
    kaydediliyor.value = false
  }
}

const varsayilanaDon = async () => {
  if (!kaydiVar.value) return
  kaydediliyor.value = true
  durum.value = ''
  hata.value = ''
  try {
    const cevap = await $fetch('/api/meta', {
      method: 'DELETE',
      body: { page: secili.value },
    })
    if (cevap?.success === false) throw new Error(cevap.error || 'Silinemedi')
    durum.value = 'Özel metin kaldırıldı. Sayfa artık varsayılan metni kullanıyor.'
    form.value = { title: '', description: '' }
    await kayitlariGetir()
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Silinemedi'
  } finally {
    kaydediliyor.value = false
  }
}

/** Google başlığı ~60, açıklamayı ~155 karakterde kesiyor. */
const SINIR = { title: 60, description: 155 }
const asiyorMu = (alan) => (form.value[alan] || '').length > SINIR[alan]

onMounted(async () => {
  await kayitlariGetir()
  await sayfayiGetir(secili.value)
})
</script>

<template>
  <section class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Sayfa Başlık ve Açıklamaları</h1>
      <p class="mt-1 text-sm text-gray-500">
        Google arama sonucunda görünen başlık ve açıklama metinleri.
      </p>
    </header>

    <div class="mb-6 rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
      Boş bıraktığınız sayfalar hazır varsayılan metinlerini kullanır — hiçbir sayfa
      başlıksız kalmaz. Buraya yazdığınız metin varsayılanın yerine geçer.
      <strong>Blog yazıları, hizmet ve bölge sayfaları buraya dahil değildir;</strong>
      onların başlığı kendi kayıtlarından gelir.
    </div>

    <p v-if="hata" class="mb-4 rounded bg-red-50 p-3 text-sm text-red-700" role="alert">{{ hata }}</p>
    <output v-if="durum" class="mb-4 block rounded bg-green-50 p-3 text-sm text-green-700">{{ durum }}</output>

    <div class="mb-6">
      <label for="meta-sayfa" class="mb-1 block text-sm font-medium text-gray-600">Sayfa</label>
      <select
        id="meta-sayfa"
        v-model="secili"
        class="w-full rounded border p-2 sm:max-w-md"
        @change="sayfaDegisti"
      >
        <option v-for="s in SAYFA_METALARI" :key="s.anahtar" :value="s.anahtar">
          {{ s.etiket }} ({{ s.yol }}){{ sayfaninKaydiVar(s.anahtar) ? ' — özel metin' : '' }}
        </option>
      </select>
      <p class="mt-1 text-xs text-gray-500">
        "özel metin" işaretli sayfalarda buradan girilmiş bir metin var; diğerleri varsayılanı kullanıyor.
      </p>
    </div>

    <p v-if="yukleniyor" class="py-10 text-center text-gray-500">Yükleniyor…</p>

    <template v-else>
      <!-- Yürürlükteki varsayılan -->
      <div class="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <div class="mb-2 flex items-center justify-between gap-3">
          <p class="text-xs font-bold uppercase tracking-wider text-gray-400">
            Bu sayfanın varsayılan metni
          </p>
          <button type="button" class="shrink-0 rounded border px-3 py-1 text-xs text-gray-700" @click="varsayilaniAl">
            Forma al
          </button>
        </div>
        <p class="font-medium text-gray-800">{{ varsayilan.title }}</p>
        <p class="mt-1 text-sm text-gray-600">{{ varsayilan.description }}</p>
        <p v-if="!kaydiVar" class="mt-2 text-xs text-green-700">Şu an sitede bu metin yayında.</p>
      </div>

      <div class="mb-4">
        <label for="meta-baslik" class="mb-1 block text-sm font-medium text-gray-600">
          Başlık (Meta Title)
        </label>
        <input
          id="meta-baslik"
          v-model="form.title"
          type="text"
          class="w-full rounded border p-2"
          placeholder="Boş bırakılırsa varsayılan kullanılır"
        />
        <p class="mt-1 text-xs" :class="asiyorMu('title') ? 'text-amber-700' : 'text-gray-500'">
          {{ (form.title || '').length }} / {{ SINIR.title }} karakter
          <span v-if="asiyorMu('title')">— Google sonuç sayfasında kesebilir.</span>
        </p>
      </div>

      <div class="mb-6">
        <label for="meta-aciklama" class="mb-1 block text-sm font-medium text-gray-600">
          Açıklama (Meta Description)
        </label>
        <textarea
          id="meta-aciklama"
          v-model="form.description"
          rows="4"
          class="w-full rounded border p-2"
          placeholder="Boş bırakılırsa varsayılan kullanılır"
        ></textarea>
        <p class="mt-1 text-xs" :class="asiyorMu('description') ? 'text-amber-700' : 'text-gray-500'">
          {{ (form.description || '').length }} / {{ SINIR.description }} karakter
          <span v-if="asiyorMu('description')">— Google sonuç sayfasında kesebilir.</span>
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="rounded bg-blue-600 px-5 py-2.5 font-medium text-white disabled:opacity-50"
          :disabled="kaydediliyor"
          @click="kaydet"
        >
          {{ kaydediliyor ? 'Kaydediliyor…' : 'Kaydet' }}
        </button>

        <button
          v-if="kaydiVar"
          type="button"
          class="rounded border border-red-300 px-4 py-2.5 text-sm text-red-700 disabled:opacity-50"
          :disabled="kaydediliyor"
          @click="varsayilanaDon"
        >
          Varsayılana dön
        </button>
      </div>
    </template>
  </section>
</template>

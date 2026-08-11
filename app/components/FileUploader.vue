<script setup>
/**
 * GÖRSEL YÜKLEYİCİ — boyutlandırmayı TARAYICI yapar.
 *
 * NEDEN BÖYLE
 * Site paylaşımlı cPanel hosting'de yayınlanacak. Sunucuda görsel işlemek
 * (sharp) üç duvara toslar: bellek limiti, CPU kotası ve platforma özgü ikili
 * dosya sorunu. Bu yüzden işi seçim anında tarayıcıya yaptırıyoruz: canvas'a
 * çizip birkaç genişlikte webp üretiyor, sunucu yalnızca dosyayı diske yazıyor.
 *
 * Öncesinde seçilen dosya OLDUĞU GİBİ gönderiliyordu; panelden yüklenen
 * 8 MB'lık bir telefon fotoğrafı her mobil ziyaretçiye 8 MB olarak iniyordu.
 *
 * ÜRETİLEN ADLAR
 *   secilen.jpg → foto-320.webp, foto-640.webp, foto-1024.webp, foto-2048.webp
 * Kaynaktan geniş olanlar üretilmez (büyütme yok). Sayfa üretilmemiş bir
 * genişlik isterse sunucu en yakın mevcut varyantı döndürür.
 */
import { ref, computed } from 'vue'

const emit = defineEmits(['file-uploaded'])

/** Üretilecek genişlikler — statik boru hattıyla (scripts/gorsel-hazirla.mjs) uyumlu. */
const GENISLIKLER = [320, 640, 1024, 2048]

/**
 * Kaynak merdivenin son basamağını aşıyorsa kendi genişliğinde de bir varyant
 * üretilir — bu sınır ona tavan koyar.
 *
 * NEDEN GEREKLİ: önceden yalnızca `g <= kaynakGenişlik` olan basamaklar
 * üretiliyordu. 1536px'lik bir görselde 2048 elenip en büyük varyant 1024'te
 * kalıyordu, yani elde olan 512 pikselin yarısı çöpe gidiyordu. Kahraman
 * görsel `100vw` ile gösterildiği için sonuç gözle görülür bulanıklıktı.
 */
const AZAMI_GENISLIK = 2560
const WEBP_KALITE = 0.8

const secilenDosya = ref(null)
const onizlemeUrl = ref(null)
const durum = ref('')
const calisiyor = ref(false)
const hata = ref('')

const kb = (b) => `${Math.round(b / 1024)} KB`

const dosyaSecildi = (e) => {
  const dosya = e.target.files[0]
  hata.value = ''
  durum.value = ''
  if (!dosya) return
  secilenDosya.value = dosya
  onizlemeUrl.value = URL.createObjectURL(dosya)
}

/** Dosyayı bir HTMLImageElement'e yükler (canvas'a çizebilmek için). */
const gorselYukle = (dosya) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(dosya)
    const img = new Image()
    img.onload = () => { URL.revokeObjectURL(url); resolve(img) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Görsel okunamadı')) }
    img.src = url
  })

/** Verilen genişlikte webp Blob üretir. */
const varyantUret = (img, genislik) =>
  new Promise((resolve, reject) => {
    const oran = img.naturalHeight / img.naturalWidth
    const tuval = document.createElement('canvas')
    tuval.width = genislik
    tuval.height = Math.round(genislik * oran)

    const ctx = tuval.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, tuval.width, tuval.height)

    tuval.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Dönüştürme başarısız'))),
      'image/webp',
      WEBP_KALITE
    )
  })

/**
 * "Kaynak Foto (1).JPG" → "kaynak-foto-1-a3f9c2"
 *
 * Sondaki rastgele ek ÇAKIŞMA İÇİN: dosyalar artık gerçek adlarıyla diske
 * yazılıyor (eskiden UUID'ye eşleniyordu). Aynı adla ikinci bir yükleme
 * öncekinin üzerine yazsaydı, o görseli kullanan eski kayıtlar sessizce
 * değişirdi. Ek, her yüklemeyi benzersiz kılıyor.
 */
const tabanAd = (dosyaAdi) => {
  const temiz = dosyaAdi
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıI]/g, 'i')
    .replace(/[İ]/g, 'i').replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'gorsel'

  // crypto.randomUUID: Math.random'dan daha iyi dağılım, ayrıca linter'ın
  // "güvenli mi" uyarısını da doğuran belirsizliği ortadan kaldırıyor.
  const ek = crypto.randomUUID().slice(0, 6)
  return `${temiz}-${ek}`
}

const yukle = async () => {
  if (!secilenDosya.value || calisiyor.value) return
  calisiyor.value = true
  hata.value = ''

  try {
    const dosya = secilenDosya.value

    // SVG'de canvas'ın işi yok — vektör, zaten küçük, olduğu gibi gider.
    if (dosya.type === 'image/svg+xml') {
      durum.value = 'SVG olduğu gibi yükleniyor…'
      const fd = new FormData()
      fd.append('file', dosya, dosya.name)
      const cevap = await $fetch('/api/files', { method: 'POST', body: fd })
      emit('file-uploaded', cevap.files?.[0]?.url ?? cevap.file?.url)
      durum.value = 'Yüklendi.'
      return
    }

    durum.value = 'Görsel hazırlanıyor…'
    const img = await gorselYukle(dosya)
    const taban = tabanAd(dosya.name)

    // Kaynaktan geniş varyant üretilmez (büyütmenin faydası yok).
    let hedefler = GENISLIKLER.filter((g) => g <= img.naturalWidth)

    // Kaynak, seçilen en büyük basamaktan genişse kendi genişliğini de ekle —
    // aksi hâlde elde olan çözünürlük boşa gider (bkz. AZAMI_GENISLIK notu).
    const kaynakTavan = Math.min(img.naturalWidth, AZAMI_GENISLIK)
    if (hedefler.length === 0 || kaynakTavan > hedefler[hedefler.length - 1]) {
      hedefler.push(kaynakTavan)
    }

    const fd = new FormData()
    let toplam = 0
    for (const g of hedefler) {
      durum.value = `${g}px üretiliyor…`
      const blob = await varyantUret(img, g)
      toplam += blob.size
      fd.append('file', blob, `${taban}-${g}.webp`)
    }

    durum.value = `Yükleniyor… (${hedefler.length} boyut, ${kb(toplam)})`
    const cevap = await $fetch('/api/files', { method: 'POST', body: fd })

    const yuklenen = cevap.files ?? []
    if (yuklenen.length === 0) throw new Error('Sunucu dosya döndürmedi')

    // En büyük varyantın adresi kaydediliyor; sayfa daha küçüğünü isterse
    // sağlayıcı adresteki genişliği değiştiriyor.
    emit('file-uploaded', yuklenen[yuklenen.length - 1].url)
    durum.value = `Yüklendi — ${kb(dosya.size)} → ${kb(toplam)} (${hedefler.length} boyut)`
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Dosya yüklenemedi'
    durum.value = ''
  } finally {
    calisiyor.value = false
  }
}

const dugmeMetni = computed(() => (calisiyor.value ? 'İşleniyor…' : 'Resmi Yükle'))
</script>

<template>
  <div class="file-uploader">
    <label for="file-uploader-input" class="sr-only">Yüklenecek resim dosyasını seçin</label>
    <input
      id="file-uploader-input"
      type="file"
      accept="image/jpeg, image/png, image/webp, image/svg+xml"
      aria-label="Yüklenecek resim dosyasını seçin"
      @change="dosyaSecildi"
    >
    <button class="upload" :disabled="!secilenDosya || calisiyor" @click="yukle">
      {{ dugmeMetni }}
    </button>

    <!-- İlerleme ekran okuyucuya da bildirilsin diye canlı bölge kullanılıyor;
         rol taklidi yerine gerçek eleman tercih edildi, bazı mobil ekran
         okuyucular rol verilmiş paragrafı güvenilir biçimde duyurmuyor. -->
    <output v-if="durum" class="durum">{{ durum }}</output>
    <p v-if="hata" class="hata" role="alert">{{ hata }}</p>

    <div v-if="onizlemeUrl" class="preview">
      <img :src="onizlemeUrl" alt="Yüklenecek resmin önizlemesi" style="max-width: 300px;">
    </div>
  </div>
</template>

<style scoped>
.upload {
  background-color: rgb(var(--c-brand-700));
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: var(--r-md);
  font-weight: 600;
}

.upload:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.durum {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-muted));
}

.hata {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: rgb(var(--c-danger, 190 30 30));
}
</style>

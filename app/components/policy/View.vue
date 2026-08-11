<script setup>
/**
 * POLİTİKA SAYFASI GÖRÜNÜMÜ — üç yasal sayfanın ortak kabuğu.
 *
 * İçerik veritabanından geliyor (Admin > Politika Metinleri). Önceden her
 * sayfanın metni kendi Vue bileşeninin ŞABLONUNA gömülüydü; Gizlilik
 * Politikası var olmayan alt bileşenleri çağırdığı için canlıda tamamen
 * boş basılıyordu ve bunu hiçbir test yakalayamamıştı — şablona gömülü
 * içerik ne veritabanı denetiminde ne de içerik listelerinde görünür.
 *
 * Metin `article-prose` ile basılıyor: sanitizeHtml'den geçiyor ve
 * sitedeki diğer zengin metinlerle (blog, bölge) aynı tipografiyi
 * kullanıyor.
 */
const props = defineProps({
  slug: { type: String, required: true },
})

const { data: cevap } = await useFetch(`/api/policies?slug=${props.slug}`, {
  key: `policy-${props.slug}`,
})

const sayfa = computed(() => (cevap.value?.success ? cevap.value.data : null))

// Kayıt yoksa ya da yayından kaldırıldıysa 404. Boş bir yasal sayfa
// yayınlamaktansa bulunamadı demek doğru: tam olarak bu sayfaların
// başına gelen buydu.
if (!sayfa.value || sayfa.value.isActive === false) {
  throw createError({ statusCode: 404, statusMessage: 'Sayfa Bulunamadı' })
}

const guncellemeTarihi = computed(() => {
  const t = sayfa.value?.lastUpdated
  if (!t) return ''
  const d = new Date(t)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('tr-TR')
})
</script>

<template>
  <main>
    <ui-section tone="surface" labelledby="politika-baslik">
      <article class="politika">
        <header class="politika__ust">
          <h1 id="politika-baslik" class="politika__baslik">{{ sayfa.title }}</h1>
          <p v-if="sayfa.subtitle" class="politika__alt">{{ sayfa.subtitle }}</p>
          <p v-if="guncellemeTarihi" class="politika__tarih">
            Son güncelleme: <time :datetime="sayfa.lastUpdated">{{ guncellemeTarihi }}</time>
          </p>
        </header>

        <article-prose :html="sayfa.content" class="politika__govde" />
      </article>
    </ui-section>
  </main>
</template>

<style scoped>
.politika {
  margin: 0 auto;
  max-width: 52rem;
}

.politika__ust {
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgb(var(--c-line));
}

.politika__baslik {
  font-size: clamp(1.875rem, 1.4rem + 2vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: rgb(var(--c-ink));
  text-wrap: balance;
}

.politika__alt {
  margin-top: 0.75rem;
  max-width: 60ch;
  color: rgb(var(--c-ink-muted));
  line-height: 1.7;
  text-wrap: pretty;
}

.politika__tarih {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-muted));
}
</style>

<script setup>
/**
 * BLOG LİSTESİ
 *
 * Eski hâli `components/navbar/Post.vue` idi (klasör adı yanlıştı: navbar
 * ile ilgisi yok, sayfa gövdesi bileşeni).
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. BELİRME ANİMASYONU ÖLÜYDÜ. Kartlarda hem `data-reveal` hem de scoped
 *    `.service-card { opacity: 1; transform: translateY(0) }` kuralı
 *    vardı. İkisinin özgüllüğü eşit (0,2,0) ve scoped stiller global
 *    CSS'ten SONRA enjekte edildiği için yerel kural kazanıyor,
 *    `[data-reveal].is-hidden` hiç uygulanmıyordu. Yani `data-reveal`
 *    yazılmıştı ama çalışmıyordu. (Navbar'da hamburger'i `lg:hidden` ile
 *    gizlerken aynı tuzağa ben de düşmüştüm.)
 *
 * 2. ARAMA NULL BAŞLIKTA ÇÖKÜYORDU. `post.title.toLowerCase()` — `title`
 *    şemada opsiyonel (`String?`). Başlıksız tek bir kayıt tüm listeyi
 *    çökertiyordu. Arama artık başlığın yanı sıra özet metninde de arıyor.
 *
 * 3. SAYFA NUMARASI URL İLE SENKRON DEĞİLDİ. `currentPage` bir `ref`'e
 *    bir kez kopyalanıyordu; tarayıcının geri tuşu URL'i değiştiriyor ama
 *    liste eski sayfada kalıyordu. Artık doğrudan route'tan türetiliyor.
 *
 * 4. BOŞ DURUM YOKTU. Hiç yazı yokken ya da arama sonuç bulmazken sayfa
 *    bomboş bir ızgara gösteriyor, altında "Sayfa 1 / 0" yazıyordu.
 *
 * 5. YANLIŞ BÖLGE METNİ. Giriş paragrafı "Ege Bölgesi'nde nakliye" diyordu
 *    — eski marka kalıntısı. Site 81 ilde hizmet verdiğini söylüyor.
 *
 * 6. BAŞLIK TEKRARI VE SÜS KALABALIĞI. Sayfa başlığı zaten PageHeader'da
 *    <h1> olarak var; buradaki dev serif "Yazılarımız" başlığı, dört adet
 *    dekoratif etiket ("Paketleme İpuçları" vb. — hiçbiri gerçek bir
 *    filtre değildi, sadece görseldi) ve "* Tüm yazılarımız..." dipnotu
 *    ekranı doldurup asıl içeriği aşağı itiyordu.
 */
import { computed, ref, watch } from 'vue'

const PER_PAGE = 9

const route = useRoute()
const { data: response, error, pending } = await useFetch('/api/posts?light=true', {
  key: 'posts-light',
})

const posts = computed(() => (response.value?.success ? response.value.data || [] : []))

const searchQuery = ref('')

const normalize = (value) => String(value || '').toLocaleLowerCase('tr-TR')

const filtered = computed(() => {
  const term = normalize(searchQuery.value).trim()
  if (!term) return posts.value
  return posts.value.filter(
    (post) => normalize(post.title).includes(term) || normalize(post.excerpt).includes(term)
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)))

/** Sayfa numarası route'tan TÜRETİLİYOR; geri/ileri tuşları çalışsın diye. */
const currentPage = computed(() => {
  const raw = Number(route.query.sayfa)
  if (!Number.isFinite(raw) || raw < 1) return 1
  return Math.min(Math.trunc(raw), totalPages.value)
})

const paginated = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return filtered.value.slice(start, start + PER_PAGE)
})

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  navigateTo({ query: page > 1 ? { sayfa: page } : {} })
}

// Arama daraldığında mevcut sayfa listenin dışında kalabiliyor.
watch(searchQuery, () => {
  if (route.query.sayfa) navigateTo({ query: {} })
})

const listRef = ref(null)
useReveal(listRef)

const { siteUrl, brandName } = await useSiteSettings()

useHead({
  link: [
    {
      rel: 'canonical',
      href: () =>
        currentPage.value > 1
          ? `${siteUrl.value}/blog?sayfa=${currentPage.value}`
          : `${siteUrl.value}/blog`,
    },
    {
      rel: 'prev',
      href: () =>
        currentPage.value > 1
          ? `${siteUrl.value}/blog?sayfa=${currentPage.value - 1}`
          : undefined,
    },
    {
      rel: 'next',
      href: () =>
        currentPage.value < totalPages.value
          ? `${siteUrl.value}/blog?sayfa=${currentPage.value + 1}`
          : undefined,
    },
  ],
})
</script>

<template>
  <ui-section ref="listRef" tone="surface" labelledby="blog-baslik">
    <ui-heading
      id="blog-baslik"
      eyebrow="Nakliye Rehberi"
      title="Taşınmadan Önce Bilmek İsteyeceğiniz Her Şey"
      :description="`${brandName} ekibinin sahada edindiği deneyimi paylaştığı yazılar: fiyatın neye göre belirlendiğinden eşyanın nasıl paketlendiğine, sigortanın gerçekte neyi kapsadığından taşınma günü planına kadar.`"
      align="split"
    />

    <!-- Arama -->
    <div class="mx-auto mb-block max-w-xl">
      <label for="blog-arama" class="sr-only">Yazılarda ara</label>
      <div class="blog-search">
        <ui-icon name="search" :size="18" class="blog-search__icon" aria-hidden="true" />
        <input
          id="blog-arama"
          v-model="searchQuery"
          type="search"
          class="blog-search__input"
          placeholder="Yazılarda ara…"
          autocomplete="off"
        />
      </div>
    </div>

    <div v-if="pending" class="py-16 text-center text-ink-muted">
      <p>Yazılar yükleniyor…</p>
    </div>

    <div v-else-if="error" class="card p-8 text-center text-ink-muted">
      <p>Yazılar yüklenirken bir sorun oluştu.</p>
    </div>

    <template v-else>
      <base-empty-state
        v-if="!posts.length"
        message="Henüz yayınlanmış bir yazı bulunmuyor."
      />

      <base-empty-state
        v-else-if="!filtered.length"
        :message="`“${searchQuery}” için sonuç bulunamadı. Farklı bir kelime deneyebilirsiniz.`"
      />

      <template v-else>
        <div data-reveal-group class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <blog-card
            v-for="post in paginated"
            :key="post.id"
            data-reveal
            :post="post"
            :author-fallback="`${brandName} Ekibi`"
          />
        </div>

        <!-- Sayfalama: tek sayfa varsa hiç render edilmiyor. Eskiden yazı
             yokken bile "Sayfa 1 / 0" yazıyor ve "Sonraki" tıklanabilir
             kalıyordu. -->
        <nav v-if="totalPages > 1" class="blog-pager" aria-label="Sayfalar">
          <ui-button
            variant="outline"
            size="sm"
            icon="arrow-left"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            Önceki
          </ui-button>

          <p class="text-sm text-ink-muted" aria-live="polite">
            Sayfa {{ currentPage }} / {{ totalPages }}
          </p>

          <ui-button
            variant="outline"
            size="sm"
            trailing-icon="arrow-right"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Sonraki
          </ui-button>
        </nav>
      </template>
    </template>
  </ui-section>
</template>

<style scoped>
.blog-search {
  position: relative;
  display: flex;
  align-items: center;
}

.blog-search__icon {
  position: absolute;
  left: 1rem;
  color: rgb(var(--c-ink-subtle));
  pointer-events: none;
}

.blog-search__input {
  width: 100%;
  padding: 0.875rem 1.25rem 0.875rem 3rem;
  border: 1px solid rgb(var(--c-line-strong));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  color: rgb(var(--c-ink));
  transition: border-color var(--dur-fast) var(--ease-soft);
}

.blog-search__input::placeholder {
  color: rgb(var(--c-ink-subtle));
}

.blog-search__input:hover {
  border-color: rgb(var(--c-brand-600) / 0.5);
}

.blog-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: var(--space-block);
}
</style>

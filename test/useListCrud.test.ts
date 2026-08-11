// test/useListCrud.test.ts
// useListCrud saf bir composable: Nuxt'un auto-import'larına (ref, computed,
// reactive, useFetch, $fetch) global olarak güveniyor, hiçbir şey import
// etmiyor. Bu yüzden gerçek Vue reaktivitesini + sahte bir useFetch/$fetch'i
// global scope'a koyup dosyanın KENDİSİNİ test edebiliyoruz; tarayıcıya veya
// @nuxt/test-utils'in ağır Nitro ortamına ihtiyaç yok.
//
// Buradaki iki test, admin panelinde görülen iki gerçek hatayı koruma altına
// alıyor:
//   1. Pasif bölge "Düzenle" ile açılamıyordu — tekil kayıt isteği listenin
//      `?admin=true` yetkisini taşımıyordu.
//   2. Aktif/pasif geçişi ancak sayfa yenilenince görünüyordu — Nuxt 4'te
//      useFetch SHALLOW ref döndürüyor, ref'in içini değiştirmek reaktiviteyi
//      tetiklemiyor.
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref, shallowRef, computed, reactive, nextTick, type Ref } from 'vue'

// Son çağrılan $fetch URL'i ve seçenekleri — testler bunu inceliyor.
let sonIstek: { url: string; options?: any } | null = null
// useFetch'in döndüreceği veri; her test kendi listesini kuruyor.
let sunucuYaniti: Ref<any>

vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)
vi.stubGlobal('reactive', reactive)

// Nuxt 4'te useFetch varsayılan olarak SHALLOW ref döndürür
// (experimental.defaults.useAsyncData.deep = false). Hatanın kök sebebi tam
// olarak buydu, o yüzden sahte sürüm de shallowRef kullanmak ZORUNDA.
vi.stubGlobal('useFetch', () => ({
  data: sunucuYaniti,
  refresh: vi.fn(),
}))

vi.stubGlobal('$fetch', (url: string, options?: any) => {
  sonIstek = { url, options }
  return Promise.resolve({ success: true, data: { slug: 'akcaabat', title: 'Akçaabat', isActive: false } })
})

const { useListCrud } = await import('~/composables/useListCrud')

const bolgeler = () => [
  { slug: 'kadikoy', title: 'Kadıköy', isActive: true },
  { slug: 'akcaabat', title: 'Akçaabat', isActive: false },
]

describe('useListCrud', () => {
  beforeEach(() => {
    sonIstek = null
    sunucuYaniti = shallowRef({ success: true, data: bolgeler() })
  })

  describe('selectItem — tekil kayıt isteği', () => {
    it('listQuery yetkisini tekil kayda da taşır (pasif kayıt düzenlenebilsin)', async () => {
      const { selectItem } = useListCrud('regions', { slug: '' }, { listQuery: '?admin=true' })

      await selectItem('akcaabat')

      // Bu birleştirme olmadan istek `/api/regions?slug=akcaabat` gidiyordu ve
      // sunucu pasif kaydı "bulunamadı" diye reddediyordu.
      expect(sonIstek?.url).toBe('/api/regions?admin=true&slug=akcaabat')
    })

    it('listQuery yokken sade URL üretir', async () => {
      const { selectItem } = useListCrud('posts', { slug: '' })

      await selectItem('bir-yazi')

      expect(sonIstek?.url).toBe('/api/posts?slug=bir-yazi')
    })

    it('anahtarı URL-encode eder', async () => {
      const { selectItem } = useListCrud('regions', { slug: '' }, { listQuery: '?admin=true' })

      await selectItem('bir slug/iki')

      expect(sonIstek?.url).toBe('/api/regions?admin=true&slug=bir%20slug%2Fiki')
    })
  })

  describe('replaceItem — shallow ref altında reaktivite', () => {
    it('güncellenen kaydı items listesine yansıtır', async () => {
      const { items, replaceItem } = useListCrud('regions', { slug: '' }, { listQuery: '?admin=true' })

      expect(items.value.find((b: any) => b.slug === 'akcaabat').isActive).toBe(false)

      replaceItem({ slug: 'akcaabat', title: 'Akçaabat', isActive: true })
      await nextTick()

      // Eski kod ref'in İÇİNİ değiştiriyordu; shallowRef'te bu computed'i
      // tetiklemediği için burada hâlâ false görünürdü.
      expect(items.value.find((b: any) => b.slug === 'akcaabat').isActive).toBe(true)
      expect(items.value).toHaveLength(2)
    })

    it('listede olmayan kaydı sona ekler', async () => {
      const { items, replaceItem } = useListCrud('regions', { slug: '' }, { listQuery: '?admin=true' })

      replaceItem({ slug: 'yomra', title: 'Yomra', isActive: false })
      await nextTick()

      expect(items.value).toHaveLength(3)
      expect(items.value[2].slug).toBe('yomra')
    })

    it('sayfalı modda items alanını yerinde bırakmadan yeniler', async () => {
      sunucuYaniti = shallowRef({
        success: true,
        data: { items: bolgeler(), total: 2, page: 1, pageSize: 20, totalPages: 1 },
      })
      const { items, total, replaceItem } = useListCrud('posts', { slug: '' }, { paginated: true })

      replaceItem({ slug: 'kadikoy', title: 'Kadıköy', isActive: false })
      await nextTick()

      expect(items.value.find((b: any) => b.slug === 'kadikoy').isActive).toBe(false)
      // total gibi kardeş alanlar korunmalı (data objesi bütün olarak
      // yenileniyor, sadece items değişiyor).
      expect(total.value).toBe(2)
    })
  })
})

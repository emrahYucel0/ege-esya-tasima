// composables/useListCrud.ts
// Çoklu kayıtlı (Post, Region gibi) admin panelleri için ortak liste-CRUD state'i.
// useSectionCrud'un tekil-kayıt karşılığı: burada tek bir "form" değil, bir "items"
// listesi ve o listeden seçilip forma yüklenen tek bir kayıt var. Filtreleme,
// sayfalama, zengin metin editörü (TipTap) senkronizasyonu gibi panele özgü şeyler
// composable'ın dışında, panelin kendi template/script'inde kalır.
//
// POST/PUT kararı form[idField] (varsayılan "id") doluluğuna bakılarak veriliyor;
// DELETE ve listeden kayıt bulma ise keyField (varsayılan "slug") üzerinden yapılıyor
// — çünkü yeni oluşturulan bir kayıtta henüz id yokken slug zaten kullanıcı tarafından
// girilmiş oluyor, var olan API'ler de silme/bulma işlemlerini slug ile yapıyor.
export function useListCrud<T extends Record<string, any>>(
  apiPath: string,
  initialShape: T,
  options: { keyField?: string; idField?: string; listQuery?: string } = {}
) {
  const keyField = options.keyField || 'slug'
  const idField = options.idField || 'id'
  const listQuery = options.listQuery || ''

  const form = reactive({ ...initialShape }) as T
  const message = ref('')

  const { data } = useFetch(`/api/${apiPath}${listQuery}`)
  const items = computed(() => (data.value && (data.value as any).success ? (data.value as any).data : []))

  const resetForm = () => {
    Object.assign(form, initialShape)
  }

  const selectItem = (key: string | number) => {
    const found = items.value.find((item: any) => item[keyField] === key)
    if (found) {
      Object.assign(form, found)
    }
    return found
  }

  // items listesindeki bir kaydı ekler (yoksa) ya da yerine koyar (varsa).
  // save() içeride kullanır; toggleStatus gibi composable dışından yapılan
  // tekil güncellemeler için de dışa açılır.
  const replaceItem = (updated: any) => {
    if (!data.value) return
    const idx = items.value.findIndex((item: any) => item[keyField] === updated[keyField])
    if (idx === -1) {
      ;(data.value as any).data = [...items.value, updated]
    } else {
      ;(data.value as any).data = items.value.map((item: any) => (item[keyField] === updated[keyField] ? updated : item))
    }
  }

  const save = async () => {
    const method = (form as any)[idField] ? 'PUT' : 'POST'
    try {
      const response: any = await $fetch(`/api/${apiPath}`, { method, body: form })
      if (!response?.success) {
        message.value = method === 'POST' ? 'Oluşturma sırasında hata oluştu.' : 'Güncelleme sırasında hata oluştu.'
        return { success: false, error: response?.error }
      }
      replaceItem(response.data)
      message.value = method === 'POST' ? 'Başarıyla oluşturuldu!' : 'Başarıyla güncellendi!'
      return { success: true, data: response.data }
    } catch (err) {
      message.value = 'Kaydetme sırasında hata oluştu.'
      return { success: false }
    }
  }

  const remove = async (key: string | number) => {
    try {
      const response: any = await $fetch(`/api/${apiPath}?${keyField}=${encodeURIComponent(String(key))}`, { method: 'DELETE' })
      if (!response?.success) {
        message.value = 'Silme sırasında hata oluştu.'
        return { success: false }
      }
      if (data.value) {
        ;(data.value as any).data = items.value.filter((item: any) => item[keyField] !== key)
      }
      message.value = 'Kayıt silindi!'
      return { success: true }
    } catch {
      message.value = 'Silme sırasında hata oluştu.'
      return { success: false }
    }
  }

  return { form, message, items, resetForm, selectItem, save, remove, replaceItem }
}

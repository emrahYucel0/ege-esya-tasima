// utils/json.ts
//
// Prisma'nın `Json?` sütunlarını güvenle diziye çevirir.
//
// NEDEN GEREKLİ
// Şemadaki `Json?` alanlar (Region.cities, faqs, facts, neighborhoods,
// routes, priceFactors) üç farklı biçimde gelebiliyor:
//   - gerçek dizi        → sürücü çözümlemiş
//   - dizi yazılmış metin → panelden metin olarak kaydedilmiş eski kayıtlar
//   - null / undefined    → hiç doldurulmamış
// Şablonda `v-for` bir metin üzerinde çalıştırıldığında karakter karakter
// döner; sessiz ve fark edilmesi zor bir hata. Bu yüzden okuma noktalarının
// hepsi bu fonksiyondan geçiyor.
//
// Aynı çözümleme daha önce üç dosyada birebir kopyalanmıştı.

/**
 * @example parseJsonArray('[1,2]')  // [1, 2]
 * @example parseJsonArray(null)     // []
 * @example parseJsonArray('{"a":1}') // []  (dizi değil)
 */
export const parseJsonArray = <T = unknown>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[]
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? (parsed as T[]) : []
    } catch {
      return []
    }
  }
  return []
}

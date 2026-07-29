// test/setup.ts
// server/utils/*.ts dosyaları Nitro tarafından auto-import edilen global'lere
// (useRuntimeConfig, createError, getCookie, useStorage) güvenir — bunlar
// gerçek bir Nitro sunucusu dışında mevcut değildir. Vitest bu dosyaları
// düz Node modülleri olarak çalıştırdığı için, testlerin ihtiyaç duyduğu
// gerçek davranışı üreten minimal sahte (fake) sürümlerini burada global
// scope'a enjekte ediyoruz.
import { vi } from 'vitest'
import { createStorage } from 'unstorage'
import memoryDriver from 'unstorage/drivers/memory'

const testRuntimeConfig = {
  authSecret: 'test-secret-do-not-use-in-production',
}

vi.stubGlobal('useRuntimeConfig', () => testRuntimeConfig)

// h3'ün createError'ı statusCode/statusMessage taşıyan bir Error fırlatır —
// testlerin ihtiyaç duyduğu tek davranış bu, h3'ün kendisini import etmeye gerek yok.
vi.stubGlobal('createError', (opts: { statusCode?: number; statusMessage?: string } = {}) => {
  const error = new Error(opts.statusMessage || 'Error') as Error & { statusCode?: number; statusMessage?: string }
  error.statusCode = opts.statusCode
  error.statusMessage = opts.statusMessage
  return error
})

// getAuthUser/requireAdmin bir H3Event bekler; testlerde gerçek bir event yerine
// { cookies: Record<string,string> } şeklinde basit bir sahte event kullanıyoruz —
// getCookie bunu okuyacak şekilde stub'lanıyor (gerçek h3'ün cookie parse mantığı
// test kapsamı dışında, burada sadece auth.ts'in KULLANIM şekli test ediliyor).
vi.stubGlobal('getCookie', (event: any, name: string) => event?.cookies?.[name])

// rateLimit.ts için: gerçek unstorage memory driver'ı kullanıyoruz (sahte bir
// Map yerine) ki getItem/setItem/removeItem'ın gerçek davranışı test edilsin.
const testStorage = createStorage({ driver: memoryDriver() })
vi.stubGlobal('useStorage', () => testStorage)

// Testler arası state sızıntısını önlemek için dışa aç — ilgili test dosyaları
// beforeEach'te bunu çağırır.
export { testStorage }

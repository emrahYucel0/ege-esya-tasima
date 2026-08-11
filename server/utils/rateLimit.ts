// server/utils/rateLimit.ts
// Basit brute-force koruması. Nitro'nun yerleşik useStorage() (unstorage)
// katmanını kullanır. Şu an sadece /api/login için kullanılıyor ama anahtar
// (key) parametreli olduğu için başka bir endpoint'te de (örn. şifre
// sıfırlama) aynen kullanılabilir.
//
// Depolama sürücüsü nuxt.config.ts'teki nitro.storage['rate-limit'] mount'una
// bağlı: REDIS_URL tanımlıysa Redis (yatay ölçeklemede sayaçlar tüm
// instance'lar arasında paylaşılır), tanımlı değilse bellek-içi (in-memory,
// tek instance'lık kurulumlar için yeterli, sunucu yeniden başlatıldığında
// sıfırlanır). Bu dosya hangi sürücünün aktif olduğunu bilmez/bilmesine
// gerek yok — useStorage() ile şeffaf şekilde çalışır.
const WINDOW_MS = 15 * 60 * 1000 // 15 dakika

// Varsayılan sınır login için seçilmişti. Artık başka uç noktalar da bu
// aracı kullanıyor (iletişim formu, dönüşüm olayı kaydı) ve onların makul
// sınırı farklı — bu yüzden değer parametreye taşındı. Verilmezse davranış
// eskisiyle birebir aynı kalıyor.
const MAX_ATTEMPTS = 5

interface AttemptRecord {
  count: number
  firstAttempt: number
}

function getStorage() {
  return useStorage('rate-limit')
}

export interface RateLimitStatus {
  blocked: boolean
  retryAfterSeconds?: number
}

export async function isRateLimited(key: string, maxAttempts = MAX_ATTEMPTS): Promise<RateLimitStatus> {
  const record = await getStorage().getItem<AttemptRecord>(key)
  if (!record) return { blocked: false }

  const now = Date.now()
  if (now - record.firstAttempt > WINDOW_MS) return { blocked: false }

  if (record.count >= maxAttempts) {
    return { blocked: true, retryAfterSeconds: Math.ceil((record.firstAttempt + WINDOW_MS - now) / 1000) }
  }
  return { blocked: false }
}

export async function recordFailedAttempt(key: string, maxAttempts = MAX_ATTEMPTS): Promise<RateLimitStatus> {
  const storage = getStorage()
  const now = Date.now()
  const record = await storage.getItem<AttemptRecord>(key)

  if (!record || now - record.firstAttempt > WINDOW_MS) {
    await storage.setItem<AttemptRecord>(key, { count: 1, firstAttempt: now })
    return { blocked: false }
  }

  const updated: AttemptRecord = { count: record.count + 1, firstAttempt: record.firstAttempt }
  await storage.setItem(key, updated)

  if (updated.count >= maxAttempts) {
    return { blocked: true, retryAfterSeconds: Math.ceil((updated.firstAttempt + WINDOW_MS - now) / 1000) }
  }
  return { blocked: false }
}

export async function clearRateLimit(key: string): Promise<void> {
  await getStorage().removeItem(key)
}

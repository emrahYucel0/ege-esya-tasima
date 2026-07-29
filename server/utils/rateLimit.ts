// server/utils/rateLimit.ts
// Basit, bağımlılıksız brute-force koruması. Nitro'nun yerleşik useStorage()
// (unstorage) katmanını kullanır — ek bir paket gerekmez. Şu an sadece
// /api/login için kullanılıyor ama anahtar (key) parametreli olduğu için
// başka bir endpoint'te de (örn. şifre sıfırlama) aynen kullanılabilir.
//
// Not: varsayılan storage sürücüsü bellek-içi (in-memory) — tek instance'lık
// bu ölçekteki uygulama için yeterli, ama sunucu yeniden başlatıldığında
// sayaçlar sıfırlanır ve birden fazla instance'ta (yatay ölçekleme) sayaçlar
// paylaşılmaz. Üretimde yatay ölçekleme gerekirse nitro.config'te bu storage
// mount noktasına Redis gibi kalıcı bir sürücü bağlanmalı.
const WINDOW_MS = 15 * 60 * 1000 // 15 dakika
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

export async function isRateLimited(key: string): Promise<RateLimitStatus> {
  const record = await getStorage().getItem<AttemptRecord>(key)
  if (!record) return { blocked: false }

  const now = Date.now()
  if (now - record.firstAttempt > WINDOW_MS) return { blocked: false }

  if (record.count >= MAX_ATTEMPTS) {
    return { blocked: true, retryAfterSeconds: Math.ceil((record.firstAttempt + WINDOW_MS - now) / 1000) }
  }
  return { blocked: false }
}

export async function recordFailedAttempt(key: string): Promise<RateLimitStatus> {
  const storage = getStorage()
  const now = Date.now()
  const record = await storage.getItem<AttemptRecord>(key)

  if (!record || now - record.firstAttempt > WINDOW_MS) {
    await storage.setItem<AttemptRecord>(key, { count: 1, firstAttempt: now })
    return { blocked: false }
  }

  const updated: AttemptRecord = { count: record.count + 1, firstAttempt: record.firstAttempt }
  await storage.setItem(key, updated)

  if (updated.count >= MAX_ATTEMPTS) {
    return { blocked: true, retryAfterSeconds: Math.ceil((updated.firstAttempt + WINDOW_MS - now) / 1000) }
  }
  return { blocked: false }
}

export async function clearRateLimit(key: string): Promise<void> {
  await getStorage().removeItem(key)
}

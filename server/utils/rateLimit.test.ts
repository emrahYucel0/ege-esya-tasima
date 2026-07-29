import { beforeEach, describe, expect, it, vi } from 'vitest'
import { testStorage } from '../../test/setup'
import { clearRateLimit, isRateLimited, recordFailedAttempt } from './rateLimit'

// server/api/login.ts brute-force korumasının dayandığı pencere/sayaç mantığı.
// MAX_ATTEMPTS=5, WINDOW_MS=15dk (rateLimit.ts içinde sabit) — burada kara
// kutu olarak, sadece dışa açık davranış test ediliyor.
describe('rate limiting (login brute-force koruması)', () => {
  beforeEach(async () => {
    await testStorage.clear()
    vi.useRealTimers()
  })

  it('hiç deneme yokken bloklu değildir', async () => {
    expect(await isRateLimited('login:1.2.3.4')).toEqual({ blocked: false })
  })

  it('4 başarısız denemeden sonra hâlâ bloklu değildir (limit 5)', async () => {
    const key = 'login:1.2.3.4'
    for (let i = 0; i < 4; i++) await recordFailedAttempt(key)
    expect(await isRateLimited(key)).toEqual({ blocked: false })
  })

  it('5. başarısız denemede bloklanır ve retryAfterSeconds döner', async () => {
    const key = 'login:1.2.3.4'
    let lastStatus
    for (let i = 0; i < 5; i++) lastStatus = await recordFailedAttempt(key)
    expect(lastStatus!.blocked).toBe(true)
    expect(lastStatus!.retryAfterSeconds).toBeGreaterThan(0)

    const status = await isRateLimited(key)
    expect(status.blocked).toBe(true)
    expect(status.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('clearRateLimit sayaçları sıfırlar (başarılı girişten sonra)', async () => {
    const key = 'login:1.2.3.4'
    for (let i = 0; i < 5; i++) await recordFailedAttempt(key)
    expect((await isRateLimited(key)).blocked).toBe(true)

    await clearRateLimit(key)
    expect(await isRateLimited(key)).toEqual({ blocked: false })
  })

  it('farklı IP anahtarları birbirinden bağımsızdır', async () => {
    const keyA = 'login:1.1.1.1'
    const keyB = 'login:2.2.2.2'
    for (let i = 0; i < 5; i++) await recordFailedAttempt(keyA)

    expect((await isRateLimited(keyA)).blocked).toBe(true)
    expect((await isRateLimited(keyB)).blocked).toBe(false)
  })

  it('pencere (WINDOW_MS) dolunca sayaç sıfırlanmış gibi davranır', async () => {
    const key = 'login:1.2.3.4'
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    for (let i = 0; i < 5; i++) await recordFailedAttempt(key)
    expect((await isRateLimited(key)).blocked).toBe(true)

    // 15 dakikalık pencereden sonra (16 dk ileri al)
    vi.setSystemTime(new Date('2026-01-01T00:16:00.000Z'))
    expect((await isRateLimited(key)).blocked).toBe(false)

    vi.useRealTimers()
  })
})

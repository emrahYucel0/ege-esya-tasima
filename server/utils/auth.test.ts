import { describe, expect, it } from 'vitest'
import { getAuthUser, requireAdmin, signAuthPayload } from './auth'

// getCookie/createError/useRuntimeConfig test/setup.ts'te stub'landı.
// Sahte H3Event: auth.ts sadece getCookie(event, 'auth') üzerinden event'i
// okuyor, bu yüzden { cookies } şekli test.setup.ts'teki stub ile yeterli.
function fakeEvent(cookieValue?: string): any {
  return { cookies: cookieValue !== undefined ? { auth: cookieValue } : {} }
}

describe('signAuthPayload + getAuthUser (round-trip)', () => {
  it('imzalanan payload doğru şekilde çözülüp geri okunur', () => {
    const event = fakeEvent()
    const signed = signAuthPayload({ id: 7, role: 'admin' }, event)
    const readEvent = fakeEvent(signed)
    expect(getAuthUser(readEvent)).toEqual({ id: 7, role: 'admin' })
  })

  it('cookie yoksa null döner', () => {
    expect(getAuthUser(fakeEvent())).toBeNull()
  })

  it('nokta ("." ayırıcı) içermeyen bozuk bir cookie null döner', () => {
    expect(getAuthUser(fakeEvent('noktasiz-bozuk-deger'))).toBeNull()
  })

  it('payload değiştirilip imza aynı bırakılırsa (tahrifat) reddedilir', () => {
    const event = fakeEvent()
    const signed = signAuthPayload({ id: 7, role: 'user' }, event)
    const [encodedPayload, signature] = signed.split('.')
    const tamperedPayload = Buffer.from(JSON.stringify({ id: 7, role: 'admin' })).toString('base64url')
    const tampered = `${tamperedPayload}.${signature}`
    expect(getAuthUser(fakeEvent(tampered))).toBeNull()
  })

  it('yanlış imzayla oluşturulmuş cookie reddedilir', () => {
    const event = fakeEvent()
    const signed = signAuthPayload({ id: 1, role: 'admin' }, event)
    const [encodedPayload] = signed.split('.')
    const forged = `${encodedPayload}.${'a'.repeat(43)}`
    expect(getAuthUser(fakeEvent(forged))).toBeNull()
  })
})

describe('requireAdmin', () => {
  it('role admin olan geçerli bir cookie ile kullanıcıyı döner', () => {
    const event = fakeEvent()
    const signed = signAuthPayload({ id: 3, role: 'admin' }, event)
    expect(requireAdmin(fakeEvent(signed))).toEqual({ id: 3, role: 'admin' })
  })

  it('role admin olmayan bir kullanıcıda 401 fırlatır', () => {
    const event = fakeEvent()
    const signed = signAuthPayload({ id: 3, role: 'user' }, event)
    expect(() => requireAdmin(fakeEvent(signed))).toThrow()
    try {
      requireAdmin(fakeEvent(signed))
    } catch (err: any) {
      expect(err.statusCode).toBe(401)
    }
  })

  it('cookie hiç yoksa 401 fırlatır', () => {
    expect(() => requireAdmin(fakeEvent())).toThrow()
  })
})

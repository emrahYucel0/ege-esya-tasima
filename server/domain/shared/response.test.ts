import { describe, expect, it } from 'vitest'
import { fail, ok } from './response'

// useSectionCrud/useListCrud composable'ları (frontend) bu zarfın şeklini
// ({success, data|error}) doğrudan varsayıyor — burada kırılırsa 16 admin
// paneli aynı anda bozulur.
describe('ok/fail response envelope', () => {
  it('ok() success:true ve data taşır', () => {
    const result = ok({ id: 1 })
    expect(result).toEqual({ success: true, data: { id: 1 } })
  })

  it('ok() message verilmezse response objesinde message alanı olmaz', () => {
    const result = ok({ id: 1 })
    expect('message' in result).toBe(false)
  })

  it('ok() message verilirse response objesine dahil edilir', () => {
    const result = ok({ id: 1 }, 'Kaydedildi')
    expect(result).toEqual({ success: true, data: { id: 1 }, message: 'Kaydedildi' })
  })

  it('fail() success:false ve error mesajı taşır', () => {
    const result = fail('Bir hata oluştu')
    expect(result).toEqual({ success: false, error: 'Bir hata oluştu' })
  })
})

// Herkese açık yorum ucunun sözleşmesi.
//
// NEDEN VAR
// `/api/testimonials-section` GET'i uzun süre yalnızca `isActive: true`
// filtreliyordu ve alan seçimi yoktu. Siteden gelen yorumlar
// `isApproved: false` ama `isActive: true` olarak oluştuğu için, ziyaretçinin
// gönderdiği her yorum onaylanmadan yayına giriyor ve `email` alanı da
// dışarı çıkıyordu.
//
// Kardeş uç `/api/reviews` doğru yazılmıştı; hata iki ucun aynı kuralı
// bağımsız uygulamasından doğdu. Bu test iki ucu birbirine bağlıyor: beyaz
// liste tek kaynaktan geliyor mu, onay filtresi duruyor mu.
import { describe, it, expect } from 'vitest'
import { HERKESE_ACIK_ALANLAR } from '../../reviews/reviews.public-fields'

// Yapılandırma nesnesini prisma'ya bağlanmadan okumak için dosyayı kaynak
// olarak inceliyoruz: config modülünü import etmek prisma istemcisini
// başlatır ve testin veritabanına ihtiyacı olurdu.
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const kaynak = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'testimonials-section.config.ts'),
  'utf8'
)

// `getInclude` bloğunu ayıklar — yalnızca herkese açık GET bunu kullanıyor.
const getIncludeBlogu = () => {
  const i = kaynak.indexOf('getInclude:')
  expect(i, 'getInclude tanımı bulunamadı').toBeGreaterThan(-1)
  return kaynak.slice(i, i + 400)
}

describe('herkese açık yorum ucu', () => {
  it('yalnızca ONAYLI yorumları döndürmeli', () => {
    expect(getIncludeBlogu()).toContain('isApproved: true')
  })

  it('aktiflik filtresi de durmalı', () => {
    expect(getIncludeBlogu()).toContain('isActive: true')
  })

  it('alan beyaz listesi kullanmalı, tüm sütunları dökmemeli', () => {
    expect(getIncludeBlogu()).toContain('select: HERKESE_ACIK_ALANLAR')
  })

  it('beyaz liste kardeş uçla aynı kaynaktan gelmeli', () => {
    expect(kaynak).toContain("from '../../reviews/reviews.public-fields'")
  })
})

describe('beyaz liste', () => {
  it('email içermemeli — kişisel veri', () => {
    expect(Object.keys(HERKESE_ACIK_ALANLAR)).not.toContain('email')
  })

  it('moderasyon alanlarını dışarı vermemeli', () => {
    const alanlar = Object.keys(HERKESE_ACIK_ALANLAR)
    expect(alanlar).not.toContain('isApproved')
    expect(alanlar).not.toContain('source')
  })

  it('yorumu göstermek için gereken alanları içermeli', () => {
    const alanlar = Object.keys(HERKESE_ACIK_ALANLAR)
    for (const gerekli of ['customerName', 'rating', 'comment', 'date']) {
      expect(alanlar).toContain(gerekli)
    }
  })
})

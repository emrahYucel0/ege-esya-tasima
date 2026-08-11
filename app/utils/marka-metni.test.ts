import { describe, it, expect } from 'vitest'
import { belirtmeHali, markaMetni } from './marka-metni'

describe('belirtmeHali — Türkçe belirtme eki', () => {
  it('kalın düz ünlüden sonra -ı verir', () => {
    expect(belirtmeHali('Eve Nakliyat')).toBe("Eve Nakliyat'ı")
    expect(belirtmeHali('Kayra')).toBe("Kayra'yı")
  })

  it('ince düz ünlüden sonra -i verir', () => {
    expect(belirtmeHali('EveNakliyatEvden')).toBe("EveNakliyatEvden'i")
    expect(belirtmeHali('Egemen')).toBe("Egemen'i")
  })

  it('kalın yuvarlak ünlüden sonra -u verir', () => {
    expect(belirtmeHali('Bosphorus')).toBe("Bosphorus'u")
  })

  it('ince yuvarlak ünlüden sonra -ü verir', () => {
    expect(belirtmeHali('Gözde Nakliyat Grubü')).toBe("Gözde Nakliyat Grubü'yü")
  })

  it('ünlüyle biten ada kaynaştırma y ekler', () => {
    expect(belirtmeHali('Ege Nakliye')).toBe("Ege Nakliye'yi")
    expect(belirtmeHali('Anadolu')).toBe("Anadolu'yu")
  })

  it('hiç ünlü yoksa ince kabul eder, patlamaz', () => {
    expect(belirtmeHali('XYZ')).toBe("XYZ'i")
  })

  it('boş girdide boş döner', () => {
    expect(belirtmeHali('')).toBe('')
    expect(belirtmeHali('   ')).toBe('')
  })
})

describe('markaMetni', () => {
  it('düz yer tutucuyu değiştirir', () => {
    expect(markaMetni('{marka} ile taşınmak', 'Eve Nakliyat')).toBe('Eve Nakliyat ile taşınmak')
  })

  it('belirtme hâli yer tutucusunu doğru ekle değiştirir', () => {
    expect(markaMetni("Neden {marka'yı} tercih etmelisiniz?", 'Eve Nakliyat')).toBe(
      "Neden Eve Nakliyat'ı tercih etmelisiniz?"
    )
  })

  it('aynı metinde iki yer tutucuyu birlikte çözer', () => {
    expect(markaMetni("{marka'yı} seçin, {marka} yanınızda", 'Anadolu')).toBe(
      "Anadolu'yu seçin, Anadolu yanınızda"
    )
  })

  it('yer tutucu yoksa metne dokunmaz', () => {
    const m = 'Sıradan bir cümle'
    expect(markaMetni(m, 'Eve Nakliyat')).toBe(m)
  })

  it('null ve undefined güvenli', () => {
    expect(markaMetni(null, 'X')).toBe('')
    expect(markaMetni(undefined, 'X')).toBe('')
  })
})

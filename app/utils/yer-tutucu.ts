// app/utils/yer-tutucu.ts
//
// "Örnek/test/lorem" gibi YER TUTUCU metinleri yakalar.
//
// NEDEN AYRI BİR DOSYA — ve neden `\b` KULLANILMIYOR
//
// İlk hâli `/\börnek\b|\bornek\b|\btest\b|lorem/i` idi ve SESSİZCE ÇALIŞMIYORDU.
// Sebep: JavaScript'te `\b` sınırı `\w` üzerinden tanımlı, `\w` ise yalnızca
// [A-Za-z0-9_]. Türkçe "ö" bir `\w` karakteri değil. Dolayısıyla
// "(örnek)" dizesinde "(" ile "ö" arasında sınır OLUŞMUYOR:
//
//     /\börnek/.test('(örnek)')  →  false      ← yakalamıyor
//     /örnek/.test('(örnek)')    →  true
//
// Sonuç: panelde "3 örnek yorum yayında" uyarısı için yazdığım kontrol,
// tam da yakalaması gereken "Ayşe K. (örnek)" kaydını görmüyordu. Çalışmayan
// bir güvenlik ağı, olmayan güvenlik ağından daha tehlikeli — insan ona
// güvenip kontrolü bırakıyor.
//
// Çözüm: Unicode harf sınırı. `\p{L}` tüm dillerdeki harfleri kapsıyor,
// `u` bayrağı zorunlu. Böylece "Örnektepe Mahallesi" ve "Testere ustası"
// gibi meşru metinler yanlış alarm üretmiyor.
const YER_TUTUCU_DESENI =
  /(?<!\p{L})(örnek|ornek|test|lorem|ipsum|deneme|placeholder|dummy)(?!\p{L})/iu

/** Metin yer tutucu izi taşıyor mu? */
export const yerTutucuMu = (metin: unknown): boolean =>
  typeof metin === 'string' && YER_TUTUCU_DESENI.test(metin)

/** Verilen alanlardan herhangi biri yer tutucu izi taşıyor mu? */
export const yerTutucuIceriyorMu = (...alanlar: unknown[]): boolean =>
  alanlar.some(yerTutucuMu)

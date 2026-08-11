/**
 * YAZI TİPİ ALT KÜMELEME — latin-ext'i Türkçeye indirger.
 *
 *     npm run font-altkume
 *
 * NEDEN
 * Google Fonts'un hazır `latin-ext` alt kümesi 85 KB. Canlı Lighthouse
 * ölçümünde kritik yolun EN UZUN halkasıydı: 3.858 ms. Sebep, alt kümenin
 * Latin Genişletilmiş'in tamamını taşıması (U+0100-02BA, U+1D00-1DBF,
 * U+1E00-1E9F, U+2C60-2C7F, U+A720-A7FF …) ve değişken font olduğu için her
 * glifin birden çok ana çizimle gelmesi.
 *
 * ÖLÇÜM
 * Sitedeki tüm içerik tarandı (veritabanı + şablonlar; 2.050.881 karakter,
 * 155 benzersiz kod noktası). `latin` alt kümesinin dışında kalan ve Inter'de
 * karşılığı olan karakterler yalnızca şunlar:
 *
 *     Ğ ğ İ Ş ş   (U+011E-011F, U+0130, U+015E-015F)
 *     ₺           (U+20BA)
 *
 * Diğerleri (← → ★ ⚙ ⚠ ve emoji) zaten Inter'de yok; sistem yazı tipinden
 * geliyorlar.
 *
 * Romence ș/ț (U+0218-021B) güvenlik payı olarak ekleniyor: Türkçe metinlerde
 * ş yerine sıkça yanlış yazılıyorlar ve alt kümede olmasalar tofu çıkardı.
 *
 * SONUÇ: 85.068 → 3.668 bayt (%95,7). Değişken eksen (wght) korunuyor.
 *
 * GEREKSİNİM
 *   pip install fonttools brotli
 *
 * Kaynak dosyalar `fonts-kaynak/` altında tutuluyor (tam sürümler). Yeni bir
 * Inter sürümüne geçilirse tam dosyalar oraya konur ve bu komut tekrar
 * çalıştırılır.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'

const KOK = process.cwd()
const KAYNAK = path.join(KOK, 'fonts-kaynak', 'inter-latin-ext-tam.woff2')
const HEDEF = path.join(KOK, 'public', 'fonts', 'inter-latin-ext.woff2')

// fonts.css içindeki `unicode-range` ile AYNI olmalı — biri değişirse diğeri de.
const KARAKTERLER = 'U+011E-011F,U+0130,U+015E-015F,U+0218-021B,U+20BA'

if (!existsSync(KAYNAK)) {
  console.error(`Kaynak yok: ${path.relative(KOK, KAYNAK)}`)
  console.error('Tam sürüm Inter latin-ext dosyasını oraya koyun.')
  process.exit(1)
}

const oncesi = statSync(KAYNAK).size

const sonuc = spawnSync(
  'python',
  [
    '-m',
    'fontTools.subset',
    KAYNAK,
    `--output-file=${HEDEF}`,
    '--flavor=woff2',
    `--unicodes=${KARAKTERLER}`,
  ],
  { encoding: 'utf8' }
)

if (sonuc.status !== 0) {
  console.error('Alt kümeleme başarısız.')
  console.error(sonuc.stderr || sonuc.stdout)
  console.error('\nfonttools kurulu mu?  pip install fonttools brotli')
  process.exit(1)
}

const sonrasi = statSync(HEDEF).size
const azalma = (100 * (oncesi - sonrasi)) / oncesi

console.log(`kaynak : ${oncesi.toLocaleString('tr')} bayt`)
console.log(`hedef  : ${sonrasi.toLocaleString('tr')} bayt`)
console.log(`azalma : %${azalma.toFixed(1)}`)
console.log(`\nkarakterler: ${KARAKTERLER}`)
console.log('Bu liste app/assets/css/fonts.css içindeki unicode-range ile aynı olmalı.')

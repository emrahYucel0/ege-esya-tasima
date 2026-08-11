/**
 * VERİTABANI BAĞLANTI TEŞHİSİ — sunucuda çalıştırılmak üzere.
 *
 *     node scripts/db-baglanti-testi.mjs
 *
 * cPanel'de: Setup Node.js App → uygulamanızın satırında "Run JS script"
 * düğmesi var; oraya `scripts/db-baglanti-testi.mjs` yazın. Terminal
 * erişiminiz varsa doğrudan da çalıştırabilirsiniz.
 *
 * NEDEN AYRI BİR BETİK
 * Uygulama üretim modunda veritabanı hatasının SEBEBİNİ tarayıcıya
 * göstermiyor (bilerek — bkz. server/utils/prismaError.ts). Sayfa açılıyor
 * ama içerik boş geliyor ve sebep görünmüyor. Bu betik aynı bağlantıyı
 * kurup hatayı OLDUĞU GİBİ yazdırıyor ve en sık dört hatayı Türkçe
 * açıklıyor.
 *
 * Sürücü, dağıtım paketinin içinden alınıyor; sunucuda `npm install`
 * gerekmiyor.
 */
import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import path from 'node:path'

const require = createRequire(import.meta.url)
const KOK = process.cwd()

const url = process.env.DATABASE_URL
if (!url) {
  console.error('✗ DATABASE_URL tanımlı değil.')
  console.error('  cPanel → Setup Node.js App → Environment variables bölümüne ekleyin.')
  console.error('  Ekledikten sonra uygulamayı RESTART etmeyi unutmayın.')
  process.exit(1)
}

// Adresi parolasız yazdır — günlükte parola görünmesin.
let cozulmus
try {
  const u = new URL(url)
  cozulmus = {
    host: u.hostname,
    port: u.port || '3306',
    kullanici: decodeURIComponent(u.username),
    veritabani: decodeURIComponent(u.pathname.replace(/^\//, '')),
    parolaVar: u.password.length > 0,
  }
} catch {
  console.error('✗ DATABASE_URL biçimi hatalı. Beklenen:')
  console.error('  mysql://KULLANICI:PAROLA@localhost:3306/VERITABANI')
  process.exit(1)
}

console.log('DATABASE_URL çözümlendi:')
console.log(`  host       : ${cozulmus.host}`)
console.log(`  port       : ${cozulmus.port}`)
console.log(`  kullanıcı  : ${cozulmus.kullanici}`)
console.log(`  veritabanı : ${cozulmus.veritabani}`)
console.log(`  parola     : ${cozulmus.parolaVar ? 'var' : 'YOK — eksik olabilir'}`)

if (cozulmus.host !== 'localhost' && cozulmus.host !== '127.0.0.1') {
  console.log(`\n  UYARI: host "${cozulmus.host}". Uygulama veritabanıyla aynı`)
  console.log('  makinede çalışıyorsa "localhost" olmalı. Dış adres cPanel →')
  console.log('  Remote MySQL bölümünden IP izni gerektirir.')
}

// mariadb sürücüsünü dağıtım paketinin içinden bul.
const adaylar = [
  path.join(KOK, '.output/server/node_modules/mariadb'),
  path.join(KOK, 'node_modules/mariadb'),
]
const surucuYolu = adaylar.find((y) => existsSync(y))
if (!surucuYolu) {
  console.error('\n✗ mariadb sürücüsü bulunamadı. Aranan yerler:')
  for (const y of adaylar) console.error(`    ${y}`)
  console.error('  Betiği uygulama kökünden çalıştırın (.output klasörünün yanından).')
  process.exit(1)
}

const mariadb = require(surucuYolu)

console.log('\nbağlanılıyor...')
let baglanti
try {
  baglanti = await mariadb.createConnection({
    host: cozulmus.host,
    port: Number(cozulmus.port),
    user: cozulmus.kullanici,
    password: new URL(url).password,
    database: cozulmus.veritabani,
    connectTimeout: 10000,
    // MySQL 8'in caching_sha2_password eklentisinde, parola yanlışsa sürücü
    // önce RSA anahtar değişimi deniyor ve gerçek hata (ACCESS_DENIED) yerine
    // ER_CANNOT_RETRIEVE_RSA_KEY dönüyor. Bu seçenek gerçek hatanın görünmesini
    // sağlıyor. Yalnızca bu teşhis betiğinde açık; uygulama bunu kullanmıyor.
    allowPublicKeyRetrieval: true,
  })
} catch (hata) {
  console.error('\n✗ BAĞLANTI KURULAMADI')
  console.error(`  kod  : ${hata.code || '(yok)'}`)
  console.error(`  mesaj: ${hata.message}`)
  console.error('\n  En sık sebepler:')
  const k = String(hata.code || '')
  if (k.includes('ACCESS_DENIED')) {
    console.error('  → Kullanıcı adı/parola yanlış YA DA kullanıcı bu veritabanına eklenmemiş.')
    console.error('    cPanel → MySQL Databases → "Add User To Database" → ALL PRIVILEGES.')
    console.error('    Kullanıcı adının başında hesap ön eki olmalı (örn. httpdqwu1_kullanici).')
  } else if (k.includes('UNKNOWN_DATABASE') || k.includes('BAD_DB')) {
    console.error('  → Veritabanı adı yanlış. cPanel adların başına hesap ön eki ekler.')
  } else if (k.includes('ECONNREFUSED') || k.includes('ETIMEDOUT') || k.includes('ENOTFOUND')) {
    console.error('  → Adrese ulaşılamıyor. host "localhost" olmalı; dış adres')
    console.error('    kullanıyorsanız Remote MySQL izni gerekiyor.')
  } else if (k.includes('RSA')) {
    console.error('  → Sunucu caching_sha2_password kullanıyor ve el sıkışma tamamlanmadı.')
    console.error('    Neredeyse her zaman PAROLA YANLIŞ demek. Parolayı kontrol edin.')
  } else {
    console.error('  → Yukarıdaki mesajı olduğu gibi paylaşın.')
  }
  process.exit(1)
}

console.log('✓ bağlantı kuruldu')

const say = async (tablo) => {
  try {
    const s = await baglanti.query(`SELECT COUNT(*) AS n FROM \`${tablo}\``)
    return Number(s[0].n)
  } catch (h) {
    return `HATA: ${h.code || h.message}`
  }
}

console.log('\ntablo kayıt sayıları:')
for (const t of ['Region', 'Post', 'Service', 'User', 'SiteSettings', 'HeroPage']) {
  console.log(`  ${t.padEnd(14)} ${await say(t)}`)
}

const bolge = await say('Region')
console.log()
if (bolge === 0) {
  console.log('✗ Region tablosu BOŞ — bağlantı çalışıyor ama veri yok.')
  console.log('  SQL yedeği içe aktarılmamış ya da BAŞKA bir veritabanına aktarılmış.')
  console.log('  phpMyAdmin\'de soldaki listeden doğru veritabanını seçip Import yapın.')
} else if (typeof bolge === 'number') {
  const aktif = await baglanti
    .query('SELECT COUNT(*) AS n FROM `Region` WHERE isActive = 1')
    .then((r) => Number(r[0].n))
    .catch(() => '?')
  console.log(`✓ Veri var: ${bolge} bölge (${aktif} aktif).`)
  console.log('  Bağlantı ve veri sorunsuz. Sorun devam ediyorsa uygulamayı RESTART edin;')
  console.log('  ortam değişkenleri yalnızca yeniden başlatınca okunur.')
}

await baglanti.end()

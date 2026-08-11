# Yayına Alma Adımları — cPanel

Bu dosya, `npm run build` çalıştırıldıktan sonra izlenecek adımları içerir.
Her adımın sonunda **nasıl doğrulanacağı** yazıyor; doğrulamayı atlamayın.

---

## 0) Yüklenecek dosyalar

`.output` klasörünün **tek başına yeterli olduğu ölçülerek doğrulandı**:
proje kökünden bağımsız bir klasöre yalnızca `.output` kopyalanıp
çalıştırıldı; ana sayfa, veritabanı okuyan bölge sayfası, bcrypt ile giriş
ve sitemap sorunsuz çalıştı. Prisma istemcisi, mariadb sürücüsü ve bcrypt
paketin içine gömülü.

**Bunun pratik sonucu:** sunucuda `npm install` YAPILMAYACAK, `node_modules`
ve `prisma/` klasörleri YÜKLENMEYECEK.

| Ne | Nereye | Not |
|---|---|---|
| `.output/` (tamamı) | uygulama kökü | 22 MB |
| `deploy/.htaccess` | `public_html/.htaccess` | Passenger bloğunun ALTINA eklenecek |
| `yuklemeler/` | `/home/httpdqwu1/yuklemeler` | panelden yüklenen görseller |
| `scripts/yedekle.mjs` | uygulama kökü | yalnızca yedek cron'u için |
| `deploy/app.mjs` | uygulama kökü | **yalnızca gerekirse** — bkz. adım 2 |

**Yüklenmeyecekler:** `.env`, `node_modules/`, `prisma/`, `app/`, `server/`,
`yedekler/`, `.nuxt/`, `gorsel-kaynak/`.

> `.env` özellikle yüklenmemeli. İçindeki aktif `DATABASE_URL` **local**
> adresi (`root@localhost`). Sunucuya giderse uygulama yanlış veritabanına
> bağlanmayı deneyip hata verir ve sebebini bulmak zaman alır. Ortam
> değişkenleri adım 3'te panelden girilecek.

---

## 1) Veritabanı

1. cPanel → MySQL Databases → veritabanı ve kullanıcı oluştur, kullanıcıyı
   veritabanına **ALL PRIVILEGES** ile ekle.
2. phpMyAdmin → Import → `yedekler/` klasöründeki **en güncel** `.sql`
   dosyasını yükle.

**Doğrulama:** phpMyAdmin'de `Region` tablosunda kayıt sayısı, local'deki
sayıyla aynı olmalı. Local sayıyı öğrenmek için:
`node --env-file=.env scripts/kirik-gorsel-tara.mjs` çalıştırmadan önce
panelden bakabilirsiniz.

---

## 2) Node uygulaması

cPanel → **Setup Node.js App** → Create Application

| Alan | Değer |
|---|---|
| Node.js version | 20 veya üzeri |
| Application mode | Production |
| Application root | (örn. `nakliye`) |
| Application URL | evenakliyatevden.com |
| Application startup file | `.output/server/index.mjs` |

Startup file alanı alt klasör yolunu kabul etmezse: `deploy/app.mjs`
dosyasını uygulama kökine kopyalayıp startup file olarak `app.mjs` verin.

---

## 3) Ortam değişkenleri

Aynı ekranda "Environment variables" bölümüne:

```
DATABASE_URL              mysql://httpdqwu1_KULLANICI:PAROLA@localhost:3306/httpdqwu1_VERITABANI
NUXT_AUTH_SECRET          (.env'deki AUTH_SECRET değeri)
NUXT_MAIL_SMTP_AUTH_PASS  (.env'deki MAIL_PASSWORD değeri)
NODE_ENV                  production
```

**Host neden `localhost`:** uygulama veritabanıyla aynı makinede çalışıyor.
`.env`'deki yorum satırında yazan dış adres (`cp66.servername.co`) hem daha
yavaş hem de cPanel → Remote MySQL bölümünden IP izni gerektirir; izin
verilmemişse bağlantı hiç kurulmaz.

`NUXT_SITE_URL` ve `NUXT_SITE_NAME` **gerekmiyor** — derlemedeki
varsayılanlar zaten doğru. Diğer mail alanları da öyle; yalnızca parola
dışarıdan veriliyor.

**Doğrulama:** `NUXT_AUTH_SECRET` girilmezse panele giriş **500** verip
"AUTH_SECRET tanımlı değil" der. Sessiz bir hata değildir; giriş
deneyerek test edin.

---

## 4) .htaccess

`deploy/.htaccess` içeriğini `public_html/.htaccess` dosyasına, cPanel'in
otomatik yazdığı Passenger bloğunun **altına** ekleyin.

İçindeki `/home/httpdqwu1/yuklemeler` yolundaki `httpdqwu1`, veritabanı
adındaki ön ekten çıkarılmış cPanel hesap adıdır. **Doğrulayın** — cPanel
ana ekranındaki bilgi kutusunda yazar. Yanlışsa panelden yüklenen tüm
görseller 404 döner.

---

## 5) IP kısıtlaması (test için)

`.htaccess` içindeki **0) YAYIN ÖNCESİ IP KISITLAMASI** bloğunun başındaki
`#` işaretlerini kaldırın ve kendi IP'nizi yazın (https://ifconfig.me).

- Mobil IP'nizi de ikinci satır olarak ekleyin — ev IP'niz değişirse
  kendinizi kilitlemeyin.
- cPanel Dosya Yöneticisi'nden bu dosyayı düzenleyebildiğinizi önceden
  teyit edin.

**Doğrulama:** kendi bağlantınızdan site açılmalı; telefondan mobil veriyle
(o IP listede yoksa) **403** gelmeli.

---

## 6) Search Console — site kapalıyken

Doğrulamayı **DNS TXT kaydı** yöntemiyle yapın. Bu yöntem siteye erişim
gerektirmez, IP kısıtlaması açıkken de çalışır. Böylece siteyi açtığınız an
sitemap'i gönderebilirsiniz.

---

## 7) Aç ve doğrula

1. `.htaccess`'teki IP bloğunu **tekrar yoruma alın**.
2. Cloudflare kullanıyorsanız önbelleği temizleyin (403 önbelleğe alınmış
   olabilir).
3. Şu üç kontrolü **gözünüzle** yapın:

```
https://evenakliyatevden.com/robots.txt
   → "Disallow:" satırının KARŞISI BOŞ olmalı.
     "Disallow: /" görürseniz site indekslenmez — durun ve haber verin.

https://evenakliyatevden.com/sitemap.xml
   → <loc> satırları görünmeli.

https://evenakliyatevden.com/
   → 200 ve içerik dolu.
```

4. Tam duman testini canlıya karşı çalıştırın:

```bash
node scripts/duman-testi.mjs https://evenakliyatevden.com
```

30'dan fazla kontrol yapar; sayfaların yalnızca 200 dönmesine değil,
veriden gelmesi gereken metnin gerçekten basıldığına bakar. Örnek bölgeyi
canlıdaki aktif kayıtlardan kendisi seçer.

5. Search Console'a sitemap'i gönderin.

---

## 8) Yayın sonrası

**Yedekleme cron'u.** `scripts/yedekle.mjs` `mysqldump` çağırıyor; cPanel'de
mysqldump mevcut. Günlük bir cron:

```
0 3 * * * cd /home/httpdqwu1/nakliye && DATABASE_URL="..." node scripts/yedekle.mjs /home/httpdqwu1/yedekler
```

Yedekleri **sunucu dışına** da kopyalayın; sunucu çökerse yedek de gider.

**Yeni sürüm atarken:** yalnızca `.output` değişir. `yuklemeler/` klasörüne
DOKUNMAYIN — panelden yüklenen tüm görseller orada.

**Bekleyen uyarılar** (`npm run hazir-mi` ile görülebilir): logo, Google
Analytics kimliği, konum koordinatı, fiyat aralığı. Hiçbiri yayını
engellemiyor, ilk hafta içinde panelden doldurulabilir.

**Bölge açma:** 375 bölgenin 45'i aktif, 330'u pasif. Panelden il filtresiyle
seçip kademeli açın. Aktif ettiğiniz sayfa anında yayına girer; sitemap'e
girmesi **10 dakika** sürer (sitemap önbelleği `cacheMaxAgeSeconds: 600`).
Bu bir hata değildir.

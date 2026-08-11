// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // DİZİN YAPISI — Nuxt 4 standardı (`app/`).
  // Uygulama kaynağı app/ altında: components, composables, layouts,
  // middleware, pages, utils, assets, app.vue, error.vue.
  // Kökte kalanlar: server/, public/, prisma/, test/ ve yapılandırmalar.
  //
  // ALIAS ANLAMI BURADA DEĞİŞİYOR, dikkat:
  //     ~  ve  @   → app/        (srcDir)
  //     ~~ ve  @@  → proje kökü  (rootDir)
  // Bu yüzden aşağıdaki `~/assets/css/...` yolları doğrudur. Sunucu kodu ise
  // birbirine göreli yolla bağlanıyor (bkz. server/api/*.ts) — srcDir bir daha
  // değişirse etkilenmesin diye bilinçli tercih.
  //
  // vitest.config.ts'teki alias tablosu bu tanımla AYNI olmak zorunda; aksi
  // hâlde testler ile uygulama aynı yazımı farklı yerlere çözer.

  // usePageSeo/useSiteSettings composable'ları await sonrasında başka
  // composable'lar (useAsyncData) çağırdığı için Nuxt instance context'inin
  // await sınırları arasında korunması gerekiyor.
  experimental: {
    asyncContext: true,
  },

  // @prisma/nuxt BİLEREK YOK. Tek verdiği şey `usePrismaClient` otomatik
  // import'u ve devtools sekmesiydi; ikisini de kullanmıyoruz — veritabanına
  // her zaman kendi singleton'ımız (lib/prisma.ts) üzerinden gidiyoruz.
  // Buna karşılık modül `@nuxt/kit ^3.11.2`ye çakılıydı ve bakımı durmuştu;
  // hem Nuxt 4'ü hem Prisma 7'yi tıkayan tek paket oydu. Prisma istemcisi
  // artık `prisma generate` ile üretiliyor (bkz. postinstall).
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    // NOT: "nuxt-mail" BİLEREK KALDIRILDI.
    //
    // Kullanılmıyordu — teklif formu kendi ucumuza (/api/leads) POST ediyor
    // ve orada nodemailer doğrudan çağrılıyor. Buna karşılık modül iki zarar
    // veriyordu:
    //
    // 1. POSTA GÖNDERİMİNİ BOZUYORDU. Modül `runtimeConfig.mail.message`
    //    OBJESİNİ DİZİYE çeviriyor. Kodumuz `config.mail.message.to` diye
    //    okuduğu için alıcı `undefined` kalıyor ve nodemailer
    //    "No recipients defined" hatası veriyordu. Yani SMTP parolası doğru
    //    olduğu hâlde hiçbir teklif bildirimi gitmiyordu.
    // 2. KULLANILMAYAN BİR UÇ AÇIYORDU. `POST /mail/send` kimlik doğrulaması
    //    istemeden 200 dönüyordu. Açık röle değildi (alıcıyı istemciden
    //    almıyor) ama gereksiz saldırı yüzeyiydi.
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],

  routeRules: {
    "/admin": { robots: "noindex, nofollow" },
    "/admin/**": { robots: "noindex, nofollow" },
    "/evdeneveyonetim": { robots: "noindex, nofollow" },
    "/evdeneveyonetim/**": { robots: "noindex, nofollow" },
  },

  // NOT: Burada `.prisma/client/index-browser` için bir Vite alias'ı vardı.
  // @prisma/nuxt'un Prisma'yı istemci paketine sokma girişimine karşı
  // konulmuş bir takozdu; modül kalkınca tarayıcı tarafında Prisma'ya atıf
  // kalmadığı için alias da gereksizleşti.

  ssr: true,

  // ŞABLON YORUMLARI HTML'E BASILMASIN.
  //
  // Üretim derlemesi zaten hepsini atıyordu (ölçüldü: canlı çıktıda yazdığımız
  // yorumlardan 0 tane var). Ama GELİŞTİRME modunda Vue onları koruyor —
  // `npm run dev` ile bakıldığında kaynakta 85 yorum görünüyordu. Bu ayar
  // ikisini eşitliyor: artık iki modda da basılmıyorlar.
  //
  // NOT: `<!--[-->`, `<!--]-->` ve `<!--v-if-->` bu ayardan ETKİLENMEZ ve
  // etkilenmemeli — onlar yorum değil, Vue'nun hidrasyon işaretleri.
  // Tarayıcı sunucudan gelen HTML'i bunlarla eşleştiriyor; silinirlerse
  // hidrasyon bozulur ve sayfa istemcide yeniden çizilir.
  vue: {
    compilerOptions: {
      comments: false,
    },
  },
  target: "server",

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  app: {
    head: {
      htmlAttrs: { lang: "tr" },

      // Inter artık KENDİ SUNUCUMUZDAN geliyor (assets/css/fonts.css +
      // public/fonts/). Buradaki üç Google Fonts <link>'i kaldırıldı:
      // googleapis.com'dan CSS → gstatic.com'dan woff2 şeklindeki iki
      // aşamalı, iki ayrı sunuculu gecikme zinciri ve her ziyaretçinin
      // IP'sinin Google'a gitmesi ortadan kalktı. Gerekçenin tamamı
      // assets/css/fonts.css başlığında.
      //
      // Font Awesome CDN linki de daha önce kaldırılmıştı: kod tabanında
      // hiçbir yerde fa-/fas/far/fab class'ı kullanılmıyor (site tamamen
      // inline SVG ikonlar kullanıyor) — tamamen kullanılmayan, render
      // engelleyen bir harici stylesheet'ti.
      link: [
        // Yazı tipi CSS'te @font-face ile tanımlı olduğu için tarayıcı onu
        // ancak CSSOM kurulduktan SONRA keşfeder. Preload, indirmeyi HTML
        // taranırken başlatır.
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/inter-latin.woff2",
          crossorigin: "anonymous",
        },
        // LATIN-EXT DE ÖN YÜKLENİYOR — önceden yüklenmiyordu.
        //
        // Eski gerekçe "tarayıcı unicode-range'e bakıp gerektiğinde kendisi
        // çeker" idi. Doğru ama pahalı: keşif ancak CSS ayrıştırılıp metin
        // yerleşimi yapıldıktan sonra oluyordu ve canlı Lighthouse ölçümünde
        // bu dosya kritik yolda 3.858 ms'ye çıkmıştı.
        //
        // Türkçe her sayfada ş/ğ/İ geçtiği için dosya ZATEN her zaman
        // indiriliyor — "gerektiğinde" diye beklemenin bir kazancı yok.
        // Alt kümeleme sonrası boyutu 3,7 KB; ön yüklemenin maliyeti yok.
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/inter-latin-ext.woff2",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  // Sıra önemli:
  // fonts.css  — @font-face tanımları, hiçbir şeye bağımlı değil, en başta.
  // tokens.css — main.css (ve Tailwind'in ürettiği tüm sınıflar) içindeki
  //              var(--…) referansları bu dosyada tanımlanıyor.
  css: ["~/assets/css/fonts.css", "~/assets/css/tokens.css", "~/assets/css/main.css"],

  // NOT: Bu dosyada daha önce İKİ ayrı `postcss` anahtarı vardı; ikincisi
  // birincisini sessizce eziyordu, dolayısıyla cssnano hiçbir zaman
  // çalışmıyordu (CSS minify edilmiyordu). Tek anahtarda birleştirildi.
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === "production"
          ? { preset: ["default", { discardComments: { removeAll: true } }] }
          : false,
    },
  },

  // MARKA ADININ TEK SABİT NOKTASI.
  //
  // Çalışma anındaki gerçek kaynak Site Ayarları (veritabanı) — site her
  // yerde onu okuyor. Buradaki `name` yalnızca YEDEK: ayar satırı henüz
  // oluşmadıysa ya da okunamıyorsa devreye giriyor. Ayrıca sitemap ve
  // og-image modülleri derleme anında bu değeri istiyor, veritabanına
  // erişemiyorlar.
  //
  // `NUXT_SITE_URL` / `NUXT_SITE_NAME` ortam değişkenleriyle ezilebilir —
  // yani başka bir siteye taşırken bu dosyaya dokunmak gerekmiyor.
  site: {
    url: process.env.NUXT_SITE_URL || "https://evenakliyatevden.com",
    name: process.env.NUXT_SITE_NAME || "EveNakliyatEvden",
  },

  // GÖRSELLER — sunucuda işleme YOK.
  //
  // Burada eskiden `imgix` sağlayıcısı `baseURL: "/"` ile tanımlıydı ve 18
  // bileşen `provider="imgix"` diyordu. imgix ücretli bir CDN; hesap yok,
  // adres de kendi sitemize bakıyordu. Sonuç: NuxtImg imgix biçiminde sorgu
  // dizeleri üretiyordu (`?w=1800&fm=webp&q=78`), sunucu bunları tanımayıp
  // HAM dosyayı veriyordu. Ölçüldü: istenen 900w ve 1800w'nin ikisi de aynı
  // 113 KB'lık JPEG'e çıkıyordu — yani tüm optimizasyon ayarları etkisizdi.
  //
  // Varsayılan IPX'e dönmek de doğru olmazdı: site paylaşımlı cPanel
  // hosting'de yayınlanacak ve IPX her istekte sharp çalıştırır — orada
  // bellek limiti, CPU kotası ve platforma özgü ikili dosya sorunu var.
  // Bunun yerine varyantlar derleme ÖNCESİ üretiliyor
  // (scripts/gorsel-hazirla.mjs) ve aşağıdaki sağlayıcı yalnızca doğru
  // dosyayı seçiyor. Böylece sharp dağıtım paketine hiç girmiyor.
  image: {
    provider: "statik",
    providers: {
      statik: {
        name: "statik",
        provider: "~/providers/statik.ts",
      },
    },
    domains: ["evenakliyatevden.com", "cdn.evenakliyatevden.com"],
    quality: 70,
    format: ["webp"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET || "",
    mail: {
      smtp: {
        host: process.env.MAIL_HOST || "mail.evenakliyatevden.com",
        port: parseInt(process.env.MAIL_PORT || "587", 10),
        secure: process.env.MAIL_SECURE === "true" || false,
        auth: {
          user: process.env.MAIL_USER || "info@evenakliyatevden.com",
          pass: process.env.MAIL_PASSWORD || "",
        },
      },
      message: {
        // Gönderici bir E-POSTA ADRESİ olmalı; buradaki varsayılan da
        // "mail.evenakliyatevden.com" (sunucu adı) yazıyordu. MAIL_FROM
        // tanımsızsa kimlik doğrulanan hesaba düşülüyor — çoğu SMTP
        // sunucusu zaten göndericinin o hesapla aynı olmasını istiyor.
        from:
          process.env.MAIL_FROM ||
          process.env.MAIL_USER ||
          "info@evenakliyatevden.com",
        to: process.env.MAIL_TO || "info@evenakliyatevden.com",
      },
    },
  },

  hooks: {
    "app:error": (err: any) => {
      if ([500, 503].includes(err.statusCode)) return false;
    },
  },

  nitro: {
    // SIKIŞTIRMA — JS/CSS/font için derleme zamanında .gz ve .br üretilir.
    //
    // Ölçüldü: sıkıştırma tamamen kapalıydı, ana sayfa 437 KB ham iniyordu.
    // Bu ayar STATİK varlıkları kapsıyor; SSR ile üretilen HTML'i kapsamıyor
    // (her istekte yeniden üretildiği için önceden sıkıştırılamaz). HTML'in
    // sıkıştırması cPanel'de Apache mod_deflate katmanında yapılıyor —
    // bkz. deploy/.htaccess. İki katman birlikte tüm yanıtları kapsıyor.
    compressPublicAssets: { gzip: true, brotli: true },

    // PANELDEN YÜKLENEN GÖRSELLER — server/routes/yuklemeler/[...ad].get.ts
    //
    // Burada bir `publicAssets` tanımı DENENDİ ve işe yaramadı: Nitro statik
    // varlıkları derleme zamanında çıkarılan bir manifest'ten servis ediyor.
    // Çalışma anında yazılan bir dosya .output/public içine elle konsa bile
    // 404 dönüyor (ölçüldü). Dolayısıyla kullanıcı yüklemeleri statik varlık
    // mekanizmasıyla verilemiyor; kendi rotamız gerekiyor.
    //
    // O rota, eski `/api/files/...` rotasının eksiklerini kapatıyor: ETag ve
    // Last-Modified gönderiyor (tekrar ziyarette 304, sıfır bayt), uzun
    // Cache-Control veriyor ve istek başına veritabanı sorgusu yapmıyor.
    //
    // cPanel'de bir adım daha var: `/yuklemeler/` yolunu .htaccess ile
    // Passenger'a hiç uğratmadan Apache'ye verirsen Node tamamen devre dışı
    // kalır. Kod tarafı buna hazır, yayına alırken ayarlanacak.

    rollupConfig: {
      plugins: [
        {
          // PRISMA 7 + NITRO PAKETLEME DÜZELTMESİ
          //
          // Prisma 7'nin ürettiği istemci, modül KÖKÜNDE şunu çalıştırıyor:
          //     globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url))
          // Nitro paketlerken `import.meta.url`i `globalThis._importMeta_.url`e
          // çeviriyor ve onu sabit "file:///_entry.js" yer tutucusuyla
          // dolduruyor. Bu değer Windows'ta geçerli bir MUTLAK dosya URL'i
          // olmadığından fileURLToPath fırlatıyor ve sunucu daha ilk saniyede
          // ölüyor (ERR_INVALID_FILE_URL_PATH). Linux'ta "/_entry.js" geçerli
          // sayıldığı için orada görünmez — yani sessiz bırakılırsa yalnızca
          // yerel geliştirme kırılır.
          //
          // NEDEN BURADA VE NEDEN BÖYLE:
          // - `nitro.replace` işe yaramıyor; yer tutucu o adımdan SONRA
          //   enjekte ediliyor (denendi, dosyada aynen kalıyor).
          // - `renderChunk` de erken: yer tutucu parçanın başına banner olarak
          //   ekleniyor ve o hook'ta kod içinde henüz görünmüyor (denendi).
          // - İstemciyi paketleme dışına almak (externals) bir seçenek değil:
          //   üretilen istemci TypeScript kaynağı, derlenmek zorunda.
          // Geriye banner'ın da yerleştiği son aşama, generateBundle kalıyor.
          // Yazdığımız değer, her parçanın kendi ESM bağlamında zaten doğru
          // olan gerçek `import.meta.url`.
          name: "prisma7-import-meta-duzeltmesi",
          generateBundle(_ayarlar: unknown, paket: Record<string, any>) {
            const YER_TUTUCU = '"file:///_entry.js"';
            let degisen = 0;
            for (const parca of Object.values(paket)) {
              if (parca?.type !== "chunk" || !parca.code?.includes(YER_TUTUCU)) continue;
              parca.code = parca.code.split(YER_TUTUCU).join("import.meta.url");
              degisen++;
            }
            // Yer tutucu artık üretilmiyorsa (Nitro düzeltti ya da biçimi
            // değişti) sessizce geçmek yerine haber ver: bu eklenti o gün ya
            // güncellenmeli ya da silinmeli. Uyarı yalnızca ÜRETİM
            // derlemesinde anlamlı — `nuxt dev` bu paketi hiç üretmediği için
            // orada her seferinde boş yere ötüyordu.
            if (degisen === 0 && process.env.NODE_ENV === "production") {
              this.warn(
                "prisma7-import-meta-duzeltmesi: yer tutucu bulunamadı; " +
                  "Nitro davranışı değişmiş olabilir, eklenti gözden geçirilmeli."
              );
            }
          },
        },
      ],
    },

    // server/utils/rateLimit.ts brute-force korumasının (login) sayaçlarını
    // tuttuğu depo. REDIS_URL tanımlıysa Redis'e bağlanır — bu sayede birden
    // fazla sunucu instance'ı (yatay ölçekleme) aynı sayaçları paylaşır.
    // Tanımlı değilse (yerel geliştirme, tek instance'lık üretim) Nitro'nun
    // varsayılan bellek-içi (in-memory) sürücüsüne düşer — hiçbir ek kurulum
    // gerekmez, önceki davranışla birebir aynıdır.
    storage: process.env.REDIS_URL
      ? {
          "rate-limit": {
            driver: "redis",
            url: process.env.REDIS_URL,
          },
        }
      : undefined,
  },
});

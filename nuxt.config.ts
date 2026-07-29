// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // usePageSeo/useSiteSettings composable'ları await sonrasında başka
  // composable'lar (useAsyncData) çağırdığı için Nuxt instance context'inin
  // await sınırları arasında korunması gerekiyor.
  experimental: {
    asyncContext: true,
  },

  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@prisma/nuxt",
    "nuxt-mail",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],

  routeRules: {
    "/admin": { robots: "noindex, nofollow" },
    "/admin/**": { robots: "noindex, nofollow" },
    "/evdeneveyonetim": { robots: "noindex, nofollow" },
    "/evdeneveyonetim/**": { robots: "noindex, nofollow" },
  },

  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },

  postcss: {
    plugins: {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
            cssDeclarationSorter: true,
          },
        ],
      },
    },
  },

  ssr: true,
  target: "server",

  gsap: {
    extraPlugins: {
      scrollTrigger: true,
    },
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  plugins: ["~/plugins/gsap.client.js"],

  app: {
    head: {
      htmlAttrs: { lang: "tr" },

      // Google Fonts (Inter) buradan <link> olarak yükleniyor — daha önce
      // assets/css/main.css içinde @import ile yükleniyordu, bu da CSSOM
      // oluşumunu tamamen durdurup render-blocking'e yol açıyordu. Tarayıcı
      // artık bunu HTML <head> taranırken erken keşfedip paralel indirebiliyor.
      // Font Awesome CDN linki kaldırıldı: kod tabanında hiçbir yerde
      // fa-/fas/far/fab class'ı kullanılmıyor (site tamamen inline SVG
      // ikonlar kullanıyor) — tamamen kullanılmayan, render-blocking bir
      // harici stylesheet'ti.
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  site: {
    url: "https://evenakliyatevden.com",
    name: "EveNakliyatEvden",
  },

  image: {
    imgix: {
      baseURL: "/",
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
        from: process.env.MAIL_FROM || "mail.evenakliyatevden.com",
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

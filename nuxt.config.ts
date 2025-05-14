// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

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
    '/admin': { robots: 'noindex, nofollow' }, 
    '/admin/**': { robots: 'noindex, nofollow' },
    '/egeyonetim': { robots: 'noindex, nofollow' },
    '/egeyonetim/**': { robots: 'noindex, nofollow' },
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
    hostnames: ["http://egeesya.com", "https://egeesya.com"],
    sources: ["/api/__sitemap__/urls"],
  },

  plugins: ["~/plugins/gsap.client.js"],

  app: {
    head: {
      htmlAttrs: { lang: "tr" },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "/css/style.css",
        },
      ],
    },
  },

  site: {
    urls: ["http://egeesya.com", "https://egeesya.com"],
    name: "Ege Eşya Taşıma",
  },

  image: {
    imgix: {
      baseURL: "/",
    },
    domains: ["egeesya.com", "cdn.egeesya.com"],
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
    mail: {
      smtp: {
        host: process.env.MAIL_HOST || "mail.egeesya.com",
        port: parseInt(process.env.MAIL_PORT || "587", 10),
        secure: process.env.MAIL_SECURE === "true" || false,
        auth: {
          user: process.env.MAIL_USER || "info@egeesya.com",
          pass: process.env.MAIL_PASSWORD || "",
        },
      },
      message: {
        from: process.env.MAIL_FROM || "mail.egeesya.com",
        to: process.env.MAIL_TO || "info@egeesya.com",
      },
    },
  },

  hooks: {
    'app:error': (err: any) => {
      if ([500, 503].includes(err.statusCode)) return false
    }
  }
});


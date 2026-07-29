import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Nitro route dosyaları (server/api/*.ts, server/middleware/*.ts) Nuxt'un
// auto-import'larına (useRuntimeConfig, createError, getCookie, useStorage vb.)
// bağımlı olduğu için burada test edilmiyor — bunlar sadece gerçek bir Nitro
// sunucusu (veya @nuxt/test-utils'in ağır Nitro-ayağa-kaldırma test ortamı)
// içinde çözümlenir. Bunun yerine test kapsamı, Nitro'dan bağımsız çalışabilen
// katmanlara odaklanıyor: server/domain (Prisma delegate'i dışarıdan enjekte
// edilen servisler) ve server/utils'teki saf mantık (auth imzalama/doğrulama,
// rate limit penceresi) — Nitro globalleri burada test setup'ında elle mock'lanıyor.
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('.', import.meta.url)),
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    include: ['server/**/*.test.ts', 'test/**/*.test.ts'],
  },
})

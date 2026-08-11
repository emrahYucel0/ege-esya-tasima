/**
 * Prisma 7 yapılandırması — CLI tarafı (migrate, db, studio, generate).
 *
 * Prisma 6'da bağlantı adresi schema.prisma içindeki `url = env("DATABASE_URL")`
 * satırından okunuyordu ve CLI `.env`'i kendiliğinden yüklüyordu. Prisma 7'de
 * ikisi de kalktı: adres buraya taşındı ve ortam değişkenlerini artık BİZ
 * yüklüyoruz — aşağıdaki `dotenv/config` import'u tam olarak bunun için var,
 * silinirse `prisma migrate` DATABASE_URL'i bulamaz.
 *
 * Çalışma zamanının (Nuxt sunucusu) bu dosyayla işi yok; oradaki bağlantı
 * lib/prisma.ts içindeki driver adapter üzerinden kuruluyor.
 */
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',

  datasource: {
    url: env('DATABASE_URL'),
  },

  migrations: {
    path: 'prisma/migrations',
    // `prisma db seed` bu komutu çalıştırır. ts-node yok: Node 24'ün yerleşik
    // tip sıyırması .ts dosyasını doğrudan çalıştırıyor.
    seed: 'node --env-file=.env prisma/seed.ts',
  },
})

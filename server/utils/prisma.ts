/**
 * Prisma istemcisi — tek örnek (singleton).
 *
 * PRISMA 7 NOTU
 * İstemci artık `@prisma/client`ten değil, projenin içine üretilen koddan
 * import ediliyor (bkz. prisma/schema.prisma → generator.output). Ayrıca
 * bağlantıyı Prisma'nın kendi Rust motoru değil, bir "driver adapter" kuruyor:
 * MySQL için @prisma/adapter-mariadb. Bunun iki somut karşılığı var —
 * dağıtım paketinde platforma özel motor ikilisi taşımıyoruz ve Windows'ta
 * dev server açıkken `prisma generate` çalıştırınca alınan EPERM dosya kilidi
 * ortadan kalkıyor.
 *
 * Adres `prisma.config.ts`ten DEĞİL doğrudan ortamdan okunuyor: o dosya
 * yalnızca CLI (migrate/studio) içindir, çalışma zamanına dahil edilmez.
 */
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../prisma/generated/client/client.ts'

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL

  if (!url) {
    throw new Error('DATABASE_URL tanımlı değil — veritabanı bağlantısı kurulamaz.')
  }

  return new PrismaClient({ adapter: new PrismaMariaDb(url) })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

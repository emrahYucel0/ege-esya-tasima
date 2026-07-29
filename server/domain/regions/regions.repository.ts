// server/domain/regions/regions.repository.ts
import prisma from '~/lib/prisma'

export const regionsRepository = {
  findUnique: (where: any) => prisma.region.findUnique({ where }),
  // `light`: liste/gezinme amaçlı tüketiciler (navbar, carousel, ilgili
  // bölge gezinmesi) `content` alanına (tam zengin metin HTML gövdesi)
  // ihtiyaç duymuyor ama önceden her istek TÜM sütunlarla TÜM satırları
  // çekiyordu. Admin panelinin liste görünümü (useListCrud) düzenleme
  // formunu doğrudan bu listeden doldurduğu için `content` hâlâ gerekli —
  // varsayılan davranış değişmedi, sadece `light: true` geçildiğinde
  // devre dışı bırakılıyor.
  findMany: (where: any, options: { light?: boolean } = {}) =>
    prisma.region.findMany({
      where,
      orderBy: { title: 'asc' },
      ...(options.light ? { omit: { content: true } } : {}),
    }),
  create: (data: any) => prisma.region.create({ data }),
  update: (slug: string, data: any) => prisma.region.update({ where: { slug }, data }),
  remove: (slug: string) => prisma.region.delete({ where: { slug } }),
}

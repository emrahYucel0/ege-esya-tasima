// server/domain/posts/posts.repository.ts
import prisma from '~/lib/prisma'

export const postsRepository = {
  findBySlug: (slug: string) => prisma.post.findUnique({ where: { slug } }),
  // `light`: liste/gezinme amaçlı tüketiciler (navbar, carousel, ilgili
  // yazı gezinmesi) `content` alanına (tam zengin metin HTML gövdesi,
  // yazı başına onlarca KB olabilir) hiç ihtiyaç duymuyor ama önceden her
  // istek TÜM sütunlarla TÜM satırları çekiyordu. Admin panelinin liste
  // görünümü (useListCrud) düzenleme formunu doğrudan bu listeden
  // doldurduğu için `content` hâlâ gerekli — bu yüzden varsayılan davranış
  // değişmedi, sadece `light: true` geçildiğinde devre dışı bırakılıyor.
  findAll: (options: { light?: boolean } = {}) =>
    prisma.post.findMany(options.light ? { omit: { content: true } } : undefined),
  create: (data: Record<string, any>) => prisma.post.create({ data }),
  update: (slug: string, data: Record<string, any>) => prisma.post.update({ where: { slug }, data }),
  remove: (slug: string) => prisma.post.delete({ where: { slug } }),
}

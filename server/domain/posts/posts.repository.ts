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
  // `take`/`skip` verilmişse (sayfalama aktif) sonuçlar en yeni ilk sırada
  // gelecek şekilde sabit bir orderBy uygulanır — sayfalar arası tutarlılık
  // için deterministik bir sıra şart. Verilmemişse (mevcut tüm tüketiciler:
  // carousel'ler, navbar, admin'in tam liste görünümü) davranış öncekiyle
  // birebir aynı kalır, orderBy eklenmez.
  findAll: (options: { light?: boolean; take?: number; skip?: number } = {}) =>
    prisma.post.findMany({
      ...(options.light ? { omit: { content: true } } : {}),
      ...(options.take !== undefined
        ? { orderBy: { id: 'desc' as const }, take: options.take, skip: options.skip ?? 0 }
        : {}),
    }),
  count: () => prisma.post.count(),
  create: (data: Record<string, any>) => prisma.post.create({ data }),
  update: (slug: string, data: Record<string, any>) => prisma.post.update({ where: { slug }, data }),
  remove: (slug: string) => prisma.post.delete({ where: { slug } }),
}

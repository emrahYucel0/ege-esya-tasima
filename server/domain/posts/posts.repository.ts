// server/domain/posts/posts.repository.ts
import prisma from '~/lib/prisma'

export const postsRepository = {
  findBySlug: (slug: string) => prisma.post.findUnique({ where: { slug } }),
  findAll: () => prisma.post.findMany(),
  create: (data: Record<string, any>) => prisma.post.create({ data }),
  update: (slug: string, data: Record<string, any>) => prisma.post.update({ where: { slug }, data }),
  remove: (slug: string) => prisma.post.delete({ where: { slug } }),
}

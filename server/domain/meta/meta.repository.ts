// server/domain/meta/meta.repository.ts
import prisma from '~/lib/prisma'

export const metaRepository = {
  findByPage: (page: string) => prisma.meta.findUnique({ where: { page } }),
  findAll: () => prisma.meta.findMany({ where: { sectionName: 'metas' } }),
  create: (data: { sectionName: string; page: string; title: string; description?: string }) =>
    prisma.meta.create({ data }),
  update: (page: string, data: { title?: string; description?: string; sectionName?: string }) =>
    prisma.meta.update({ where: { page }, data }),
  remove: (page: string) => prisma.meta.delete({ where: { page } }),
}

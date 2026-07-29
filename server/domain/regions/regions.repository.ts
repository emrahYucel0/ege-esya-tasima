// server/domain/regions/regions.repository.ts
import prisma from '~/lib/prisma'

export const regionsRepository = {
  findUnique: (where: any) => prisma.region.findUnique({ where }),
  findMany: (where: any) => prisma.region.findMany({ where, orderBy: { title: 'asc' } }),
  create: (data: any) => prisma.region.create({ data }),
  update: (slug: string, data: any) => prisma.region.update({ where: { slug }, data }),
  remove: (slug: string) => prisma.region.delete({ where: { slug } }),
}

// server/domain/policies/policies.repository.ts
import prisma from '../../utils/prisma'

/**
 * Liste görünümünde `content` ÇEKİLMEZ. Üç politika metni toplamda ~15 KB;
 * admin panelinin kenar listesi için hepsini taşımak gereksiz.
 */
const LISTE_ALANLARI = {
  id: true,
  slug: true,
  title: true,
  subtitle: true,
  lastUpdated: true,
  isActive: true,
  updatedAt: true,
} as const

export const policiesRepository = {
  findBySlug: (slug: string) => prisma.policyPage.findUnique({ where: { slug } }),

  findAll: () =>
    prisma.policyPage.findMany({
      select: LISTE_ALANLARI,
      orderBy: { slug: 'asc' },
    }),

  create: (data: any) => prisma.policyPage.create({ data }),

  update: (slug: string, data: any) => prisma.policyPage.update({ where: { slug }, data }),

  remove: (slug: string) => prisma.policyPage.delete({ where: { slug } }),
}

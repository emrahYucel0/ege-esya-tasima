// server/domain/leads/leads.repository.ts
import prisma from '../../utils/prisma'

export const leadsRepository = {
  create: (data: {
    name: string
    email?: string | null
    phone?: string | null
    message?: string | null
    sourcePage?: string | null
  }) => prisma.contactLead.create({ data }),

  /** Mail denemesinin sonucu talep kaydedildikten SONRA işleniyor. */
  setMailResult: (id: number, mailStatus: string, mailError?: string | null) =>
    prisma.contactLead.update({ where: { id }, data: { mailStatus, mailError: mailError ?? null } }),

  findAll: (options: { take?: number; skip?: number } = {}) =>
    prisma.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: options.take ?? 50,
      skip: options.skip ?? 0,
    }),

  count: () => prisma.contactLead.count(),
  countUnread: () => prisma.contactLead.count({ where: { isRead: false } }),

  /** Belirli bir tarihten sonraki talep sayısı — panel özetleri için. */
  countSince: (tarih: Date) => prisma.contactLead.count({ where: { createdAt: { gte: tarih } } }),

  setRead: (id: number, isRead: boolean) =>
    prisma.contactLead.update({ where: { id }, data: { isRead } }),

  remove: (id: number) => prisma.contactLead.delete({ where: { id } }),

  /**
   * Hangi sayfa kaç talep getirdi. 120 bölge sayfası olduğu için içerik
   * yatırımının nereye yapılacağını gösteren asıl veri bu.
   */
  groupBySourcePage: (tarih: Date) =>
    prisma.contactLead.groupBy({
      by: ['sourcePage'],
      where: { createdAt: { gte: tarih } },
      _count: { _all: true },
      orderBy: { _count: { id: 'desc' } },
      take: 20,
    }),
}

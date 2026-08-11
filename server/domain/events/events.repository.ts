// server/domain/events/events.repository.ts
import prisma from '../../utils/prisma'

export const eventsRepository = {
  create: (data: { type: string; page?: string | null }) => prisma.siteEvent.create({ data }),

  countSince: (type: string, tarih: Date) =>
    prisma.siteEvent.count({ where: { type, createdAt: { gte: tarih } } }),

  /** Tür bazında toplam — panel özet kartları için. */
  groupByType: (tarih: Date) =>
    prisma.siteEvent.groupBy({
      by: ['type'],
      where: { createdAt: { gte: tarih } },
      _count: { _all: true },
    }),

  /**
   * Hangi sayfa kaç dönüşüm olayı üretti. Bölge sayfalarının hangisinin
   * gerçekten telefon tıklaması getirdiğini gösteren veri.
   */
  groupByPage: (tarih: Date, take = 20) =>
    prisma.siteEvent.groupBy({
      by: ['page'],
      where: { createdAt: { gte: tarih } },
      _count: { _all: true },
      orderBy: { _count: { id: 'desc' } },
      take,
    }),

  /**
   * Belirli bir tarihten eski kayıtları siler.
   * Paylaşımlı hosting'de tablo sınırsız büyümesin diye gerekiyor; olay
   * kayıtlarının tekil değeri düşük, toplamı ise yıllar içinde yüz binleri
   * bulabilir.
   */
  removeOlderThan: (tarih: Date) =>
    prisma.siteEvent.deleteMany({ where: { createdAt: { lt: tarih } } }),
}

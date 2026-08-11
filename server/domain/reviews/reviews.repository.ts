// server/domain/reviews/reviews.repository.ts
import prisma from '../../utils/prisma'

/**
 * Herkese açık uçlarda döndürülecek alanlar.
 *
 * `email` BİLEREK dışarıda: ziyaretçi doğrulama için bırakabiliyor, ama
 * yayınlanan yorumda görünmesi kişisel veri sızıntısı olurdu. Alan seçimi
 * beyaz liste olarak yapılıyor — modele yeni bir alan eklendiğinde kazara
 * dışarı açılmasın diye.
 */
const HERKESE_ACIK_ALANLAR = {
  id: true,
  customerName: true,
  customerImage: true,
  rating: true,
  comment: true,
  date: true,
  location: true,
  serviceType: true,
  serviceTypeIcon: true,
  isFeatured: true,
  order: true,
} as const

export const reviewsRepository = {
  /** Sitede gösterilecek yorumlar: hem aktif hem ONAYLI olanlar. */
  findPublic: (take = 60) =>
    prisma.testimonial.findMany({
      where: { isActive: true, isApproved: true },
      select: HERKESE_ACIK_ALANLAR,
      orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }, { date: 'desc' }],
      take,
    }),

  /** Ortalama puan ve adet — AggregateRating için (yalnızca onaylı yorumlar). */
  publicStats: () =>
    prisma.testimonial.aggregate({
      where: { isActive: true, isApproved: true },
      _avg: { rating: true },
      _count: { _all: true },
    }),

  create: (data: {
    customerName: string
    rating: number
    comment: string
    location?: string | null
    serviceType: string
    email?: string | null
    testimonialSectionId: number
  }) =>
    prisma.testimonial.create({
      data: {
        ...data,
        date: new Date(),
        // Siteden gelen yorum ONAYSIZ başlar; yönetici onaylayana kadar
        // hiçbir yerde görünmez.
        isApproved: false,
        source: 'site',
        isActive: true,
        isFeatured: false,
        order: 0,
      },
    }),

  /** Yönetim listesi — e-posta dahil TÜM alanlar. */
  findForAdmin: (onlyPending: boolean, take = 100) =>
    prisma.testimonial.findMany({
      where: onlyPending ? { isApproved: false } : {},
      orderBy: [{ isApproved: 'asc' }, { date: 'desc' }],
      take,
    }),

  countPending: () => prisma.testimonial.count({ where: { isApproved: false } }),

  setApproved: (id: number, isApproved: boolean) =>
    prisma.testimonial.update({ where: { id }, data: { isApproved } }),

  remove: (id: number) => prisma.testimonial.delete({ where: { id } }),

  /** Yorumların bağlanacağı bölüm; yoksa null. */
  defaultSectionId: async () =>
    (await prisma.testimonialSection.findFirst({ select: { id: true } }))?.id ?? null,
}

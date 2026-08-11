// server/domain/sections/configs/trust-bar.config.ts
import prisma from '../../../utils/prisma'
import { createSectionCrudService } from '../section-crud.factory'

/**
 * Ana sayfadaki güven bandı — Hero'nun hemen altındaki rakamlar şeridi.
 *
 * Önceden bu içerik `Services` bölümünün içindeydi (statsIntro + statistics).
 * Ana sayfadaki hizmetler bölümü kaldırılınca o bağ anlamsız kaldı ve panelde
 * "Hizmetler" ekranı alakasız alanlarla dolu görünüyordu. Artık kendi bölümü.
 */
export interface TrustBarItemInput {
  iconPath?: string
  value?: string
  label1?: string
  label2?: string
  order?: number
}

export interface TrustBarInput {
  sectionName?: string
  intro?: string
  items?: TrustBarItemInput[]
}

export const trustBarCrudService = createSectionCrudService<any, TrustBarInput>(prisma.trustBar, {
  defaultSectionName: 'trust-bar',
  include: {
    items: { orderBy: { order: 'asc' } },
  },
  children: [
    {
      relation: 'items',
      mapCreate: (i: TrustBarItemInput) => ({
        iconPath: i.iconPath || null,
        value: i.value || '',
        label1: i.label1 || '',
        label2: i.label2 || '',
        order: i.order || 0,
      }),
    },
  ],
  mapParentCreate: (b) => ({ intro: b.intro }),
  mapParentUpdate: (b) => ({ intro: b.intro }),
  // Çocuk kayıtlar `onDelete: Cascade` ile tanımlı, elle silmeye gerek yok.
  deleteStrategy: 'cascade',
})

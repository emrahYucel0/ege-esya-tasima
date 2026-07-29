// server/domain/sections/configs/card.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface CardItemInput {
  iconPath?: string
  title?: string
  description?: string
  order?: number
}

export interface CardInput {
  sectionName?: string
  title: string
  subtitle?: string
  blockquote?: string
  image?: string
  cards?: CardItemInput[]
}

export const cardCrudService = createSectionCrudService<any, CardInput>(prisma.card, {
  defaultSectionName: 'cards',
  include: { cards: { orderBy: { order: 'asc' } } },
  children: [
    {
      relation: 'cards',
      mapCreate: (item: CardItemInput) => ({
        iconPath: item.iconPath,
        title: item.title,
        description: item.description,
        order: item.order,
      }),
    },
  ],
  mapParentCreate: (b) => ({
    title: b.title,
    subtitle: b.subtitle,
    blockquote: b.blockquote,
    image: b.image,
  }),
  mapParentUpdate: (b) => ({
    title: b.title,
    subtitle: b.subtitle,
    blockquote: b.blockquote,
    image: b.image,
  }),
  deleteStrategy: 'cascade',
  defaultObjectOnMissingGet: () => ({
    id: null,
    sectionName: 'cards',
    title: '',
    subtitle: '',
    blockquote: '',
    image: '',
    cards: [],
  }),
})

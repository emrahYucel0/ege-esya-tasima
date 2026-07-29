// server/domain/sections/configs/faq-section.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'
import type { ChildListConfig } from '../../shared/types'

export interface FaqDetailInput {
  text?: string
  order?: number
}

export interface FaqItemInput {
  question?: string
  answer?: string
  order?: number
  isActive?: boolean
  details?: FaqDetailInput[]
}

export interface FaqStatsCardInput {
  value?: string
  label?: string
  bgColor?: string
  textColor?: string
  position?: string
  order?: number
}

export interface FaqImageInput {
  imagePath?: string
  altText?: string
  position?: string
  order?: number
}

export interface FaqSectionInput {
  sectionName?: string
  mainTitle?: string
  description?: string
  ctaTitle?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  faqs?: FaqItemInput[]
  statsCards?: FaqStatsCardInput[]
  images?: FaqImageInput[]
}

const detailsChild: ChildListConfig<FaqDetailInput> = {
  relation: 'details',
  mapCreate: (d) => ({ text: d.text || '', order: d.order || 0 }),
}

export const faqSectionCrudService = createSectionCrudService<any, FaqSectionInput>(prisma.faqSection, {
  defaultSectionName: 'faq-section',
  include: {
    faqs: { orderBy: { order: 'asc' }, include: { details: { orderBy: { order: 'asc' } } } },
    statsCards: { orderBy: { order: 'asc' } },
    images: { orderBy: { order: 'asc' } },
  },
  children: [
    {
      relation: 'faqs',
      mapCreate: (faq: FaqItemInput) => ({
        question: faq.question || '',
        answer: faq.answer || '',
        order: faq.order || 0,
        isActive: faq.isActive !== undefined ? faq.isActive : true,
      }),
      nested: detailsChild,
    },
    {
      relation: 'statsCards',
      mapCreate: (card: FaqStatsCardInput) => ({
        value: card.value || '',
        label: card.label || '',
        bgColor: card.bgColor || '#3b5d50',
        textColor: card.textColor || '#ffffff',
        position: card.position || '',
        order: card.order || 0,
      }),
    },
    {
      relation: 'images',
      mapCreate: (image: FaqImageInput) => ({
        imagePath: image.imagePath || '',
        altText: image.altText || '',
        position: image.position || '',
        order: image.order || 0,
      }),
    },
  ],
  mapParentCreate: (b) => ({
    mainTitle: b.mainTitle || '',
    description: b.description,
    ctaTitle: b.ctaTitle,
    ctaButtonText: b.ctaButtonText,
    ctaButtonLink: b.ctaButtonLink,
  }),
  mapParentUpdate: (b) => ({
    mainTitle: b.mainTitle,
    description: b.description,
    ctaTitle: b.ctaTitle,
    ctaButtonText: b.ctaButtonText,
    ctaButtonLink: b.ctaButtonLink,
  }),
  deleteStrategy: 'cascade',
})

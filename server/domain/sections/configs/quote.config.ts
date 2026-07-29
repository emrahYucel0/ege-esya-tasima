// server/domain/sections/configs/quote.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface QuoteInput {
  sectionName?: string
  subtitle: string
  title: string
  description: string
  phoneLabel: string
  phone: string
}

export const quoteCrudService = createSectionCrudService<any, QuoteInput>(prisma.quoteRequest, {
  defaultSectionName: 'quotes',
  mapParentCreate: (b) => ({
    subtitle: b.subtitle,
    title: b.title,
    description: b.description,
    phoneLabel: b.phoneLabel,
    phone: b.phone,
  }),
  mapParentUpdate: (b) => ({
    subtitle: b.subtitle,
    title: b.title,
    description: b.description,
    phoneLabel: b.phoneLabel,
    phone: b.phone,
  }),
  deleteStrategy: 'cascade',
})

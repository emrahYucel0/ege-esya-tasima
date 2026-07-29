// server/domain/sections/configs/why-choose-us.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface WhyChooseUsFeatureInput {
  iconPath?: string
  title?: string
  description?: string
  order?: number
}

export interface WhyChooseUsInput {
  sectionName?: string
  mainTitle?: string
  shortDescription?: string
  closingStatement?: string
  mainImage?: string
  features?: WhyChooseUsFeatureInput[]
}

export const whyChooseUsCrudService = createSectionCrudService<any, WhyChooseUsInput>(prisma.whyChooseUs, {
  defaultSectionName: 'why-choose-us',
  include: { features: { orderBy: { order: 'asc' } } },
  children: [
    {
      relation: 'features',
      mapCreate: (f: WhyChooseUsFeatureInput) => ({
        iconPath: f.iconPath,
        title: f.title || '',
        description: f.description,
        order: f.order,
      }),
    },
  ],
  mapParentCreate: (b) => ({
    mainTitle: b.mainTitle || '',
    shortDescription: b.shortDescription,
    closingStatement: b.closingStatement,
    mainImage: b.mainImage,
  }),
  mapParentUpdate: (b) => ({
    mainTitle: b.mainTitle,
    shortDescription: b.shortDescription,
    closingStatement: b.closingStatement,
    mainImage: b.mainImage,
  }),
  deleteStrategy: 'manual',
  manualDeleteDelegates: [
    (sectionName) => prisma.whyChooseUsFeature.deleteMany({ where: { whyChooseUs: { sectionName } } }),
  ],
})

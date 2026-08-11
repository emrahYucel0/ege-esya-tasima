// server/domain/sections/configs/we-help-section.config.ts
import prisma from '../../../utils/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface WeHelpFeatureInput {
  text?: string
  order?: number
}

export interface WeHelpImageInput {
  imagePath?: string
  altText?: string
  position?: string
  order?: number
}

export interface WeHelpSectionInput {
  sectionName?: string
  mainTitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  features?: WeHelpFeatureInput[]
  images?: WeHelpImageInput[]
}

export const weHelpSectionCrudService = createSectionCrudService<any, WeHelpSectionInput>(prisma.weHelpSection, {
  defaultSectionName: 'we-help-section',
  include: {
    features: { orderBy: { order: 'asc' } },
    images: { orderBy: { order: 'asc' } },
  },
  children: [
    {
      relation: 'features',
      mapCreate: (f: WeHelpFeatureInput) => ({ text: f.text || '', order: f.order }),
    },
    {
      relation: 'images',
      mapCreate: (i: WeHelpImageInput) => ({
        imagePath: i.imagePath || '',
        altText: i.altText || '',
        position: i.position || '',
        order: i.order,
      }),
    },
  ],
  mapParentCreate: (b) => ({
    mainTitle: b.mainTitle || '',
    description: b.description,
    buttonText: b.buttonText,
    buttonLink: b.buttonLink,
  }),
  mapParentUpdate: (b) => ({
    mainTitle: b.mainTitle,
    description: b.description,
    buttonText: b.buttonText,
    buttonLink: b.buttonLink,
  }),
  deleteStrategy: 'manual',
  manualDeleteDelegates: [
    (sectionName) => prisma.weHelpFeature.deleteMany({ where: { weHelpSection: { sectionName } } }),
    (sectionName) => prisma.weHelpImage.deleteMany({ where: { weHelpSection: { sectionName } } }),
  ],
})

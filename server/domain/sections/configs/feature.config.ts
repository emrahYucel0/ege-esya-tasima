// server/domain/sections/configs/feature.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface FeatureTypeInput {
  title: string
  description: string
}

export interface FeatureInput {
  sectionName?: string
  subtitle: string
  title: string
  image?: string
  featureTypes?: FeatureTypeInput[]
}

export const featureCrudService = createSectionCrudService<any, FeatureInput>(prisma.feature, {
  defaultSectionName: 'features',
  include: { featureTypes: true },
  children: [
    {
      relation: 'featureTypes',
      mapCreate: (t: FeatureTypeInput) => ({ title: t.title, description: t.description }),
    },
  ],
  mapParentCreate: (b) => ({
    subtitle: b.subtitle,
    title: b.title,
    image: b.image,
  }),
  mapParentUpdate: (b) => ({
    subtitle: b.subtitle,
    title: b.title,
    image: b.image,
  }),
  deleteStrategy: 'manual',
  manualDeleteDelegates: [
    (sectionName) => prisma.featureType.deleteMany({ where: { feature: { sectionName } } }),
  ],
})

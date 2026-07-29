// server/domain/sections/configs/pricing-section.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface PricingFeatureInput {
  text?: string
  isIncluded?: boolean
  order?: number
}

export interface PricingPlanInput {
  name?: string
  subtitle?: string
  price?: string
  priceSuffix?: string
  isPopular?: boolean
  isFeatured?: boolean
  buttonText?: string
  buttonLink?: string
  buttonAriaLabel?: string
  order?: number
  features?: PricingFeatureInput[]
}

export interface PricingSectionInput {
  sectionName?: string
  mainTitle?: string
  description?: string
  pricingPlans?: PricingPlanInput[]
}

export const pricingSectionCrudService = createSectionCrudService<any, PricingSectionInput>(prisma.pricingSection, {
  defaultSectionName: 'pricing-section',
  include: {
    pricingPlans: { orderBy: { order: 'asc' }, include: { features: { orderBy: { order: 'asc' } } } },
  },
  children: [
    {
      relation: 'pricingPlans',
      mapCreate: (plan: PricingPlanInput) => ({
        name: plan.name || '',
        subtitle: plan.subtitle,
        price: plan.price || '',
        priceSuffix: plan.priceSuffix,
        isPopular: plan.isPopular || false,
        isFeatured: plan.isFeatured || false,
        buttonText: plan.buttonText || '',
        buttonLink: plan.buttonLink || '',
        buttonAriaLabel: plan.buttonAriaLabel,
        order: plan.order || 0,
      }),
      nested: {
        relation: 'features',
        mapCreate: (f: PricingFeatureInput) => ({
          text: f.text || '',
          isIncluded: f.isIncluded !== undefined ? f.isIncluded : true,
          order: f.order || 0,
        }),
      },
      // PricingFeature -> PricingPlan ilişkisinde onDelete:Cascade yok, bu yüzden
      // PUT'ta pricingPlans.deleteMany çalışmadan önce features'ı elle temizlemek
      // gerekiyor (aksi halde FK ihlali).
      manualNestedCleanup: (sectionName) =>
        prisma.pricingFeature.deleteMany({ where: { pricingPlan: { pricingSection: { sectionName } } } }),
    },
  ],
  mapParentCreate: (b) => ({
    mainTitle: b.mainTitle || '',
    description: b.description,
  }),
  mapParentUpdate: (b) => ({
    mainTitle: b.mainTitle,
    description: b.description,
  }),
  deleteStrategy: 'manual',
  manualDeleteDelegates: [
    (sectionName) => prisma.pricingFeature.deleteMany({ where: { pricingPlan: { pricingSection: { sectionName } } } }),
    (sectionName) => prisma.pricingPlan.deleteMany({ where: { pricingSection: { sectionName } } }),
  ],
})

// server/domain/sections/configs/services.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface ServiceItemInput {
  imagePath?: string
  title?: string
  subtitle?: string
  description?: string
  order?: number
}

export interface StatisticInput {
  iconPath?: string
  value?: string
  label1?: string
  label2?: string
  order?: number
}

export interface ServicesInput {
  sectionName?: string
  mainTitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  services?: ServiceItemInput[]
  statistics?: StatisticInput[]
}

export const servicesCrudService = createSectionCrudService<any, ServicesInput>(prisma.services, {
  defaultSectionName: 'services',
  include: {
    services: { orderBy: { order: 'asc' } },
    statistics: { orderBy: { order: 'asc' } },
  },
  children: [
    {
      relation: 'services',
      mapCreate: (s: ServiceItemInput) => ({
        imagePath: s.imagePath || '',
        title: s.title || '',
        subtitle: s.subtitle,
        description: s.description,
        order: s.order || 0,
      }),
    },
    {
      relation: 'statistics',
      mapCreate: (s: StatisticInput) => ({
        iconPath: s.iconPath,
        value: s.value || '',
        label1: s.label1 || '',
        label2: s.label2 || '',
        order: s.order || 0,
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
    (sectionName) => prisma.service.deleteMany({ where: { services: { sectionName } } }),
    (sectionName) => prisma.statistic.deleteMany({ where: { services: { sectionName } } }),
  ],
})

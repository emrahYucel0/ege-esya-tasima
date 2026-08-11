// server/domain/sections/configs/process.config.ts
import prisma from '../../../utils/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface ProcessStepInput {
  title?: string
  description?: string
  iconPath?: string
  order?: number
}

export interface ProcessSectionInput {
  sectionName?: string
  mainTitle?: string
  description?: string
  steps?: ProcessStepInput[]
}

export const processCrudService = createSectionCrudService<any, ProcessSectionInput>(prisma.processSection, {
  defaultSectionName: 'process-section',
  include: { steps: { orderBy: { order: 'asc' } } },
  children: [
    {
      relation: 'steps',
      mapCreate: (s: ProcessStepInput) => ({
        title: s.title || '',
        description: s.description || '',
        iconPath: s.iconPath,
        order: s.order,
      }),
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
    (sectionName) => prisma.processStep.deleteMany({ where: { processSection: { sectionName } } }),
  ],
})

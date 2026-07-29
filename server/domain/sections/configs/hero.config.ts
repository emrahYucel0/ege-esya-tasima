// server/domain/sections/configs/hero.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface HeroPageInput {
  sectionName?: string
  title?: string
  subtitle?: string
  description?: string
  primaryButton?: string
  primaryLink?: string
  secondaryButton?: string
  secondaryLink?: string
  image?: string
  backgroundImage?: string
}

export const heroCrudService = createSectionCrudService<any, HeroPageInput>(prisma.heroPage, {
  defaultSectionName: 'heros',
  mapParentCreate: (b) => ({
    title: b.title || '',
    subtitle: b.subtitle,
    description: b.description,
    primaryButton: b.primaryButton,
    primaryLink: b.primaryLink,
    secondaryButton: b.secondaryButton,
    secondaryLink: b.secondaryLink,
    image: b.image,
    backgroundImage: b.backgroundImage,
  }),
  mapParentUpdate: (b) => ({
    title: b.title,
    subtitle: b.subtitle,
    description: b.description,
    primaryButton: b.primaryButton,
    primaryLink: b.primaryLink,
    secondaryButton: b.secondaryButton,
    secondaryLink: b.secondaryLink,
    image: b.image,
    backgroundImage: b.backgroundImage,
  }),
  deleteStrategy: 'cascade',
})

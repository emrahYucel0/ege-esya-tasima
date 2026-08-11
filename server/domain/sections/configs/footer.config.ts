// server/domain/sections/configs/footer.config.ts
import prisma from '../../../utils/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface LinkInput {
  name?: string
  url?: string
}

export interface FooterInput {
  sectionName?: string
  address?: string
  phone?: string
  email?: string
  copyright?: string
  socialLinks?: LinkInput[]
  regionLinks?: LinkInput[]
  quickLinks?: LinkInput[]
  blogLinks?: LinkInput[]
}

const mapLinkCreate = (l: LinkInput) => ({ name: l.name, url: l.url })

export const footerCrudService = createSectionCrudService<any, FooterInput>(prisma.footer, {
  defaultSectionName: 'footers',
  include: {
    socialLinks: true,
    regionLinks: true,
    quickLinks: true,
    blogLinks: true,
  },
  children: [
    { relation: 'socialLinks', mapCreate: mapLinkCreate },
    { relation: 'regionLinks', mapCreate: mapLinkCreate },
    { relation: 'quickLinks', mapCreate: mapLinkCreate },
    { relation: 'blogLinks', mapCreate: mapLinkCreate },
  ],
  mapParentCreate: (b) => ({
    address: b.address,
    phone: b.phone,
    email: b.email,
    copyright: b.copyright,
  }),
  mapParentUpdate: (b) => ({
    address: b.address,
    phone: b.phone,
    email: b.email,
    copyright: b.copyright,
  }),
  deleteStrategy: 'manual',
  manualDeleteDelegates: [
    (sectionName) => prisma.footerSocialLink.deleteMany({ where: { footer: { sectionName } } }),
    (sectionName) => prisma.footerRegionLink.deleteMany({ where: { footer: { sectionName } } }),
    (sectionName) => prisma.quickLink.deleteMany({ where: { footer: { sectionName } } }),
    (sectionName) => prisma.footerBlogLink.deleteMany({ where: { footer: { sectionName } } }),
  ],
})

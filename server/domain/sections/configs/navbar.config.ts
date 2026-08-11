// server/domain/sections/configs/navbar.config.ts
import prisma from '../../../utils/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface NavbarSocialLinkInput {
  name?: string
  url?: string
}

export interface NavbarContactsInput {
  phone?: string
  mail?: string
  address?: string
}

export interface NavbarInput {
  sectionName?: string
  logo?: string
  contacts?: NavbarContactsInput[]
  socialLinks?: NavbarSocialLinkInput[]
}

export const navbarCrudService = createSectionCrudService<any, NavbarInput>(prisma.navbar, {
  defaultSectionName: 'navbars',
  include: { socialLinks: true, contacts: true },
  children: [
    {
      relation: 'socialLinks',
      mapCreate: (link: NavbarSocialLinkInput) => ({ name: link.name, url: link.url }),
    },
    {
      relation: 'contacts',
      mapCreate: (contact: NavbarContactsInput) => ({
        phone: contact.phone,
        mail: contact.mail,
        address: contact.address,
      }),
    },
  ],
  mapParentCreate: (b) => ({ logo: b.logo }),
  mapParentUpdate: (b) => ({ logo: b.logo }),
  deleteStrategy: 'manual',
  manualDeleteDelegates: [
    (sectionName) => prisma.navbarSocialLink.deleteMany({ where: { navbar: { sectionName } } }),
    (sectionName) => prisma.navbarContacts.deleteMany({ where: { navbar: { sectionName } } }),
  ],
})

// server/domain/sections/configs/site-settings.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface SiteSettingsInput {
  sectionName?: string
  brandName?: string
  siteName?: string
  siteDescription?: string
  logo?: string
  favicon?: string
  ogImage?: string
  phone?: string
  mobilePhone?: string
  whatsAppNumber?: string
  email?: string
  address?: string
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  githubUrl?: string
  googleAnalyticsId?: string
  googleTagManagerId?: string
  googleAdsenseId?: string
  footerText?: string
  copyrightText?: string
  workingHours?: string
  googleMapsEmbed?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

const mapScalarFields = (b: SiteSettingsInput) => ({
  brandName: b.brandName,
  siteName: b.siteName,
  siteDescription: b.siteDescription,
  logo: b.logo,
  favicon: b.favicon,
  ogImage: b.ogImage,
  phone: b.phone,
  mobilePhone: b.mobilePhone,
  whatsAppNumber: b.whatsAppNumber,
  email: b.email,
  address: b.address,
  facebookUrl: b.facebookUrl,
  instagramUrl: b.instagramUrl,
  twitterUrl: b.twitterUrl,
  linkedinUrl: b.linkedinUrl,
  youtubeUrl: b.youtubeUrl,
  githubUrl: b.githubUrl,
  googleAnalyticsId: b.googleAnalyticsId,
  googleTagManagerId: b.googleTagManagerId,
  googleAdsenseId: b.googleAdsenseId,
  footerText: b.footerText,
  copyrightText: b.copyrightText,
  workingHours: b.workingHours,
  googleMapsEmbed: b.googleMapsEmbed,
  metaTitle: b.metaTitle,
  metaDescription: b.metaDescription,
  metaKeywords: b.metaKeywords,
})

export const siteSettingsCrudService = createSectionCrudService<any, SiteSettingsInput>(prisma.siteSettings, {
  defaultSectionName: 'site-settings',
  mapParentCreate: mapScalarFields,
  mapParentUpdate: mapScalarFields,
  deleteStrategy: 'cascade',
  // Bu bölüm için GET'te kayıt yoksa varsayılan değerlerle otomatik oluşturuluyor
  // (diğer bölümlerden farklı, bilinçli olarak korunan davranış).
  createDefaultsOnMissingGet: () => ({
    brandName: 'Marka Adı',
    siteName: 'Sitem',
    siteDescription: 'Site açıklaması',
    copyrightText: '© Tüm hakları saklıdır.',
  }),
})

import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMI
// ---------------------------------
interface SiteSettingsInput {
  sectionName?: string;
  brandName?: string;
  siteName?: string;
  siteDescription?: string;
  logo?: string;
  favicon?: string;
  ogImage?: string;
  phone?: string;
  mobilePhone?: string;
  whatsAppNumber?: string;
  email?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleAdsenseId?: string;
  footerText?: string;
  copyrightText?: string;
  workingHours?: string;
  googleMapsEmbed?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

const siteSettingsSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  brandName: yup.string().trim().notRequired(),
  siteName: yup.string().trim().notRequired(),
  siteDescription: yup.string().notRequired(),
  logo: yup.string().trim().notRequired(),
  favicon: yup.string().trim().notRequired(),
  ogImage: yup.string().trim().notRequired(),
  phone: yup.string().trim().notRequired(),
  mobilePhone: yup.string().trim().notRequired(),
  whatsAppNumber: yup.string().trim().notRequired(),
  email: yup.string().trim().notRequired(),
  address: yup.string().trim().notRequired(),
  facebookUrl: yup.string().trim().notRequired(),
  instagramUrl: yup.string().trim().notRequired(),
  twitterUrl: yup.string().trim().notRequired(),
  linkedinUrl: yup.string().trim().notRequired(),
  youtubeUrl: yup.string().trim().notRequired(),
  githubUrl: yup.string().trim().notRequired(),
  googleAnalyticsId: yup.string().trim().notRequired(),
  googleTagManagerId: yup.string().trim().notRequired(),
  googleAdsenseId: yup.string().trim().notRequired(),
  footerText: yup.string().notRequired(),
  copyrightText: yup.string().trim().notRequired(),
  workingHours: yup.string().trim().notRequired(),
  googleMapsEmbed: yup.string().notRequired(),
  metaTitle: yup.string().trim().notRequired(),
  metaDescription: yup.string().notRequired(),
  metaKeywords: yup.string().trim().notRequired(),
});

const siteSettingsDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "site-settings"; // Varsayılan benzersiz isim

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    try {
      let settings = await prisma.siteSettings.findFirst({
        where: { sectionName: defaultSectionName },
      });
      
      // Eğer kayıt yoksa varsayılan değerlerle oluştur
      if (!settings) {
        settings = await prisma.siteSettings.create({
          data: {
            sectionName: defaultSectionName,
            brandName: "Marka Adı",
            siteName: "Sitem",
            siteDescription: "Site açıklaması",
            copyrightText: "© Tüm hakları saklıdır.",
          },
        });
      }
      
      return { success: true, data: settings };
    } catch (error) {
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken hata oluştu.', data: null };
    }
  } 
  
  // CREATE (POST) – Sadece kayıt yoksa oluştur
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<SiteSettingsInput>(siteSettingsSchema, rawBody);
    if (!validation.success) return { ...validation, data: null };
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Aynı sectionName var mı kontrol et
      const existing = await prisma.siteSettings.findFirst({
        where: { sectionName: targetSectionName },
      });
      if (existing) {
        return {
          success: false,
          error: `Hata: '${targetSectionName}' adında bir kayıt zaten mevcut. Güncelleme için PUT metodunu kullanın.`,
          data: null,
        };
      }

      const newSettings = await prisma.siteSettings.create({
        data: {
          sectionName: targetSectionName,
          brandName: body.brandName,
          siteName: body.siteName,
          siteDescription: body.siteDescription,
          logo: body.logo,
          favicon: body.favicon,
          ogImage: body.ogImage,
          phone: body.phone,
          mobilePhone: body.mobilePhone,
          whatsAppNumber: body.whatsAppNumber,
          email: body.email,
          address: body.address,
          facebookUrl: body.facebookUrl,
          instagramUrl: body.instagramUrl,
          twitterUrl: body.twitterUrl,
          linkedinUrl: body.linkedinUrl,
          youtubeUrl: body.youtubeUrl,
          githubUrl: body.githubUrl,
          googleAnalyticsId: body.googleAnalyticsId,
          googleTagManagerId: body.googleTagManagerId,
          googleAdsenseId: body.googleAdsenseId,
          footerText: body.footerText,
          copyrightText: body.copyrightText,
          workingHours: body.workingHours,
          googleMapsEmbed: body.googleMapsEmbed,
          metaTitle: body.metaTitle,
          metaDescription: body.metaDescription,
          metaKeywords: body.metaKeywords,
        },
      });
      return { success: true, data: newSettings };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return { success: false, error: errorMessage, data: null };
    }
  } 
  
  // UPDATE (PUT)
  else if (method === 'PUT') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<SiteSettingsInput>(siteSettingsSchema, rawBody);
    if (!validation.success) return { ...validation, data: null };
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      const updatedSettings = await prisma.siteSettings.update({
        where: { sectionName: targetSectionName },
        data: {
          brandName: body.brandName,
          siteName: body.siteName,
          siteDescription: body.siteDescription,
          logo: body.logo,
          favicon: body.favicon,
          ogImage: body.ogImage,
          phone: body.phone,
          mobilePhone: body.mobilePhone,
          whatsAppNumber: body.whatsAppNumber,
          email: body.email,
          address: body.address,
          facebookUrl: body.facebookUrl,
          instagramUrl: body.instagramUrl,
          twitterUrl: body.twitterUrl,
          linkedinUrl: body.linkedinUrl,
          youtubeUrl: body.youtubeUrl,
          githubUrl: body.githubUrl,
          googleAnalyticsId: body.googleAnalyticsId,
          googleTagManagerId: body.googleTagManagerId,
          googleAdsenseId: body.googleAdsenseId,
          footerText: body.footerText,
          copyrightText: body.copyrightText,
          workingHours: body.workingHours,
          googleMapsEmbed: body.googleMapsEmbed,
          metaTitle: body.metaTitle,
          metaDescription: body.metaDescription,
          metaKeywords: body.metaKeywords,
        },
      });
      return { success: true, data: updatedSettings };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
        return {
          success: false,
          error: `Hata: '${targetSectionName}' adında bir kayıt bulunamadı. Önce POST ile oluşturmayı deneyin.`,
          data: null,
        };
      }
      return { success: false, error: errorMessage, data: null };
    }
  } 
  
  // DELETE (DELETE)
  else if (method === 'DELETE') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(siteSettingsDeleteSchema, rawBody);
    if (!validation.success) return { ...validation, data: null };
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      const deleted = await prisma.siteSettings.delete({
        where: { sectionName: targetSectionName },
      });
      return { success: true, data: deleted };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
        return {
          success: false,
          error: `Hata: '${targetSectionName}' adında silinecek kayıt bulunamadı.`,
          data: null,
        };
      }
      return { success: false, error: errorMessage, data: null };
    }
  } 
  
  // DESTEKLENMEYEN METOTLAR
  else {
    return {
      success: false,
      error: `HTTP ${method} metodu desteklenmemektedir.`,
      data: null,
    };
  }
});
import * as yup from 'yup';
import { siteSettingsCrudService, type SiteSettingsInput } from '~/server/domain/sections/configs/site-settings.config';

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

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return siteSettingsCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<SiteSettingsInput>(siteSettingsSchema, await readBody(event));
    if (!validation.success) return validation;
    return siteSettingsCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<SiteSettingsInput>(siteSettingsSchema, await readBody(event));
    if (!validation.success) return validation;
    return siteSettingsCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(siteSettingsDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return siteSettingsCrudService.remove(validation.data.sectionName);
  }

  return { success: false, error: `HTTP ${method} metodu desteklenmemektedir.` };
});

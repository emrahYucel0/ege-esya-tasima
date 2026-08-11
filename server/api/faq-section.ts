import * as yup from 'yup';
import { faqSectionCrudService, type FaqSectionInput } from '../domain/sections/configs/faq-section.config';

const faqDetailSchema = yup.object({
  text: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const faqItemSchema = yup.object({
  question: yup.string().trim().notRequired(),
  answer: yup.string().notRequired(),
  order: yup.number().notRequired(),
  isActive: yup.boolean().notRequired(),
  details: yup.array().of(faqDetailSchema).notRequired(),
});

const faqStatsCardSchema = yup.object({
  value: yup.string().trim().notRequired(),
  label: yup.string().trim().notRequired(),
  bgColor: yup.string().trim().notRequired(),
  textColor: yup.string().trim().notRequired(),
  position: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const faqImageSchema = yup.object({
  imagePath: yup.string().trim().notRequired(),
  altText: yup.string().trim().notRequired(),
  position: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const faqSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  ctaTitle: yup.string().trim().notRequired(),
  ctaButtonText: yup.string().trim().notRequired(),
  ctaButtonLink: yup.string().trim().notRequired(),
  faqs: yup.array().of(faqItemSchema).notRequired(),
  statsCards: yup.array().of(faqStatsCardSchema).notRequired(),
  images: yup.array().of(faqImageSchema).notRequired(),
});

const faqSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return faqSectionCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<FaqSectionInput>(faqSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return faqSectionCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<FaqSectionInput>(faqSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return faqSectionCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(faqSectionDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return faqSectionCrudService.remove(validation.data.sectionName);
  }

  return { success: false, error: `HTTP ${method} metodu desteklenmemektedir.` };
});

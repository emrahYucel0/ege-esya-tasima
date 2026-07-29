import * as yup from 'yup';
import {
  testimonialsSectionCrudService,
  partialUpdateTestimonialsSection,
  type TestimonialSectionInput,
} from '~/server/domain/sections/configs/testimonials-section.config';

const testimonialSchema = yup.object({
  customerName: yup.string().trim().notRequired(),
  customerImage: yup.string().trim().notRequired(),
  rating: yup.number().notRequired(),
  comment: yup.string().notRequired(),
  date: yup.date().notRequired(),
  location: yup.string().trim().notRequired(),
  serviceType: yup.string().trim().notRequired(),
  serviceTypeIcon: yup.string().trim().notRequired(),
  isFeatured: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  order: yup.number().notRequired(),
});

const testimonialSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  tag: yup.string().trim().notRequired(),
  showDecorations: yup.boolean().notRequired(),
  backgroundColor: yup.string().trim().notRequired(),
  textColor: yup.string().trim().notRequired(),
  testimonials: yup.array().of(testimonialSchema).notRequired(),
});

const testimonialSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return testimonialsSectionCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<TestimonialSectionInput>(testimonialSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return testimonialsSectionCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<TestimonialSectionInput>(testimonialSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return testimonialsSectionCrudService.update(validation.data);
  }

  if (method === 'PATCH') {
    const validation = await validateOrError<Partial<TestimonialSectionInput>>(testimonialSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return partialUpdateTestimonialsSection(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(testimonialSectionDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return testimonialsSectionCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} metodu desteklenmemektedir.` };
});

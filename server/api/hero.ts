import * as yup from 'yup';
import { heroCrudService, type HeroPageInput } from '~/server/domain/sections/configs/hero.config';

const heroPageSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  primaryButton: yup.string().trim().notRequired(),
  primaryLink: yup.string().trim().notRequired(),
  secondaryButton: yup.string().trim().notRequired(),
  secondaryLink: yup.string().trim().notRequired(),
  image: yup.string().trim().notRequired(),
  backgroundImage: yup.string().trim().notRequired(),
});

const heroPageDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return heroCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<HeroPageInput>(heroPageSchema, await readBody(event));
    if (!validation.success) return validation;
    return heroCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<HeroPageInput>(heroPageSchema, await readBody(event));
    if (!validation.success) return validation;
    return heroCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(heroPageDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return heroCrudService.remove(validation.data.sectionName);
  }

  return { success: false, error: `HTTP ${method} metodu desteklenmemektedir.` };
});

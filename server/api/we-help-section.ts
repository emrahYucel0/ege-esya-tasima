import * as yup from 'yup';
import { weHelpSectionCrudService, type WeHelpSectionInput } from '../domain/sections/configs/we-help-section.config';

const weHelpFeatureSchema = yup.object({
  text: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const weHelpImageSchema = yup.object({
  imagePath: yup.string().trim().notRequired(),
  altText: yup.string().trim().notRequired(),
  position: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const weHelpSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  buttonText: yup.string().trim().notRequired(),
  buttonLink: yup.string().trim().notRequired(),
  features: yup.array().of(weHelpFeatureSchema).notRequired(),
  images: yup.array().of(weHelpImageSchema).notRequired(),
});

const weHelpSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return weHelpSectionCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<WeHelpSectionInput>(weHelpSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return weHelpSectionCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<WeHelpSectionInput>(weHelpSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return weHelpSectionCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(weHelpSectionDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return weHelpSectionCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} metodu desteklenmemektedir.` };
});

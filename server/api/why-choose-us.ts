import * as yup from 'yup';
import { whyChooseUsCrudService, type WhyChooseUsInput } from '~/server/domain/sections/configs/why-choose-us.config';

const whyChooseUsFeatureSchema = yup.object({
  iconPath: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const whyChooseUsSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  shortDescription: yup.string().trim().notRequired(),
  closingStatement: yup.string().trim().notRequired(),
  mainImage: yup.string().trim().notRequired(),
  features: yup.array().of(whyChooseUsFeatureSchema).notRequired(),
});

const whyChooseUsDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return whyChooseUsCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<WhyChooseUsInput>(whyChooseUsSchema, await readBody(event));
    if (!validation.success) return validation;
    return whyChooseUsCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<WhyChooseUsInput>(whyChooseUsSchema, await readBody(event));
    if (!validation.success) return validation;
    return whyChooseUsCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(whyChooseUsDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return whyChooseUsCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} metodu desteklenmemektedir.` };
});

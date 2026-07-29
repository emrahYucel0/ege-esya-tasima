import * as yup from 'yup';
import { pricingSectionCrudService, type PricingSectionInput } from '~/server/domain/sections/configs/pricing-section.config';

const pricingFeatureSchema = yup.object({
  text: yup.string().trim().notRequired(),
  isIncluded: yup.boolean().notRequired(),
  order: yup.number().notRequired(),
});

const pricingPlanSchema = yup.object({
  name: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  price: yup.string().trim().notRequired(),
  priceSuffix: yup.string().trim().notRequired(),
  isPopular: yup.boolean().notRequired(),
  isFeatured: yup.boolean().notRequired(),
  buttonText: yup.string().trim().notRequired(),
  buttonLink: yup.string().trim().notRequired(),
  buttonAriaLabel: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
  features: yup.array().of(pricingFeatureSchema).notRequired(),
});

const pricingSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  pricingPlans: yup.array().of(pricingPlanSchema).notRequired(),
});

const pricingSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return pricingSectionCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<PricingSectionInput>(pricingSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return pricingSectionCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<PricingSectionInput>(pricingSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return pricingSectionCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(pricingSectionDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return pricingSectionCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} metodu desteklenmemektedir.` };
});

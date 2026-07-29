import * as yup from 'yup';
import { featureCrudService, type FeatureInput } from '~/server/domain/sections/configs/feature.config';

const featureTypeSchema = yup.object({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
});

const featureSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().required(),
  title: yup.string().trim().required(),
  image: yup.string().trim().notRequired(),
  featureTypes: yup.array().of(featureTypeSchema).notRequired(),
});

const featureDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return featureCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<FeatureInput>(featureSchema, await readBody(event));
    if (!validation.success) return validation;
    return featureCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<FeatureInput>(featureSchema, await readBody(event));
    if (!validation.success) return validation;
    return featureCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(featureDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return featureCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
});

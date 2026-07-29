import * as yup from 'yup';
import { servicesCrudService, type ServicesInput } from '~/server/domain/sections/configs/services.config';

const serviceItemSchema = yup.object({
  imagePath: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const statisticSchema = yup.object({
  iconPath: yup.string().trim().notRequired(),
  value: yup.string().trim().notRequired(),
  label1: yup.string().trim().notRequired(),
  label2: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const servicesSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  buttonText: yup.string().trim().notRequired(),
  buttonLink: yup.string().trim().notRequired(),
  services: yup.array().of(serviceItemSchema).notRequired(),
  statistics: yup.array().of(statisticSchema).notRequired(),
});

const servicesDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return servicesCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<ServicesInput>(servicesSchema, await readBody(event));
    if (!validation.success) return validation;
    return servicesCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<ServicesInput>(servicesSchema, await readBody(event));
    if (!validation.success) return validation;
    return servicesCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(servicesDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return servicesCrudService.remove(validation.data.sectionName);
  }

  return { success: false, error: `HTTP ${method} yöntemi desteklenmiyor.` };
});

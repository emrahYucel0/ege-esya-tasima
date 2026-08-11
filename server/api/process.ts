import * as yup from 'yup';
import { processCrudService, type ProcessSectionInput } from '../domain/sections/configs/process.config';

const processStepSchema = yup.object({
  title: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  iconPath: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const processSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  steps: yup.array().of(processStepSchema).notRequired(),
});

const processDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return processCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<ProcessSectionInput>(processSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return processCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<ProcessSectionInput>(processSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return processCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(processDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return processCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} metodu desteklenmemektedir.` };
});

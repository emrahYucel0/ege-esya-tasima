import * as yup from 'yup';
import { metaService, type MetaInput } from '~/server/domain/meta/meta.service';

const metaSchema = yup.object({
  page: yup.string().trim().required(),
  title: yup.string().trim().required(),
  description: yup.string().trim().notRequired(),
  sectionName: yup.string().trim().notRequired(),
});

const metaDeleteSchema = yup.object({
  page: yup.string().trim().required(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    const { page } = getQuery(event);
    return metaService.get(page ? String(page) : undefined);
  }

  if (method === 'POST') {
    const validation = await validateOrError<MetaInput>(metaSchema, await readBody(event));
    if (!validation.success) return validation;
    return metaService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<MetaInput>(metaSchema, await readBody(event));
    if (!validation.success) return validation;
    return metaService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ page: string }>(metaDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return metaService.remove(validation.data.page);
  }

  return { success: false, error: `HTTP ${method} metodu desteklenmemektedir.` };
});

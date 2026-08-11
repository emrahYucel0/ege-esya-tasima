import * as yup from 'yup';
import { quoteCrudService, type QuoteInput } from '../domain/sections/configs/quote.config';

const quoteRequestSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().required(),
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  phoneLabel: yup.string().trim().required(),
  phone: yup.string().trim().required(),
});

const quoteRequestDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return quoteCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<QuoteInput>(quoteRequestSchema, await readBody(event));
    if (!validation.success) return validation;
    return quoteCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<QuoteInput>(quoteRequestSchema, await readBody(event));
    if (!validation.success) return validation;
    return quoteCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(quoteRequestDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return quoteCrudService.remove(validation.data.sectionName);
  }

  return { success: false, error: `HTTP ${method} yöntemi desteklenmiyor.` };
});

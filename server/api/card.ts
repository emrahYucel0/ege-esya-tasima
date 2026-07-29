import * as yup from 'yup';
import { cardCrudService, type CardInput } from '~/server/domain/sections/configs/card.config';

const cardItemSchema = yup.object({
  iconPath: yup.string().trim().notRequired(),
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  order: yup.number().required(),
});

const cardSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  title: yup.string().trim().required(),
  subtitle: yup.string().trim().notRequired(),
  blockquote: yup.string().trim().notRequired(),
  image: yup.string().trim().notRequired(),
  cards: yup.array().of(cardItemSchema).notRequired(),
});

const cardDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return cardCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<CardInput>(cardSchema, await readBody(event));
    if (!validation.success) return validation;
    return cardCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<CardInput>(cardSchema, await readBody(event));
    if (!validation.success) return validation;
    return cardCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(cardDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return cardCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} method is not supported.` };
});

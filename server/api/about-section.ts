import * as yup from 'yup';
import { aboutSectionService, type AboutSectionInput } from '~/server/domain/sections/about-section.service';

const aboutServiceSchema = yup.object({
  iconPath: yup.string().trim().notRequired(),
  iconAlt: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const aboutStatSchema = yup.object({
  value: yup.string().trim().notRequired(),
  label: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const aboutSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description1: yup.string().trim().notRequired(),
  description2: yup.string().trim().notRequired(),
  description3: yup.string().trim().notRequired(),
  teamImage: yup.string().trim().notRequired(),
  teamImageAlt: yup.string().trim().notRequired(),
  historyTitle: yup.string().trim().notRequired(),
  historyText1: yup.string().trim().notRequired(),
  historyText2: yup.string().trim().notRequired(),
  historyText3: yup.string().trim().notRequired(),
  seoTitle: yup.string().trim().notRequired(),
  seoDescription: yup.string().trim().notRequired(),
  services: yup.array().of(aboutServiceSchema).notRequired(),
  stats: yup.array().of(aboutStatSchema).notRequired(),
});

const aboutSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return aboutSectionService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<AboutSectionInput>(aboutSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return aboutSectionService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<AboutSectionInput>(aboutSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return aboutSectionService.update(validation.data);
  }

  if (method === 'PATCH') {
    const validation = await validateOrError<Partial<AboutSectionInput>>(aboutSectionSchema, await readBody(event));
    if (!validation.success) return validation;
    return aboutSectionService.partialUpdate(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(aboutSectionDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return aboutSectionService.remove(validation.data.sectionName);
  }

  return {
    success: false,
    error: `HTTP ${method} metodu desteklenmemektedir. Desteklenen metodlar: GET, POST, PUT, PATCH, DELETE`,
  };
});

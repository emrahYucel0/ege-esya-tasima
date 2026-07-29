import * as yup from 'yup';
import { navbarCrudService, type NavbarInput } from '~/server/domain/sections/configs/navbar.config';

const navbarSocialLinkSchema = yup.object({
  name: yup.string().trim().notRequired(),
  url: yup.string().trim().notRequired(),
});

const navbarContactsSchema = yup.object({
  phone: yup.string().trim().notRequired(),
  mail: yup.string().trim().notRequired(),
  address: yup.string().trim().notRequired(),
});

const navbarSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  logo: yup.string().trim().notRequired(),
  contacts: yup.array().of(navbarContactsSchema).notRequired(),
  socialLinks: yup.array().of(navbarSocialLinkSchema).notRequired(),
});

const navbarDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    return navbarCrudService.get();
  }

  if (method === 'POST') {
    const validation = await validateOrError<NavbarInput>(navbarSchema, await readBody(event));
    if (!validation.success) return validation;
    return navbarCrudService.create(validation.data);
  }

  if (method === 'PUT') {
    const validation = await validateOrError<NavbarInput>(navbarSchema, await readBody(event));
    if (!validation.success) return validation;
    return navbarCrudService.update(validation.data);
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(navbarDeleteSchema, await readBody(event));
    if (!validation.success) return validation;
    return navbarCrudService.remove(validation.data.sectionName);
  }

  return { error: `HTTP ${method} method is not supported.` };
});

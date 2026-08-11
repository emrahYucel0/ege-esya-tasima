import * as yup from 'yup';
import { servicesCrudService, type ServicesInput } from '../domain/sections/configs/services.config';

const serviceFaqSchema = yup.object({
  question: yup.string().trim().notRequired(),
  answer: yup.string().trim().notRequired(),
});

const serviceItemSchema = yup.object({
  imagePath: yup.string().trim().notRequired(),
  imageAlt: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
  // --- Kendi sayfası olan hizmetler --------------------------------------
  // Bu alanların BURADA olması zorunlu: validateOrError `stripUnknown: true`
  // ile çalışıyor, yani şemada tanımlı olmayan alan sessizce atılır. Bölüm
  // her PUT'ta çocuk kayıtları silip yeniden yarattığı için (bkz.
  // services.config.ts → deleteStrategy: 'manual') eksik bir alan, bir
  // sonraki panel kaydında hizmet sayfası içeriğinin tamamen silinmesi
  // anlamına gelir.
  slug: yup.string().trim().nullable().notRequired(),
  excerpt: yup.string().notRequired(),
  metaDescription: yup.string().notRequired(),
  content: yup.string().notRequired(),
  includes: yup.array().of(yup.string().trim()).notRequired(),
  faqs: yup.array().of(serviceFaqSchema).notRequired(),
});

// NOT: Buradaki `statisticSchema` ve `statsIntro`/`buttonText`/`buttonLink`
// alanları kaldırıldı. Güven bandı artık kendi bölümü (server/api/trust-bar.ts),
// düğme alanları ise ana sayfadan kaldırılan hizmetler bölümünün artığıydı.
const servicesSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  services: yup.array().of(serviceItemSchema).notRequired(),
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

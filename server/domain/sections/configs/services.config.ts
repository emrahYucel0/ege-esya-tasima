// server/domain/sections/configs/services.config.ts
import prisma from '../../../utils/prisma'
import { createSectionCrudService } from '../section-crud.factory'

export interface ServiceItemInput {
  imagePath?: string
  imageAlt?: string
  title?: string
  subtitle?: string
  description?: string
  order?: number
  // --- Kendi sayfası olan hizmetler --------------------------------------
  // DİKKAT: bu bölüm `deleteStrategy: 'manual'` ile çalışıyor, yani her PUT
  // önce tüm Service satırlarını SİLİP yeniden yaratıyor. Aşağıdaki alanlar
  // hem burada hem server/api/services.ts'deki yup şemasında bulunmak
  // ZORUNDA: validateOrError `stripUnknown: true` ile çalıştığı için şemada
  // olmayan bir alan sessizce düşer ve bir sonraki panel kaydında hizmet
  // sayfalarının içeriği tamamen kaybolur.
  slug?: string | null
  excerpt?: string
  metaDescription?: string
  content?: string
  includes?: string[]
  faqs?: { question?: string; answer?: string }[]
}

// NOT: Güven bandı (giriş metni + rakamlar) buradan ÇIKARILDI. Kendi bölümü
// ve kendi paneli var: server/domain/sections/configs/trust-bar.config.ts.
// `buttonText`/`buttonLink` de kaldırıldı — ikisi de ana sayfadan kaldırılan
// hizmetler bölümünün düğmesine aitti, hiçbir bileşen okumuyordu.
export interface ServicesInput {
  sectionName?: string
  mainTitle?: string
  description?: string
  services?: ServiceItemInput[]
}

export const servicesCrudService = createSectionCrudService<any, ServicesInput>(prisma.services, {
  defaultSectionName: 'services',
  include: {
    services: { orderBy: { order: 'asc' } },
  },
  children: [
    {
      relation: 'services',
      mapCreate: (s: ServiceItemInput) => ({
        imagePath: s.imagePath || '',
        imageAlt: s.imageAlt?.trim() || null,
        title: s.title || '',
        subtitle: s.subtitle,
        description: s.description,
        order: s.order || 0,
        // Boş dize DEĞİL null: `slug` sütunu UNIQUE. Sayfası olmayan birden
        // fazla hizmet '' değerini paylaşamaz (çakışma hatası verir), ama
        // NULL değerler UNIQUE kısıtlamasından muaftır.
        slug: s.slug?.trim() || null,
        excerpt: s.excerpt || null,
        metaDescription: s.metaDescription || null,
        content: s.content || null,
        includes: s.includes || [],
        faqs: s.faqs || [],
      }),
    },
  ],
  mapParentCreate: (b) => ({
    mainTitle: b.mainTitle || '',
    description: b.description,
  }),
  mapParentUpdate: (b) => ({
    mainTitle: b.mainTitle,
    description: b.description,
  }),
  deleteStrategy: 'manual',
  manualDeleteDelegates: [
    (sectionName) => prisma.service.deleteMany({ where: { services: { sectionName } } }),
  ],
})

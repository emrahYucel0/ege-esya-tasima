import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * Testimonial modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface TestimonialInput {
  customerName?: string;
  customerImage?: string;
  rating?: number;
  comment?: string;
  date?: string | Date;
  location?: string;
  serviceType?: string;
  serviceTypeIcon?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
}

/**
 * TestimonialSection modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface TestimonialSectionInput {
  sectionName?: string;
  mainTitle?: string;
  subtitle?: string;
  tag?: string;
  showDecorations?: boolean;
  backgroundColor?: string;
  textColor?: string;
  testimonials?: TestimonialInput[];
}

const testimonialSchema = yup.object({
  customerName: yup.string().trim().notRequired(),
  customerImage: yup.string().trim().notRequired(),
  rating: yup.number().notRequired(),
  comment: yup.string().notRequired(),
  date: yup.date().notRequired(),
  location: yup.string().trim().notRequired(),
  serviceType: yup.string().trim().notRequired(),
  serviceTypeIcon: yup.string().trim().notRequired(),
  isFeatured: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  order: yup.number().notRequired(),
});

const testimonialSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  tag: yup.string().trim().notRequired(),
  showDecorations: yup.boolean().notRequired(),
  backgroundColor: yup.string().trim().notRequired(),
  textColor: yup.string().trim().notRequired(),
  testimonials: yup.array().of(testimonialSchema).notRequired(),
});

const testimonialSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "testimonials-section"; // Varsayılan sectionName

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    // sectionName'i "testimonials-section" olan ilk kaydı, ilişkili tüm testimonial'ları ile getir.
    try {
      const testimonialSectionData = await prisma.testimonialSection.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          testimonials: {
            where: { isActive: true },
            orderBy: {
              order: 'asc', // Testimonial'ları 'order' alanına göre sırala
            },
          },
        },
      });
      return testimonialSectionData;
    } catch (error) {
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<TestimonialSectionInput>(testimonialSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    // Testimonials verilerini hazırlıyoruz
    const testimonialsData = Array.isArray(body.testimonials)
      ? body.testimonials.map(testimonial => {
          // Tarih string'i Date objesine çevir
          let dateValue: Date;
          if (testimonial.date instanceof Date) {
            dateValue = testimonial.date;
          } else if (typeof testimonial.date === 'string') {
            dateValue = new Date(testimonial.date);
          } else {
            dateValue = new Date(); // Varsayılan bugünün tarihi
          }

          return {
            customerName: testimonial.customerName || "",
            customerImage: testimonial.customerImage,
            rating: testimonial.rating || 5,
            comment: testimonial.comment || "",
            date: dateValue,
            location: testimonial.location,
            serviceType: testimonial.serviceType || "",
            serviceTypeIcon: testimonial.serviceTypeIcon,
            isFeatured: testimonial.isFeatured || false,
            isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
            order: testimonial.order || 0,
          };
        })
      : [];

    try {
      const newTestimonialSection = await prisma.testimonialSection.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          mainTitle: body.mainTitle || "",
          subtitle: body.subtitle,
          tag: body.tag,
          showDecorations: body.showDecorations !== undefined ? body.showDecorations : true,
          backgroundColor: body.backgroundColor,
          textColor: body.textColor,
          testimonials: { 
            create: testimonialsData 
          },
        },
        include: {
          testimonials: true,
        },
      });
      return { success: true, data: newTestimonialSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      // sectionName unique olduğu için duplicate hatası verebilir.
      if (isUniqueConstraintError(error)) {
         return { success: false, error: `Hata: '${defaultSectionName}' adında bir kayıt zaten mevcut. Güncelleme (PUT) metodunu kullanın.` };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // UPDATE (PUT)
  else if (method === 'PUT') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<TestimonialSectionInput>(testimonialSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // Testimonials verilerini hazırlıyoruz
    const testimonialsData = Array.isArray(body.testimonials)
      ? body.testimonials.map(testimonial => {
          // Tarih string'i Date objesine çevir
          let dateValue: Date;
          if (testimonial.date instanceof Date) {
            dateValue = testimonial.date;
          } else if (typeof testimonial.date === 'string') {
            dateValue = new Date(testimonial.date);
          } else {
            dateValue = new Date(); // Varsayılan bugünün tarihi
          }

          return {
            customerName: testimonial.customerName || "",
            customerImage: testimonial.customerImage,
            rating: testimonial.rating || 5,
            comment: testimonial.comment || "",
            date: dateValue,
            location: testimonial.location,
            serviceType: testimonial.serviceType || "",
            serviceTypeIcon: testimonial.serviceTypeIcon,
            isFeatured: testimonial.isFeatured || false,
            isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
            order: testimonial.order || 0,
          };
        })
      : [];

    try {
      // Önce ilişkili verileri (Testimonials) sil
      await prisma.testimonial.deleteMany({
        where: {
          testimonialSection: {
            sectionName: targetSectionName,
          },
        },
      });

      // Ana kaydı güncelle ve yeni testimonial'ları oluştur
      const updatedTestimonialSection = await prisma.testimonialSection.update({
        where: { sectionName: targetSectionName },
        data: {
          mainTitle: body.mainTitle,
          subtitle: body.subtitle,
          tag: body.tag,
          showDecorations: body.showDecorations,
          backgroundColor: body.backgroundColor,
          textColor: body.textColor,
          testimonials: {
            create: testimonialsData,
          },
        },
        include: {
          testimonials: true,
        },
      });
      return { success: true, data: updatedTestimonialSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
         return { success: false, error: `Hata: '${targetSectionName}' adında bir kayıt bulunamadı. Önce POST ile oluşturmayı deneyin.` };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // PARTIAL UPDATE (PATCH) - Sadece belirli alanları güncelle
  else if (method === 'PATCH') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<Partial<TestimonialSectionInput>>(testimonialSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // Güncellenecek verileri hazırla
    const updateData: any = {};
    
    if (body.mainTitle !== undefined) updateData.mainTitle = body.mainTitle;
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle;
    if (body.tag !== undefined) updateData.tag = body.tag;
    if (body.showDecorations !== undefined) updateData.showDecorations = body.showDecorations;
    if (body.backgroundColor !== undefined) updateData.backgroundColor = body.backgroundColor;
    if (body.textColor !== undefined) updateData.textColor = body.textColor;

    try {
      const updatedTestimonialSection = await prisma.testimonialSection.update({
        where: { sectionName: targetSectionName },
        data: updateData,
        include: {
          testimonials: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      });
      return { success: true, data: updatedTestimonialSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
         return { success: false, error: `Hata: '${targetSectionName}' adında bir kayıt bulunamadı.` };
      }
      return { success: false, error: errorMessage };
    }
  }
  
  // DELETE (DELETE)
  else if (method === 'DELETE') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(testimonialSectionDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Önce ilişkili verileri (Testimonials) sil
      await prisma.testimonial.deleteMany({
        where: {
          testimonialSection: {
            sectionName: targetSectionName,
          },
        },
      });

      // Ana kaydı sil
      const deletedTestimonialSection = await prisma.testimonialSection.delete({
        where: { sectionName: targetSectionName },
      });
      return { success: true, data: deletedTestimonialSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
         return { success: false, error: `Hata: '${targetSectionName}' adında silinecek kayıt bulunamadı.` };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // DESTEKLENMEYEN METOTLAR
  else {
    return { error: `HTTP ${method} metodu desteklenmemektedir.` };
  }
});
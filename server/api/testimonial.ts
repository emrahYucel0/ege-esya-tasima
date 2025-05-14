import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TestimonialDetailInput {
  name: string;
  profession: string;
  description: string;
}

interface TestimonialInput {
  sectionName?: string;
  title: string;
  subtitle: string;
  testimonialDetails?: TestimonialDetailInput[];
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // "testimonials" sectionName'ine sahip ilk Testimonial kaydını ilişkili testimonialDetails verisiyle getirir.
    const testimonialData = await prisma.testimonial.findFirst({
      where: { sectionName: "testimonials" },
      include: { testimonialDetails: true },
    });
    return testimonialData;
  } else if (method === 'POST') {
    // Yeni bir Testimonial kaydı oluşturur.
    const body = (await readBody(event)) as TestimonialInput;
    const testimonialDetailsData = Array.isArray(body.testimonialDetails)
      ? body.testimonialDetails.map((detail) => ({
          name: detail.name,
          profession: detail.profession,
          description: detail.description,
        }))
      : [];

    const newTestimonial = await prisma.testimonial.create({
      data: {
        sectionName: body.sectionName || "testimonials",
        title: body.title,
        subtitle: body.subtitle,
        testimonialDetails: { create: testimonialDetailsData },
      },
      include: { testimonialDetails: true },
    });
    return newTestimonial;
  } else if (method === 'PUT') {
    // Belirtilen sectionName'e sahip Testimonial kaydını günceller.
    const body = (await readBody(event)) as TestimonialInput;
    try {
      const updatedTestimonial = await prisma.testimonial.update({
        where: { sectionName: body.sectionName || "testimonials" },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          // testimonialDetails güncellemesi: önce eskileri sil, sonra yenilerini ekle
          testimonialDetails: {
            deleteMany: {},
            create: Array.isArray(body.testimonialDetails)
              ? body.testimonialDetails.map((detail) => ({
                  name: detail.name,
                  profession: detail.profession,
                  description: detail.description,
                }))
              : [],
          },
        },
        include: { testimonialDetails: true },
      });
      return { success: true, data: updatedTestimonial };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    // Belirtilen sectionName'e sahip Testimonial kaydını siler.
    const body = (await readBody(event)) as { sectionName?: string };
    const deletedTestimonial = await prisma.testimonial.delete({
      where: { sectionName: body.sectionName || "testimonials" },
    });
    return deletedTestimonial;
  } else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

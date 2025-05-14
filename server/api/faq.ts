import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface FaqItemInput {
  question: string;
  answer: string;
  open?: boolean;
}

interface FaqInput {
  sectionName?: string;
  subtitle: string;
  title: string;
  faqItems?: FaqItemInput[];
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // Get the first Faq record with "faqs" sectionName including related faqItems
    const faqData = await prisma.faq.findFirst({
      where: { sectionName: "faqs" },
      include: { faqItems: true },
    });
    return faqData || { 
      title: "Eşya Taşıma Hakkında",
      subtitle: "Merak Edilenler",
      faqItems: [] 
    };
  } 
  else if (method === 'POST') {
    // Create a new Faq record
    const body = (await readBody(event)) as FaqInput;
    const faqItemsData = Array.isArray(body.faqItems)
      ? body.faqItems.map((item) => ({ 
          question: item.question, 
          answer: item.answer,
          open: item.open || false
        }))
      : [];

    const newFaq = await prisma.faq.create({
      data: {
        sectionName: body.sectionName || "faqs",
        subtitle: body.subtitle,
        title: body.title,
        faqItems: { create: faqItemsData },
      },
      include: { faqItems: true },
    });
    return newFaq;
  } 
  else if (method === 'PUT') {
    // Update existing Faq record by sectionName
    const body = (await readBody(event)) as FaqInput;
    try {
      const updatedFaq = await prisma.faq.update({
        where: { sectionName: body.sectionName || "faqs" },
        data: {
          subtitle: body.subtitle,
          title: body.title,
          // Update faqItems: first delete existing ones, then create new ones
          faqItems: {
            deleteMany: {},
            create: Array.isArray(body.faqItems)
              ? body.faqItems.map((item) => ({ 
                  question: item.question, 
                  answer: item.answer,
                  open: item.open || false
                }))
              : [],
          },
        },
        include: { faqItems: true },
      });
      return { success: true, data: updatedFaq };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } 
  else if (method === 'DELETE') {
    // Delete Faq record by sectionName
    const body = (await readBody(event)) as { sectionName?: string };
    const deletedFaq = await prisma.faq.delete({
      where: { sectionName: body.sectionName || "faqs" },
    });
    return deletedFaq;
  } 
  else {
    return { error: `HTTP ${method} method is not supported.` };
  }
});
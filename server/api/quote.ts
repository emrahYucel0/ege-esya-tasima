import * as yup from 'yup';
import prisma from '~/lib/prisma';

interface QuoteRequestInput {
  sectionName?: string;
  subtitle: string;
  title: string;
  description: string;
  phoneLabel: string;
  phone: string;
}

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
    // "quotes" sectionName'ine sahip ilk kaydı getir
    const quoteData = await prisma.quoteRequest.findFirst({
      where: { sectionName: "quotes" },
    });
    return quoteData;
  } 
  
  else if (method === 'POST') {
    // Yeni bir QuoteRequest kaydı oluştur
    const rawBody = await readBody(event);
    const validation = await validateOrError<QuoteRequestInput>(quoteRequestSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const newQuote = await prisma.quoteRequest.create({
      data: {
        sectionName: body.sectionName || "quotes",
        subtitle: body.subtitle,
        title: body.title,
        description: body.description,
        phoneLabel: body.phoneLabel,
        phone: body.phone,
      },
    });

    return newQuote;
  } 
  
  else if (method === 'PUT') {
    // Mevcut QuoteRequest kaydını güncelle
    const rawBody = await readBody(event);
    const validation = await validateOrError<QuoteRequestInput>(quoteRequestSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    try {
      const updatedQuote = await prisma.quoteRequest.update({
        where: { sectionName: body.sectionName || "quotes" },
        data: {
          subtitle: body.subtitle,
          title: body.title,
          description: body.description,
          phoneLabel: body.phoneLabel,
          phone: body.phone,
        },
      });

      return { success: true, data: updatedQuote };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } 
  
  else if (method === 'DELETE') {
    // sectionName = "quotes" olan kaydı sil
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(quoteRequestDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    try {
      const deletedQuote = await prisma.quoteRequest.delete({
        where: { sectionName: body.sectionName || "quotes" },
      });

      return deletedQuote;
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } 
  
  else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

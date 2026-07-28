import * as yup from 'yup';
import prisma from '~/lib/prisma';

interface CardItemInput {
  iconPath: string;
  title: string;
  description: string;
  order: number;
}

interface CardInput {
  sectionName?: string;
  title: string;
  subtitle: string;
  blockquote: string;
  image: string;
  cards?: CardItemInput[];
}

const cardItemSchema = yup.object({
  iconPath: yup.string().trim().required(),
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  order: yup.number().required(),
});

const cardSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  title: yup.string().trim().required(),
  subtitle: yup.string().trim().required(),
  blockquote: yup.string().trim().required(),
  image: yup.string().trim().required(),
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
    const cardData = await prisma.card.findFirst({
      where: { sectionName: "cards" },
      include: { cards: { orderBy: { order: 'asc' } } },
    });
    return cardData || { 
      id: null,
      sectionName: "cards",
      title: '', 
      subtitle: '', 
      blockquote: '', 
      image: '',
      cards: [] 
    };
  } else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<CardInput>(cardSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const cardsData = Array.isArray(body.cards)
      ? body.cards.map(item => ({
          iconPath: item.iconPath,
          title: item.title,
          description: item.description,
          order: item.order
        }))
      : [];

    const newCard = await prisma.card.create({
      data: {
        sectionName: body.sectionName || "cards",
        title: body.title,
        subtitle: body.subtitle,
        blockquote: body.blockquote,
        image: body.image,
        cards: { create: cardsData }
      },
      include: { cards: true }
    });
    return newCard;
  } else if (method === 'PUT') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<CardInput>(cardSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    try {
      const updatedCard = await prisma.card.update({
        where: { sectionName: body.sectionName || "cards" },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          blockquote: body.blockquote,
          image: body.image, // image alanını güncelle
          cards: {
            deleteMany: {}, // Tüm ilişkili CardItem'ları sil
            create: Array.isArray(body.cards)
              ? body.cards.map(item => ({
                  iconPath: item.iconPath,
                  title: item.title,
                  description: item.description,
                  order: item.order
                }))
              : []
          }
        },
        include: { cards: true }
      });
      console.log('Güncellenmiş Card:', updatedCard); // Güncellenmiş veriyi kontrol et
      return { success: true, data: updatedCard };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(cardDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    try {
      const deletedCard = await prisma.card.delete({
        where: { sectionName: body.sectionName || "cards" }
      });
      return { success: true, data: deletedCard };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else {
    return { error: `HTTP ${method} method is not supported.` };
  }
});
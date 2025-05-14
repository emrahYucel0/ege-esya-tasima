import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

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
    const body = (await readBody(event)) as CardInput;
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
    const body = (await readBody(event)) as CardInput;
    console.log('PUT isteği body:', body); // Gelen body'yi kontrol et
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
    const body = (await readBody(event)) as { sectionName?: string };
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
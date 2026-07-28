import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const admins = [
  { email: 'egeesya@yonetici.com', password: '***REMOVED***' },
  { email: 'evdeneve@yonetici.com', password: '***REMOVED***' },
];

async function seed() {
  const saltRounds = 10;

  try {
    for (const { email, password } of admins) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          password: hashedPassword,
          role: 'admin',
        },
      });

      console.log('Admin kullanıcısı eklendi:', admin);
    }
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
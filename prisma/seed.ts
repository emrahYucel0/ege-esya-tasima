import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} ortam değişkeni tanımlı değil. .env dosyasını kontrol edin.`);
  }
  return value;
}

const admins = [
  { email: requireEnv('SEED_ADMIN_1_EMAIL'), password: requireEnv('SEED_ADMIN_1_PASSWORD') },
  { email: requireEnv('SEED_ADMIN_2_EMAIL'), password: requireEnv('SEED_ADMIN_2_PASSWORD') },
];

async function seed() {
  const saltRounds = 10;

  try {
    for (const { email, password } of admins) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const admin = await prisma.user.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: {
          email,
          password: hashedPassword,
          role: 'admin',
        },
      });

      console.log('Admin kullanıcısı oluşturuldu/güncellendi:', admin.email);
    }
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

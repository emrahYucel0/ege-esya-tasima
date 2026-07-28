// server/api/login.ts
import * as bcrypt from 'bcryptjs';
import { defineEventHandler, readBody, setCookie } from 'h3';
import * as yup from 'yup';
import prisma from '~/lib/prisma';

const loginSchema = yup.object({
  email: yup.string().trim().email().required(),
  password: yup.string().required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let credentials;
  try {
    credentials = await loginSchema.validate(body, { abortEarly: false, stripUnknown: true });
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'E-posta ve şifre gerekli',
    });
  }

  const { email, password } = credentials;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Geçersiz kimlik bilgileri',
    });
  }

  setCookie(event, 'auth', signAuthPayload({ id: user.id, role: user.role ?? 'user' }, event), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return {
    success: true,
    message: 'Giriş başarılı',
    user: { id: user.id, email: user.email, role: user.role },
  };
});
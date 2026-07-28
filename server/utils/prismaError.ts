import { Prisma } from '@prisma/client'

// P2002: unique constraint ihlali (örn. sectionName zaten var)
export function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

// P2025: update/delete hedeflenen kayıt bulunamadı
export function isRecordNotFoundError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

import { Prisma } from '../../prisma/generated/client/client.ts'

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

// Beklenmeyen hatalarda (Prisma hata kodu eşleşmeyen durumlar) client'a ham
// hata mesajı (tablo/sütun adları, sorgu detayları) sızdırılmasın diye:
// sunucu loguna tam detay yazılır, client'a sadece jenerik bir mesaj döner.
// Geliştirme ortamında (NODE_ENV production değilken) hata ayıklamayı
// kolaylaştırmak için ham mesaj döndürülmeye devam eder.
export function getSafeErrorMessage(error: unknown): string {
  console.error(error)
  if (process.env.NODE_ENV !== 'production') {
    return getErrorMessage(error)
  }
  return 'Beklenmeyen bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.'
}

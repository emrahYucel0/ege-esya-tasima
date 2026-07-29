// server/api/files.post.ts
import { readMultipartFormData } from 'h3'
import { saveUploadedFile, type UploadFilePart } from '~/server/domain/files/files.service'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  try {
    const parts = await readMultipartFormData(event)
    const filePart = parts?.find((part) => part.name === 'file' && part.filename)

    if (!filePart || !filePart.filename) {
      throw createError({ statusCode: 400, message: 'Geçersiz dosya yükleme' })
    }

    const file = await saveUploadedFile(filePart as UploadFilePart)
    return { success: true, file }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Dosya yükleme hatası:', error)
    throw createError({
      statusCode: 500,
      message: 'Dosya yükleme başarısız',
      data: { error },
    })
  }
})

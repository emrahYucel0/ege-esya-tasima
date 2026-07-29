import fs from 'node:fs'
import { resolveStoredFile } from '~/server/domain/files/files.service'

export default defineEventHandler(async (event) => {
  try {
    const originalName = decodeURIComponent(getRouterParam(event, 'name')!)
    const { filePath, contentType } = await resolveStoredFile(originalName)

    const fileStream = fs.createReadStream(filePath)
    setHeader(event, 'Content-Type', contentType)
    return sendStream(event, fileStream)
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Dosya okuma hatası:', error)
    throw createError({ statusCode: 500, message: 'Dosya gösterilemiyor' })
  }
})

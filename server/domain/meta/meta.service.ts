// server/domain/meta/meta.service.ts
// Meta ne "tekil bölüm" (sectionName) ne de "liste" (slug) şeklinde — "page"
// alanıyla anahtarlanan kendine özgü bir tekil-kayıt deseni. Bu yüzden ne
// section-crud.factory.ts ne de posts/regions'daki liste deseni kullanılıyor.
import { isUniqueConstraintError, isRecordNotFoundError, getSafeErrorMessage } from '~/server/utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'
import { metaRepository } from './meta.repository'

export interface MetaInput {
  page: string
  title: string
  description?: string
  sectionName?: string
}

async function get(page?: string): Promise<ServiceResult<any>> {
  try {
    if (page) {
      const row = await metaRepository.findByPage(page)
      if (!row) return fail(`'${page}' sayfası için meta verisi bulunamadı.`)
      return ok(row)
    }
    return ok(await metaRepository.findAll())
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function create(body: MetaInput): Promise<ServiceResult<any>> {
  try {
    const row = await metaRepository.create({
      sectionName: body.sectionName || 'metas',
      page: body.page,
      title: body.title,
      description: body.description,
    })
    return ok(row)
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return fail(`'${body.page}' sayfası için meta verisi zaten mevcut. Güncelleme (PUT) metodunu kullanın.`)
    }
    return fail(getSafeErrorMessage(error))
  }
}

async function update(body: MetaInput): Promise<ServiceResult<any>> {
  try {
    const row = await metaRepository.update(body.page, {
      title: body.title,
      description: body.description,
      sectionName: body.sectionName || 'metas',
    })
    return ok(row)
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      return fail(`'${body.page}' sayfası için meta verisi bulunamadı. Önce POST ile oluşturmayı deneyin.`)
    }
    return fail(getSafeErrorMessage(error))
  }
}

async function remove(page: string): Promise<ServiceResult<any>> {
  try {
    const row = await metaRepository.remove(page)
    return ok(row)
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      return fail(`'${page}' sayfası için silinecek meta verisi bulunamadı.`)
    }
    return fail(getSafeErrorMessage(error))
  }
}

export const metaService = { get, create, update, remove }

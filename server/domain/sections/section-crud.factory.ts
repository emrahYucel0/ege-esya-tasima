// server/domain/sections/section-crud.factory.ts
// sectionName ile bulunan tekil-kayıt bölümleri (Hero, Quote, Faq, Services vb.)
// için ortak get/create/update/remove mantığı. Route dosyaları (server/api/*.ts)
// bu factory'nin ürettiği servisi çağırır; kendileri sadece HTTP method switch +
// yup şeması + requireAdmin guard'ı taşır.
//
// Bu dosya bir Nitro route'u DEĞİL, düz bir modül olduğu için server/utils/*
// yardımcılarını (auto-import yerine) açıkça import ediyoruz — auto-import
// transformu sadece route/middleware/plugin dosyalarında garanti.
import { isRecordNotFoundError, isUniqueConstraintError, getSafeErrorMessage } from '~/server/utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'
import type { ChildListConfig, SectionCrudConfig } from '../shared/types'

function buildChildCreateItem(child: ChildListConfig, item: any): Record<string, any> {
  const mapped = child.mapCreate(item)
  if (child.nested) {
    const nestedItems = Array.isArray(item[child.nested.relation]) ? item[child.nested.relation] : []
    mapped[child.nested.relation] = {
      create: nestedItems.map((nestedItem: any) => buildChildCreateItem(child.nested!, nestedItem)),
    }
  }
  return mapped
}

function buildChildrenCreateData(children: ChildListConfig[], body: any): Record<string, any> {
  const data: Record<string, any> = {}
  for (const child of children) {
    const items = Array.isArray(body[child.relation]) ? body[child.relation] : []
    data[child.relation] = { create: items.map((item: any) => buildChildCreateItem(child, item)) }
  }
  return data
}

// PUT'ta çocuk listeler her zaman komple değiştiriliyor (mevcut dosyaların hepsinin
// davranışı buydu): önce hepsi silinir, sonra yeni liste oluşturulur.
function buildChildrenReplaceData(children: ChildListConfig[], body: any): Record<string, any> {
  const data: Record<string, any> = {}
  for (const child of children) {
    const items = Array.isArray(body[child.relation]) ? body[child.relation] : []
    data[child.relation] = {
      deleteMany: {},
      create: items.map((item: any) => buildChildCreateItem(child, item)),
    }
  }
  return data
}

export function createSectionCrudService<TParent = any, TInput extends { sectionName?: string } = any>(
  delegate: any,
  config: SectionCrudConfig<TInput>
) {
  const children = config.children ?? []
  const include = config.include ?? {}
  const getInclude = config.getInclude ?? include

  async function get(): Promise<ServiceResult<TParent | null>> {
    try {
      let row = await delegate.findFirst({
        where: { sectionName: config.defaultSectionName },
        include: getInclude,
      })
      if (!row && config.createDefaultsOnMissingGet) {
        row = await delegate.create({
          data: {
            sectionName: config.defaultSectionName,
            ...config.createDefaultsOnMissingGet(),
          },
        })
      }
      if (!row && config.defaultObjectOnMissingGet) {
        row = config.defaultObjectOnMissingGet()
      }
      return ok(row)
    } catch (error) {
      return fail(getSafeErrorMessage(error))
    }
  }

  async function create(body: TInput): Promise<ServiceResult<TParent>> {
    try {
      const row = await delegate.create({
        data: {
          sectionName: body.sectionName || config.defaultSectionName,
          ...config.mapParentCreate(body),
          ...buildChildrenCreateData(children, body),
        },
        include,
      })
      return ok(row)
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return fail(`Hata: '${config.defaultSectionName}' adında bir kayıt zaten mevcut. Güncelleme (PUT) metodunu kullanın.`)
      }
      return fail(getSafeErrorMessage(error))
    }
  }

  async function update(body: TInput): Promise<ServiceResult<TParent>> {
    const sectionName = body.sectionName || config.defaultSectionName
    try {
      for (const child of children) {
        if (child.manualNestedCleanup) {
          await child.manualNestedCleanup(sectionName)
        }
      }
      const row = await delegate.update({
        where: { sectionName },
        data: {
          ...config.mapParentUpdate(body),
          ...buildChildrenReplaceData(children, body),
        },
        include,
      })
      return ok(row)
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        return fail(`Hata: '${sectionName}' adında bir kayıt bulunamadı. Önce POST ile oluşturmayı deneyin.`)
      }
      return fail(getSafeErrorMessage(error))
    }
  }

  async function remove(sectionNameInput?: string): Promise<ServiceResult<TParent>> {
    const sectionName = sectionNameInput || config.defaultSectionName
    try {
      if (config.deleteStrategy === 'manual') {
        for (const deleteChild of config.manualDeleteDelegates ?? []) {
          await deleteChild(sectionName)
        }
      }
      const row = await delegate.delete({ where: { sectionName } })
      return ok(row)
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        return fail(`Hata: '${sectionName}' adında silinecek kayıt bulunamadı.`)
      }
      return fail(getSafeErrorMessage(error))
    }
  }

  return { get, create, update, remove }
}

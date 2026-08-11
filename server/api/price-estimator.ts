// server/api/price-estimator.ts
import * as yup from 'yup'
import {
  priceEstimatorCrudService,
  type PriceEstimatorInput,
} from '../domain/sections/configs/price-estimator.config'

// DİKKAT: validateOrError `stripUnknown: true` ile çalışıyor — şemada olmayan
// alan sessizce düşer. Yeni alan eklenirse hem buraya hem config'teki
// mapCreate/mapParent* fonksiyonlarına eklenmeli.
const schema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  floorFee: yup.number().min(0).notRequired(),
  packingMultiplier: yup.number().min(1).max(3).notRequired(),
  storageFee: yup.number().min(0).notRequired(),
  rangePercent: yup.number().min(0).max(50).notRequired(),
  roundTo: yup.number().min(1).notRequired(),
  note: yup.string().notRequired(),
  sizes: yup
    .array()
    .of(
      yup.object({
        label: yup.string().trim().required(),
        basePrice: yup.number().min(0).required(),
        order: yup.number().notRequired(),
      })
    )
    .notRequired(),
  distances: yup
    .array()
    .of(
      yup.object({
        label: yup.string().trim().required(),
        multiplier: yup.number().min(0.1).max(10).required(),
        order: yup.number().notRequired(),
      })
    )
    .notRequired(),
})

const deleteSchema = yup.object({ sectionName: yup.string().trim().notRequired() })

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method !== 'GET') requireAdmin(event)

  if (method === 'GET') return priceEstimatorCrudService.get()

  if (method === 'POST') {
    const v = await validateOrError<PriceEstimatorInput>(schema, await readBody(event))
    if (!v.success) return v
    return priceEstimatorCrudService.create(v.data)
  }

  if (method === 'PUT') {
    const v = await validateOrError<PriceEstimatorInput>(schema, await readBody(event))
    if (!v.success) return v
    return priceEstimatorCrudService.update(v.data)
  }

  if (method === 'DELETE') {
    const v = await validateOrError<{ sectionName?: string }>(deleteSchema, await readBody(event))
    if (!v.success) return v
    return priceEstimatorCrudService.remove(v.data.sectionName)
  }

  throw createError({ statusCode: 405, message: 'Desteklenmeyen metot' })
})

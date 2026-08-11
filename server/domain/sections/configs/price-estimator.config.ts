// server/domain/sections/configs/price-estimator.config.ts
import prisma from '../../../utils/prisma'
import { createSectionCrudService } from '../section-crud.factory'

/**
 * /fiyat-hesaplama sayfasındaki tahmin aracının katsayıları.
 *
 * Değerler önce bileşende sabitti; fiyatlar zamanla değiştiği için panele
 * açıldı. Buradaki rakamlar müşteriye GÖSTERİLİYOR — yanlış bir değer yanlış
 * fiyat beklentisi yaratır.
 */
export interface PriceSizeInput {
  label?: string
  basePrice?: number
  order?: number
}

export interface PriceDistanceInput {
  label?: string
  multiplier?: number
  order?: number
}

export interface PriceEstimatorInput {
  sectionName?: string
  floorFee?: number
  packingMultiplier?: number
  storageFee?: number
  rangePercent?: number
  roundTo?: number
  note?: string
  sizes?: PriceSizeInput[]
  distances?: PriceDistanceInput[]
}

export const priceEstimatorCrudService = createSectionCrudService<any, PriceEstimatorInput>(
  prisma.priceEstimator,
  {
    defaultSectionName: 'price-estimator',
    include: {
      sizes: { orderBy: { order: 'asc' } },
      distances: { orderBy: { order: 'asc' } },
    },
    children: [
      {
        relation: 'sizes',
        mapCreate: (s: PriceSizeInput) => ({
          label: s.label || '',
          basePrice: Math.max(0, Math.trunc(Number(s.basePrice) || 0)),
          order: s.order || 0,
        }),
      },
      {
        relation: 'distances',
        mapCreate: (d: PriceDistanceInput) => ({
          label: d.label || '',
          // Çarpan 0 olamaz: sıfırla çarpılan taban ücret her seçimde 0 TL
          // gösterirdi ve bu, panelde fark edilmesi zor bir hata olurdu.
          multiplier: Math.max(0.1, Number(d.multiplier) || 1),
          order: d.order || 0,
        }),
      },
    ],
    mapParentCreate: (b) => ({
      floorFee: Math.max(0, Math.trunc(Number(b.floorFee) || 0)),
      packingMultiplier: Math.max(1, Number(b.packingMultiplier) || 1),
      storageFee: Math.max(0, Math.trunc(Number(b.storageFee) || 0)),
      rangePercent: Math.min(50, Math.max(0, Math.trunc(Number(b.rangePercent) || 0))),
      roundTo: Math.max(1, Math.trunc(Number(b.roundTo) || 1)),
      note: b.note,
    }),
    mapParentUpdate: (b) => ({
      floorFee: Math.max(0, Math.trunc(Number(b.floorFee) || 0)),
      packingMultiplier: Math.max(1, Number(b.packingMultiplier) || 1),
      storageFee: Math.max(0, Math.trunc(Number(b.storageFee) || 0)),
      rangePercent: Math.min(50, Math.max(0, Math.trunc(Number(b.rangePercent) || 0))),
      roundTo: Math.max(1, Math.trunc(Number(b.roundTo) || 1)),
      note: b.note,
    }),
    deleteStrategy: 'cascade',
  }
)

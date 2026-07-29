import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./regions.repository', () => ({
  regionsRepository: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    count: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

import { regionsRepository } from './regions.repository'
import { regionsService } from './regions.service'

describe('regionsService.get — whereClause oluşturma (geriye dönük uyumluluk)', () => {
  beforeEach(() => vi.clearAllMocks())

  it('varsayılan (public) istekte sadece isActive:true filtrelenir', async () => {
    ;(regionsRepository.findMany as any).mockResolvedValue([])

    await regionsService.get({ includeInactive: false })

    expect(regionsRepository.findMany).toHaveBeenCalledWith({ isActive: true }, { light: undefined })
  })

  it('includeInactive:true (admin modu) iken isActive filtresi hiç eklenmez', async () => {
    ;(regionsRepository.findMany as any).mockResolvedValue([])

    await regionsService.get({ includeInactive: true })

    expect(regionsRepository.findMany).toHaveBeenCalledWith({}, { light: undefined })
  })

  it('cityId verilmişse array_contains filtresi isActive ile birlikte eklenir', async () => {
    ;(regionsRepository.findMany as any).mockResolvedValue([])

    await regionsService.get({ cityId: 34, includeInactive: false })

    expect(regionsRepository.findMany).toHaveBeenCalledWith(
      { cities: { array_contains: 34 }, isActive: true },
      { light: undefined }
    )
  })

  it('slug verilmişse bulunamayan kayıt için anlaşılır bir hata döner', async () => {
    ;(regionsRepository.findUnique as any).mockResolvedValue(null)

    const result: any = await regionsService.get({ slug: 'olmayan-bolge', includeInactive: false })

    expect(result).toEqual({ success: false, error: 'Bölge bulunamadı veya erişim izni yok' })
  })
})

describe('regionsService.get — sayfalama', () => {
  beforeEach(() => vi.clearAllMocks())

  it('page verilmezse bare dizi döner', async () => {
    ;(regionsRepository.findMany as any).mockResolvedValue([{ id: 1 }])

    const result = await regionsService.get({ includeInactive: false })

    expect(result).toEqual({ success: true, data: [{ id: 1 }] })
    expect(regionsRepository.count).not.toHaveBeenCalled()
  })

  it('page verildiğinde {items,total,page,pageSize,totalPages} zarfı döner', async () => {
    ;(regionsRepository.findMany as any).mockResolvedValue([{ id: 1 }, { id: 2 }])
    ;(regionsRepository.count as any).mockResolvedValue(33)

    const result: any = await regionsService.get({ includeInactive: false, page: 1, pageSize: 10 })

    expect(result.data).toEqual({
      items: [{ id: 1 }, { id: 2 }],
      total: 33,
      page: 1,
      pageSize: 10,
      totalPages: 4, // ceil(33/10)
    })
    expect(regionsRepository.findMany).toHaveBeenCalledWith(
      { isActive: true },
      { light: undefined, take: 10, skip: 0 }
    )
  })

  it('count() aynı whereClause ile (isActive dahil) çağrılır — toplam sayı filtrelenmiş kayıt sayısı olmalı', async () => {
    ;(regionsRepository.findMany as any).mockResolvedValue([])
    ;(regionsRepository.count as any).mockResolvedValue(0)

    await regionsService.get({ cityId: 6, includeInactive: false, page: 1, pageSize: 10 })

    expect(regionsRepository.count).toHaveBeenCalledWith({ cities: { array_contains: 6 }, isActive: true })
  })
})

import { Prisma } from '../../../prisma/generated/client/client.ts'
import { describe, expect, it, vi } from 'vitest'
import { createSectionCrudService } from './section-crud.factory'
import type { SectionCrudConfig } from '../shared/types'

// Bu factory 14 admin panelinin (Hero, Quote, Faq, Services, vb.) paylaştığı
// get/create/update/remove mantığını üretiyor — burada bir bug, tek bir dosyayı
// değil aynı anda 14 bölümü etkiler. delegate tamamen sahte (vi.fn()) olduğu
// için gerçek bir veritabanına ihtiyaç yok.

function makeDelegate() {
  return {
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}

function makePrismaError(code: string) {
  return new Prisma.PrismaClientKnownRequestError('test', { code, clientVersion: '6.4.1' })
}

const simpleConfig: SectionCrudConfig = {
  defaultSectionName: 'quotes',
  mapParentCreate: (body: any) => ({ title: body.title }),
  mapParentUpdate: (body: any) => ({ title: body.title }),
  deleteStrategy: 'cascade',
}

describe('section-crud.factory: get()', () => {
  it('kayıt varsa ok(row) döner', async () => {
    const delegate = makeDelegate()
    delegate.findFirst.mockResolvedValue({ id: 1, sectionName: 'quotes', title: 'Merhaba' })
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.get()

    expect(result).toEqual({ success: true, data: { id: 1, sectionName: 'quotes', title: 'Merhaba' } })
    expect(delegate.findFirst).toHaveBeenCalledWith({ where: { sectionName: 'quotes' }, include: {} })
  })

  it('kayıt yoksa ve varsayılan davranış tanımlı değilse data:null döner', async () => {
    const delegate = makeDelegate()
    delegate.findFirst.mockResolvedValue(null)
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.get()

    expect(result).toEqual({ success: true, data: null })
    expect(delegate.create).not.toHaveBeenCalled()
  })

  it('createDefaultsOnMissingGet verilmişse kayıt yokken DB satırı OLUŞTURUR', async () => {
    const delegate = makeDelegate()
    delegate.findFirst.mockResolvedValue(null)
    delegate.create.mockResolvedValue({ id: 9, sectionName: 'site-settings', brandName: 'Varsayılan Marka' })

    const service = createSectionCrudService(delegate, {
      ...simpleConfig,
      createDefaultsOnMissingGet: () => ({ brandName: 'Varsayılan Marka' }),
    })

    const result = await service.get()

    expect(delegate.create).toHaveBeenCalledWith({
      data: { sectionName: 'quotes', brandName: 'Varsayılan Marka' },
    })
    expect(result).toEqual({ success: true, data: { id: 9, sectionName: 'site-settings', brandName: 'Varsayılan Marka' } })
  })

  it('defaultObjectOnMissingGet verilmişse kayıt yokken DB\'ye YAZMADAN bellek objesi döner', async () => {
    const delegate = makeDelegate()
    delegate.findFirst.mockResolvedValue(null)

    const service = createSectionCrudService(delegate, {
      ...simpleConfig,
      defaultObjectOnMissingGet: () => ({ title: 'Boş Form' }),
    })

    const result = await service.get()

    expect(delegate.create).not.toHaveBeenCalled()
    expect(result).toEqual({ success: true, data: { title: 'Boş Form' } })
  })

  it('delegate hata fırlatırsa fail() ile güvenli mesaj döner', async () => {
    const delegate = makeDelegate()
    delegate.findFirst.mockRejectedValue(new Error('bağlantı koptu'))
    vi.stubEnv('NODE_ENV', 'production')
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const service = createSectionCrudService(delegate, simpleConfig)
    const result = await service.get()

    expect(result.success).toBe(false)
    expect((result as any).error).toBe('Beklenmeyen bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.')

    spy.mockRestore()
    vi.unstubAllEnvs()
  })
})

describe('section-crud.factory: create()', () => {
  it('başarılı oluşturmada ok(row) döner', async () => {
    const delegate = makeDelegate()
    delegate.create.mockResolvedValue({ id: 1, sectionName: 'quotes', title: 'Yeni' })
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.create({ sectionName: 'quotes', title: 'Yeni' } as any)

    expect(result).toEqual({ success: true, data: { id: 1, sectionName: 'quotes', title: 'Yeni' } })
  })

  it('sectionName body\'de yoksa config.defaultSectionName kullanılır', async () => {
    const delegate = makeDelegate()
    delegate.create.mockResolvedValue({ id: 1 })
    const service = createSectionCrudService(delegate, simpleConfig)

    await service.create({ title: 'Yeni' } as any)

    expect(delegate.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ sectionName: 'quotes' }) })
    )
  })

  it('unique constraint (P2002) hatasında anlaşılır bir mesajla fail döner', async () => {
    const delegate = makeDelegate()
    delegate.create.mockRejectedValue(makePrismaError('P2002'))
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.create({ sectionName: 'quotes' } as any)

    expect(result.success).toBe(false)
    expect((result as any).error).toContain('zaten mevcut')
  })

  it('çocuk liste (children) verilmişse create ilişkisiyle birlikte gönderilir', async () => {
    const delegate = makeDelegate()
    delegate.create.mockResolvedValue({ id: 1 })
    const service = createSectionCrudService(delegate, {
      ...simpleConfig,
      children: [
        {
          relation: 'faqs',
          mapCreate: (item: any) => ({ question: item.question, answer: item.answer }),
        },
      ],
    })

    await service.create({
      sectionName: 'quotes',
      faqs: [{ question: 'S1?', answer: 'C1' }],
    } as any)

    expect(delegate.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          faqs: { create: [{ question: 'S1?', answer: 'C1' }] },
        }),
      })
    )
  })

  it('2 seviyeli iç içe çocuk liste (nested) doğru şekilde oluşturulur', async () => {
    const delegate = makeDelegate()
    delegate.create.mockResolvedValue({ id: 1 })
    const service = createSectionCrudService(delegate, {
      ...simpleConfig,
      children: [
        {
          relation: 'faqs',
          mapCreate: (item: any) => ({ question: item.question }),
          nested: {
            relation: 'details',
            mapCreate: (item: any) => ({ text: item.text }),
          },
        },
      ],
    })

    await service.create({
      sectionName: 'quotes',
      faqs: [{ question: 'S1?', details: [{ text: 'D1' }, { text: 'D2' }] }],
    } as any)

    expect(delegate.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          faqs: {
            create: [
              {
                question: 'S1?',
                details: { create: [{ text: 'D1' }, { text: 'D2' }] },
              },
            ],
          },
        }),
      })
    )
  })
})

describe('section-crud.factory: update()', () => {
  it('başarılı güncellemede ok(row) döner', async () => {
    const delegate = makeDelegate()
    delegate.update.mockResolvedValue({ id: 1, title: 'Güncel' })
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.update({ sectionName: 'quotes', title: 'Güncel' } as any)

    expect(result).toEqual({ success: true, data: { id: 1, title: 'Güncel' } })
  })

  it('çocuk listeler PUT\'ta komple değiştirilir (deleteMany + create)', async () => {
    const delegate = makeDelegate()
    delegate.update.mockResolvedValue({ id: 1 })
    const service = createSectionCrudService(delegate, {
      ...simpleConfig,
      children: [{ relation: 'faqs', mapCreate: (item: any) => ({ question: item.question }) }],
    })

    await service.update({ sectionName: 'quotes', faqs: [{ question: 'Yeni soru' }] } as any)

    expect(delegate.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          faqs: { deleteMany: {}, create: [{ question: 'Yeni soru' }] },
        }),
      })
    )
  })

  it('manualNestedCleanup tanımlıysa update\'ten ÖNCE çağrılır (FK ihlalini önlemek için)', async () => {
    const delegate = makeDelegate()
    delegate.update.mockResolvedValue({ id: 1 })
    const cleanupOrder: string[] = []
    const manualNestedCleanup = vi.fn(async () => {
      cleanupOrder.push('cleanup')
    })
    delegate.update.mockImplementation(async () => {
      cleanupOrder.push('update')
      return { id: 1 }
    })

    const service = createSectionCrudService(delegate, {
      ...simpleConfig,
      children: [{ relation: 'plans', mapCreate: (i: any) => i, manualNestedCleanup }],
    })

    await service.update({ sectionName: 'quotes' } as any)

    expect(manualNestedCleanup).toHaveBeenCalledWith('quotes')
    expect(cleanupOrder).toEqual(['cleanup', 'update'])
  })

  it('kayıt bulunamazsa (P2025) anlaşılır bir mesajla fail döner', async () => {
    const delegate = makeDelegate()
    delegate.update.mockRejectedValue(makePrismaError('P2025'))
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.update({ sectionName: 'quotes' } as any)

    expect(result.success).toBe(false)
    expect((result as any).error).toContain('bulunamadı')
  })
})

describe('section-crud.factory: remove()', () => {
  it('deleteStrategy cascade ise sadece delegate.delete çağrılır', async () => {
    const delegate = makeDelegate()
    delegate.delete.mockResolvedValue({ id: 1 })
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.remove('quotes')

    expect(delegate.delete).toHaveBeenCalledWith({ where: { sectionName: 'quotes' } })
    expect(result).toEqual({ success: true, data: { id: 1 } })
  })

  it('deleteStrategy manual ise manualDeleteDelegates, delegate.delete\'ten ÖNCE sırayla çalışır', async () => {
    const delegate = makeDelegate()
    delegate.delete.mockResolvedValue({ id: 1 })
    const order: string[] = []
    const cleanupA = vi.fn(async () => { order.push('A') })
    const cleanupB = vi.fn(async () => { order.push('B') })
    delegate.delete.mockImplementation(async () => {
      order.push('delete')
      return { id: 1 }
    })

    const service = createSectionCrudService(delegate, {
      ...simpleConfig,
      deleteStrategy: 'manual',
      manualDeleteDelegates: [cleanupA, cleanupB],
    })

    await service.remove('quotes')

    expect(order).toEqual(['A', 'B', 'delete'])
  })

  it('sectionName verilmezse config.defaultSectionName kullanılır', async () => {
    const delegate = makeDelegate()
    delegate.delete.mockResolvedValue({ id: 1 })
    const service = createSectionCrudService(delegate, simpleConfig)

    await service.remove()

    expect(delegate.delete).toHaveBeenCalledWith({ where: { sectionName: 'quotes' } })
  })

  it('silinecek kayıt bulunamazsa (P2025) anlaşılır bir mesajla fail döner', async () => {
    const delegate = makeDelegate()
    delegate.delete.mockRejectedValue(makePrismaError('P2025'))
    const service = createSectionCrudService(delegate, simpleConfig)

    const result = await service.remove('quotes')

    expect(result.success).toBe(false)
    expect((result as any).error).toContain('bulunamadı')
  })
})

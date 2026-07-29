// server/domain/shared/types.ts

export interface ChildListConfig<TItem = any> {
  /** Prisma ilişki adı (örn. 'faqs', 'statistics') */
  relation: string
  /** Bir liste öğesini Prisma create objesine çevirir (skaler alanlar) */
  mapCreate: (item: TItem) => Record<string, any>
  /** 2. seviye iç içe liste varsa (örn. faqs[].details[]) */
  nested?: ChildListConfig<any>
  /**
   * `nested` verilmişse ve o ilişki DB'de onDelete:Cascade İLE korunmuyorsa
   * (örn. PricingFeature -> PricingPlan), PUT'ta bu child'ın `deleteMany`'i
   * çalışmadan önce torun satırları elle temizleyen fonksiyon — aksi halde
   * FK kısıtı ihlali (silinmeye çalışılan satır hâlâ referans alınıyor) oluşur.
   * Cascade zaten varsa (örn. FaqDetail -> FaqItem) bu alana gerek yok.
   */
  manualNestedCleanup?: (sectionName: string) => Promise<unknown>
}

export interface SectionCrudConfig<TInput extends { sectionName?: string } = any> {
  /** Bu bölümün varsayılan sectionName değeri (örn. 'quotes', 'faq-section') */
  defaultSectionName: string
  /** findFirst/create/update sorgularına eklenecek Prisma include */
  include?: Record<string, any>
  /**
   * GET için farklı bir include gerekiyorsa (örn. testimonials-section: herkese
   * açık sayfa bu endpoint'i kullanıyor ve sadece isActive:true yorumları
   * görmeli, ama admin panel POST/PUT sonrası TÜM yorumları görmeli). Verilmezse
   * `include` kullanılır.
   */
  getInclude?: Record<string, any>
  /** Çocuk liste ilişkileri (yoksa boş bırakılabilir) */
  children?: ChildListConfig[]
  /** POST body'sinden skaler (parent) alanları çıkarır */
  mapParentCreate: (body: TInput) => Record<string, any>
  /** PUT body'sinden skaler (parent) alanları çıkarır */
  mapParentUpdate: (body: TInput) => Record<string, any>
  /**
   * 'cascade': Prisma şemasında onDelete:Cascade var, parent silinince çocuklar
   *   otomatik gider.
   * 'manual': Parent silinmeden önce manualDeleteDelegates'teki fonksiyonlar
   *   sırayla çalıştırılıp çocuklar elle temizlenir.
   */
  deleteStrategy: 'cascade' | 'manual'
  /** deleteStrategy 'manual' ise, sectionName alıp ilgili deleteMany'i çalıştıran fonksiyonlar */
  manualDeleteDelegates?: Array<(sectionName: string) => Promise<unknown>>
  /**
   * Bazı bölümler (siteSettings gibi) GET'te kayıt yoksa varsayılan değerlerle
   * otomatik bir satır oluşturuyor (boş obje değil, gerçek bir DB satırı).
   * Bu alan verilirse get() bu davranışı üretir; verilmezse GET'te satır
   * yoksa data:null döner (diğer tüm bölümlerin varsayılan davranışı).
   */
  createDefaultsOnMissingGet?: () => Record<string, any>
  /**
   * Bazı bölümler (card.ts gibi) GET'te kayıt yoksa DB'ye hiçbir şey yazmadan,
   * sadece bellekte doldurulmuş bir varsayılan obje döndürüyor (frontend formu
   * boş alanlarla başlatabilsin diye). createDefaultsOnMissingGet'ten farkı:
   * bu hiçbir satır oluşturmaz.
   */
  defaultObjectOnMissingGet?: () => Record<string, any>
}

// server/domain/shared/response.ts
// Tüm domain servislerinin döndüğü tek tip zarf. server/api/*.ts route'ları
// bu zarfı doğrudan dışa (frontend'e) yansıtır; useSectionCrud/useListCrud
// composable'ları hem bu zarfı hem de eski ham-kayıt dönüşlerini tolere ettiği
// için ({success,data} yoksa response'un kendisini veri sayar) bu zarfa geçiş
// geriye dönük tam uyumludur.
export type ServiceResult<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string }

export function ok<T>(data: T, message?: string): ServiceResult<T> {
  return message !== undefined ? { success: true, data, message } : { success: true, data }
}

export function fail(error: string): ServiceResult<never> {
  return { success: false, error }
}

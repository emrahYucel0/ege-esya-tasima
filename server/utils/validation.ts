import * as yup from 'yup'

export async function validateOrError<T>(
  schema: yup.Schema<T>,
  body: unknown
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const data = await schema.validate(body, { abortEarly: false, stripUnknown: true })
    return { success: true, data }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return { success: false, error: `Geçersiz veri: ${err.errors.join(' | ')}` }
    }
    return { success: false, error: 'Geçersiz veri.' }
  }
}

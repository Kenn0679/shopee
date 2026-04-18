import * as z from 'zod'

export const FormAuthSchema = z.object({
  email: z
    .email({
      error: (issue) => {
        if (issue.input === undefined || issue.input === '') return { message: 'Email là bắt buộc' }
        return { message: 'Email không hợp lệ' }
      }
    })
    .min(5, { error: 'Email phải có ít nhất 5 ký tự' })
    .max(160, { error: 'Email không được vượt quá 160 ký tự' }),
  password: z
    .string({
      error: (issue) => {
        if (issue.input === undefined || issue.input === '') return { message: 'Mật khẩu là bắt buộc' }
        return { message: 'Mật khẩu phải là một chuỗi' }
      }
    })
    .min(6, { error: 'Mật khẩu phải có ít nhất 6 ký tự' })
    .max(160, { error: 'Mật khẩu không được vượt quá 160 ký tự' }),
  confirmPassword: z
    .string({
      error: (issue) => {
        if (issue.input === undefined || issue.input === '') return { message: 'Bạn phải xác nhận mật khẩu' }
        return { message: 'Mật khẩu xác nhận phải là một chuỗi' }
      }
    })
    .min(1, { error: 'Bạn phải xác nhận mật khẩu' })
    .max(160, { error: 'Mật khẩu xác nhận không được vượt quá 160 ký tự' })
})

export type RegisterFormData = z.infer<typeof FormAuthSchema>
export const registerSchema = FormAuthSchema.refine((data) => data.password === data.confirmPassword, {
  error: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
  abort: true
})

export const loginSchema = FormAuthSchema.omit({ confirmPassword: true })
export type LoginFormData = z.infer<typeof loginSchema>

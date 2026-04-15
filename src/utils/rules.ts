import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type RulesType = { [key in 'email' | 'password' | 'confirmPassword']: RegisterOptions }
const getRules = (getValues?: UseFormGetValues<any>): RulesType => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: 'Email không hợp lệ'
    },
    minLength: {
      value: 5,
      message: 'Email phải có ít nhất 5 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email không được vượt quá 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu không được vượt quá 160 ký tự'
    }
  },
  confirmPassword: {
    required: {
      value: true,
      message: 'Bạn phải xác nhận mật khẩu'
    },
    validate: (value) => {
      if (typeof getValues === 'function') {
        const password = getValues('password')
        return value === password || 'Mật khẩu xác nhận không khớp'
      } else return
    }
  }
})

export default getRules

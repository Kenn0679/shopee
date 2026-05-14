import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { omit } from 'lodash'
import { Form, Link, useNavigate } from 'react-router'
import Input from '~/components/Input'
import { Button } from '~/components/ui/button'
import { registerSchema, type RegisterFormData } from '~/utils/rules'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import type { ErrorResponse } from '~/types/utils.types'
import { useContext } from 'react'
import { AuthContext } from '~/contexts/auth.context'
import { Spinner } from '~/components/ui/spinner'
import endpoints from '~/constants/endpoints'
import AuthApi from '~/apis/auth.api'

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })
  const nav = useNavigate()

  const registerMutaition = useMutation({
    mutationFn: (body: Omit<RegisterFormData, 'confirmPassword'>) => AuthApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword'])
    registerMutaition.mutate(body, {
      onSuccess: (data) => {
        toast.success('Đăng ký thành công')
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        nav(-1)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<RegisterFormData, 'confirmPassword'>>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            for (const key in formError) {
              const error = key as keyof Omit<RegisterFormData, 'confirmPassword'> //ép kiểu để khỏi bị lỗi key is string

              setError(error, {
                message: formError[error],
                type: 'Server'
              })
            }
          }
        }
        toast.error('Đăng ký thất bại')
      }
    })
  })

  return (
    <div className='bg-primary/75'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <Form className='p-10 rounded bg-background min-w-fit' noValidate={true} onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
              {/* 3 input for email, password, and confirmPassword */}
              <Input
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                register={register}
                type='password'
                placeholder='Mật khẩu'
                autoComplete='on'
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirmPassword'
                register={register}
                type='password'
                autoComplete='on'
                placeholder='Xác nhận mật khẩu'
                errorMessage={errors.confirmPassword?.message}
              />
              {/* Submit button */}
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full text-center py-6 px-2 uppercase bg-primary text-white hover:bg-destructive min-w-fit'
                  size={'lg'}
                  disabled={registerMutaition.isPending}
                >
                  Đăng Ký
                  {registerMutaition.isPending && <Spinner />}
                </Button>
              </div>
              {/* Login link */}
              <div className='mt-8 text-center'>
                <div className='flex justify-center'>
                  <span className='text-slate-500'>Bạn đã có tài khoản đăng nhập?</span>
                  <Link to={endpoints.auth.login} className='text-primary hover:underline ml-1'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

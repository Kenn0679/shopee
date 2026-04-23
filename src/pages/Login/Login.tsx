import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { loginAccount } from '~/apis/auth.api'
import Input from '~/components/Input'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import endpoints from '~/constants/endpoints'
import { AuthContext } from '~/contexts/auth.context'
import type { ErrorResponse } from '~/types/utils.types'
import { loginSchema, type LoginFormData } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

export default function Login() {
  const { setIsAuthenticated, setProfile, profile } = useContext(AuthContext)
  const { register, handleSubmit, formState, setError } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })
  const loginMutation = useMutation({
    mutationFn: (body: LoginFormData) => loginAccount(body)
  })
  const nav = useNavigate()

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success('Đăng nhập thành công')
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        nav(-1)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<LoginFormData, 'password'>>>(error)) {
          const formError = error.response?.data.data
          console.log(formError)

          if (formError) {
            for (const key in formError) {
              const error = key as keyof Omit<LoginFormData, 'password'>

              setError(error, {
                message: formError[error],
                type: 'Server'
              })
            }
          }
        }
        toast.error('Đăng nhập thất bại')
      }
    })
  })

  return (
    <div className='bg-primary/75'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <Form className='p-10 rounded bg-background min-w-fit' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                className='mt-8'
                name='email'
                register={register}
                type='text'
                placeholder='Email'
                errorMessage={formState.errors.email?.message}
              />
              <Input
                className='mt-3'
                name='password'
                register={register}
                type='password'
                placeholder='Mật khẩu'
                errorMessage={formState.errors.password?.message}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full text-center py-6 px-2 uppercase bg-primary text-white hover:bg-destructive min-w-fit'
                  size={'lg'}
                  disabled={loginMutation.isPending}
                >
                  Đăng Nhập
                  {loginMutation.isPending && <Spinner />}
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex justify-center'>
                  <span className='text-slate-500'>Bạn chưa có tài khoản đăng nhập?</span>
                  <Link to={endpoints.auth.register} className='text-primary hover:underline ml-1'>
                    Đăng ký
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

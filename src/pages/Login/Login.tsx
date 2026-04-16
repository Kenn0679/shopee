import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Form, Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Input from '~/components/Input'
import { Button } from '~/components/ui/button'
import type { AuthResponse } from '~/types/auth.types'
import http from '~/utils/http'
import { loginSchema, type LoginFormData } from '~/utils/rules'

export default function Login() {
  const { register, handleSubmit, formState } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })
  const loginMutation = useMutation({
    mutationFn: (body: LoginFormData) => http.post<AuthResponse>('/login', body)
  })
  const nav = useNavigate()

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Đăng nhập thành công')
        nav('/')
      },
      onError: (error) => {
        console.log(error)
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
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex justify-center'>
                  <span className='text-slate-500'>Bạn chưa có tài khoản đăng nhập?</span>
                  <Link to='/register' className='text-primary hover:underline ml-1'>
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

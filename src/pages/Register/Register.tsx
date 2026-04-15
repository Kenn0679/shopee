import { useForm, type RegisterOptions } from 'react-hook-form'
import { Form, Link } from 'react-router'
import { Button } from '~/components/ui/button'
import getRules from '~/utils/rules'

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    console.log(errors)
  })

  const RULES = getRules(getValues)

  return (
    <div className='bg-primary/75'>
      <div className='max-w-300 mx-auto px-4'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <Form className='p-10 rounded bg-background min-w-fit' noValidate={true} onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
              <div className='mt-8'>
                <input
                  type='text'
                  className='p-3 w-full outline-none border border-muted-foreground/50 focus:border-muted-foreground focus:shadow-sm rounded-sm'
                  placeholder='Email'
                  {...register('email', RULES.email as RegisterOptions<FormData, 'email'>)}
                />
                <div className='mt-1 text-destructive min-h-8 text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-muted-foreground/50 focus:border-muted-foreground focus:shadow-sm rounded-sm'
                  placeholder='Mật khẩu'
                  {...register('password', RULES.password as RegisterOptions<FormData, 'password'>)}
                />
                <div className='mt-1 text-destructive min-h-8 text-sm'>{errors.password?.message} </div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-muted-foreground/50 focus:border-muted-foreground focus:shadow-sm rounded-sm'
                  placeholder='Xác nhận mật khẩu'
                  {...register(
                    'confirmPassword',
                    RULES.confirmPassword as RegisterOptions<FormData, 'confirmPassword'>
                  )}
                />
                <div className='mt-1 text-destructive min-h-8 text-sm'>{errors.confirmPassword?.message}</div>
              </div>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full text-center py-6 px-2 uppercase bg-primary text-white hover:bg-destructive min-w-fit'
                  size={'lg'}
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex justify-center'>
                  <span className='text-slate-500'>Bạn đã có tài khoản đăng nhập?</span>
                  <Link to='/login' className='text-primary hover:underline ml-1'>
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

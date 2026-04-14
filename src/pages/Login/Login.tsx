import { Form } from 'react-router'

export default function Login() {
    return (
        <div className='bg-primary/75'>
            <div className='max-w-300 mx-auto px-4'>
                <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <Form className='p-10 rounded bg-background'>
                            <div className='text-2xl'>Đăng Nhập</div>
                            <div className='mt-8'>
                                <input
                                    type='email'
                                    name='email'
                                    className='p-3 w-full outline-none border border-muted-foreground/50 focus:border-muted-foreground focus:shadow-sm rounded-sm'
                                    placeholder='Email'
                                />
                                <div className='mt-1 text-destructive min-h-4 text-sm'></div>
                            </div>
                            <div className='mt-3'>
                                <input
                                    type='password'
                                    name='password'
                                    className='p-3 w-full outline-none border border-muted-foreground/50 focus:border-muted-foreground focus:shadow-sm rounded-sm'
                                    placeholder='Mật khẩu'
                                />
                                <div className='mt-1 text-destructive min-h-4 text-sm'></div>
                            </div>
                            <div className='mt-3'></div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

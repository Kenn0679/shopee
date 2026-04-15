import React from 'react'
import type { UseFormRegister } from 'react-hook-form'

type Props = {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  errorMessage?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  autoComplete?: string
}

export default function Input({ name, type, placeholder, errorMessage, className, register, autoComplete }: Props) {
  return (
    <div className={`${className ? className : 'mt-2'}`}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-muted-foreground/50 focus:border-muted-foreground focus:shadow-sm rounded-sm '
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
      />
      <div className='mt-1 text-destructive min-h-8 text-sm'>{errorMessage}</div>
    </div>
  )
}

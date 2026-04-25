import React, { type InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  name,
  type,
  placeholder,
  errorMessage,
  className,
  register,
  autoComplete,
  classNameInput,
  classNameError,
  rules
}: InputProps) {
  return (
    <div className={`${className ? className : 'mt-2'}`}>
      <input
        type={type}
        className={
          classNameInput
            ? classNameInput
            : 'p-3 w-full outline-none border border-muted-foreground/50 focus:border-muted-foreground focus:shadow-sm rounded-sm'
        }
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...(register && name ? register(name, rules) : {})}
      />
      <div className={classNameError ? classNameError : 'mt-1 text-destructive min-h-8 text-sm'}>{errorMessage}</div>
    </div>
  )
}

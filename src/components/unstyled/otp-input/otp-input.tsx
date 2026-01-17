'use client'

import * as React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './otp-input-component'
import { OTPInputProps } from './otp-input.types'
import { Typography } from '@/components/atoms/typography'

const OtpInput: React.FC<OTPInputProps> = ({
  length = 6,
  className,
  containerClassName,
  onChange,
  value = '',
  disabled = false,
  isError = false,
  message,
}) => {
  return (
    <div>
      <InputOTP
        maxLength={length}
        value={value} // Added value prop
        className={
          disabled
            ? 'outline-0 bg-transparent cursor-not-allowed outline-none opacity-50'
            : className
        }
        containerClassName={containerClassName}
        disabled={disabled}
        isError={isError}
        onChange={onChange}
      >
        {Array.from({ length }).map((_, index) => (
          <InputOTPGroup key={index}>
            <InputOTPSlot
              index={index}
              isError={isError}
              disabled={disabled}
              className={className}
            />
          </InputOTPGroup>
        ))}
      </InputOTP>

      {message && (
        <Typography
          variant={'body4'}
          className={`${isError ? 'text-danger-1' : 'text-light-4'} mt-1`}
        >
          {message}
        </Typography>
      )}
    </div>
  )
}

export { OtpInput }

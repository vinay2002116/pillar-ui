export interface OTPInputProps {
  length: number
  containerClassName?: string
  className?: string
  onChange?: (value: string) => void
  disabled?: boolean
  isError?: boolean
  message?: string // Added message prop
  value?: string
}

export interface InputOTPSlotProps {
  index: number
  className?: string
  isError?: boolean
  disabled?: boolean
  style?: React.CSSProperties
}

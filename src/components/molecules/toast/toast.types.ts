import type { ToastProps } from './toast-components'

export type ToasterToastProps = ToastProps & {
  id: string
  title: React.ReactNode
  description: React.ReactNode
  action?: {
    title: string
    method: VoidFunction
    altText: string
  }
} & ToastIconProps

export type ToastIconProps = {
  icon?: 'success' | 'danger' | 'warning' | 'info'
}

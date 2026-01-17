import { type VariantProps } from 'class-variance-authority'
import { TabsVariants } from './tabs.styles'
import { LucideIcon } from 'lucide-react'

export interface TabsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TabsVariants> {
  defaultValue?: string
  value?: string
  tabList: {
    label: string
    value: string
    icon?: string | LucideIcon
  }[]
  onTabChange: (value: string) => void
  id?: string
  disabled?: boolean
}

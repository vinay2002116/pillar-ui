export type DialogProps = {
  trigger: React.ReactNode
  body: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
  footerClassName?: string
  contentClassName?: string
  onOpenChange?: (open: boolean) => void
  open?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInteractOutside?: (e: any) => void
  id?: string
}

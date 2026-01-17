export type Field =
  | { id: string; href: string; name: string; icon?: never }
  | { id: string; href: string; name?: never; icon: React.ReactNode }

export type BreadcrumbProps = {
  id?: string
  fields: Field[]
  numberOfFieldsToShow: number
  selectedFieldId?: string
  breadcrumbEllipsisClassName?: string
}

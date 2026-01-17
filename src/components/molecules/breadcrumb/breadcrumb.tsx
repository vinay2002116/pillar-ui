import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb-components'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu/dropdown-menu-components'
import { BreadcrumbProps } from './breadcrumb.types'
import React from 'react'
import { Typography } from '@/components/atoms/typography'
import { Field } from './breadcrumb.types'
import { cn } from '@/lib/utils'
import { CrumbVariants } from './breadcrumb.styles'

function Crumb({ field, isSelected }: { field: Field; isSelected: boolean }) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink
        href={field?.href}
        className={cn(
          CrumbVariants({ isSelected, type: field?.icon ? 'icon' : 'text' })
        )}
      >
        {field?.name ? (
          <Typography variant={isSelected ? 'body3' : 'body4'}>
            {field?.name}
          </Typography>
        ) : (
          field?.icon
        )}
      </BreadcrumbLink>
    </BreadcrumbItem>
  )
}

export function BreadcrumbDemo({
  fields,
  numberOfFieldsToShow,
  selectedFieldId,
  breadcrumbEllipsisClassName,
  id,
}: BreadcrumbProps) {
  //

  if (fields.length <= 1) return null

  const firstField = fields[0]
  //
  const fieldsToShow = fields.slice(-numberOfFieldsToShow)
  const middleFields = fields.slice(1, -numberOfFieldsToShow)

  return (
    <Breadcrumb id={id}>
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink
            href={fields[0]?.href ?? '/'}
            className="text-gray-600 "
          >
            {fields[0]?.name ? (
              <Typography variant="body3">{fields[0]?.name}</Typography>
            ) : (
              fields[0]?.icon
            )}
          </BreadcrumbLink>
        </BreadcrumbItem> */}
        <Crumb
          field={firstField}
          isSelected={firstField.id === selectedFieldId}
        />
        {middleFields.length ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="w-4 h-4 text-gray-600" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={`${breadcrumbEllipsisClassName} bg-white`}
                >
                  {middleFields.map((field, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={`hover:bg-light-3`}
                    >
                      <BreadcrumbLink href={field.href} key={index}>
                        {field.name}
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        ) : null}

        {fieldsToShow.map((field, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <Crumb field={field} isSelected={field.id === selectedFieldId} />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

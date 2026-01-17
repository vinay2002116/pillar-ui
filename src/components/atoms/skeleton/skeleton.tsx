import { cn } from '@/lib/utils'
import React from 'react'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-light-4', className)}
      id={props.id}
      {...props}
    />
  )
}

export { Skeleton }

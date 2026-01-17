import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Typography } from '@/components/atoms/typography'

// import { ButtonProps } from 'geoiq-frontend-ui-kit'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`mx-auto flex w-full justify-center ${className}`}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={`flex flex-row items-center gap-1 ${className}`}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

// type PaginationLinkProps = RemixLinkProps &
//   React.RefAttributes<HTMLAnchorElement>
// Pick<ButtonProps, 'size'> &

// const PaginationLink = (props: PaginationLinkProps) => <Link {...props} />

// PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = (props: React.ComponentProps<typeof Button>) => (
  <Button variant="teritiary" size="sm" {...props}>
    <ChevronLeft className="w-4 h-4" />
    <Typography variant="body4">Previous</Typography>
  </Button>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = (props: React.ComponentProps<typeof Button>) => (
  <Button variant="teritiary" size="sm" {...props}>
    <Typography variant="body4">Next</Typography>
    <ChevronRight className="w-4 h-4" />
  </Button>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = (props: React.ComponentProps<typeof Button>) => (
  <Button variant="teritiary" size="sm" {...props}>
    <MoreHorizontal className="w-4 h-4 stroke-light-1" />
  </Button>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  // PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

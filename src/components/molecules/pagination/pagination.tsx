import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './pagination-components'
import { Button } from '@/components/atoms/button'
import { Typography } from '@/components/atoms/typography'

interface PaginationProps {
  firstPage: number
  lastPage: number
  currPage: number
  onPageChange: (page: number) => void
  siblingCount?: number // Number of pages to show on either side of current page
}

const PaginationComponent: React.FC<PaginationProps> = ({
  firstPage,
  lastPage,
  currPage,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currPage > firstPage) {
      onPageChange(currPage - 1)
    }
  }

  const handleNext = () => {
    if (currPage < lastPage) {
      onPageChange(currPage + 1)
    }
  }

  const handleFirst = () => {
    onPageChange(firstPage)
  }

  const handleLast = () => {
    onPageChange(lastPage)
  }

  const handleEllipsisClick = (start: number, end: number) => {
    const midpoint = Math.floor((start + end) / 2)
    onPageChange(midpoint)
  }

  const renderPageLinks = () => {
    const pages = []
    const startPage = Math.max(currPage - siblingCount, firstPage + 1)
    const endPage = Math.min(currPage + siblingCount, lastPage - 1)

    pages.push(
      <PaginationItem key={firstPage}>
        <Button
          variant={currPage === firstPage ? 'secondary' : 'teritiary'}
          size="sm"
          onClick={handleFirst}
        >
          <Typography variant="body4" className="p-2 text-light-1">
            {firstPage}
          </Typography>
        </Button>
      </PaginationItem>
    )

    // Add ellipsis before startPage if needed
    if (startPage > firstPage + 1) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis
            onClick={() => handleEllipsisClick(firstPage + 1, startPage - 1)}
          />
        </PaginationItem>
      )
    }

    // Generate middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <Button
            variant={currPage === i ? 'secondary' : 'teritiary'}
            size="sm"
            onClick={() => onPageChange(i)}
          >
            <Typography variant="body4" className="p-2 text-light-1">
              {i}
            </Typography>
          </Button>
        </PaginationItem>
      )
    }

    // Add ellipsis after endPage if needed
    if (endPage < lastPage - 1) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis
            onClick={() => handleEllipsisClick(endPage + 1, lastPage - 1)}
          />
        </PaginationItem>
      )
    }

    // Always include the last page
    if (lastPage > 1) {
      pages.push(
        <PaginationItem key={lastPage}>
          <Button
            variant={currPage === lastPage ? 'secondary' : 'teritiary'}
            size="sm"
            onClick={handleLast}
          >
            <Typography variant="body4" className="p-2 text-light-1">
              {lastPage}
            </Typography>
          </Button>
        </PaginationItem>
      )
    }

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currPage === firstPage}
            onClick={handlePrevious}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            disabled={currPage === lastPage}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent

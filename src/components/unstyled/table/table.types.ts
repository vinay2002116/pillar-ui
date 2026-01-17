import { ReactNode } from 'react'

export type TableInputProps = {
  tableData: TableData
}

export type TableData = {
  headers: { name: string | ReactNode; className?: string }[]
  rows: {
    cells: { content: string | ReactNode; className?: string }[]
  }[]
  tableContainerClassName?: string
  tableHeaderClassName?: string
  tableHeaderCellClassName?: string
  tableBodyClassName?: string
  tableRowClassName?: string
  tableCellClassName?: string
  id?: string
}

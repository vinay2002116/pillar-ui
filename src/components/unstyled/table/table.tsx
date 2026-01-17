import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableCell,
} from './table-components'
import * as React from 'react'
import { TableData } from './table.types'
import { Typography } from '@/components/atoms/typography'
export default function TableComponent({
  tableData,
}: {
  tableData: TableData
}) {
  return (
    <>
      <Table
        className={tableData?.tableContainerClassName ?? ''}
        id={tableData?.id}
      >
        <TableHeader className={tableData?.tableHeaderClassName ?? ''}>
          <TableRow>
            {tableData.headers.map((header, index) => (
              <TableCell
                key={index}
                className={
                  header?.className +
                  ' ' +
                  (tableData?.tableCellClassName ?? '')
                }
              >
                {typeof header?.name === 'string' ? (
                  <Typography className="text-light-2" variant={'body4'}>
                    {header.name}
                  </Typography>
                ) : (
                  <>{header.name}</>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className={tableData?.tableBodyClassName ?? ''}>
          {tableData.rows.map((row, rowIndex) => (
            <TableRow
              className={tableData?.tableRowClassName ?? ''}
              key={rowIndex}
            >
              {row.cells.map((cell, cellIndex) => (
                <TableCell
                  className={tableData?.tableCellClassName ?? ''}
                  key={cellIndex}
                >
                  {typeof cell?.content === 'string' ? (
                    <Typography
                      className={
                        'text-light-2 ' + ' ' + (cell?.className ?? '')
                      }
                      variant={'body4'}
                    >
                      {cell.content}
                    </Typography>
                  ) : (
                    <>{cell?.content}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

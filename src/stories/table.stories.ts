import { TableData } from '@/components/unstyled/table/table.types'
import { Table } from '@/index'
import { Meta, StoryObj } from '@storybook/react/*'

const meta = {
  title: 'unstyled/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

// Sample data structure
const tableData: TableData = {
  headers: [
    { name: 'ID', className: 'header-class' },
    { name: 'Name', className: 'header-class' },
    { name: 'Role', className: 'header-class' },
  ],
  rows: [
    {
      cells: [
        { content: '1', className: 'cell-class' },
        { content: 'Alice', className: 'cell-class' },
        { content: 'Developer', className: 'cell-class' },
      ],
    },
    {
      cells: [
        { content: '2', className: 'cell-class' },
        { content: 'Bob', className: 'cell-class' },
        { content: 'Designer', className: 'cell-class' },
      ],
    },
    {
      cells: [
        { content: '3', className: 'cell-class' },
        { content: 'Charlie', className: 'cell-class' },
        { content: 'Manager', className: 'cell-class' },
      ],
    },
    // Add more rows as needed
  ],
  tableContainerClassName: 'rounded-xl border-neutral-1 border rounded-xl ',
  tableHeaderClassName: 'bg-light-2',
  tableCellClassName: 'px-6 py-3 text-center',
  id: 'table',
}
// add options
export const Primary: Story = {
  args: {
    tableData: tableData,
  },
}

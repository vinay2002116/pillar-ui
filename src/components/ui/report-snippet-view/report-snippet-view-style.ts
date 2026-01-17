import { cva } from 'class-variance-authority'

export const trendBoxStyles = cva(
  'w-auto min-w-[50px] h-5 flex items-center justify-center gap-2 px-1 py-0.5 rounded-[4px]',
  {
    variants: {
      trend: {
        '1': 'bg-success-1 border border-success-1',
        '-1': 'bg-danger-1 border border-danger-1',
        '0': '',
        null: '',
      },
    },
  }
)

export const trendValueStyles = cva('text-sm', {
  variants: {
    trend: {
      '1': 'text-success-1',
      '-1': 'text-danger-1',
      '0': '',
      null: '',
    },
  },
})

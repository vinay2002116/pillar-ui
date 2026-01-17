import { cva } from 'class-variance-authority'
import { defaultTypographyVariant } from './typography.config'

export const TypographyVariants = cva('', {
  variants: {
    variant: {
      // h1: 'font-bold text-4xl',
      // h2: 'font-bold text-3xl',
      // h3: 'font-bold text-2xl',
      // h4: 'font-bold text-xl',
      // h5: 'font-semibold text-lg',
      // body1: 'font-normal text-base',
      // body2: 'font-normal text-sm',
      // body3: 'font-medium text-xs',
      // body4: 'font-medium text-xs',
      // overline1: 'font-semibold text-xs',
      // overline2: 'font-semibold text-xs',
      // overline3: 'font-bold text-xs',
      // 'cta-large': 'font-semibold text-base',
      // 'cta-normal': 'font-semibold text-sm',
      // 'cta-small': 'font-semibold text-xs',

      //Extra large text variants
      display1:
        'text-[2rem] font-semibold   md:font-bold  md:text-[2.5rem] leading-[130%] tracking-[-0.0375rem] ',
      display2:
        'font-semibold md:text-[2rem]  md:leading-[150%]  text-[1.75rem] leading-[140%]',
      display3: 'font-semibold md:text-[1.75rem] text-[1.5rem] leading-[142%]',

      h1: 'font-semibold md:text-2xl text-xl leading-[150%]',
      h2: 'font-semibold md:text-xl text-lg leading-[150%]',
      h3: 'font-semibold md:text-lg text-base leading-[145%]',

      body1:
        'font-medium md:text-base text-sm leading-[150%] tracking-[-0.015rem]',
      body2:
        'font-normal  md:text-base text-sm leading-[150%] tracking-[-0.015rem]',
      body3: 'font-semibold md:text-sm text-xs leading-[140%] ',
      body4: 'font-medium md:text-sm text-xs leading-[140%] ',
      body5: 'font-semibold text-xs leading-[130%] tracking-[0.02em]',
      body6: 'font-medium text-xs leading-[130%] tracking-[0.02em]',
    },
  },
  defaultVariants: {
    variant: defaultTypographyVariant,
  },
})

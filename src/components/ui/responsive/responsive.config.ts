import { ResponsiveTypesNS } from './responsive.types'

/**
 *  Actually Tailwind's default Breakpoints.
 *  For more info see: https://tailwindcss.com/docs/responsive-design#customizing-your-theme
 */
export const Breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xl2: '1536px', // Renamed from 2xl to xl2 for JS Object key compatibility
} satisfies ResponsiveTypesNS<unknown>['BreakpointsType']

type BaseResponsiveProps<T> = {
  children: React.ReactNode

  // for configuration. Could be done with a wrapper component
  breakpoints?: T
}

type BreakpointRenders<T> = Partial<{
  [key in keyof T]: React.ReactNode
}>

export type ResponsiveTypesNS<T> = {
  BreakpointsType: { [key: string]: `${number}px` }
  BreakpointRenders: BreakpointRenders<T>
  ResponsiveProps: BreakpointRenders<T> & BaseResponsiveProps<T>
}

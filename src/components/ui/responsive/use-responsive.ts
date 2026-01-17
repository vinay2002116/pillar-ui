import React from 'react'
import { Breakpoints } from './responsive.config'
import { ResponsiveTypesNS } from './responsive.types'

type ReturnType<T> = keyof T | 'base'

export const useResponsive = <
  T extends ResponsiveTypesNS<unknown>['BreakpointsType'] = typeof Breakpoints,
>(
  breakpointsObj?: T
): ReturnType<T> => {
  const breakpoints = breakpointsObj ?? Breakpoints

  let innerWidth = 0
  if (typeof window !== 'undefined') innerWidth = window?.innerWidth ?? 0

  const currentBreakpoint = React.useMemo((): ReturnType<T> => {
    const keys = Object.keys(breakpoints)

    if (keys.length === 0) return 'base'
    else {
      let breakpointReturn: ReturnType<T> = 'base'
      let breakpointLimit = 0

      keys.forEach((key) => {
        const breakpointValue = parseInt(
          breakpoints[key as keyof (T | typeof Breakpoints)] as string
        )
        if (
          innerWidth >= breakpointValue &&
          breakpointValue > breakpointLimit
        ) {
          breakpointReturn = key as ReturnType<T>
          breakpointLimit = breakpointValue
        }
      })

      return breakpointReturn
    }
  }, [innerWidth, breakpoints])

  return currentBreakpoint
}

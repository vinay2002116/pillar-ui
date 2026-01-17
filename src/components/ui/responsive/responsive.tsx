import React from 'react'
import { Breakpoints } from './responsive.config'
import { type ResponsiveTypesNS } from './responsive.types'

export const Responsive = <T = typeof Breakpoints,>(
  props: ResponsiveTypesNS<T>['ResponsiveProps']
) => {
  const { children, breakpoints = Breakpoints, ...breakpointRenders } = props

  let innerWidth = 0
  if (typeof window !== 'undefined') innerWidth = window?.innerWidth ?? 0

  const toRenderBreakpoint = React.useMemo((): keyof T | null => {
    const keys = Object.keys(breakpointRenders)

    if (keys.length === 0) return null
    else {
      let breakpointReturn = null
      let breakpointLimit = 0

      keys.forEach((key) => {
        const breakpointValue = parseInt(
          breakpoints[key as keyof (T | typeof Breakpoints)] as string
        )
        if (
          innerWidth >= breakpointValue &&
          breakpointValue > breakpointLimit
        ) {
          breakpointReturn = key
          breakpointLimit = breakpointValue
        }
      })
      return breakpointReturn
    }
  }, [innerWidth, breakpoints, breakpointRenders])

  return toRenderBreakpoint
    ? breakpointRenders[toRenderBreakpoint as keyof typeof breakpointRenders]
    : children
}

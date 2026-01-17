import { ReactElement } from 'react'

// ============================== DESKTOP =====================================
export type NavbarPropsDesktop = {
  credits: number
  className?: React.ComponentProps<'div'>['className']
  icons: {
    help: IconProps
    notification?: IconProps
    list: Array<IconProps>
    chat?: IconProps
  }

  id?: string

  login: {
    isLoggedIn: boolean

    onClick?: () => void
  }

  logo: {
    alt: string
    src: string
  }

  profile: {
    popoverOptions: Array<Array<NavbarProfilePopoverOptions>>

    email?: string
    name?: string
    src?: string
    onClick?: () => void
  }
}

type NavbarProfilePopoverOptions = {
  label: string
  disabled: boolean
  onClick: () => void

  icon?: React.ReactNode
}

/**
 * iconSrc: 20x20px
 * */
export type IconProps = {
  alt: string
  src: string

  className?: React.ComponentProps<'div'>['className']
  isActive?: boolean
  isNew?: boolean
  tooltipText?: string
  wrapper?: (children: React.ReactNode) => ReactElement
  onClick?: () => void
}

// ===========================================================================

// ============================== MOBILE =====================================

// 2 items in mobile 'bottom items'. 1. Terms of Service, 2. Privacy Policy
type BottomItems = {
  label: string
  onClick: () => void
}

export type NavbarPropsMobile = {
  credits: NavbarPropsDesktop['credits']

  profile: NavbarPropsDesktop['profile']

  icons: NavbarPropsDesktop['icons']['list']

  logo: NavbarPropsDesktop['logo'] & { text: string }

  id?: string

  logoutPanel: {
    handleLogout: () => void
    bottomItems: Array<BottomItems>
  }
}

// ==========================================================================

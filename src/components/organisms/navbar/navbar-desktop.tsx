import { Badge } from '@/components/atoms/badge'
import Tooltip from '@/components/atoms/tooltip'
import { Typography } from '@/components/atoms/typography'
import { Dropdown } from '@/components/molecules/dropdown-menu/dropdown-menu'
import { cn } from '@/lib/utils'
import React from 'react'
import { IconProps, NavbarPropsDesktop } from './navbar.types'
import { NavbarIconVariants } from './navbar.styles'
import { Avatar } from '@/components/atoms/avatar'

const ProfileHeader = ({ name = '', email = '' }) => {
  if (!(name || email)) return null

  const classEllipsisAndOverflow: React.ComponentProps<'div'>['className'] =
    'text-ellipsis overflow-hidden'

  return (
    <div className="flex flex-col px-2">
      {name && (
        <Typography
          variant="body4"
          className={cn('text-light-1', classEllipsisAndOverflow)}
        >
          {name}
        </Typography>
      )}
      {email && (
        <Typography
          variant="body5"
          className={cn('text-light-3', classEllipsisAndOverflow)}
        >
          {email}
        </Typography>
      )}
    </div>
  )
}

const NavbarIcon: React.FC<IconProps> = ({
  alt,
  className,
  isActive = false,
  isNew = false,
  src,
  tooltipText = '',
  wrapper = null,
  onClick,
}) => {
  // Wrap the icon with a link or a button
  const returnWrap = (children: React.ReactNode) =>
    wrapper?.(children) ?? children

  const navbarIcon = (
    <div
      className={cn(NavbarIconVariants({ isActive }), className)}
      {...(onClick && { onClick })}
    >
      <img {...{ src, alt }} />
      <NewBlink isNew={isNew} />
    </div>
  )

  if (tooltipText)
    return returnWrap(
      <div className="relative">
        <Tooltip
          content=""
          headerText={
            (
              <div className="flex items-center gap-2">
                {isNew && (
                  <Badge variant="gradient" size="sm">
                    NEW
                  </Badge>
                )}
                <div>{tooltipText}</div>
              </div>
            ) as unknown as string
          }
          sideOffset={24}
          triggerElement={navbarIcon}
          delayDuration={100}
          side="right"
        />
      </div>
    )

  return returnWrap(navbarIcon)
}

const Separator = () => (
  <div className="my-1 h-[1px] w-10 bg-white opacity-20" />
)

const NewBlink: React.FC<Pick<IconProps, 'isNew'>> = ({ isNew }) =>
  isNew ? (
    <div className="absolute w-[6px] h-[6px] rounded-full bottom-1 right-1 bg-secondary-2" />
  ) : null

const Profile: React.FC<NavbarPropsDesktop['profile']> = ({
  src,
  popoverOptions,
  name = '',
  email = '',
}) => (
  <Dropdown
    dropdownContentProps={{ sideOffset: 24, side: 'right', align: 'end' }}
    trigger={
      // div required as unable to open up the popup without it
      <div>
        <Avatar
          imageSrc={src ?? ''}
          size="md"
          alt="avatar"
          fallback={
            <img
              src="https://frontend-static-files.geoiq.io/strapi/Avatar_e5ab891e67.svg"
              alt="avatar"
              className="w-10 h-10 cursor-pointer"
            />
          }
        />
      </div>
    }
    header={<ProfileHeader {...{ name, email }} />}
    optionGroups={popoverOptions}
  />
)

const Login: React.FC<Pick<NavbarPropsDesktop['login'], 'onClick'>> = ({
  onClick,
}) => (
  <Typography
    variant="body4"
    className="text-center text-white cursor-pointer"
    onClick={onClick}
  >
    Login
  </Typography>
)

const Logo: React.FC<NavbarPropsDesktop['logo']> = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-10 h-auto" />
)

const Credits: React.FC<Pick<NavbarPropsDesktop, 'credits'>> = ({ credits }) =>
  credits >= 0 && (
    <div className="rounded brand-primary-secondary-gradient flex gap-[2px] h-auto box-border p-1 w-10 flex-wrap justify-center">
      {credits > 9999 ? (
        <img
          src="https://frontend-static-files.geoiq.io/strapi/infinity_7d62ad2947.svg"
          alt="infinity icon"
          className="w-4 h-4"
        />
      ) : (
        <Typography variant="body5" className="text-white">
          {credits}
        </Typography>
      )}

      <img
        src="https://frontend-static-files.geoiq.io/strapi/navbar_credits_247858e26a.svg"
        alt="coin icon"
        className="w-4 h-4"
      />
    </div>
  )

export const NavbarDesktop: React.FC<NavbarPropsDesktop> = ({
  login,
  icons,
  credits = -1,
  profile,
  logo,
  className = '',
  id,
}) => {
  return (
    <div
      className={cn(
        'w-16 bg-dark-2 px-3 py-4 h-full flex flex-col justify-between',
        className
      )}
      id={id}
    >
      {/* Top Part */}
      <div className="flex flex-col items-center gap-8">
        <Logo {...logo} />

        {/* Main Icons */}
        <div className="flex flex-col gap-3">
          {(icons?.list ?? []).map((icon, index) => (
            <NavbarIcon key={index} {...icon} />
          ))}
        </div>
      </div>

      {/* Bottom Part */}
      <div className="flex flex-col items-center gap-2">
        {/* Help */}
        {icons.chat && <NavbarIcon {...icons.chat} />}

        {icons.notification && <NavbarIcon {...icons.notification} />}

        <NavbarIcon {...icons.help} />

        {/* Credits */}
        <Credits credits={credits} />

        <Separator />

        {/* Avatar and Login Part */}
        {login?.isLoggedIn ? <Profile {...profile} /> : <Login {...login} />}
      </div>
    </div>
  )
}

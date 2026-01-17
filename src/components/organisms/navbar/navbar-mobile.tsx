import { Typography } from '@/components/atoms/typography'
import { Dropdown } from '@/components/molecules/dropdown-menu/dropdown-menu'
import { cn } from '@/lib/utils'
import React from 'react'
import { IconProps, NavbarPropsMobile } from './navbar.types'
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

const NavbarIconAndText: React.FC<IconProps> = ({
  alt,
  className,
  src,
  tooltipText,
  wrapper = null,
  onClick,
}) => {
  // Wrap the icon with a link or a button
  const returnWrap = (children: React.ReactNode) =>
    wrapper?.(children) ?? children

  const navbarIcon = (
    <div
      className={cn('flex gap-4 py-2 cursor-pointer', className)}
      // className={cn(NavbarIconVariants({ isActive }), className)}
      {...(onClick && { onClick })}
    >
      <img {...{ src, alt }} height={25} width={25} />
      <Typography variant="body2" className="text-white">
        {tooltipText}
      </Typography>
    </div>
  )

  return returnWrap(navbarIcon)
}

const Profile: React.FC<NavbarPropsMobile['profile']> = ({
  src,
  popoverOptions,
  name = '',
  email = '',
}) => (
  <Dropdown
    dropdownContentProps={{ side: 'bottom', align: 'end', sideOffset: 24 }}
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

const Logo: React.FC<NavbarPropsMobile['logo']> = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-10" />
)

const MenuScreen: React.FC<NavbarPropsMobile & { handleClose: () => void }> = ({
  icons = [],
  profile,
  credits,
  logoutPanel,
  logo,
  handleClose,
}) => (
  <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex flex-col justify-between bg-dark-2">
    <div className="flex items-center justify-between w-full px-3 py-2 bg-dark-2">
      {/* Logo and Text */}
      <div className="flex items-center gap-2">
        <Logo {...logo} />
        <Typography variant="h2" className="text-white">
          {logo?.text ?? ''}
        </Typography>
      </div>

      {/* cross button */}
      <div className="grid w-10 h-10 place-items-center">
        <img
          src="https://frontend-static-files.geoiq.io/strapi/x_7520d97d3c.svg"
          alt="close"
          height={24}
          width={24}
          className="cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </div>
    {/* Profile Information */}
    <div className="flex justify-between items-center px-5 py-2 bg-[#212121] flex-shrink-0">
      <div className="flex items-center gap-2 overflow-hidden basis-4/5">
        <Avatar
          imageSrc={profile?.src ?? ''}
          size="md"
          alt="avatar"
          fallback={
            <img
              src="https://frontend-static-files.geoiq.io/strapi/Avatar_e5ab891e67.svg"
              alt="avatar"
              className="w-12 h-12"
            />
          }
        />

        <div className="flex flex-col gap-[2px] overflow-hidden">
          <Typography
            variant="body3"
            className="overflow-hidden text-white text-ellipsis text-nowrap"
            title={profile?.name ?? ''}
          >
            {profile?.name ?? ''}
          </Typography>
          <Typography
            variant="body3"
            className="overflow-hidden text-white text-ellipsis text-nowrap"
            title={profile?.email ?? ''}
          >
            {profile?.email ?? ''}
          </Typography>
        </div>
      </div>

      {credits >= 0 && (
        <div className="flex flex-col items-center gap-1 basis-1/5">
          <div className="p-1 rounded brand-primary-secondary-gradient">
            <img
              src="https://frontend-static-files.geoiq.io/strapi/navbar_credits_247858e26a.svg"
              alt="coin icon"
              className="w-4 h-4"
            />
          </div>

          <Typography
            variant="body5"
            className="text-center text-white basis-1/5"
          >{`${credits} credits`}</Typography>
        </div>
      )}
    </div>

    {/* Main Icons */}
    <div className="flex flex-col flex-grow w-full gap-3 px-6 py-4 overflow-auto">
      {(icons ?? []).map((icon, index) => (
        <NavbarIconAndText key={index} {...icon} />
      ))}
    </div>

    <div className="flex flex-col gap-4 pb-4">
      <Separator />

      {/* Logout Button */}
      <div
        className="flex items-center w-full gap-4 px-6 cursor-pointer"
        onClick={logoutPanel.handleLogout}
      >
        <img
          src="https://frontend-static-files.geoiq.io/strapi/log_out_e3fa361fb6.svg"
          alt="logout icon"
          height={24}
          width={24}
        />
        <Typography className="text-white" variant="body2">
          Log out
        </Typography>
      </div>

      <Separator />

      {/* Terms and Conditions + Privacy Policy */}
      {logoutPanel?.bottomItems?.length > 0 && (
        <div className="flex items-center justify-center w-full gap-6 px-6">
          {logoutPanel?.bottomItems?.[0]?.label && (
            <Typography
              variant="body3"
              className="text-white cursor-pointer nowrap"
              onClick={logoutPanel?.bottomItems[0].onClick}
            >
              {logoutPanel.bottomItems[0].label}
            </Typography>
          )}

          {/* Show 'Dot' only for 2 items */}
          {logoutPanel?.bottomItems?.length === 2 && (
            <div className="w-1 h-1 mx-1 bg-white rounded-full bg-text4 shrink-0 grow-0" />
          )}

          {logoutPanel?.bottomItems?.[1]?.label && (
            <Typography
              variant="body3"
              className="text-white cursor-pointer nowrap"
              onClick={logoutPanel?.bottomItems[1].onClick}
            >
              {logoutPanel.bottomItems[1].label}
            </Typography>
          )}
        </div>
      )}
    </div>
  </div>
)

const Separator = () => <div className="h-[1px] w-full bg-gray-300" />

export const NavbarMobile: React.FC<NavbarPropsMobile> = ({
  // login,
  icons,
  credits = -1,
  profile,
  logo,
  logoutPanel,
  id,
}) => {
  const [showFullScreen, setShowFullScreen] = React.useState(false)

  if (showFullScreen)
    return (
      <div className="absolute top-0 bottom-0 z-10 w-full">
        <MenuScreen
          logo={logo}
          icons={icons}
          profile={profile}
          credits={credits}
          logoutPanel={logoutPanel}
          handleClose={() => setShowFullScreen(false)}
        />
      </div>
    )

  return (
    <div className="relative z-10 w-full max-h-full" id={id}>
      <div className="relative z-0 flex justify-between w-full px-3 py-2 bg-dark-2 h-14">
        {/* Hamburger Menu */}
        {showFullScreen === false && (
          <div
            className="grid w-10 h-10 cursor-pointer place-items-center"
            onClick={() => setShowFullScreen(true)}
          >
            <img
              src="https://frontend-static-files.geoiq.io/strapi/navbar_menu_33acae53c5.svg"
              alt=""
              height={20}
              width={20}
            />
          </div>
        )}

        <Logo {...logo} />

        <Profile {...profile} />
      </div>
    </div>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from './avatar-components'
import { AvatarProps } from './avatar.types'
import React from 'react'

export function AvatarDemo({
  imageSrc,
  alt,
  size = 'sm',
  fallback,
  fallbackProps,
  imageProps,
  avatarProps,
  id,
}: AvatarProps) {
  return (
    <Avatar
      id={id}
      className={`border hover:bg-hover-s1 active:bg-click-s1 focus:bg-click-s1 cursor-pointer border-neutral-1  ${size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'}`}
      {...avatarProps}
    >
      <AvatarImage src={imageSrc} alt={alt} {...imageProps} />
      <AvatarFallback {...fallbackProps}>{fallback}</AvatarFallback>
    </Avatar>
  )
}

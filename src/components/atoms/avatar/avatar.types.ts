import * as AvatarPrimitive from '@radix-ui/react-avatar'

export type AvatarProps = {
  id?: string
  imageSrc: string
  alt: string
  size?: 'sm' | 'md'
  fallback: React.ReactNode
  fallbackProps?: AvatarPrimitive.AvatarFallbackProps
  imageProps?: AvatarPrimitive.AvatarImageProps
  avatarProps?: AvatarPrimitive.AvatarProps
}

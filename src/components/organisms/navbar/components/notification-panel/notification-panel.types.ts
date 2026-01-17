export interface NotificationItem {
  id: number
  title: string
  description: string
  action: Action
  timestamp: string
  user: User
  status?: string
  message?: string
}

export interface Action {
  type: string
  redirect_url: string
}

export interface User {
  id: number
  first_name: string
  last_name: string
  profile_url: string
}

export type NotificationPanelProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  containerId?: string

  notifications: NotificationItem[]

  nextPage: () => void
  isLoading: boolean
  hasMore: boolean
  onReachScrollTop: () => void
}

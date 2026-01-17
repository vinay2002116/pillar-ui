import { FC, useRef, useCallback, useEffect } from 'react'
import { NotificationPanelProps } from './notification-panel.types'
import { EmptyNotificationState } from './components/empty-state'
import { NotificationCard } from './components/notification-card'
import { Spinner } from '@/components/unstyled/spinner'
import { Sheet } from '@/components/organisms/sheet'

import * as React from 'react'

const NotificationPanel: FC<NotificationPanelProps> = ({
  isOpen,
  onOpenChange,
  containerId,
  notifications,
  nextPage,
  isLoading,
  hasMore,
  onReachScrollTop,
}) => {
  const observer = useRef<IntersectionObserver | null>()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return
      if (observer.current)
        (observer.current as IntersectionObserver).disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          nextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, nextPage, hasMore]
  )
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return
      const { scrollTop } = scrollContainerRef.current

      if (scrollTop === 0) {
        onReachScrollTop()
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [onReachScrollTop, scrollContainerRef.current])

  const renderLoadingState = () => {
    if (!isLoading) return null

    return (
      <div className="flex justify-center py-4">
        <Spinner className="stroke-brand" />
      </div>
    )
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onOpenChange}
      trigger={null}
      contentProps={{
        className:
          'bg-light-1 md:!left-[66px] pb-12 inset-y-0  h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        side: 'custom',
      }}
      bodyProps={{
        className: 'p-0 h-full',
      }}
      title="Notifications"
      content={
        notifications.length || isLoading ? (
          <div className="flex flex-col h-full min-h-0 left-60">
            {/* Scrolling list */}
            {notifications.length !== 0 && (
              <div
                ref={scrollContainerRef}
                className="flex flex-col flex-grow min-h-0 overflow-y-auto"
              >
                {notifications?.map((notification, index) => (
                  <div
                    key={notification.id}
                    ref={
                      index === notifications.length - 1
                        ? lastElementRef
                        : undefined
                    }
                  >
                    <NotificationCard {...notification} />
                  </div>
                ))}
              </div>
            )}

            {renderLoadingState()}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <EmptyNotificationState />
          </div>
        )
      }
      container={
        typeof document !== 'undefined'
          ? document.getElementById(containerId || '')
          : undefined
      }
    />
  )
}

export default NotificationPanel

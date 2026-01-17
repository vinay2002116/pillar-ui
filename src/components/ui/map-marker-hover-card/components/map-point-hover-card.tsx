import React from 'react'
import { StarScore } from '../../star-score'
import { Badge } from '@/components/atoms/badge'
import { Typography } from '@/components/atoms/typography'
import { Skeleton } from '@/components/atoms/skeleton'
import { hoverDetailCardStyles } from '../map-marker-hover-card.styles'
import { MapMarkerHoverCardNS } from '../map-marker-hover-card.types'

export function PointHoverCard({
  title,
  icon,
  isLoading = false,
  tags = [],
  description,
  score,
  badge,
  actions,
}: MapMarkerHoverCardNS.PointHoverCardProps) {
  return (
    <div className="w-[396px] border border-neutral-1 rounded-xl overflow-hidden bg-light-1">
      <div className="flex items-center gap-3 p-4">
        <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-light-3">
          {isLoading ? (
            <Skeleton className="w-12 h-12 rounded-full bg-light-4" />
          ) : (
            <img
              src={
                icon ||
                'https://frontend-static-files.geoiq.io/strapi/map_pin_ed26828f00.svg'
              }
              alt="title"
              className={hoverDetailCardStyles.img({ hasIcon: !!icon })}
            />
          )}
        </div>
        <div className="truncate max-w-[300px]">
          {isLoading ? (
            <Skeleton className="h-5 mb-2 w-[280px] bg-light-4 rounded-full" />
          ) : (
            <Typography variant="h3" className="truncate text-light-2">
              {title}
            </Typography>
          )}
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              <Skeleton
                key={'header-badge'}
                className="w-20 h-6 mb-1 rounded-full bg-light-4"
              />
            ) : (
              tags
                .filter((tag) => tag.icon_url && tag.name)
                .map((badge, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    showBorder
                    size="sm"
                    className="rounded-full pl-1.5 pr-3"
                  >
                    <img
                      src={badge.icon_url}
                      alt="icon"
                      className="w-3 rounded-full"
                    />
                    {badge.name}
                  </Badge>
                ))
            )}
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="mb-2">
          {isLoading ? (
            <Skeleton className="w-full h-10 bg-light-4 rounded-xl" />
          ) : (
            <Typography
              variant="body4"
              className="text-light-3 text-overflow: ellipsis"
            >
              {description}
            </Typography>
          )}
        </div>
        {(score || badge) && (
          <div className="flex justify-between mb-4">
            {isLoading ? (
              <>
                <Skeleton className="w-24 h-5 rounded bg-light-4" />
                <Skeleton className="w-24 h-5 rounded bg-light-4" />
              </>
            ) : (
              <>
                {score && (
                  <StarScore
                    score={score?.value}
                    isLoading={score?.isLoading}
                  />
                )}
                {badge && (
                  <Badge variant="select" size="sm" showBorder>
                    {badge}
                  </Badge>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {actions && (
        <div className="flex items-center justify-center bg-light-3">
          {actions}
        </div>
      )}
    </div>
  )
}

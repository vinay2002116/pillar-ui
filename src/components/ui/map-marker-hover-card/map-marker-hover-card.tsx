import React from 'react'
import { ClusterHoverCard } from './components/map-cluster-hover-card'
import { PointHoverCard } from './components/map-point-hover-card'
import { MapMarkerHoverCardNS } from './map-marker-hover-card.types'

export default function HoverDetailCard(
  props: MapMarkerHoverCardNS.HoverDetailCardProps
) {
  if (props.variant === 'CLUSTER') {
    return <ClusterHoverCard {...props} />
  }

  return <PointHoverCard {...props} />
}

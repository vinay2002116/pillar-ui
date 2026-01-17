export namespace MapMarkerHoverCardNS {
  export type HeaderBadge = {
    icon_url?: string
    name?: string
  }

  export type ClusterDataItem = {
    name: string
    icon_url: string
    count: number
    color: string
  }

  export type ClusterData = {
    // feature_type: string
    // bbox: string
    list?: ClusterDataItem[]
  }

  export type Score = {
    value: number
    isLoading?: boolean
  }

  export type Variant = 'POINT' | 'CLUSTER' // ✅ Defining the possible variants

  export type PointHoverCardProps = {
    title?: string
    icon?: string
    badge?: string
    description?: string
    tags?: HeaderBadge[]
    isLoading?: boolean
    score?: Score
    actions?: React.ReactNode
  }

  export type ClusterHoverCardProps = ClusterData

  // ✅ Enforcing mutual exclusivity between POINT and CLUSTER
  export type HoverDetailCardProps = {
    variant: Variant
  } & PointHoverCardProps &
    ClusterHoverCardProps
}

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ReportSnippetViewNS {
  export type StreetViewEntry = {
    direction: string
    image_url: string
  }
  export type StreetViewData = StreetViewEntry[] | null
  export type Trend = 1 | -1 | 0

  export type CatchmentInsights = {
    type: 'competitor' | 'complementary'
    count: number
    iconUrl: string
  }
  export type StoreHighlights = {
    name?: string
    trend?: Trend | null
    value?: string | null
  }

  export type FootfallChartData = {
    month: string
    footfall: number | null
    year: string
  }
  export type CannibalisationChartData = {
    store_name: string
    cannibalisation: number | null
    distance: number
  }

  export type ReportSnippetViewProps = {
    title?: string
    subTitle?: string
    highlights?: {
      name: string
      variant:
        | 'success'
        | 'warning'
        | 'danger'
        | 'select'
        | 'default'
        | 'gradient'
        | 'neutral'
    }[]
    searched_on?: string
    score?: {
      // score_tag: string | null
      value: number | null
      // verdict: string | null
      isLoading?: boolean
    }
    tag?: string | null

    isLoading?: boolean
    streetViewData?: StreetViewData
    handleStreetViewClick?: () => void
    isStreetViewDataLoading?: boolean
    map?: React.ReactNode
    children?: React.ReactNode
    storeHighlights?: StoreHighlights[]
    catchmentInsights?: CatchmentInsights[]
    footfallChartData?: FootfallChartData[]
    cannibalisationChartData?: CannibalisationChartData[]
    // customButton?: React.ReactNode
  }
}

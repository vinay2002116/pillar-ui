import { MAP_LAYER_CONFIG } from './map-layer-config'

// map-toolbar.types.ts
export interface MapToolbarProps {
  map: google.maps.Map | null
  mapRef: React.RefObject<HTMLDivElement>
  hideCTA?: boolean
  hideDropPin?: boolean
  isDropActive?: boolean
  isFullScreen?: boolean
  setFullScreen?: React.Dispatch<React.SetStateAction<boolean>>
  onToggleIsDropAPin?: (isActive: boolean) => void
  disableDropPin?: boolean
  mapId?: string
  ctaConfig?: {
    ctaLabel: string
    ctaCallback: () => void
  }
  children?: React.ReactNode
}

export type MapLayerType = {
  key: keyof typeof MAP_LAYER_CONFIG // Ensures key matches MAP_LAYER_CONFIG
  label: string
  type: 'roadmap' | 'hybrid'
  traffic: boolean
}

export type MapLayerOption = {
  key: string
  label: string
  onClick: () => void
  icon: JSX.Element
}

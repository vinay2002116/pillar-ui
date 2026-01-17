export type Member = {
  id: string
  name: string
  imageSrc?: string
  alt?: string
  fallback?: string
}

export type CallHistoryItem = {
  type: 'Incoming' | 'Outgoing'
  time: number // epoch ms
  name: string
}

export type Note = {
  user: {
    image_url?: string
    first_name: string
    last_name: string
  }
  note: string
  timestamp: number
  call_duration?: string
}
export type PropertyFeature = {
  name: string
  value: string
}

export type PropertyItem = {
  id: string | number
  name: string
  report_id?: string | number
  property_id?: string | number
  property_details?: PropertyFeature[]
}

export interface PropertiesAddedSectionProps {
  properties?: PropertyItem[]
  title?: string
  property_count?: number
  onRedirect?: (property: PropertyItem) => void
  onReachBottom?: () => void
  onSearchChange?: (value: string) => void
  loading?: boolean
}

export interface AgentSnippetViewProps {
  members?: { list: Member[] }
  servingStates?: string[]
  types?: string[]
  sharedMarkets?: React.ReactNode
  propertiesAdded?: PropertyItem[]
  notes?: { list: Note[] }
  onAddNote?: () => void
  onNoteSubmit?: (note: string) => void
  hideNotes?: boolean
  property_count?: number
  onPropertyRedirect?: (property: PropertyItem) => void
  onPropertiesReachBottom?: () => void
  onPropertiesSearchChange?: (value: string) => void
  loading?: boolean
  hideProperties?: boolean
  notesLoading?: boolean
}

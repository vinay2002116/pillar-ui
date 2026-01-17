import React, { useState } from 'react'
import { MembersSection } from './components/members-section'
import { ServingStatesSection } from './components/serving-states-section'
import { TypeSection } from './components/agent-type-section'
import { SharedMarketsSection } from './components/shared-markets-section'
import { PropertiesAddedSection } from './components/properties-added-section'
// import { CallHistorySection } from './components/call-history-section'
import { NotesSection } from './components/notes-section'
import { DialogNote } from './components/add-notes-dialog'
import type { AgentSnippetViewProps } from './agent-snippet-view.types'

export const AgentSnippetView = (props: AgentSnippetViewProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [noteValue, setNoteValue] = useState('')

  const handleAddNote = () => {
    setDialogOpen(true)
  }

  const handleDialogSubmit = () => {
    props.onNoteSubmit?.(noteValue)
    setNoteValue('')
    setDialogOpen(false)
  }

  const handleNoteChange = (value: string) => setNoteValue(value)

  return (
    <>
      <AgentSnippetComponent {...props} onAddNote={handleAddNote} />
      <DialogNote
        open={dialogOpen}
        noteValue={noteValue}
        onNoteChange={handleNoteChange}
        onClose={() => setDialogOpen(false)}
        onSave={handleDialogSubmit}
      />
    </>
  )
}

export const AgentSnippetComponent: React.FC<AgentSnippetViewProps> = ({
  members,
  servingStates,
  types,
  sharedMarkets,
  propertiesAdded,
  notesLoading,
  notes,
  onAddNote,
  hideNotes = false,
  hideProperties = false,
  property_count,
  onPropertyRedirect,
  onPropertiesReachBottom,
  onPropertiesSearchChange,
  loading,
}) => (
  <div className="p-3 bg-light-1 min-w-[420px]">
    <MembersSection members={members?.list ?? []} />
    <ServingStatesSection servingStates={servingStates} />
    <TypeSection types={types} />
    <SharedMarketsSection sharedMarkets={sharedMarkets} />
    {!hideProperties && (
      <PropertiesAddedSection
        properties={propertiesAdded}
        property_count={property_count}
        onRedirect={onPropertyRedirect}
        onReachBottom={onPropertiesReachBottom}
        onSearchChange={onPropertiesSearchChange}
        loading={loading}
      />
    )}
    {/* <CallHistorySection
      callHistory={callHistory?.list ?? []}
      // onEditCallNote={onEditCallNote}
    /> */}
    {!hideNotes && (
      <NotesSection
        notes={notes?.list ?? []}
        onAddNote={onAddNote}
        notesLoading={notesLoading}
      />
    )}
  </div>
)

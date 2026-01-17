export type StepperValue = {
  id: string | number
  value?: number
  label: string
  status:
    | StepItemStatus.PENDING
    | StepItemStatus.CURRENT
    | StepItemStatus.COMPLETED
}
export interface StepperItemProps {
  value: StepperValue
  variant:
    | StepItemStatus.PENDING
    | StepItemStatus.CURRENT
    | StepItemStatus.COMPLETED
}

export enum StepItemStatus {
  CURRENT = 'current',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export type StepperProps = { value: StepperValue[]; id?: string }

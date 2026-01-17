export type RangeSliderProps = {
  value?: [number, number] // Min and Max values
  min: number
  max: number
  stepSize?: number

  id?: string

  onChange?: (values: [number, number]) => void
}

export type PolarSliderProps = {
  value?: number
  min: number
  max: number
  stepSize?: number

  id?: string

  onChange?: (value: number) => void
}

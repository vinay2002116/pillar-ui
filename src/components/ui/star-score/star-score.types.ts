export type StarScoreUtilsType = {
  getStarsCount: (score: number) => {
    full: number
    half: number
    error: boolean
  }
  getScoreOutOf5: (score: number) => number
}
export type StarScoreTypes = {
  score: number

  /**
   * star size in pixels
   */
  starSize?: number

  /**
   * gap between stars i.e pixels. Standard flex gapping followed across project
   */
  starGap?: number

  /**
   * loading function to show skeleton
   */
  isLoading?: boolean
  /**
   * loading score (2.5/5)
   */
  showScore?: boolean
  /**
   * loading score percentage (50%)
   */
  showScorePercentage?: boolean
}

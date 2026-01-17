import { Typography } from '@/components/atoms/typography'
import React from 'react'
import { StarScoreUtilsType, StarScoreTypes } from './star-score.types'
import { Skeleton } from '@/components/atoms/skeleton'

export const StarScoreUtils: StarScoreUtilsType = {
  /**
   * utility function to get full and half stars count
   */
  getStarsCount: (score: number) => {
    if (score < 0 || score > 100) return { full: 0, half: 0, error: true }

    const getValidScore = (full: number, half: number) => ({
      full,
      half,
      error: false,
    })

    const full = Math.floor(score / 20)
    const remainder = score % 20
    if (remainder === 0) return getValidScore(full, 0)
    else {
      const half = remainder / 10
      if (half <= 1) return getValidScore(full, 1)
      else return getValidScore(full + 1, 0)
    }
  },

  /**
   * utility function to convert score from string to 'out of 5'
   */
  getScoreOutOf5: function (score: number): number {
    const { full = 0, half = 0, error = false } = this.getStarsCount(score)

    if (error) return 0

    return full * 1 + half * 0.5
  },
}

export const StarScore = (props: StarScoreTypes) => {
  const {
    score = 0,
    starSize = 24,
    starGap = 1,
    isLoading = false,
    showScore = false,
    showScorePercentage = false,
  } = props

  const toUseScore = isFinite(score) ? +score : 0
  const {
    full = 0,
    half = 0,
    error = false,
  } = StarScoreUtils.getStarsCount(toUseScore)

  const empty = 5 - (full + half)

  const commonProps: Partial<React.ImgHTMLAttributes<HTMLImageElement>> = {
    height: starSize,
    width: starSize,
  }

  if (isLoading) {
    const totalWidth = 5 * starSize + 4 * starGap
    const totalHeight = starSize

    return <Skeleton style={{ width: totalWidth, height: totalHeight }} />
  }

  // score > 100 or score < 0
  if (error)
    return (
      <Typography variant="display1" className="text-light-1">
        NA
      </Typography>
    )

  return (
    <div className="flex items-center" style={{ gap: starGap }}>
      <div className="flex" style={{ gap: starGap }}>
        {/* Completely filled stars */}
        {Array(full)
          .fill(1)
          .map((_, i) => (
            <img
              key={i}
              src="https://frontend-static-files.geoiq.io/strapi/rating_star_full_0ddf33ca2f.svg"
              alt="full-star"
              {...commonProps}
            />
          ))}

        {/* Half filled stars */}
        {Array(half)
          .fill(1)
          .map((_, i) => (
            <img
              key={i}
              src="https://frontend-static-files.geoiq.io/strapi/rating_star_half_dbe5b8f659.svg"
              alt="half-star"
              {...commonProps}
            />
          ))}

        {/* Empty stars */}
        {Array(empty)
          .fill(1)
          .map((_, i) => (
            <img
              key={i}
              src="https://frontend-static-files.geoiq.io/strapi/rating_star_empty_e05d9a2463.svg"
              alt="empty-star"
              {...commonProps}
            />
          ))}
      </div>

      {/* Display score */}
      {showScore ? (
        <Typography variant="body5" className="ml-1 text-light-3">
          {StarScoreUtils.getScoreOutOf5(toUseScore).toFixed(1)}/5
        </Typography>
      ) : null}
      {showScorePercentage ? (
        <Typography variant="body5" className="ml-1 text-light-3">
          ({toUseScore}%)
        </Typography>
      ) : null}
    </div>
  )
}

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'

export type CarouselPropsType = React.HTMLAttributes<HTMLDivElement> &
  CarouselProps & {
    items: React.ReactNode[]
    contentClassName?: string
    itemsClassName?: string
    id?: string
    loop?: boolean
    hideArrows?: boolean
  }

export type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  autoplay?: boolean
  autoplayInterval?: number
}

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

export type CarouselOptions = UseCarouselParameters[0]
export type CarouselPlugin = UseCarouselParameters[1]

export type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>

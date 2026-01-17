import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel-components'
import { CarouselPropsType } from './carousel.types'

export const _Carousel: React.FC<CarouselPropsType> = (props) => {
  return (
    <Carousel
      className={`flex items-center justify-center ${props.className} `}
      id={props.id}
      opts={{
        loop: props.loop || false,
      }}
      {...props}
    >
      <CarouselContent className={`${props.contentClassName}`}>
        {props.items.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className={`flex items-center justify-center ${props.itemsClassName}`}
            >
              {item}
            </CarouselItem>
          )
        })}
      </CarouselContent>
      {!props.hideArrows ? (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      ) : null}
    </Carousel>
  )
}

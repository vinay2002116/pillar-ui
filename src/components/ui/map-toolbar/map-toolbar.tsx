import React, { useState } from 'react'
import { Button, DropdownMenu, Typography } from '@/index'
import { Maximize, Minimize } from 'lucide-react'
import { MapToolbarProps } from './map-toolbar.types'
import { MAP_LAYER_CONFIG, MAP_LAYER_TYPES } from './map-layer-config'

export const MapToolbar: React.FC<MapToolbarProps> = ({
  map,
  mapRef,
  hideCTA = false,
  hideDropPin = false,
  isDropActive = false,
  isFullScreen = false,
  setFullScreen,
  onToggleIsDropAPin,
  disableDropPin = false,
  mapId,
  ctaConfig,
  children,
}) => {
  //   console.log('hideDropPin:', hideDropPin) // Now this will correctly log the boolean value

  const onZoomIn = () => {
    map?.setZoom(Number(map?.getZoom()) + 1)
  }

  const onZoomOut = () => {
    map?.setZoom(Number(map?.getZoom()) - 1)
  }

  const toggleFullscreen = () => {
    if (!mapRef.current) return

    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setFullScreen?.(false))
    } else if (mapRef.current.requestFullscreen) {
      mapRef.current.requestFullscreen().then(() => setFullScreen?.(true))
    }
  }

  const [currentMapType, setCurrentMapType] = useState('ROADMAP')
  const [trafficLayer, setTrafficLayer] =
    useState<google.maps.TrafficLayer | null>(null)
  const toggleTrafficLayer = (enabled: boolean) => {
    if (!map) return
    if (enabled) {
      if (!trafficLayer) {
        const newTrafficLayer = new google.maps.TrafficLayer()
        newTrafficLayer.setMap(map)
        setTrafficLayer(newTrafficLayer)
      }
    } else {
      trafficLayer?.setMap(null)
      setTrafficLayer(null)
    }
  }

  const mapLayerOptions = MAP_LAYER_TYPES.map(
    ({ key, label, type, traffic }) => ({
      key: key.toLowerCase(),
      label,
      onClick: () => {
        map?.setMapTypeId(type)
        setCurrentMapType(key)
        toggleTrafficLayer(traffic)
      },
      icon: (
        <img
          src={MAP_LAYER_CONFIG[key as keyof typeof MAP_LAYER_CONFIG]} // Type assertion here
          alt={`${label} map`}
          width={24}
          height={24}
          className="mr-2"
        />
      ),
    })
  )

  return (
    <div className="z-10 mb-2 flex h-[48px] items-center justify-center rounded-[.5rem] bg-light-1 p-1 shadow-lg">
      <div className="mr-2 box-border flex h-full w-10 items-center justify-center rounded-lg border border-primary-2 p-[2px]">
        <DropdownMenu
          header={<Typography variant="body2">Map Layers</Typography>}
          optionGroups={[mapLayerOptions]}
          trigger={
            <img
              src={
                MAP_LAYER_CONFIG[
                  currentMapType as keyof typeof MAP_LAYER_CONFIG
                ]
              }
              alt="default map"
              className="box-border h-8"
            />
          }
          container={document.getElementById(mapId || '')}
        />
      </div>
      {children}
      <div
        className={`border-stroke-2 flex h-[90%] items-center justify-center border-l ${hideDropPin ? '' : 'border-r'}`}
      >
        <Button variant="teritiary" onClick={onZoomIn}>
          <img
            src="https://frontend-static-files.geoiq.io/strapi/plus_black_da6e5287cf.svg"
            alt="plus icon"
            width={20}
            height={20}
          />
        </Button>
        <Button variant="teritiary" className="mr-2" onClick={onZoomOut}>
          <img
            src="https://frontend-static-files.geoiq.io/strapi/Vector_9d9765da36.svg"
            alt="minus icon"
            width={15}
            height={20}
          />
        </Button>
        <Button
          className="cursor-pointer"
          onClick={toggleFullscreen}
          variant="teritiary"
          aria-label="Toggle Fullscreen"
        >
          {isFullScreen ? (
            <Minimize className="w-5 h-5 stroke-light-1" />
          ) : (
            <Maximize className="w-5 h-5 stroke-light-1" />
          )}
        </Button>
      </div>

      {!hideDropPin && (
        <div
          className={`border-stroke-2 ml-.5 flex h-[90%] ${!hideCTA ? 'mr-2 border-r' : ''} px-1`}
        >
          <Button
            variant="teritiary"
            className={`flex h-fit items-center justify-center ${isDropActive ? 'border border-primary-2 bg-primary-1' : ''}`}
            onClick={() =>
              onToggleIsDropAPin && onToggleIsDropAPin(!isDropActive)
            }
            disabled={disableDropPin}
          >
            <img
              src="https://frontend-static-files.geoiq.io/strapi/map_pin_ed26828f00.svg"
              height={18}
              width={18}
              alt="Drop Pin"
            />
          </Button>
        </div>
      )}
      {!hideCTA && ctaConfig && (
        <div>
          <Button
            variant="primary"
            size={'md'}
            onClick={ctaConfig.ctaCallback}
            disabled={hideCTA}
          >
            {ctaConfig.ctaLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

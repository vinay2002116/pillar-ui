export const MAP_LAYER_CONFIG = {
  ROADMAP:
    'https://frontend-static-files.geoiq.io/strapi/Default_efc09fdd1c.png',
  ROADMAP_TRAFFIC:
    'https://frontend-static-files.geoiq.io/strapi/ic_traffic_705be1ba8d.png',
  SATELLITE:
    'https://frontend-static-files.geoiq.io/strapi/ic_satellite_31fe09163d.png',
  SATELLITE_TRAFFIC:
    'https://frontend-static-files.geoiq.io/strapi/ic_satellite_31fe09163d.png',
}
export const MAP_LAYER_TYPES = [
  { key: 'ROADMAP', label: 'Roadmap', type: 'roadmap', traffic: false },
  {
    key: 'ROADMAP_TRAFFIC',
    label: 'Roadmap Traffic',
    type: 'roadmap',
    traffic: true,
  },
  { key: 'SATELLITE', label: 'Satellite', type: 'hybrid', traffic: false },
  {
    key: 'SATELLITE_TRAFFIC',
    label: 'Satellite Traffic',
    type: 'hybrid',
    traffic: true,
  },
]

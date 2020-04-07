import { GeoJSONFeature } from '../interfaces/geo/GeoJSONFeature.interface';

/**
 *
 */
export const getGeoJsonFromCoords = (
  coordinates: number[],
): {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
} => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates,
        },
      },
    ],
  };
};

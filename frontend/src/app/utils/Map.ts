import { GeoJSONFeature } from '../interfaces/geo/GeoJSONFeature.interface';
import { Coords } from '../interfaces/graphql/coords.type';

/**
 *
 */
export const getGeoJsonFromCoords = (
  coordinates: number[],
  orientation?: number,
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
        properties: orientation ? { orientation } : undefined,
      },
    ],
  };
};

/**
 *
 */
export const getGoogleMapsUrl = (destinationCoords: Coords, sourceCoords?: Coords): string => {
  return !sourceCoords
    ? `https://www.google.com/maps/search/?api=1&query=${destinationCoords.lat},${destinationCoords.lng}`
    : // tslint:disable-next-line: max-line-length
      `https://www.google.com/maps/dir/?api=1&origin=${sourceCoords.lat},${sourceCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}`;
};

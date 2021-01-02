import { Poi } from './Poi';
import { GeoJSONFeature } from '../interfaces/geo/GeoJSONFeature.interface';
import { each } from 'lodash';

export enum ContentType {
  CRAGS = 'crags',
  CRAG = 'crag',
  HIKES = 'hikes',
  HIKE = 'hike',
  SHELTERS = 'shelters',
  SHELTER = 'shelter',
  PLACES = 'places',
  PLACE = 'place',
  COMPETITIONS = 'competitions',
  COMPETITION = 'competition',
  NEWS = 'news',
  ONE_NEWS = 'oneNews',
  SEARCH = 'search',
  OSM_NODE = 'osmNode',
  DRINKING_WATER = 'drinkingWater',
}

export const OSM_TYPE_MAP = {
  'natural.peak': ContentType.CRAG,
  'natural.valley': ContentType.CRAG,
  'natural.cliff': ContentType.CRAG,
  'route.hiking': ContentType.HIKE,
  'highway.footway': ContentType.HIKE,
  'amenity.drinking_water': ContentType.DRINKING_WATER,
};

/**
 * Helper to return the type of a given item (GraphQl item or GeoJSONFeature).
 */
export const typeOfItem = (item: any): string => {
  return item.type === 'Feature' ? typeOfGeoJSONFeature(item) : item.__typename;
};

/**
 * Helper to return the type of a given GEOJson feature.
 */
export const typeOfGeoJSONFeature = (item: GeoJSONFeature): string => {
  if (!item.properties) {
    return '';
  }

  let found = '';

  if (item.properties.__typename) {
    found = (item.properties as any).__typename;
  } else {
    each(OSM_TYPE_MAP, (typeValue: string, mapKey: string) => {
      const kPieces = mapKey.split('.');
      const key = kPieces[0];
      const value = kPieces[1];
      if (item.properties[key] === value) {
        found = typeValue;
        return false;
      }
    });
  }

  return found;
};

/**
 * Returns the website section endpoint for a given item.
 */
export const getSectionFromItem = (item: Poi): string => {
  switch (typeOfItem(item)) {
    default:
      throw new Error('Unexpected item');
    case 'Crag':
      return ContentType.CRAGS;
    case 'Hike':
      return ContentType.HIKES;
    case 'Shelter':
      return ContentType.SHELTERS;
    case 'Place':
      return ContentType.PLACES;
    case 'Competition':
      return ContentType.COMPETITIONS;
    case 'News':
      return ContentType.NEWS;
    case 'OsmNode':
      return ContentType.OSM_NODE;
  }
};

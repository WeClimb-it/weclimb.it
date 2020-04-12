import { Poi } from './Poi';

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
}

/**
 * Helper to return the type of a given item.
 */
export const typeOfItem = (item: any): string => {
  return item.__typename;
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
  }
};

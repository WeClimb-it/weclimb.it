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
 *
 */
export const typeOfItem = (item: any): string => {
  return item.__typename;
};

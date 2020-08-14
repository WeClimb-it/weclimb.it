import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
import { typeOfItem } from './ContentType';
import { TranslateService } from '@ngx-translate/core';
export type Poi = Crag | Place | Competition | Shelter | Hike | Record<string, any>;

/**
 * Used to derive a proper cache id from a given object.
 * Useful for the GraphQl InMemoryCache system.
 */
export const getEntityCacheId = (object: any) => {
  switch (object.__typename) {
    case 'Crag':
      if (object.sectors) {
        return `deep-${object.slug}`;
      } else {
        return object.slug;
      }
    default:
      return object.slug || object.id || object._id || Math.random().toString(36).substr(2, 10);
  }
};

/**
 *
 */
export const getPoiCategoryTag = (translateService: TranslateService, item: Poi): string => {
  switch (typeOfItem(item)) {
    default:
    case 'Crag':
      return translateService.instant('CRAG')[0];
    case 'Hike':
      return translateService.instant('HIKE')[0];
    case 'Shelter':
      return translateService.instant('SHELTER')[0];
    case 'Event':
      return translateService.instant('EVENT')[0];
    case 'Competition':
      return translateService.instant('COMPETITION')[0];
    case 'Place':
      return translateService.instant('PLACE')[0];
    case 'DrinkingWater':
      return translateService.instant('DRINKING_WATER')[0];
  }
};

/**
 *
 */
export const getPoiCategoryClass = (translateService: TranslateService, item: Poi): string => {
  switch (typeOfItem(item)) {
    default:
    case 'Crag':
      return 'crag';
    case 'Hike':
      return 'hike';
    case 'Shelter':
      return 'shelter';
    case 'Event':
      return 'event';
    case 'Competition':
      return 'competition';
    case 'Place':
      return 'place';
    case 'DrinkingWater':
      return 'drinking-water';
  }
};

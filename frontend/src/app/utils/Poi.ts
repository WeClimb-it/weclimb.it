import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
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

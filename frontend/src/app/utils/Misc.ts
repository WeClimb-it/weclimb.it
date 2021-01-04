import { Competition } from '../interfaces/graphql/competition.type';
import { get } from 'lodash';

/**
 * Returns sanitized properties for a given competition item.
 */
export const getSanitizedCompetitionProperties = (
  item: Competition,
): {
  disputed: boolean;
  types: string[];
  specialties: string[];
  categories: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
} => {
  // TODO: Waiting the crawler to be fixed, we have to filter here some bad data
  return {
    disputed: new Date(item.start_time) <= new Date(),
    types: get(item, 'info.types').filter((str: string) => str !== ''),
    specialties: get(item, 'info.specialties').filter((str: string) => str !== ''),
    categories: get(item, 'info.categories').filter((str: string) => str !== ''),
    startDate: item.start_time ? new Date(item.start_time) : undefined,
    endDate: item.end_time ? new Date(item.end_time) : undefined,
  };
};

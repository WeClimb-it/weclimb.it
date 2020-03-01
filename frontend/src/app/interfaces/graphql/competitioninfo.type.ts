import { CompetitionDetails } from './competitiondetails.type';

export interface CompetitionInfo {
  categories?: string[] | null;
  details?: CompetitionDetails | null;
  place?: string | null;
  specialties?: string[] | null;
  types?: string[] | null;
}

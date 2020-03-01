import { Coords } from './coords.type';
import { CompetitionInfo } from './competitioninfo.type';
import { CompetitionPerson } from './competitionperson.type';

export interface Competition {
  coords?: Coords | null;
  info?: CompetitionInfo | null;
  people?: CompetitionPerson[] | null;
  poster?: string | null;
  resource_url?: string | null;
  schedule?: string[] | null;
  slug?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  title?: string | null;
  search_score?: number | null;
}

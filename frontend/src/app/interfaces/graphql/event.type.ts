import { Coords } from './coords.type';

export interface Event {
  social_id?: string | null;
  slug?: string | null;
  title?: string | null;
  descr?: string | null;
  coords?: Coords | null;
  place?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  resource_url?: string | null;
  search_score?: number | null;
}

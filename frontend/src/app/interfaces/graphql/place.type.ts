import { Coords } from './coords.type';
import { Openings } from './openings.type';

export interface Place {
  _id?: string | null;
  social_id?: string | null;
  slug?: string | null;
  title?: string | null;
  descr?: string | null;
  coords?: Coords | null;
  openings?: Openings | null;
  notes?: string | null;
  resource_url?: string | null;
  search_score?: number | null;
  picture?: string | null;
}

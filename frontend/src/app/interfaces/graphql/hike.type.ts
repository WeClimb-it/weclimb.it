import { HikeElevation } from './hikeelevation.type';
import { HikeGrade } from './hikegrade.type';
import { Coords } from './coords.type';

export interface Hike {
  slug?: string | null;
  title?: string | null;
  trail_label?: string | null;
  difficulty?: string | null;
  exposition?: string | null;
  elevation?: HikeElevation | null;
  grade?: HikeGrade | null;
  length?: number | null;
  starting_point?: string | null;
  access_info?: string | null;
  notes?: string | null;
  descr?: string | null;
  coords?: Coords | null;
  tracks?: string[] | null;
  media?: string[] | null;
  search_score?: number | null;
  resource_url?: string | null;
}

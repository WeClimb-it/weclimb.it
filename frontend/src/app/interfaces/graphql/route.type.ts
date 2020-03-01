import { RouteSector } from './routesector.type';
import { Coords } from './coords.type';
import { QualityRank } from './qualityrank.type';

export interface Route {
  sector?: string | null;
  parent?: RouteSector | null;
  slug?: string | null;
  seq_num?: number | null;
  title?: string | null;
  coords?: Coords | null;
  grade?: string | null;
  pitons_num?: number | null;
  length?: number | null;
  route_type?: string | null;
  gear_type?: string | null;
  notes?: string | null;
  quality_rank?: QualityRank | null;
  resource_url?: string | null;
  search_score?: number | null;
}

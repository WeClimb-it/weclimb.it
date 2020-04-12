import { SectorCrag } from './sectorcrag.type';
import { Coords } from './coords.type';
import { QualityRank } from './qualityrank.type';

export interface RouteSector {
  crag?: string | null;
  parent?: SectorCrag | null;
  slug?: string | null;
  title?: string | null;
  coords?: Coords | null;
  notes?: string | null;
  quality_rank?: QualityRank | null;
  min_grade?: string | null;
  max_grade?: string | null;
  resource_url?: string | null;
}

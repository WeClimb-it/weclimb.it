import { CragStats } from './cragstats.type';
import { Coords } from './coords.type';
import { QualityRank } from './qualityrank.type';
import { Sector } from './sector.type';

export interface Crag {
  _stats?: CragStats | null;
  slug?: string | null;
  title?: string | null;
  descr?: string | null;
  access_info?: string | null;
  coords?: Coords | null;
  altitude?: number | null;
  exposition?: string | null;
  bolding_type?: string | null;
  rock_type?: string | null;
  quality_rank?: QualityRank | null;
  period?: string | null;
  notes?: string | null;
  resource_url?: string | null;
  sectors?: Sector[] | null;
  search_score?: number | null;
}

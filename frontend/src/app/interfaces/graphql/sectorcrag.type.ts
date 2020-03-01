import { CragStats } from './cragstats.type';
import { Coords } from './coords.type';
import { QualityRank } from './qualityrank.type';

export interface SectorCrag {
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
}

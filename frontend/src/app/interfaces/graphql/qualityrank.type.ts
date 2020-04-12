import { WeatherExtended } from './weatherextended.type';

export interface QualityRank {
  score?: number | null;
  crowdedness?: number | null;
  weather?: number | null;
  weatherExtended?: WeatherExtended[] | null;
  position?: number | null;
  difficulty?: number | null;
  average?: number | null;
  max?: number | null;
  votes?: number | null;
}

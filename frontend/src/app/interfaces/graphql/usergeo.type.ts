import { Coords } from './coords.type';

export interface UserGeo {
  isoCode?: string | null;
  timeZone?: string | null;
  city?: string | null;
  coords?: Coords | null;
}

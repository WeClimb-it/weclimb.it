import { Coords } from './coords.type';

export interface Shelter {
  slug?: string | null;
  name?: string | null;
  descr?: string | null;
  coords?: Coords | null;
  access_info?: string | null;
  altitude?: number | null;
  opening?: string | null;
  accomodations_food?: string | null;
  accomodations_rooms?: string | null;
  beds?: number | null;
  owners?: string | null;
  keepers?: string | null;
  email?: string | null;
  phone?: string | null;
  mobile?: string | null;
  web?: string | null;
  facebook?: string | null;
  media?: string[] | null;
  search_score?: number | null;
  resource_url?: string | null;
}

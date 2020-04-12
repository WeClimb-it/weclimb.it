import { ListResult } from './listresult.type';
import { UserInfo } from './userinfo.type';
import { Crag } from './crag.type';
import { Sector } from './sector.type';
import { Route } from './route.type';
import { Place } from './place.type';
import { Shelter } from './shelter.type';
import { Event } from './event.type';
import { Competition } from './competition.type';
import { News } from './news.type';
import { Hike } from './hike.type';
import { SearchResult } from './searchresult.type';
import { ForecastResult } from './forecastresult.type';
import { CoordsInput } from './coordsinput.input-type';

export interface Query {
  crags?: ListResult | null;
  sectors?: ListResult | null;
  routes?: ListResult | null;
  events?: ListResult | null;
  competitions?: ListResult | null;
  places?: ListResult | null;
  shelters?: ListResult | null;
  news?: ListResult | null;
  hikes?: ListResult | null;
  userInfo?: UserInfo | null;
  crag?: Crag | null;
  sector?: Sector | null;
  route?: Route | null;
  place?: Place | null;
  shelter?: Shelter | null;
  event?: Event | null;
  competition?: Competition | null;
  oneNews?: News | null;
  hike?: Hike | null;
  search?: SearchResult | null;
  nearby?: SearchResult | null;
  latest?: SearchResult | null;
  forecast?: ForecastResult | null;
}

export interface CragsQueryArgs {
  distance?: number | null;
  lat?: number | null;
  lng?: number | null;
  children?: boolean | null;
  start?: number | null;
  end?: number | null;
}
export interface SectorsQueryArgs {
  start?: number | null;
  end?: number | null;
  parent?: boolean | null;
  children?: boolean | null;
}
export interface RoutesQueryArgs {
  start?: number | null;
  end?: number | null;
}
export interface EventsQueryArgs {
  distance?: number | null;
  lat?: number | null;
  lng?: number | null;
  start?: number | null;
  end?: number | null;
}
export interface CompetitionsQueryArgs {
  distance?: number | null;
  lat?: number | null;
  lng?: number | null;
  start?: number | null;
  end?: number | null;
}
export interface PlacesQueryArgs {
  distance?: number | null;
  lat?: number | null;
  lng?: number | null;
  start?: number | null;
  end?: number | null;
}
export interface SheltersQueryArgs {
  distance?: number | null;
  lat?: number | null;
  lng?: number | null;
  start?: number | null;
  end?: number | null;
}
export interface NewsQueryArgs {
  start?: number | null;
  end?: number | null;
}
export interface HikesQueryArgs {
  distance?: number | null;
  lat?: number | null;
  lng?: number | null;
  start?: number | null;
  end?: number | null;
}
export interface CragQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface SectorQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface RouteQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface PlaceQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface ShelterQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface EventQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface CompetitionQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface OneNewsQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface HikeQueryArgs {
  id?: string | null;
  slug?: string | null;
}
export interface SearchQueryArgs {
  query: string;
  minWeather?: number | null;
  maxWeather?: number | null;
  minPosition?: number | null;
  maxPosition?: number | null;
  minDifficulty?: number | null;
  maxDifficulty?: number | null;
  start?: number | null;
  end?: number | null;
}
export interface NearbyQueryArgs {
  lat: number;
  lng: number;
  distance?: number | null;
  minWeather?: number | null;
  maxWeather?: number | null;
  minPosition?: number | null;
  maxPosition?: number | null;
  minDifficulty?: number | null;
  maxDifficulty?: number | null;
  start?: number | null;
  end?: number | null;
}
export interface LatestQueryArgs {
  lat: number;
  lng: number;
}
export interface ForecastQueryArgs {
  lat: number;
  lng: number;
}

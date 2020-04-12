import { City } from './city.type';
import { Crag } from './crag.type';
import { Sector } from './sector.type';
import { Route } from './route.type';
import { Event } from './event.type';
import { Competition } from './competition.type';
import { News } from './news.type';
import { Place } from './place.type';
import { Shelter } from './shelter.type';
import { Hike } from './hike.type';
import { Pagination } from './pagination.type';

export interface SearchResult {
  locations?: City[] | null;
  crags?: Crag[] | null;
  sectors?: Sector[] | null;
  routes?: Route[] | null;
  events?: Event[] | null;
  competitions?: Competition[] | null;
  news?: News[] | null;
  places?: Place[] | null;
  shelters?: Shelter[] | null;
  hikes?: Hike[] | null;
  pagination?: Pagination | null;
}

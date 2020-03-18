import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
export type Poi = Crag | Place | Competition | Shelter | Hike;

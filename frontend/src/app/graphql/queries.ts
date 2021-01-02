import { ApolloQueryResult } from '@apollo/client/core';
import { gql } from 'apollo-angular';
import { Route } from '@angular/compiler/src/core';

import { DocumentNode } from 'graphql';

import { Competition } from '../interfaces/graphql/competition.type';
import { Crag } from '../interfaces/graphql/crag.type';
import { ForecastResult as ForecastResultType } from '../interfaces/graphql/forecastresult.type';
import { Hike } from '../interfaces/graphql/hike.type';
import { News } from '../interfaces/graphql/news.type';
import { Place } from '../interfaces/graphql/place.type';
import { SearchResult as SearchResultType } from '../interfaces/graphql/searchresult.type';
import { Sector } from '../interfaces/graphql/sector.type';
import { Shelter } from '../interfaces/graphql/shelter.type';
import { UserInfo } from '../interfaces/graphql/userinfo.type';
import { Photo } from '../interfaces/photo.interface';
import * as fragments from './fragments';

export type UserInfoResult = ApolloQueryResult<{ userInfo: UserInfo }>;
export type LatestResult = ApolloQueryResult<{ latest: SearchResultType }>;
export type NearbyResult = ApolloQueryResult<{ nearby: SearchResultType }>;
export type CragsResult = ApolloQueryResult<{ crags: Crag[] }>;
export type CragResult = ApolloQueryResult<{ crag: Crag }>;
export type SectorsResult = ApolloQueryResult<{ sectors: Sector[] }>;
export type SectorResult = ApolloQueryResult<{ sector: Sector }>;
export type RoutesResult = ApolloQueryResult<{ routes: Route[] }>;
export type RouteResult = ApolloQueryResult<{ route: Route }>;
export type PlacesResult = ApolloQueryResult<{ places: Place[] }>;
export type PlaceResult = ApolloQueryResult<{ place: Place }>;
export type SheltersResult = ApolloQueryResult<{ shelters: Shelter[] }>;
export type ShelterResult = ApolloQueryResult<{ shelter: Shelter }>;
export type EventsResult = ApolloQueryResult<{ events: Event[] }>;
export type EventResult = ApolloQueryResult<{ event: Event }>;
export type CompetitionsResult = ApolloQueryResult<{ competitions: Competition[] }>;
export type CompetitionResult = ApolloQueryResult<{ competition: Competition }>;
export type NewsResult = ApolloQueryResult<{ news: News[] }>;
export type OneNewsResult = ApolloQueryResult<{ oneNews: News }>;
export type HikesResult = ApolloQueryResult<{ hikes: Hike[] }>;
export type HikeResult = ApolloQueryResult<{ hike: Hike }>;
export type SearchResult = ApolloQueryResult<{ search: SearchResultType }>;
export type ForecastResult = ApolloQueryResult<{ forecast: ForecastResultType }>;
export type PhotosResult = ApolloQueryResult<{ photos: Photo[] }>;

export default class {
  public static get userInfo(): DocumentNode {
    return gql`
      query {
        userInfo {
          ...UserInfo
        }
      }
      ${fragments.UserInfo}
    `;
  }

  public static get latest(): DocumentNode {
    return gql`
      query GetLatest($lat: Float!, $lng: Float!) {
        latest(lat: $lat, lng: $lng) {
          crags {
            slug
            title
            coords {
              lat
              lng
            }
            _stats {
              routesCount
              sectorsCount
            }
            resource_url
          }
          places {
            slug
            title
            descr
            coords {
              lat
              lng
            }
            picture
            resource_url
          }
          hikes {
            coords {
              lat
              lng
            }
            slug
            title
            descr
          }
          shelters {
            coords {
              lat
              lng
            }
            slug
            name
            descr
          }
          competitions {
            coords {
              lat
              lng
            }
            info {
              categories
              place
              specialties
              types
            }
            poster
            resource_url
            slug
            start_time
            end_time
            title
          }
        }
      }
    `;
  }

  public static get nearby(): DocumentNode {
    return gql`
      query GetNearby(
        $lat: Float!
        $lng: Float!
        $distance: Int
        $minWeather: Float
        $maxWeather: Float
        $minPosition: Float
        $maxPosition: Float
        $minDifficulty: Float
        $maxDifficulty: Float
      ) {
        nearby(
          lat: $lat
          lng: $lng
          distance: $distance
          minWeather: $minWeather
          maxWeather: $maxWeather
          minPosition: $minPosition
          maxPosition: $maxPosition
          minDifficulty: $minDifficulty
          maxDifficulty: $maxDifficulty
        ) {
          crags {
            slug
            title
            descr
            coords {
              lat
              lng
            }
          }
          places {
            slug
            title
            descr
            coords {
              lat
              lng
            }
          }
          events {
            slug
            title
            descr
            coords {
              lat
              lng
            }
          }
          competitions {
            slug
            title
            info {
              details {
                text
              }
            }
            coords {
              lat
              lng
            }
          }
          shelters {
            slug
            name
            descr
            coords {
              lat
              lng
            }
          }
          hikes {
            slug
            title
            descr
            coords {
              lat
              lng
            }
          }
        }
      }
    `;
  }

  public static get crags(): DocumentNode {
    return gql`
      query GetCrags($lat: Float!, $lng: Float!, $start: Int, $end: Int) {
        crags(lat: $lat, lng: $lng, start: $start, end: $end) {
          items {
            ...Crag
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.Crag}
      ${fragments.Pagination}
    `;
  }

  public static get crag(): DocumentNode {
    return gql`
      query GetCrag($slug: String!) {
        crag(slug: $slug) {
          ...Crag
        }
      }
      ${fragments.Crag}
    `;
  }

  public static get sectors(): DocumentNode {
    return gql``;
  }

  public static get sector(): DocumentNode {
    return gql`
      query GetSector($slug: String!) {
        sector(slug: $slug) {
          ...Sector
        }
      }
      ${fragments.Sector}
    `;
  }

  public static get routes(): DocumentNode {
    return gql``;
  }

  public static get route(): DocumentNode {
    return gql`
      query GetRoute($slug: String!) {
        route(slug: $slug) {
          ...Route
        }
      }
      ${fragments.Route}
    `;
  }

  public static get places(): DocumentNode {
    return gql`
      query GetPlaces($lat: Float!, $lng: Float!, $start: Int, $end: Int) {
        places(lat: $lat, lng: $lng, start: $start, end: $end) {
          items {
            ...Place
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.Place}
      ${fragments.Pagination}
    `;
  }

  public static get place(): DocumentNode {
    return gql`
      query GetPlace($slug: String!) {
        place(slug: $slug) {
          ...Place
        }
      }
      ${fragments.Place}
    `;
  }

  public static get shelters(): DocumentNode {
    return gql`
      query GetShelters($lat: Float!, $lng: Float!, $start: Int, $end: Int) {
        shelters(lat: $lat, lng: $lng, start: $start, end: $end) {
          items {
            ...Shelter
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.Shelter}
      ${fragments.Pagination}
    `;
  }

  public static get shelter(): DocumentNode {
    return gql`
      query GetShelter($slug: String!) {
        shelter(slug: $slug) {
          ...Shelter
        }
      }
      ${fragments.Shelter}
    `;
  }

  public static get events(): DocumentNode {
    return gql`
      query GetEvents($lat: Float!, $lng: Float!, $start: Int, $end: Int) {
        events(lat: $lat, lng: $lng, start: $start, end: $end) {
          items {
            ...Event
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.Event}
      ${fragments.Pagination}
    `;
  }

  public static get event(): DocumentNode {
    return gql`
      query GetEvent($slug: String!) {
        event(slug: $slug) {
          ...Event
        }
      }
      ${fragments.Event}
    `;
  }

  public static get competitions(): DocumentNode {
    return gql`
      query GetCompetitions($lat: Float!, $lng: Float!, $start: Int, $end: Int) {
        competitions(lat: $lat, lng: $lng, start: $start, end: $end) {
          items {
            ...Competition
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.Competition}
      ${fragments.Pagination}
    `;
  }

  public static get competition(): DocumentNode {
    return gql`
      query GetCompetition($slug: String!) {
        competition(slug: $slug) {
          ...Competition
        }
      }
      ${fragments.Competition}
    `;
  }

  public static get news(): DocumentNode {
    return gql`
      query GetNews($start: Int, $end: Int) {
        news(start: $start, end: $end) {
          items {
            ...News
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.News}
      ${fragments.Pagination}
    `;
  }

  public static get oneNews(): DocumentNode {
    return gql`
      query GetOneNews($slug: String!) {
        oneNews(slug: $slug) {
          ...News
        }
      }
      ${fragments.News}
    `;
  }

  public static get hikes(): DocumentNode {
    return gql`
      query GetHikes($lat: Float!, $lng: Float!, $start: Int, $end: Int) {
        hikes(lat: $lat, lng: $lng, start: $start, end: $end) {
          items {
            ...Hike
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.Hike}
      ${fragments.Pagination}
    `;
  }

  public static get hike(): DocumentNode {
    return gql`
      query GetHike($slug: String!) {
        hike(slug: $slug) {
          ...Hike
        }
      }
      ${fragments.Hike}
    `;
  }

  public static get search(): DocumentNode {
    return gql`
      query Search($query: String!, $start: Int, $end: Int) {
        search(query: $query, start: $start, end: $end) {
          locations {
            ...City
          }
          crags {
            ...Crag
          }
          sectors {
            ...Sector
          }
          routes {
            ...Route
          }
          events {
            ...Event
          }
          places {
            ...Place
          }
          competitions {
            ...Competition
          }
          news {
            ...News
          }
          shelters {
            ...Shelter
          }
          hikes {
            ...Hike
          }
          pagination {
            ...Pagination
          }
        }
      }
      ${fragments.City}
      ${fragments.Crag}
      ${fragments.Sector}
      ${fragments.Route}
      ${fragments.Event}
      ${fragments.Place}
      ${fragments.Competition}
      ${fragments.News}
      ${fragments.Shelter}
      ${fragments.Hike}
      ${fragments.Pagination}
    `;
  }

  public static get forecast(): DocumentNode {
    return gql`
      query Forecast($lat: Float!, $lng: Float!) {
        forecast(lat: $lat, lng: $lng) {
          ...ForecastResult
        }
      }
      ${fragments.ForecastResult}
    `;
  }

  public static get osmNodes(): DocumentNode {
    return gql`
      query OsmNodes($lat: Float!, $lng: Float!, $distance: Int!) {
        osmNodes(lat: $lat, lng: $lng, distance: $distance)
      }
    `;
  }

  public static get osmNode(): DocumentNode {
    return gql`
      query OsmNode($nodeId: String!) {
        osmNode(nodeId: $nodeId)
      }
    `;
  }

  public static get photos(): DocumentNode {
    return gql`
      query Photos($query: String!) {
        photos(query: $query)
      }
    `;
  }
}

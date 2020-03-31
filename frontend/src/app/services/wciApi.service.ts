import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchPolicy } from 'apollo-client';
import { Observable } from 'rxjs';
import Queries, {
  CragResult,
  CragsResult,
  EventResult,
  EventsResult,
  ForecastResult,
  LatestResult,
  NearbyResult,
  PlaceResult,
  PlacesResult,
  RouteResult,
  SearchResult,
  SectorResult,
  UserInfoResult,
  HikesResult,
  SheltersResult,
  CompetitionsResult,
  NewsResult,
} from '../graphql/queries';
import {
  CragQueryArgs,
  CragsQueryArgs,
  EventQueryArgs,
  EventsQueryArgs,
  ForecastQueryArgs,
  LatestQueryArgs,
  NearbyQueryArgs,
  PlaceQueryArgs,
  PlacesQueryArgs,
  RouteQueryArgs,
  SearchQueryArgs,
  SectorQueryArgs,
  HikesQueryArgs,
  SheltersQueryArgs,
  CompetitionsQueryArgs,
  NewsQueryArgs,
} from '../interfaces/graphql/query.type';

@Injectable({ providedIn: 'root' })
export class WciApiService {
  constructor(private apollo: Apollo) {
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getNearby = this.getNearby.bind(this);
    this.getForecast = this.getForecast.bind(this);
    this.getLatest = this.getLatest.bind(this);
    this.getCrags = this.getCrags.bind(this);
    this.getCrag = this.getCrag.bind(this);
    this.getSectors = this.getSectors.bind(this);
    this.getSector = this.getSector.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.getPlace = this.getPlace.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.getHikes = this.getHikes.bind(this);
    this.getShelters = this.getShelters.bind(this);
    this.getCompetitions = this.getCompetitions.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  public defaultFetchPolicy: FetchPolicy = 'cache-first';
  public networkFetchPolicy: FetchPolicy = 'network-only';

  getUserInfo(): Observable<UserInfoResult> {
    return this.apollo.watchQuery({
      query: Queries.userInfo,
    }).valueChanges as Observable<UserInfoResult>;
  }

  getNearby(opts: NearbyQueryArgs): Observable<NearbyResult> {
    return this.apollo.watchQuery({
      query: Queries.nearby,
      variables: opts,
    }).valueChanges as Observable<NearbyResult>;
  }

  getForecast(opts: ForecastQueryArgs): Observable<ForecastResult> {
    return this.apollo.watchQuery({
      query: Queries.forecast,
      variables: opts,
    }).valueChanges as Observable<ForecastResult>;
  }

  getLatest(opts: LatestQueryArgs): Observable<LatestResult> {
    return this.apollo.watchQuery({
      query: Queries.latest,
      variables: opts,
    }).valueChanges as Observable<LatestResult>;
  }

  getCrags(opts: CragsQueryArgs): Observable<CragsResult> {
    return this.apollo.watchQuery({
      query: Queries.crags,
      variables: opts,
    }).valueChanges as Observable<CragsResult>;
  }

  getCrag(opts: CragQueryArgs): Observable<CragResult> {
    return this.apollo.watchQuery({
      query: Queries.crag,
      variables: opts,
    }).valueChanges as Observable<CragResult>;
  }

  getSectors(): void {
    // TODO
  }

  getSector(opts: SectorQueryArgs): Observable<SectorResult> {
    return this.apollo.watchQuery({
      query: Queries.sector,
      variables: opts,
    }).valueChanges as Observable<SectorResult>;
  }

  getRoutes(): void {
    // TODO
  }

  getRoute(opts: RouteQueryArgs): Observable<RouteResult> {
    return this.apollo.watchQuery({
      query: Queries.route,
      variables: opts,
    }).valueChanges as Observable<RouteResult>;
  }

  getPlaces(opts: PlacesQueryArgs): Observable<PlacesResult> {
    return this.apollo.watchQuery({
      query: Queries.places,
      variables: opts,
    }).valueChanges as Observable<PlacesResult>;
  }

  getPlace(opts: PlaceQueryArgs): Observable<PlaceResult> {
    return this.apollo.watchQuery({
      query: Queries.place,
      variables: opts,
    }).valueChanges as Observable<PlaceResult>;
  }

  getEvents(opts: EventsQueryArgs): Observable<EventsResult> {
    return this.apollo.watchQuery({
      query: Queries.events,
      variables: opts,
    }).valueChanges as Observable<EventsResult>;
  }

  getEvent(opts: EventQueryArgs): Observable<EventResult> {
    return this.apollo.watchQuery({
      query: Queries.event,
      variables: opts,
    }).valueChanges as Observable<EventResult>;
  }

  getSearchResults(opts: SearchQueryArgs): Observable<SearchResult> {
    return this.apollo.watchQuery({
      query: Queries.search,
      variables: opts,
      fetchPolicy: 'no-cache',
    }).valueChanges as Observable<SearchResult>;
  }

  getHikes(opts: HikesQueryArgs): Observable<HikesResult> {
    return this.apollo.watchQuery({
      query: Queries.hikes,
      variables: opts,
    }).valueChanges as Observable<HikesResult>;
  }

  getShelters(opts: SheltersQueryArgs): Observable<SheltersResult> {
    return this.apollo.watchQuery({
      query: Queries.shelters,
      variables: opts,
    }).valueChanges as Observable<SheltersResult>;
  }

  getCompetitions(opts: CompetitionsQueryArgs): Observable<CompetitionsResult> {
    return this.apollo.watchQuery({
      query: Queries.competitions,
      variables: opts,
    }).valueChanges as Observable<CompetitionsResult>;
  }

  getNews(opts: NewsQueryArgs): Observable<NewsResult> {
    return this.apollo.watchQuery({
      query: Queries.news,
      variables: opts,
    }).valueChanges as Observable<NewsResult>;
  }
}
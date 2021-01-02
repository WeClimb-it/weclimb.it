import { Apollo } from 'apollo-angular';
import { FetchPolicy } from '@apollo/client/core';
import { Injectable } from '@angular/core';

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
  HikeResult,
  ShelterResult,
  CompetitionResult,
  OneNewsResult,
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
  ShelterQueryArgs,
  SheltersQueryArgs,
  CompetitionsQueryArgs,
  NewsQueryArgs,
  HikeQueryArgs,
  CompetitionQueryArgs,
  OneNewsQueryArgs,
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
    this.getHike = this.getHike.bind(this);
    this.getShelters = this.getShelters.bind(this);
    this.getShelter = this.getShelter.bind(this);
    this.getCompetitions = this.getCompetitions.bind(this);
    this.getCompetition = this.getCompetition.bind(this);
    this.getNews = this.getNews.bind(this);
    this.getOneNews = this.getOneNews.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.getOpenStreetMapNodes = this.getOpenStreetMapNodes.bind(this);
    this.getOpenStreetMapNode = this.getOpenStreetMapNode.bind(this);
  }

  public defaultFetchPolicy: FetchPolicy = 'cache-first';
  public networkFetchPolicy: FetchPolicy = 'network-only';
  public noCacheFetchPolicy: FetchPolicy = 'no-cache';

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

  getHike(opts: HikeQueryArgs): Observable<HikeResult> {
    return this.apollo.watchQuery({
      query: Queries.hike,
      variables: opts,
    }).valueChanges as Observable<HikeResult>;
  }

  getHikes(opts: HikesQueryArgs): Observable<HikesResult> {
    return this.apollo.watchQuery({
      query: Queries.hikes,
      variables: opts,
    }).valueChanges as Observable<HikesResult>;
  }

  getShelter(opts: ShelterQueryArgs): Observable<ShelterResult> {
    return this.apollo.watchQuery({
      query: Queries.shelter,
      variables: opts,
    }).valueChanges as Observable<ShelterResult>;
  }

  getShelters(opts: SheltersQueryArgs): Observable<SheltersResult> {
    return this.apollo.watchQuery({
      query: Queries.shelters,
      variables: opts,
    }).valueChanges as Observable<SheltersResult>;
  }

  getCompetition(opts: CompetitionQueryArgs): Observable<CompetitionResult> {
    return this.apollo.watchQuery({
      query: Queries.competition,
      variables: opts,
    }).valueChanges as Observable<CompetitionResult>;
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
      fetchPolicy: this.noCacheFetchPolicy,
    }).valueChanges as Observable<NewsResult>;
  }

  getOneNews(opts: OneNewsQueryArgs): Observable<OneNewsResult> {
    return this.apollo.watchQuery({
      query: Queries.oneNews,
      variables: opts,
    }).valueChanges as Observable<OneNewsResult>;
  }

  getOpenStreetMapNodes(opts: { lat: number; lng: number; distance: number }): Observable<object> {
    return this.apollo.watchQuery({
      query: Queries.osmNodes,
      variables: opts,
    }).valueChanges as Observable<object>;
  }

  getOpenStreetMapNode(opts: { nodeId: string }): Observable<object> {
    return this.apollo.watchQuery({
      query: Queries.osmNode,
      variables: opts,
    }).valueChanges as Observable<object>;
  }

  getPhotos(opts: { query: string }): Observable<object> {
    return this.apollo.watchQuery({
      query: Queries.photos,
      variables: opts,
    }).valueChanges as Observable<object>;
  }
}

import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
import { GeoLocation } from './classes/geolocation.class';
import { SearchOptions } from './components/header/header.component';
import { LatestResult, NearbyResult, SearchResult as QuerySearchResult, UserInfoResult } from './graphql/queries';
import { MapUpdateEvent } from './interfaces/events/map-update.interface';
import { SearchResult } from './interfaces/graphql/searchresult.type';
import { UserInfo } from './interfaces/graphql/userinfo.type';
import { PlaceSuggestion } from './services/geo.service';
import { WciApiService } from './services/wci-api.service';

type Poi = Crag | Place | Competition | Shelter | Hike;

@Component({
  selector: 'wci-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  zoom = 9;
  currentLocation: GeoLocation = new GeoLocation(0, 0);
  userLocation: GeoLocation;
  nearbyPois: SearchResult;
  latestPois: SearchResult;

  private mapData: MapUpdateEvent;
  private userData: UserInfo;
  private latestSearchOptions: SearchOptions;

  constructor(private api: WciApiService) {}

  ngOnInit(): void {
    this.bootstrap();
  }

  /**
   *
   */
  onMapReady($event: MapUpdateEvent): void {
    this.mapData = $event;
  }

  /**
   *
   */
  onMapUpdate($event: MapUpdateEvent): void {
    this.mapData = $event;
    this.getNearby();
  }

  /**
   *
   */
  onSearch(searchOptions: SearchOptions): void {
    this.latestSearchOptions = searchOptions;
    const searchSubscription = this.api
      .getSearchResults(this.latestSearchOptions)
      .subscribe((res: QuerySearchResult) => {
        if (res.errors) {
          throw new Error('Something went wrong during the search query');
        }

        console.log(res);
        searchSubscription.unsubscribe();
      });
  }

  /**
   *
   */
  onSearchQueryChanged(query: string): void {
    // Do nothing
  }

  /**
   *
   */
  onSuggestionSelected(suggestion: PlaceSuggestion): void {
    this.currentLocation = suggestion.geo;
    this.getLatest(this.currentLocation.lng, this.currentLocation.lat);
  }

  /**
   *
   */
  onPoiSelected(entity: Poi): void {
    this.currentLocation = new GeoLocation(
      entity.coords.lat,
      entity.coords.lng,
      undefined,
      (entity as any).title || (entity as any).name,
    );
  }

  /**
   *
   */
  onOptionsUpdated(searchOptions: SearchOptions): void {
    this.latestSearchOptions = searchOptions;
    this.getNearby();
  }

  /**
   *
   */
  private bootstrap(): void {
    // First, let's retrieve some information about the user
    const userInfoSubscription = this.api.getUserInfo().subscribe((res: UserInfoResult) => {
      if (res.errors) {
        throw new Error('Something wrong happened loading the user info');
      }

      if (!res.loading) {
        this.userData = res.data.userInfo;
        // We set the user location as current one so the map is updated (it will trigger the "onMapUpdate" event)
        this.currentLocation = new GeoLocation(
          this.userData.geo.coords.lat,
          this.userData.geo.coords.lng,
          undefined,
          this.userData.geo.city,
        );
        this.userLocation = this.currentLocation;
        userInfoSubscription.unsubscribe();

        // First load
        this.getLatest(this.userData.geo.coords.lng, this.userData.geo.coords.lat);
      }
    });
  }

  /**
   *
   */
  private getNearby(): void {
    const nearbySubscription = this.api
      .getNearby({
        lng: this.mapData.coordinates[0],
        lat: this.mapData.coordinates[1],
        minWeather: (this.latestSearchOptions && this.latestSearchOptions.minWeather) || 0,
        maxWeather: (this.latestSearchOptions && this.latestSearchOptions.maxWeather) || 1,
        minPosition: (this.latestSearchOptions && this.latestSearchOptions.minPosition) || 0,
        maxPosition: (this.latestSearchOptions && this.latestSearchOptions.maxPosition) || 1,
        minDifficulty: (this.latestSearchOptions && this.latestSearchOptions.minDifficulty) || 0,
        maxDifficulty: (this.latestSearchOptions && this.latestSearchOptions.maxDifficulty) || 1,
        distance: this.mapData.radius,
      })
      .subscribe((res: NearbyResult) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          this.nearbyPois = res.data.nearby;
          nearbySubscription.unsubscribe();
        }
      });
  }

  /**
   *
   */
  private getLatest(lng: number, lat: number): void {
    const latestSubscription = this.api
      .getLatest({
        lng,
        lat,
      })
      .subscribe((res: LatestResult) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          this.latestPois = res.data.latest;
          latestSubscription.unsubscribe();
        }
      });
  }
}

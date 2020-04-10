import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import moment from 'moment-timezone';
import { GeoLocation } from './classes/geolocation.class';
import { SearchOptions } from './components/header/header.component';
import { LatestResult, NearbyResult, UserInfoResult } from './graphql/queries';
import { MapUpdateEvent } from './interfaces/events/map-update.interface';
import { SearchResult } from './interfaces/graphql/searchresult.type';
import { UserInfo } from './interfaces/graphql/userinfo.type';
import { AppStoreService } from './services/appState.service';
import { PlaceSuggestion } from './services/geo.service';
import { WciApiService } from './services/wciApi.service';
import { Poi } from './utils/Poi';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wci-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  zoom = 9;
  year = new Date().getFullYear();

  currentLocation: GeoLocation = new GeoLocation(0, 0);
  userLocation: GeoLocation;
  nearbyPois: SearchResult;
  latestPois: SearchResult;

  showContent = false;
  isFloatingContent = false;

  environment = environment;

  private mapData: MapUpdateEvent;
  private userData: UserInfo;
  private latestSearchOptions: SearchOptions;

  constructor(
    private translate: TranslateService,
    private api: WciApiService,
    private router: Router,
    private route: ActivatedRoute,
    private appStore: AppStoreService,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.showContent = !!this.route.root.firstChild.snapshot.data.type;
        this.isFloatingContent = this.route.root.firstChild.snapshot.data.isFloatingContent;
      }
    });

    this.appStore.watchProperty('currentLocation').subscribe((location: GeoLocation) => {
      if (location && location !== this.currentLocation) {
        this.currentLocation = location;
      }
    });
  }

  ngOnInit(): void {
    this.bootstrap();
  }

  /**
   *
   */
  onMapReadyOrUpdate($event: MapUpdateEvent): void {
    this.mapData = $event;
    this.getNearby();
  }

  /**
   *
   */
  onSearch(searchOptions: SearchOptions): void {
    this.latestSearchOptions = searchOptions;
    this.appStore.setProperty('searchOptions', searchOptions);
    this.router.navigate(['search', searchOptions.query]);
  }

  /**
   *
   */
  onSectionSelected(endpoint: string): void {
    this.router.navigate([endpoint]);
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
    this.updateCurrentLocationInStore();
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
    this.updateCurrentLocationInStore();
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
  onLanguageSelected(index: number): void {
    this.translate.use(environment.i18n.availableLangs[index]);
    this.onSectionSelected('/');
  }

  /**
   *
   */
  private bootstrap(): void {
    // First, let's retrieve some information about the user
    const sub$ = this.api.getUserInfo().subscribe((res: UserInfoResult) => {
      if (res.errors) {
        throw new Error('Something wrong happened loading the user info');
      }

      if (!res.loading) {
        this.userData = res.data.userInfo;

        this.initI18n();

        // We set the user location as current one so the map is updated (it will trigger the "onMapUpdate" event)
        this.currentLocation = new GeoLocation(
          this.userData.geo.coords.lat,
          this.userData.geo.coords.lng,
          undefined,
          this.userData.geo.city,
        );
        this.userLocation = this.currentLocation;
        this.updateCurrentLocationInStore();
        this.updateUserLocationInStore();
        sub$.unsubscribe();

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

  /**
   *
   */
  private updateCurrentLocationInStore(): void {
    this.appStore.setProperty('currentLocation', this.currentLocation);
  }

  /**
   *
   */
  private updateUserLocationInStore(): void {
    this.appStore.setProperty('currentUserLocation', this.userLocation);
  }

  /**
   *
   */
  private initI18n(): void {
    /*
    // NOTE: Currently we use the browser language in the app.component
    // instead of deriving it from the BE.

    const lang = this.userData.geo.isoCode.toLowerCase();
    if (environment.i18n.availableLangs.includes(lang)) {
      this.translate.use(lang);
    } else {
      this.translate.use(environment.i18n.defaultLang);
    }
    */

    moment.locale(this.userData.geo.isoCode);
    moment.tz.setDefault(this.userData.geo.timeZone);
  }
}

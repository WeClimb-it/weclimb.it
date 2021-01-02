import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounce, isEmpty } from 'lodash';
import moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeoLocation } from './classes/geolocation.class';
import { SearchOptions } from './components/header/header.component';
import { NearbyResult, UserInfoResult } from './graphql/queries';
import { MapUpdateEvent } from './interfaces/events/map-update.interface';
import { SearchResult } from './interfaces/graphql/searchresult.type';
import { UserInfo } from './interfaces/graphql/userinfo.type';
import { AppStoreService } from './services/appState.service';
import { GeoService, PlaceSuggestion } from './services/geo.service';
import { I18nService } from './services/i18n.service';
import { PersistanceService } from './services/persistanceService';
import { WciApiService } from './services/wciApi.service';
import { Poi } from './utils/Poi';

@Component({
  selector: 'wci-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  zoom = 11;
  year = new Date().getFullYear();

  hasBrowserGeolocation = navigator && navigator.geolocation;
  hasActivatedBrowserGeolocation = false;
  currentLocation: GeoLocation = new GeoLocation(0, 0);
  userLocation: GeoLocation;
  nearbyPois: SearchResult;
  nearbyOsmPois: object;
  // latestPois: SearchResult;

  showContent = false;
  isFloatingContent = false;
  isNearbyLoading = true;
  isOsmNearbyLoading = true;
  // isLatestLoading = true;

  environment = environment;

  private mapData: MapUpdateEvent;
  private userData: UserInfo;
  private latestSearchOptions: SearchOptions;

  private cancelableNearbySubscription: Subscription;
  private cancelableOsmSubscription: Subscription;

  private osmRadiusThreshold = 137;

  constructor(
    private translate: TranslateService,
    private api: WciApiService,
    private geoService: GeoService,
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
      if (location) {
        this.currentLocation = location;
        // this.getLatest();
        this.getNearby();
      }
    });

    this.appStore.watchProperty('currentUserLocation').subscribe((location: GeoLocation) => {
      if (location) {
        this.userLocation = location;
        this.getNearby();
      }
    });

    this.onMapReadyOrUpdate = debounce(this.onMapReadyOrUpdate, 1500);
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
  onExternalLinkSelected(link: string): void {
    window.open(link, '_blank');
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
    const lang = environment.i18n.availableLangs[index];
    I18nService.chosenUserLang = lang;
    PersistanceService.set('lang', lang);
    this.translate.use(lang);
    this.onSectionSelected('/');
  }

  /**
   *
   */
  onEnableGeolocation(): void {
    this.geoService.getLocationFromBrowser(
      (position) => {
        this.userLocation = new GeoLocation(position.coords.latitude, position.coords.longitude, '');
        this.currentLocation = this.userLocation;
        this.updateUserLocationInStore();
        this.updateCurrentLocationInStore();
      },
      () => {
        throw new Error('Something went wrong during the geolocation');
      },
    );
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

        /*
          We set the user location as current one so the map is updated
          (note that it will trigger the "onMapUpdate" event)

          At first, we try to retrieve the position from the browser,
          in case of error or unapproved geolocation we use the position
          coming from the back-end.
        */
        const doUpdateLocation = (location: GeoLocation) => {
          this.userLocation = location;
          this.updateCurrentLocationInStore();
          this.updateUserLocationInStore();
        };
        this.geoService.getRespectfullyLocationFromBrowser(
          (position) => {
            // success
            this.currentLocation = new GeoLocation(position.coords.latitude, position.coords.longitude, '');
            doUpdateLocation(this.currentLocation);
            this.hasActivatedBrowserGeolocation = true;
          },
          () => {
            // error
            this.currentLocation = new GeoLocation(
              this.userData.geo.coords.lat,
              this.userData.geo.coords.lng,
              undefined,
              this.userData.geo.city,
            );
            doUpdateLocation(this.currentLocation);
          },
        );

        sub$.unsubscribe();
      }
    });
  }

  /**
   *
   */
  private getNearby(): void {
    if (!this.mapData) {
      return;
    }

    this.isNearbyLoading = true;

    if (this.mapData.radius < this.osmRadiusThreshold) {
      this.getOsmNearby();
    }

    if (this.cancelableNearbySubscription) {
      this.cancelableNearbySubscription.unsubscribe();
    }

    this.cancelableNearbySubscription = this.api
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
          this.isNearbyLoading = false;
          this.nearbyPois = res.data.nearby;
          this.cancelableNearbySubscription.unsubscribe();
        }
      });
  }

  /**
   *
   */
  private getOsmNearby(): void {
    if (!this.mapData) {
      return;
    }

    if (this.cancelableOsmSubscription) {
      this.cancelableOsmSubscription.unsubscribe();
    }

    this.isOsmNearbyLoading = true;

    this.cancelableOsmSubscription = this.api
      .getOpenStreetMapNodes({
        lng: this.mapData.coordinates[0],
        lat: this.mapData.coordinates[1],
        distance: this.mapData.radius,
      })
      .subscribe((res: { loading: boolean; data: Record<string, object> }) => {
        if (!res.loading) {
          if (!isEmpty(res.data) && !isEmpty(res.data.osmNodes)) {
            const { osmNodes: pois } = res.data;
            this.nearbyOsmPois = pois;
          }

          this.isOsmNearbyLoading = false;
          this.cancelableOsmSubscription.unsubscribe();
        }
      });
  }

  /**
   *
   */
  /*
  private getLatest(): void {
    this.isLatestLoading = true;

    const latestSubscription = this.api
      .getLatest({
        lng: this.currentLocation.lng,
        lat: this.currentLocation.lat,
      })
      .subscribe((res: LatestResult) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          this.isLatestLoading = false;
          this.latestPois = res.data.latest;
          latestSubscription.unsubscribe();
        }
      });
  }
  */

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

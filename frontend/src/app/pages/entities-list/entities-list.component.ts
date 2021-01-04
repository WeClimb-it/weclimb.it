import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { SearchOptions } from 'src/app/components/header/header.component';
import {
  CompetitionsResult,
  CragsResult,
  HikesResult,
  NewsResult,
  PlacesResult,
  SearchResult,
  SheltersResult,
} from 'src/app/graphql/queries';
import { City } from 'src/app/interfaces/graphql/city.type';
import { AppStoreService } from 'src/app/services/appState.service';
import { WciApiService } from 'src/app/services/wciApi.service';
import { ContentType, typeOfItem } from 'src/app/utils/ContentType';
import { Poi } from 'src/app/utils/Poi';

type Results =
  | CragsResult
  | HikesResult
  | SheltersResult
  | PlacesResult
  | CompetitionsResult
  | NewsResult
  | SearchResult;

const DEFAULT_START = 0;
// On the server we have the same pageSize and it is not possible to be changed.
const DEFAULT_END = 20;

@Component({
  selector: 'wci-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EntitiesListComponent implements OnInit, OnDestroy {
  title = '';
  items: Poi[] = [];

  specialItems: Record<string, Poi[]> = {};

  currentLocation: GeoLocation;
  userLocation: GeoLocation;
  contentType: ContentType;

  navCurrentEndpoint = '';
  navCurrentPage = 1;
  navPageCount = 1;
  navTotalItems = 0;
  navPageSize = DEFAULT_END;
  navStart = DEFAULT_START;
  navEnd = DEFAULT_END;
  navVisible = false;

  isLoading = true;
  isSearchPage = false;
  firstLoad = true;

  typeOfItem = typeOfItem;
  titlePlaceholder = '';

  private appStoreSub$: Subscription;
  private routeSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: WciApiService,
    private appStore: AppStoreService,
  ) {
    this.contentType = this.route.snapshot.data.type;
    this.isSearchPage = this.contentType === ContentType.SEARCH;
  }

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe((params: Params) => {
      // Load data on query change
      if (params.query && !this.firstLoad) {
        this.doLoad();
      }

      if (params.page) {
        if (isNaN(params.page)) {
          this.router.navigate(['404']);
          return;
        }

        const page = +params.page === 0 ? 1 : +params.page;

        this.navCurrentPage = +params.page;
        this.navStart = this.navPageSize * (page - 1);
        this.navEnd = this.navStart + this.navPageSize;
      }
    });

    this.appStoreSub$ = this.appStore.watchProperty('currentLocation').subscribe((location: GeoLocation) => {
      if (location) {
        this.currentLocation = location;
        this.doLoad();
      }
    });

    this.appStoreSub$ = this.appStore.watchProperty('currentUserLocation').subscribe((location: GeoLocation) => {
      if (location) {
        this.userLocation = location;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.appStoreSub$) {
      this.appStoreSub$.unsubscribe();
    }
    if (this.routeSub$) {
      this.routeSub$.unsubscribe();
    }
  }

  /**
   *
   */
  onPageChange($event: PageEvent): void {
    this.navCurrentPage = $event.pageIndex;
    this.navStart = this.navPageSize * $event.pageIndex;
    this.navEnd = this.navStart + this.navPageSize;
    this.doLoad();
    this.router.navigate([this.navCurrentEndpoint, 'page', $event.pageIndex + 1]);
  }

  /**
   *
   */
  onCitySelected(city: City): void {
    const cityLocation: GeoLocation = new GeoLocation(city.coords.lat, city.coords.lng, '', city.name);
    this.appStore.setProperty('currentLocation', cityLocation);
    this.closeList();
  }

  /**
   *
   */
  closeList(): void {
    this.router.navigate(['/']);
  }

  /**
   *
   */
  private doLoad(): void {
    this.firstLoad = false;
    this.loadData({
      lat: this.currentLocation.lat,
      lng: this.currentLocation.lng,
      start: this.navStart,
      end: this.navEnd,
    });
  }

  /**
   *
   */
  private loadData(opts: { lat: number; lng: number; start: number; end: number } | SearchOptions): void {
    let query;
    let resultPayloadProperty: ContentType;
    resultPayloadProperty = this.navCurrentEndpoint = this.route.snapshot.data.type;

    switch (this.contentType) {
      default:
        throw new Error(`Unexpected content type was given [${this.contentType}].`);
      case ContentType.CRAGS:
        query = this.api.getCrags;
        this.titlePlaceholder = 'NEAR_CRAGS';
        break;
      case ContentType.HIKES:
        query = this.api.getHikes;
        this.titlePlaceholder = 'NEAR_HIKES';
        break;
      case ContentType.SHELTERS:
        query = this.api.getShelters;
        this.titlePlaceholder = 'NEAR_SHELTERS';
        break;
      case ContentType.PLACES:
        query = this.api.getPlaces;
        this.titlePlaceholder = 'NEAR_PLACES';
        break;
      case ContentType.COMPETITIONS:
        query = this.api.getCompetitions;
        this.titlePlaceholder = 'NEAR_COMPETITIONS';
        break;
      case ContentType.NEWS:
        query = this.api.getNews;
        this.titlePlaceholder = 'NEWS';
        break;
      case ContentType.SEARCH:
        query = this.api.getSearchResults;
        this.titlePlaceholder = 'SEARCH_RESULTS';
        opts = {
          ...opts,
          query: this.route.snapshot.params.query,
        };
        this.navCurrentEndpoint = `${this.route.snapshot.data.type}/${opts.query}`;
        break;
    }

    if (typeof query === 'function') {
      this.isLoading = true;

      const sub$ = query(opts).subscribe((res: Results) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          this.isLoading = false;

          const result = res.data[resultPayloadProperty];

          if (this.navCurrentPage > 1 && this.navCurrentPage > result.pagination.pageCount) {
            this.router.navigate(['404']);
            return;
          }

          if (resultPayloadProperty !== ContentType.SEARCH) {
            this.items = result.items;
            this.navTotalItems = result.pagination.total;
          } else {
            this.items = [
              ...result.crags,
              ...result.events,
              ...result.places,
              ...result.competitions,
              ...result.shelters,
              ...result.hikes,
            ];
            this.specialItems = {
              locations: result.locations,
              sectors: result.sectors,
              routes: result.routes,
              news: result.news,
            };

            // TODO: In case of search, the BE does not return
            // a precise total items count yet.
            this.navTotalItems = result.pagination.size * result.pagination.pageCount;
          }

          this.navVisible = result.pagination.pageCount > 1;
          this.navCurrentPage = result.pagination.currentPage;
          this.navPageCount = result.pagination.pageCount;
          this.navPageSize = result.pagination.size;

          sub$.unsubscribe();
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import {
  CompetitionsResult,
  CragsResult,
  HikesResult,
  NewsResult,
  PlacesResult,
  SheltersResult,
} from 'src/app/graphql/queries';
import { AppStoreService } from 'src/app/services/appState.service';
import { WciApiService } from 'src/app/services/wciApi.service';
import { ContentType } from 'src/app/utils/ContentType';
import { Poi } from 'src/app/utils/Poi';

type Results = CragsResult | HikesResult | SheltersResult | PlacesResult | CompetitionsResult | NewsResult;
const DEFAULT_START = 0;
const DEFAULT_END = 20;

@Component({
  selector: 'wci-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
})
export class EntitiesListComponent {
  contentType: typeof ContentType;
  items: Poi[] = [];

  navCurrentPage = 0;
  navPageCount = 0;
  navPageSize = DEFAULT_END;
  navStart = DEFAULT_START;
  navEnd = DEFAULT_END;

  title = '';

  constructor(private route: ActivatedRoute, private api: WciApiService, private appStore: AppStoreService) {
    this.contentType = this.route.snapshot.data.type;

    // Load data once the currentLocation is ready or updated
    this.appStore.watchProperty('currentLocation').subscribe((location: GeoLocation) => {
      if (location) {
        this.loadData({
          lat: location.lat,
          lng: location.lng,
          start: this.navStart,
          end: this.navEnd,
        });
      }
    });
  }

  /**
   *
   */
  private loadData(opts: { lat: number; lng: number; start: number; end: number }): void {
    let query;
    let resultPayloadProperty;
    switch (this.route.snapshot.data.type) {
      default:
        throw new Error(`Unexpected content type was given [${this.contentType}].`);
      case ContentType.CRAGS:
        query = this.api.getCrags;
        resultPayloadProperty = 'crags';
        // TODO: i18n
        this.title = 'Near crags';
        break;
      case ContentType.HIKES:
        query = this.api.getHikes;
        resultPayloadProperty = 'hikes';
        // TODO: i18n
        this.title = 'Hikes you can do';
        break;
      case ContentType.SHELTERS:
        query = this.api.getShelters;
        resultPayloadProperty = 'shelters';
        // TODO: i18n
        this.title = 'Shelters you can visit';
        break;
      case ContentType.PLACES:
        query = this.api.getPlaces;
        resultPayloadProperty = 'places';
        // TODO: i18n
        this.title = 'Places nearby';
        break;
      case ContentType.COMPETITIONS:
        query = this.api.getCompetitions;
        resultPayloadProperty = 'competitions';
        // TODO: i18n
        this.title = 'Competitions you can attend';
        break;
      case ContentType.NEWS:
        query = this.api.getNews;
        resultPayloadProperty = 'news';
        // TODO: i18n
        this.title = 'News';
        break;
    }

    if (typeof query === 'function') {
      const sub = query(opts).subscribe((res: Results) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          this.items = res.data[resultPayloadProperty].items;
          console.log(this.items);
          sub.unsubscribe();
        }
      });
    }
  }
}

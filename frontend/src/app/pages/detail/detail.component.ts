import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentType } from 'src/app/utils/ContentType';
import { ActivatedRoute, Params } from '@angular/router';
import { WciApiService } from 'src/app/services/wciApi.service';
import { CragResult, HikeResult, ShelterResult, PlaceResult, CompetitionResult } from 'src/app/graphql/queries';
import { Subscription } from 'rxjs';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { AppStoreService } from 'src/app/services/appState.service';

type Results = CragResult | HikeResult | ShelterResult | PlaceResult | CompetitionResult;

@Component({
  selector: 'wci-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  contentType: ContentType;
  currentLocation: GeoLocation;
  data: Results;

  isLoading = true;
  isErrored = false;

  private appStoreSub$: Subscription;
  private routeSub$: Subscription;

  constructor(private route: ActivatedRoute, private api: WciApiService, private appStore: AppStoreService) {
    this.contentType = this.route.snapshot.data.type;

    this.appStoreSub$ = this.appStore.watchProperty('currentLocation').subscribe((location: GeoLocation) => {
      if (location) {
        this.currentLocation = location;
      }
    });
  }

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe((params: Params) => {
      // Load data on slug change
      if (params.slug) {
        this.loadData(params.slug);
      } else {
        this.isErrored = true;
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
  private loadData(slug: string): void {
    let query;
    let resultPayloadProperty: ContentType;
    resultPayloadProperty = this.route.snapshot.data.type;

    switch (this.contentType) {
      default:
        throw new Error(`Unexpected content type was given [${this.contentType}].`);
      case ContentType.CRAG:
        query = this.api.getCrag;
        break;
      case ContentType.HIKE:
        query = this.api.getHike;
        break;
      case ContentType.SHELTER:
        query = this.api.getShelter;
        break;
      case ContentType.PLACE:
        query = this.api.getPlace;
        break;
      case ContentType.COMPETITION:
        query = this.api.getCompetition;
        break;
    }

    if (typeof query === 'function') {
      this.isLoading = true;

      const sub$ = query({ slug }).subscribe((res: Results) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          if (res.errors) {
            this.isErrored = true;
          } else {
            this.isLoading = false;
            this.data = res.data[resultPayloadProperty];
            sub$.unsubscribe();
          }
        }
      });
    }
  }
}

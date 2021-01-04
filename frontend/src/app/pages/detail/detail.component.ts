import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { CompetitionResult, CragResult, HikeResult, PlaceResult, ShelterResult } from 'src/app/graphql/queries';
import { AppStoreService } from 'src/app/services/appState.service';
import { WciApiService } from 'src/app/services/wciApi.service';
import { ContentType } from 'src/app/utils/ContentType';
import { Poi } from 'src/app/utils/Poi';

type Results = CragResult | HikeResult | ShelterResult | PlaceResult | CompetitionResult;

@Component({
  selector: 'wci-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailComponent implements OnInit, OnDestroy {
  contentType: ContentType;
  currentLocation: GeoLocation;
  userLocation: GeoLocation;
  data: Poi;

  isLoading = true;
  isErrored = false;

  private appStoreCurrentLocationSub$: Subscription;
  private appStoreUserLocationSub$: Subscription;
  private routeSub$: Subscription;

  constructor(private route: ActivatedRoute, private api: WciApiService, private appStore: AppStoreService) {
    this.contentType = this.route.snapshot.data.type;

    this.appStoreCurrentLocationSub$ = this.appStore
      .watchProperty('currentLocation')
      .subscribe((location: GeoLocation) => {
        if (location) {
          this.currentLocation = location;
        }
      });

    this.appStoreUserLocationSub$ = this.appStore
      .watchProperty('currentUserLocation')
      .subscribe((location: GeoLocation) => {
        if (location) {
          this.userLocation = location;
        }
      });
  }

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe((params: Params) => {
      // Load data on slug change
      if (params.slug || params.nodeId) {
        this.loadData(params.slug || params.nodeId);
      } else {
        this.isErrored = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.appStoreCurrentLocationSub$) {
      this.appStoreCurrentLocationSub$.unsubscribe();
    }
    if (this.appStoreUserLocationSub$) {
      this.appStoreUserLocationSub$.unsubscribe();
    }
    if (this.routeSub$) {
      this.routeSub$.unsubscribe();
    }
  }

  /**
   *
   */
  private loadData(refId: string): void {
    let query = null;
    let opts = {};
    let resultPayloadProperty: ContentType;
    resultPayloadProperty = this.route.snapshot.data.type;

    switch (this.contentType) {
      default:
        throw new Error(`Unexpected content type was given [${this.contentType}].`);
      case ContentType.CRAG:
        query = this.api.getCrag;
        opts = { slug: refId };
        break;
      case ContentType.HIKE:
        query = this.api.getHike;
        opts = { slug: refId };
        break;
      case ContentType.SHELTER:
        query = this.api.getShelter;
        opts = { slug: refId };
        break;
      case ContentType.PLACE:
        query = this.api.getPlace;
        opts = { slug: refId };
        break;
      case ContentType.COMPETITION:
        query = this.api.getCompetition;
        opts = { slug: refId };
        break;
      case ContentType.OSM_NODE:
        query = this.api.getOpenStreetMapNode;
        opts = { nodeId: refId };
        break;
    }

    if (typeof query === 'function') {
      this.isLoading = true;

      const sub$ = query(opts).subscribe((res: Results) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          if (res.errors) {
            this.isErrored = true;
          } else {
            this.isLoading = false;
            this.data = res.data[resultPayloadProperty];
            this.updateCurrentLocationInStore();
            sub$.unsubscribe();
          }
        }
      });
    }
  }

  /**
   *
   */
  private updateCurrentLocationInStore(): void {
    if (this.data.coords) {
      const detailLocation = new GeoLocation(
        this.data.coords.lat,
        this.data.coords.lng,
        undefined,
        (this.data as any).title || (this.data as any).name,
      );
      this.appStore.setProperty('currentLocation', detailLocation);
    }
  }
}

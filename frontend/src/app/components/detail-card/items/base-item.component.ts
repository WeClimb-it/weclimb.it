import { Component, SimpleChanges, Input, OnChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WciApiService } from 'src/app/services/wciApi.service';
import { Poi } from 'src/app/utils/Poi';
import { typeOfItem, getSectionFromItem } from 'src/app/utils/ContentType';
import { environment } from 'src/environments/environment';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { NearbyResult } from 'src/app/graphql/queries';
import { Coords } from 'src/app/interfaces/graphql/coords.type';
import { getGoogleMapsUrl } from 'src/app/utils/Map';

@Component({
  selector: 'wci-base-card-item',
  template: '<div></div>',
})
export class BaseCardItemComponent implements OnChanges {
  @Input() data: Poi;
  @Input() currentLocation: GeoLocation;
  @Input() userLocation: GeoLocation;

  mapboxToken = environment.mapbox.token;
  staticMapSrc = '';

  nearbyPois: Poi[] = [];
  disablePerfectScrollbar = false;

  protected staticMapSizes = [303, 360];

  private disablePerfectScrollbarBreakpoint = 650;

  constructor(protected router: Router, protected api: WciApiService) {
    this.checkPerfectScrollbarPermit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue && changes.data.currentValue !== changes.data.previousValue) {
      // tslint:disable-next-line: max-line-length
      this.staticMapSrc = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${this.data.coords.lng},${this.data.coords.lat},10.19,0/${this.staticMapSizes[0]}x${this.staticMapSizes[1]}@2x?access_token=${this.mapboxToken}`;

      this.getNearby();
    }
  }

  /**
   *
   */
  goToDetailUrl(item: Poi) {
    const section = getSectionFromItem(item);
    this.router.navigate([section, item.slug]);
  }

  /**
   *
   */
  goToGoogle(coords: Coords): void {
    window.open(getGoogleMapsUrl(coords, this.userLocation.toCoordinatesObject()));
  }

  /**
   *
   */
  getNearby(): void {
    if (this.data.coords && this.data.coords.lat && this.data.coords.lng) {
      const sub$ = this.api
        .getNearby({ lat: this.data.coords.lat, lng: this.data.coords.lng, distance: 80, start: 0, end: 4 })
        .subscribe((res: NearbyResult) => {
          if (!res.errors) {
            // TODO: The slice is needed because there is a bug on the BE
            // where the limits seems to be discarded for the nearby query
            this.nearbyPois = [
              ...res.data.nearby.crags.slice(0, 4),
              ...res.data.nearby.hikes.slice(0, 4),
              ...res.data.nearby.shelters.slice(0, 4),
            ].filter((poi: Poi) => poi.slug !== this.data.slug);
          }

          sub$.unsubscribe();
        });
    }
  }

  /**
   * Disables the perfect-scrollbar in case of small device.
   */
  @HostListener('window:resize', ['$event'])
  checkPerfectScrollbarPermit() {
    this.disablePerfectScrollbar = window.innerWidth < this.disablePerfectScrollbarBreakpoint;
  }
}

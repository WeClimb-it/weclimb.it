import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { ForecastResult, NearbyResult } from 'src/app/graphql/queries';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { CurrentWeather } from 'src/app/interfaces/graphql/currentweather.type';
import { Forecast } from 'src/app/interfaces/graphql/forecast.type';
import { Poi } from 'src/app/utils/Poi';
import { environment } from 'src/environments/environment';
import { BaseCardItemComponent } from './base-item.component';
import { Router } from '@angular/router';
import { WciApiService } from 'src/app/services/wciApi.service';

@Component({
  selector: 'wci-crag-card-item',
  templateUrl: 'crag-item.component.html',
  styleUrls: ['crag-item.component.scss'],
})
export class CragCardItemComponent extends BaseCardItemComponent implements OnChanges {
  @Input() data: Crag;
  @Input() currentLocation: GeoLocation;

  mapboxToken = environment.mapbox.token;
  staticMapSrc = '';

  hasForecast = false;
  forecastClass = 'clear-day';
  currentWeather: CurrentWeather;
  todayForecast: Forecast;
  tomorrowForecast: Forecast;
  forecasts: Forecast[];

  nearbyPois: Poi[] = [];

  private staticMapSizes = [303, 360];

  constructor(protected router: Router, protected api: WciApiService) {
    super(router, api);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue && changes.data.currentValue !== changes.data.previousValue) {
      // tslint:disable-next-line: max-line-length
      this.staticMapSrc = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${this.data.coords.lng},${this.data.coords.lat},10.19,0/${this.staticMapSizes[0]}x${this.staticMapSizes[1]}@2x?access_token=${this.mapboxToken}`;

      this.getForecast();
      this.getNearby();
    }
  }

  /**
   *
   */
  getForecast(): void {
    if (this.data.coords) {
      const sub$ = this.api
        .getForecast({ lat: this.data.coords.lat, lng: this.data.coords.lng })
        .subscribe((res: ForecastResult) => {
          if (!res.errors) {
            this.hasForecast = true;
            this.currentWeather = res.data.forecast.now;
            this.forecasts = res.data.forecast.forecast;
            this.todayForecast = this.forecasts[0];
            this.tomorrowForecast = this.forecasts[1];

            if (this.currentWeather.icon.includes('cloudy-night')) {
              this.forecastClass = 'cloudy-night';
            } else if (this.currentWeather.icon.includes('cloudy-day')) {
              this.forecastClass = 'cloudy-day';
            } else if (this.currentWeather.icon.includes('clear-night')) {
              this.forecastClass = 'clear-night';
            } else if (this.currentWeather.icon.includes('clear-day')) {
              this.forecastClass = 'clear-day';
            } else {
              this.forecastClass = 'clear-day';
            }
          }
          sub$.unsubscribe();
        });
    }
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
}

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { BaseCardItemComponent } from './base-item.component';
import { environment } from 'src/environments/environment';
import { WciApiService } from 'src/app/services/wciApi.service';
import { ForecastResult } from 'src/app/graphql/queries';
import { CurrentWeather } from 'src/app/interfaces/graphql/currentweather.type';
import { Forecast } from 'src/app/interfaces/graphql/forecast.type';

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
  forecasts: Forecast[];

  private staticMapSizes = [303, 360];

  constructor(private api: WciApiService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue && changes.data.currentValue !== changes.data.previousValue) {
      // tslint:disable-next-line: max-line-length
      this.staticMapSrc = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${this.data.coords.lng},${this.data.coords.lat},10.19,0/${this.staticMapSizes[0]}x${this.staticMapSizes[1]}@2x?access_token=${this.mapboxToken}`;

      this.getForecast();
    }
  }

  getForecast(): void {
    if (this.data.coords) {
      const sub$ = this.api
        .getForecast({ lat: this.data.coords.lat, lng: this.data.coords.lng })
        .subscribe((res: ForecastResult) => {
          if (!res.errors) {
            this.hasForecast = true;
            this.currentWeather = res.data.forecast.now;
            this.forecasts = res.data.forecast.forecast;
          }
          sub$.unsubscribe();
        });
    }
  }
}

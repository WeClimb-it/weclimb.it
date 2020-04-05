import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ForecastResult } from 'src/app/graphql/queries';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { CurrentWeather } from 'src/app/interfaces/graphql/currentweather.type';
import { Forecast } from 'src/app/interfaces/graphql/forecast.type';
import { WciApiService } from 'src/app/services/wciApi.service';
import { BaseCardItemComponent } from './base-item.component';

@Component({
  selector: 'wci-crag-card-item',
  templateUrl: 'crag-item.component.html',
  styleUrls: ['crag-item.component.scss'],
})
export class CragCardItemComponent extends BaseCardItemComponent implements OnChanges {
  hasForecast = false;
  forecastClass = 'clear-day';
  currentWeather: CurrentWeather;
  todayForecast: Forecast;
  tomorrowForecast: Forecast;
  forecasts: Forecast[];

  data: Crag;

  constructor(protected router: Router, protected api: WciApiService) {
    super(router, api);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.data && changes.data.currentValue && changes.data.currentValue !== changes.data.previousValue) {
      this.getForecast();
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
}

import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { BaseCardItemComponent } from './base-item.component';
import { CurrentWeather } from 'src/app/interfaces/graphql/currentweather.type';
import { Forecast } from 'src/app/interfaces/graphql/forecast.type';
import { Router } from '@angular/router';
import { WciApiService } from 'src/app/services/wciApi.service';
import { ForecastResult } from 'src/app/graphql/queries';

@Component({
  selector: 'wci-with-weather-card-item',
  template: ` <div></div> `,
})
export class BaseItemWithWeatherComponent extends BaseCardItemComponent implements OnChanges {
  hasForecast = false;
  forecastClass = 'clear-day';
  currentWeather: CurrentWeather;
  todayForecast: Forecast;
  tomorrowForecast: Forecast;
  forecasts: Forecast[];

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

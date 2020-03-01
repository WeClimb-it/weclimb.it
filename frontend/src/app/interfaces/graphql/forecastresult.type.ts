import { CurrentWeather } from './currentweather.type';
import { Forecast } from './forecast.type';

export interface ForecastResult {
  now?: CurrentWeather | null;
  forecast?: Forecast[] | null;
  message?: string | null;
}

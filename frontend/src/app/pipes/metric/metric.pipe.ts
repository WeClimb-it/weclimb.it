import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metric',
})
export class MetricPipe implements PipeTransform {
  transform(value: number, unit: string): number {
    // TODO: Add more conversions
    // TODO: Make units visible from the outside
    switch (unit) {
      default:
        return value;
      case 'coeff-to-percentage':
        return Math.ceil(value * 100);
      case 'miles-to-kilometers':
        return Math.ceil(value / 0.62137);
      case 'kilometers-to-miles':
        return Math.ceil(value * 0.62137);
      case 'meters_second-to-kilometers_hour':
        return Math.ceil(value * 3.6);
    }
  }
}

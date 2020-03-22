import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
})
export class CapitalizeFirstPipe implements PipeTransform {
  constructor() {}

  transform(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
}

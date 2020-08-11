import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';

@Pipe({
  name: 'capitalizeFirst',
})
export class CapitalizeFirstPipe implements PipeTransform {
  constructor() {}

  transform(str: string): string {
    return !str ? '' : capitalize(str);
  }
}

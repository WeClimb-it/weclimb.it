import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WciApiService } from 'src/app/services/wciApi.service';
import { Poi } from 'src/app/utils/Poi';
import { typeOfItem } from 'src/app/utils/ContentType';

@Component({
  selector: 'wci-base-card-item',
  template: '<div></div>',
})
export class BaseCardItemComponent {
  constructor(protected router: Router, protected api: WciApiService) {}

  /**
   *
   */
  goToDetailUrl(item: Poi) {
    // TODO: Implement a common way to derive sections from the types.
    let section;
    switch (typeOfItem(item)) {
      default:
      case 'Crag':
        section = 'crags';
        break;
      case 'Hike':
        section = 'hikes';
        break;
      case 'Shelter':
        section = 'shelters';
        break;
    }
    this.router.navigate([section, item.slug]);
  }
}

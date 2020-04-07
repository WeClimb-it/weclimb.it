import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poi } from 'src/app/utils/Poi';
import { typeOfItem } from 'src/app/utils/ContentType';
import { Coords } from 'src/app/interfaces/graphql/coords.type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'wci-detail-nearby',
  templateUrl: './detail-nearby.component.html',
  styleUrls: ['./detail-nearby.component.scss'],
})
export class DetailNearbyComponent {
  @Input() items: Poi[];
  @Input() distanceCoords: Coords;
  @Output() poiSelected: EventEmitter<Poi> = new EventEmitter<Poi>();

  constructor(private translateService: TranslateService) {}

  /**
   *
   */
  onEntitySelected(entity: Poi): void {
    this.poiSelected.emit(entity);
  }

  /**
   *
   */
  getNearbyCategoryTag(item: Poi): string {
    switch (typeOfItem(item)) {
      default:
      case 'Crag':
        return this.translateService.instant('CRAG')[0];
      case 'Hike':
        return this.translateService.instant('HIKE')[0];
      case 'Shelter':
        return this.translateService.instant('SHELTER')[0];
    }
  }

  /**
   *
   */
  getNearbyCategoryClass(item: Poi): string {
    switch (typeOfItem(item)) {
      default:
      case 'Crag':
        return 'crag';
      case 'Hike':
        return 'hike';
      case 'Shelter':
        return 'shelter';
    }
  }
}

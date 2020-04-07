import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poi } from 'src/app/utils/Poi';
import { typeOfItem } from 'src/app/utils/ContentType';
import { Coords } from 'src/app/interfaces/graphql/coords.type';

@Component({
  selector: 'wci-detail-nearby',
  templateUrl: './detail-nearby.component.html',
  styleUrls: ['./detail-nearby.component.scss'],
})
export class DetailNearbyComponent {
  @Input() items: Poi[];
  @Input() distanceCoords: Coords;
  @Output() poiSelected: EventEmitter<Poi> = new EventEmitter<Poi>();

  /**
   *
   */
  onEntitySelected(entity: Poi): void {
    this.poiSelected.emit(entity);
  }

  /**
   * TODO: i18n
   */
  getNearbyCategoryTag(item: Poi): string {
    switch (typeOfItem(item)) {
      default:
      case 'Crag':
        return 'C';
      case 'Hike':
        return 'H';
      case 'Shelter':
        return 'S';
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

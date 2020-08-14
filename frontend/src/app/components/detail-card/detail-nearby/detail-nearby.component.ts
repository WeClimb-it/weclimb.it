import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poi, getPoiCategoryTag, getPoiCategoryClass } from 'src/app/utils/Poi';
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
    return getPoiCategoryTag(this.translateService, item);
  }

  /**
   *
   */
  getNearbyCategoryClass(item: Poi): string {
    return getPoiCategoryClass(this.translateService, item);
  }
}

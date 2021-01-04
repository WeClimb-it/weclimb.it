import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Coords } from 'src/app/interfaces/graphql/coords.type';
import { getPoiCategoryClass, getPoiCategoryTag, Poi } from 'src/app/utils/Poi';

@Component({
  selector: 'wci-detail-nearby',
  templateUrl: './detail-nearby.component.html',
  styleUrls: ['./detail-nearby.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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

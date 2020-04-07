import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { GeoService } from 'src/app/services/geo.service';
import { WciApiService } from 'src/app/services/wciApi.service';
import { BaseItemWithDynamicMapComponent } from './withDynamicMap-item.component';

@Component({
  selector: 'wci-hike-card-item',
  templateUrl: 'hike-item.component.html',
  styleUrls: ['hike-item.component.scss'],
})
export class HikeCardItemComponent extends BaseItemWithDynamicMapComponent implements OnChanges {
  data: Hike;

  constructor(protected router: Router, protected api: WciApiService, protected geoApi: GeoService) {
    super(router, api, geoApi);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }
}

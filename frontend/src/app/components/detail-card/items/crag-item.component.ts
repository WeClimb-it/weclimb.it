import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { GeoService } from 'src/app/services/geo.service';
import { WciApiService } from 'src/app/services/wciApi.service';
import { BaseItemWithDynamicMapComponent } from './withDynamicMap-item.component';

@Component({
  selector: 'wci-crag-card-item',
  templateUrl: 'crag-item.component.html',
  styleUrls: ['crag-item.component.scss'],
})
export class CragCardItemComponent extends BaseItemWithDynamicMapComponent implements OnChanges {
  data: Crag;

  constructor(protected router: Router, protected api: WciApiService, protected geoApi: GeoService) {
    super(router, api, geoApi);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }
}

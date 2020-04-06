import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { WciApiService } from 'src/app/services/wciApi.service';
import { BaseItemWithWeatherComponent } from './withWeather-item.component';

@Component({
  selector: 'wci-crag-card-item',
  templateUrl: 'crag-item.component.html',
  styleUrls: ['crag-item.component.scss'],
})
export class CragCardItemComponent extends BaseItemWithWeatherComponent implements OnChanges {
  data: Crag;

  constructor(protected router: Router, protected api: WciApiService) {
    super(router, api);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }
}

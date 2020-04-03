import { Component, Input, OnInit } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { BaseCardItemComponent } from './base-item.component';

@Component({
  selector: 'wci-hike-card-item',
  templateUrl: 'hike-item.component.html',
  styleUrls: ['hike-item.component.scss'],
})
export class HikeCardItemComponent extends BaseCardItemComponent implements OnInit {
  @Input() data: Hike;
  @Input() currentLocation: GeoLocation;

  constructor() {
    super();
  }

  ngOnInit() {}
}

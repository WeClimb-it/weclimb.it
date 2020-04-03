import { Component, Input, OnInit } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
import { BaseCardItemComponent } from './base-item.component';

@Component({
  selector: 'wci-shelter-card-item',
  templateUrl: 'shelter-item.component.html',
  styleUrls: ['shelter-item.component.scss'],
})
export class ShelterCardItemComponent extends BaseCardItemComponent implements OnInit {
  @Input() data: Shelter;
  @Input() currentLocation: GeoLocation;

  constructor() {
    super();
  }

  ngOnInit() {}
}

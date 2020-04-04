import { Component, Input, OnInit } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { BaseCardItemComponent } from './base-item.component';

@Component({
  selector: 'wci-place-card-item',
  templateUrl: 'place-item.component.html',
  styleUrls: ['place-item.component.scss'],
})
export class PlaceCardItemComponent extends BaseCardItemComponent implements OnInit {
  @Input() data: Place;
  @Input() currentLocation: GeoLocation;

  ngOnInit() {}
}

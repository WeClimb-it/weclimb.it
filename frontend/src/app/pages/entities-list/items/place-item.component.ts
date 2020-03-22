import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { ContentType } from 'src/app/utils/ContentType';
import { BaseListItemComponent } from './base-item.component';

@Component({
  selector: 'wci-place-list-item',
  templateUrl: 'place-item.component.html',
  styleUrls: ['place-item.component.scss'],
})
export class PlaceListItemComponent extends BaseListItemComponent implements OnInit {
  @Input() data: Place;
  @Input() currentLocation: GeoLocation;

  protected itemSection = ContentType.PLACES;

  constructor(protected router: Router) {
    super(router);
  }

  ngOnInit() {}
}

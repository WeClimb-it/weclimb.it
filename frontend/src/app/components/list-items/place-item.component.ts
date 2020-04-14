import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { ContentType } from 'src/app/utils/ContentType';
import { BaseListItemComponent } from './base-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'wci-place-list-item',
  templateUrl: 'place-item.component.html',
  styleUrls: ['place-item.component.scss'],
})
export class PlaceListItemComponent extends BaseListItemComponent implements OnInit {
  @Input() data: Place;

  protected itemSection = ContentType.PLACES;

  constructor(protected router: Router, public dialog: MatDialog) {
    super(router, dialog);
  }

  ngOnInit() {}
}

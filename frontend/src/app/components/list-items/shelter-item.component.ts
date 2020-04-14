import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
import { ContentType } from 'src/app/utils/ContentType';
import { BaseListItemComponent } from './base-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'wci-shelter-list-item',
  templateUrl: 'shelter-item.component.html',
  styleUrls: ['shelter-item.component.scss'],
})
export class ShelterListItemComponent extends BaseListItemComponent implements OnInit {
  @Input() data: Shelter;

  protected itemSection = ContentType.SHELTERS;

  constructor(protected router: Router, public dialog: MatDialog) {
    super(router, dialog);
  }

  ngOnInit() {}
}

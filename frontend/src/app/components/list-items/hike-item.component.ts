import { Component, OnInit, Input } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { BaseListItemComponent } from './base-item.component';
import { Router } from '@angular/router';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { ContentType } from 'src/app/utils/ContentType';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'wci-hike-list-item',
  templateUrl: 'hike-item.component.html',
  styleUrls: ['hike-item.component.scss'],
})
export class HikeListItemComponent extends BaseListItemComponent implements OnInit {
  @Input() data: Hike;

  protected itemSection = ContentType.HIKES;

  constructor(protected router: Router, public dialog: MatDialog) {
    super(router, dialog);
  }

  ngOnInit() {}
}

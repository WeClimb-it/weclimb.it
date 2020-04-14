import { Component, OnInit, Input } from '@angular/core';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import moment from 'moment-timezone';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { BaseListItemComponent } from './base-item.component';
import { Router } from '@angular/router';
import { ContentType } from 'src/app/utils/ContentType';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'wci-crag-list-item',
  templateUrl: 'crag-item.component.html',
  styleUrls: ['crag-item.component.scss'],
})
export class CragListItemComponent extends BaseListItemComponent implements OnInit {
  @Input() data: Crag;

  ROUTES_COUNT_GOOD_THRESHOLD = 20;
  ROUTES_COUNT_AWESOME_THRESHOLD = 60;

  currentMonth = new Date().getMonth();
  currentMonthHuman = moment().format('MMMM');

  protected itemSection = ContentType.CRAGS;

  constructor(protected router: Router, public dialog: MatDialog) {
    super(router, dialog);
  }

  ngOnInit() {}
}

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { ContentType } from 'src/app/utils/ContentType';
import { BaseListItemComponent } from './base-item.component';

import _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'wci-competition-list-item',
  templateUrl: 'competition-item.component.html',
  styleUrls: ['competition-item.component.scss'],
})
export class CompetitionListItemComponent extends BaseListItemComponent implements OnInit, OnChanges {
  @Input() data: Competition;
  @Input() currentLocation: GeoLocation;
  @Input() showCategory: boolean;

  hasBeenDisputed = false;
  types = [];
  specialties = [];
  categories = [];
  startDate: Date;
  endDate: Date;

  protected itemSection = ContentType.COMPETITIONS;

  constructor(protected router: Router, public dialog: MatDialog) {
    super(router, dialog);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== changes.data.previousValue) {
      if (new Date(this.data.start_time) <= new Date()) {
        this.hasBeenDisputed = true;
        // TODO: Waiting the crawler to be fixed, we have to filter here some bad data
        this.types = _.get(this.data, 'info.types').filter((str: string) => str !== '');
        this.specialties = _.get(this.data, 'info.specialties').filter((str: string) => str !== '');
        this.categories = _.get(this.data, 'info.categories').filter((str: string) => str !== '');

        this.startDate = this.data.start_time ? new Date(this.data.start_time) : undefined;
        this.endDate = this.data.end_time ? new Date(this.data.end_time) : undefined;
      }
    }
  }
}

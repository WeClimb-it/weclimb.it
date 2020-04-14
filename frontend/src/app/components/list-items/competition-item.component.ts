import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { ContentType } from 'src/app/utils/ContentType';
import { getSanitizedCompetitionProperties } from 'src/app/utils/Misc';
import { BaseListItemComponent } from './base-item.component';

@Component({
  selector: 'wci-competition-list-item',
  templateUrl: 'competition-item.component.html',
  styleUrls: ['competition-item.component.scss'],
})
export class CompetitionListItemComponent extends BaseListItemComponent implements OnInit, OnChanges {
  @Input() data: Competition;

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
      const { disputed, types, specialties, categories, startDate, endDate } = getSanitizedCompetitionProperties(
        changes.data.currentValue,
      );
      this.hasBeenDisputed = disputed;
      this.types = types;
      this.specialties = specialties;
      this.categories = categories;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
}

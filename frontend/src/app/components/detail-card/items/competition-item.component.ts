import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { WciApiService } from 'src/app/services/wciApi.service';
import { getSanitizedCompetitionProperties } from 'src/app/utils/Misc';
import { BaseCardItemComponent } from './base-item.component';

@Component({
  selector: 'wci-competition-card-item',
  templateUrl: 'competition-item.component.html',
  styleUrls: ['competition-item.component.scss'],
})
export class CompetitionCardItemComponent extends BaseCardItemComponent implements OnChanges {
  data: Competition;

  hasBeenDisputed = false;
  types = [];
  specialties = [];
  categories = [];
  startDate: Date;
  endDate: Date;

  constructor(protected router: Router, protected api: WciApiService) {
    super(router, api);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

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

import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { WciApiService } from 'src/app/services/wciApi.service';
import { BaseCardItemComponent } from './base-item.component';
import _ from 'lodash';

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

    // TODO: This can be moved to a common util class (see the competition list item)
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

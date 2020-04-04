import { Component, Input, OnInit } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { BaseCardItemComponent } from './base-item.component';

@Component({
  selector: 'wci-competition-card-item',
  templateUrl: 'competition-item.component.html',
  styleUrls: ['competition-item.component.scss'],
})
export class CompetitionCardItemComponent extends BaseCardItemComponent implements OnInit {
  @Input() data: Competition;
  @Input() currentLocation: GeoLocation;

  ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { BaseListItemComponent } from './base-item.component';
import { Router } from '@angular/router';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { ContentType } from 'src/app/utils/ContentType';

@Component({
  selector: 'wci-hike-list-item',
  templateUrl: 'hike-item.component.html',
  styleUrls: ['hike-item.component.scss'],
})
export class HikeListItemComponent extends BaseListItemComponent implements OnInit {
  @Input() data: Hike;
  @Input() currentLocation: GeoLocation;

  protected itemSection = ContentType.HIKES;

  constructor(protected router: Router) {
    super(router);
  }

  ngOnInit() {}
}

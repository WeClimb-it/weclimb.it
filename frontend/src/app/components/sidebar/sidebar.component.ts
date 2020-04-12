import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
import { Router } from '@angular/router';

interface EntitiesPayload {
  crags: Pois;
  places: Pois;
  competitions: Pois;
  shelters: Pois;
  hikes: Pois;
}

type Pois = Crag[] | Place[] | Competition[] | Shelter[] | Hike[];
type Poi = Crag | Place | Competition | Shelter | Hike;

@Component({
  selector: 'wci-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() currentLocation: GeoLocation;
  @Input() pois: EntitiesPayload;
  @Input() loading: boolean;

  @Output() poiSelected: EventEmitter<Poi> = new EventEmitter<Poi>();
  @Output() sectionSelected: EventEmitter<string> = new EventEmitter<string>();

  /**
   *
   */
  onEntitySelected(entity: Poi): void {
    this.poiSelected.emit(entity);
  }

  /**
   *
   */
  goToSection(endpoint: string): void {
    this.sectionSelected.emit(endpoint);
  }
}

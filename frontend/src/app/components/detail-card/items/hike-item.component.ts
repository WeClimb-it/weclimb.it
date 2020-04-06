import { Component, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { WciApiService } from 'src/app/services/wciApi.service';
import { BaseItemWithWeatherComponent } from './withWeather-item.component';
import { GeoJSONFeature } from 'src/app/interfaces/geo/GeoJSONFeature.interface';
import { MapMouseEvent } from 'mapbox-gl';
import { GeoService } from 'src/app/services/geo.service';
import togeojson from '@mapbox/togeojson';

@Component({
  selector: 'wci-hike-card-item',
  templateUrl: 'hike-item.component.html',
  styleUrls: ['hike-item.component.scss'],
})
export class HikeCardItemComponent extends BaseItemWithWeatherComponent implements OnChanges {
  data: Hike;

  zoom = 15;
  minZoom = 9;
  maxZoom = 20;
  renderMap = false;
  isMapMoving = false;

  // TODO: Configure it
  mapStyle = 'mapbox://styles/weclimbit/ck76qiur612ur1imof17kauyo';
  centerCoords: number[];
  centerGeoJson: {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
  };

  gpxTrack;

  constructor(protected router: Router, protected api: WciApiService, protected geoApi: GeoService) {
    super(router, api);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.data && changes.data.currentValue && changes.data.currentValue !== changes.data.previousValue) {
      this.centerCoords = [changes.data.currentValue.coords.lng, changes.data.currentValue.coords.lat];
      this.updateCenterGeoJSON();

      if (changes.data.currentValue.tracks.length > 0) {
        this.loadGPX(changes.data.currentValue.tracks[0]);
      }

      // TODO: Due to the flexbox, the container doesn't have a fixed width hence, it does expand only when its
      // content is fully loaded. This causes the map to compute a bad width at the very first time.
      // This is a dirty work-around that should be tackled with a proper work-item.
      setTimeout(() => (this.renderMap = true), 2500);
    }
  }

  /**
   *
   */
  onMapMove($event: MapMouseEvent): void {
    this.isMapMoving = true;
  }
  /**
   *
   */
  onMapMoved($event: MapMouseEvent): void {
    this.isMapMoving = false;
  }

  /**
   *
   */
  downloadGpsTrack(url: string): void {
    this.geoApi.openGpxFileContent(url);
  }

  /**
   * TODO: Move it to a util class
   */
  private updateCenterGeoJSON(): void {
    this.centerGeoJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: this.centerCoords,
          },
        },
      ],
    };
  }

  /**
   *
   */
  private async loadGPX(url: string): Promise<void> {
    const gpx = await this.geoApi.getGpxFileContent(url);
    this.gpxTrack = togeojson.gpx(new DOMParser().parseFromString(gpx, 'text/xml'));
  }
}

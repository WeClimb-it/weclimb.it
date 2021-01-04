import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import togeojson from '@mapbox/togeojson';
import { MapMouseEvent } from 'mapbox-gl';
import { GeoJSONFeature } from 'src/app/interfaces/geo/GeoJSONFeature.interface';
import { WciApiService } from 'src/app/services/wciApi.service';
import { BaseItemWithWeatherComponent } from './withWeather-item.component';
import { GeoService } from 'src/app/services/geo.service';
import { environment } from 'src/environments/environment';
import { getGeoJsonFromCoords } from 'src/app/utils/Map';

@Component({
  selector: 'wci-with-dynamic-map-card-item',
  template: ` <div></div> `,
})
export class BaseItemWithDynamicMapComponent extends BaseItemWithWeatherComponent implements OnChanges {
  zoom = 15;
  minZoom = 9;
  maxZoom = 20;
  renderMap = false;
  isMapMoving = false;

  mapStyle = environment.mapbox.style;
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

      if (changes.data.currentValue.tracks && changes.data.currentValue.tracks.length > 0) {
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
  onMapBusy(state: boolean): void {
    this.isMapMoving = state;
  }

  /**
   *
   */
  downloadGpsTrack(url: string): void {
    this.geoApi.openGpxFileContent(url);
  }

  /**
   *
   */
  private updateCenterGeoJSON(): void {
    this.centerGeoJson = getGeoJsonFromCoords(this.centerCoords);
  }

  /**
   *
   */
  private async loadGPX(url: string): Promise<void> {
    const gpx = await this.geoApi.getGpxFileContent(url);
    this.gpxTrack = togeojson.gpx(new DOMParser().parseFromString(gpx, 'text/xml'));
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import _ from 'lodash';
import { MapComponent as MapBoxComponent } from 'ngx-mapbox-gl';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { MapUpdateEvent } from 'src/app/interfaces/events/map-update.interface';
import { GeoTrack } from 'src/app/interfaces/geotrack.interface';
import { Competition } from 'src/app/interfaces/graphql/competition.type';
import { Crag } from 'src/app/interfaces/graphql/crag.type';
import { Hike } from 'src/app/interfaces/graphql/hike.type';
import { Place } from 'src/app/interfaces/graphql/place.type';
import { Shelter } from 'src/app/interfaces/graphql/shelter.type';
import CragPin from './pins/crag';
import EventPin from './pins/event';
import HikePin from './pins/hike';
import PlacePin from './pins/place';
import ShelterPin from './pins/shelter';
import { PinUtils } from './pins/utils';
import { GeoJSONFeature } from '../../interfaces/geo/GeoJSONFeature.interface';
import { environment } from 'src/environments/environment';
import { getGeoJsonFromCoords } from 'src/app/utils/Map';

export enum POI_TYPE {
  CRAG = 'crag',
  SECTOR = 'sector',
  ROUTE = 'route',
  EVENT = 'event',
  SHELTER = 'shelter',
  PLACE = 'place',
  HIKE = 'hike',
  COMPETITION = 'competition',
}

interface InputEntities {
  crags: Entities;
  places: Entities;
  competitions: Entities;
  shelters: Entities;
  hikes: Entities;
}

type Entity = Crag | Place | Competition | Shelter | Hike;
type Entities = Crag[] | Place[] | Competition[] | Shelter[] | Hike[];

@Component({
  selector: 'wci-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  @ViewChild('map') map: MapBoxComponent;
  @Input() zoom: number;
  @Input() centerLocation: GeoLocation;
  @Input() userLocation: GeoLocation;
  @Input() pois: InputEntities;

  @Input() mapStyle = environment.mapbox.style;
  @Input() tracks: GeoTrack[];

  @Output() ready = new EventEmitter<MapUpdateEvent>();
  @Output() update = new EventEmitter<MapUpdateEvent>();

  MARKER_TYPE = {
    CRAG: 'crag-pin',
    PLACE: 'place-pin',
    EVENT: 'event-pin',
    SHELTER: 'shelter-pin',
    HIKE: 'hike-pin',
  };

  ENTITY_NAMESPACE = {
    CRAG: 'crags',
    PLACE: 'places',
    EVENT: 'competitions',
    SHELTER: 'shelters',
    HIKE: 'hikes',
  };

  pins: { [key: string]: ImageData };
  centerCoords: number[];
  userCoords: number[];
  geoJson: {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
  };
  centerGeoJson: {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
  };
  selectedFeature: any;

  // Default props
  minZoom = 4;
  maxZoom = 22;
  clusterMaxZoom = 17;
  clusterRadius = 50;
  clusterColor = 'rgba(64, 205, 126, 0.75)';
  clusterSizes = [
    [0, 20],
    [20, 40],
    [50, 60],
  ];

  // Flags
  isLoading = true;
  renderMap = false;

  private earthRadius = 3963.0;
  private radians = 57.2958;

  private mapInstance: mapboxgl.Map;
  private geojsonFeatures: GeoJSONFeature[];

  ngOnInit(): void {
    this.loadPins();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.centerLocation && this.centerLocation) {
      this.centerCoords = this.centerLocation.toCoordinates();
      this.updateCenterGeoJSON();
    }

    if (changes.userLocation && this.userLocation) {
      this.userCoords = this.userLocation.toCoordinates();
    }

    if (changes.pois && changes.pois.currentValue) {
      this.contructGeoJSONFromChange(changes.pois);
    }

    /*
    if (changes.tracks) {
      // Note: tracks are not supported at the moment in the main map
    }
    */
  }

  /**
   *
   */
  mapLoaded(): void {
    this.isLoading = false;
    this.mapInstance = this.map.mapInstance;
    this.emitMapUpdateStatus(true);
  }

  /**
   *
   */
  mapInteractionEnd(): void {
    this.emitMapUpdateStatus();
  }

  /**
   *
   */
  onMarkerClick($event: any): void {
    const features = this.mapInstance.queryRenderedFeatures($event.point, {
      layers: ['unclustered-pois', 'clustered-pois'],
    });
    if (features.length) {
      const clickedPoint = features[0];
      if (clickedPoint.properties.slug) {
        this.selectedFeature = clickedPoint;
      }
    }
  }

  /**
   *
   */
  closePopup(): void {
    this.selectedFeature = undefined;
  }

  /**
   *
   */
  private emitMapUpdateStatus(firstLoad = false): void {
    if (!this.mapInstance) {
      return;
    }

    const { lng, lat } = this.mapInstance.getCenter();

    (firstLoad ? this.ready : this.update).emit({
      coordinates: [lng, lat],
      zoom: this.mapInstance.getZoom(),
      radius: this.getRadiusDistance(),
    });
  }

  /**
   *
   */
  private getRadiusDistance(): number {
    const center = this.mapInstance.getCenter();
    const bounds = this.mapInstance.getBounds();

    // From decimal degrees into radians
    const lat1 = center.lat / this.radians;
    const lon1 = center.lng / this.radians;
    const lat2 = bounds.getNorthEast().lat / this.radians;
    const lon2 = bounds.getNorthEast().lng / this.radians;

    // From radians to miles
    return Math.ceil(
      this.earthRadius *
        Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)),
    );
  }

  /**
   *
   */
  private translateToFeatureCollection(entities: Entities, type: string, namespace: string): any {
    const output = new Array();
    _.each(entities, (e: Entity) => {
      const feature: GeoJSONFeature = {
        type: 'Feature',
        properties: { ...e, 'marker-symbol': type, internal_link: `/${namespace}/${e.slug}` },
        geometry: {
          type: 'Point',
          coordinates: [e.coords ? e.coords.lng : 0, e.coords ? e.coords.lat : 0],
        },
      };
      output.push(feature);
    });
    return output;
  }

  /**
   *
   */
  private contructGeoJSONFromChange(change: SimpleChange): void {
    this.geojsonFeatures = [
      ...this.translateToFeatureCollection(
        change.currentValue.crags,
        this.MARKER_TYPE.CRAG,
        this.ENTITY_NAMESPACE.CRAG,
      ),
      ...this.translateToFeatureCollection(
        change.currentValue.competitions,
        this.MARKER_TYPE.EVENT,
        this.ENTITY_NAMESPACE.EVENT,
      ),
      ...this.translateToFeatureCollection(
        change.currentValue.places,
        this.MARKER_TYPE.PLACE,
        this.ENTITY_NAMESPACE.PLACE,
      ),
      ...this.translateToFeatureCollection(
        change.currentValue.shelters,
        this.MARKER_TYPE.SHELTER,
        this.ENTITY_NAMESPACE.SHELTER,
      ),
      ...this.translateToFeatureCollection(
        change.currentValue.hikes,
        this.MARKER_TYPE.HIKE,
        this.ENTITY_NAMESPACE.HIKE,
      ),
    ];
    this.geoJson = {
      type: 'FeatureCollection',
      features: this.geojsonFeatures,
    };
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
  private async loadPins(): Promise<void> {
    this.pins = {
      crag: await PinUtils.toImageData(CragPin, 0.9),
      event: await PinUtils.toImageData(EventPin, 0.9),
      hike: await PinUtils.toImageData(HikePin, 0.75),
      place: await PinUtils.toImageData(PlacePin, 0.9),
      shelter: await PinUtils.toImageData(ShelterPin, 0.9),
    };
    this.renderMap = true;
  }
}

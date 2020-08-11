import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { getGeoJsonFromCoords } from 'src/app/utils/Map';
import { environment } from 'src/environments/environment';
import { GeoJSON, GeoJSONFeature } from '../../interfaces/geo/GeoJSONFeature.interface';
import CragPin from './pins/crag';
import EventPin from './pins/event';
import HikePin from './pins/hike';
import PlacePin from './pins/place';
import ShelterPin from './pins/shelter';
import DrinkingWaterPin from './pins/drinking-water';
import { PinUtils } from './pins/utils';

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

interface Pois {
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
  @Input() pois: Pois;
  @Input() osmPois: GeoJSON;

  @Input() mapStyle = environment.mapbox.style;
  @Input() tracks: GeoTrack[];

  @Input() loadingWciData: boolean;
  @Input() loadingOsmData: boolean;

  @Output() ready = new EventEmitter<MapUpdateEvent>();
  @Output() update = new EventEmitter<MapUpdateEvent>();

  MARKER_TYPE = {
    CRAG: 'crag-pin',
    PLACE: 'place-pin',
    EVENT: 'event-pin',
    SHELTER: 'shelter-pin',
    HIKE: 'hike-pin',
    DRINKING_WATER: 'drinking-water-pin',
  };

  ENTITY_NAMESPACE = {
    CRAG: 'crags',
    PLACE: 'places',
    EVENT: 'competitions',
    SHELTER: 'shelters',
    HIKE: 'hikes',
  };

  OSM_WCI_MARKER_TYPE_MAP = {
    'natural.peak': this.MARKER_TYPE.CRAG,
    'natural.valley': this.MARKER_TYPE.CRAG,
    'natural.cliff': this.MARKER_TYPE.CRAG,
    'route.hiking': this.MARKER_TYPE.HIKE,
    'highway.footway': this.MARKER_TYPE.HIKE,
    'amenity.drinking_water': this.MARKER_TYPE.DRINKING_WATER,
  };

  SOURCES = {
    WCI: 'wci',
    OSM: 'osm',
  };

  pins: { [key: string]: ImageData };
  centerCoords: number[];
  userCoords: number[];
  geoJson: GeoJSON;
  osmGeoJson: GeoJSON;
  centerGeoJson: GeoJSON;
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
      this.contructGeoJSONFromChange(changes.pois.currentValue);
    }

    if (changes.osmPois && changes.osmPois.currentValue) {
      this.hydrateOsmGeoJSON(changes.osmPois.currentValue);
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
      if (clickedPoint.layer.id === 'unclustered-pois') {
        this.selectedFeature = clickedPoint;
      } else {
        // TODO: Expand cluster
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
  get mapGeoJson(): GeoJSON {
    return {
      type: 'FeatureCollection',
      features: [...(this.geoJson ? this.geoJson.features : []), ...(this.osmGeoJson ? this.osmGeoJson.features : [])],
    };
  }

  /**
   *
   */
  get loadingData(): boolean {
    return this.loadingOsmData || this.loadingWciData;
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
        properties: { ...e, source: this.SOURCES.WCI, 'marker-symbol': type, internal_link: `/${namespace}/${e.slug}` },
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
  private contructGeoJSONFromChange(pois: Pois): void {
    this.geoJson = {
      type: 'FeatureCollection',
      features: [
        ...this.translateToFeatureCollection(pois.crags, this.MARKER_TYPE.CRAG, this.ENTITY_NAMESPACE.CRAG),
        ...this.translateToFeatureCollection(pois.competitions, this.MARKER_TYPE.EVENT, this.ENTITY_NAMESPACE.EVENT),
        ...this.translateToFeatureCollection(pois.places, this.MARKER_TYPE.PLACE, this.ENTITY_NAMESPACE.PLACE),
        ...this.translateToFeatureCollection(pois.shelters, this.MARKER_TYPE.SHELTER, this.ENTITY_NAMESPACE.SHELTER),
        ...this.translateToFeatureCollection(pois.hikes, this.MARKER_TYPE.HIKE, this.ENTITY_NAMESPACE.HIKE),
      ],
    };
  }

  /**
   *
   */
  private hydrateOsmGeoJSON(pois: { features: GeoJSONFeature[] }): void {
    const injectMarker = (poi: GeoJSONFeature): void => {
      _.each(this.OSM_WCI_MARKER_TYPE_MAP, (mapValue: string, mapKey: string) => {
        const kPieces = mapKey.split('.');
        const key = kPieces[0];
        const value = kPieces[1];
        if (poi.properties[key] === value) {
          poi.properties = {
            ...poi.properties,
            'marker-symbol': mapValue,
            source: this.SOURCES.OSM,
            internal_link: `/pois/${(poi.properties.id as string).split('/')[1]}`,
          };
          return false;
        }
      });
    };

    _.each(pois.features, injectMarker);

    this.osmGeoJson = {
      type: 'FeatureCollection',
      features: pois.features,
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
      crag: await PinUtils.toImageData(CragPin),
      event: await PinUtils.toImageData(EventPin),
      hike: await PinUtils.toImageData(HikePin),
      place: await PinUtils.toImageData(PlacePin),
      shelter: await PinUtils.toImageData(ShelterPin),
      'drinking-water': await PinUtils.toImageData(DrinkingWaterPin),
    };
    this.renderMap = true;
  }
}

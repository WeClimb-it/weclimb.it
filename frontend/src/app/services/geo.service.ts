import { Injectable } from '@angular/core';
import { GeoLocation } from '../classes/geolocation.class';

import { getDistance } from 'geolib';
import moment, { Duration } from 'moment';

const WINDOW: any = window || {};

export interface PlaceSuggestion {
  description: string;
  id: string;
  place_id: string;
  geo?: GeoLocation;
}

export enum JourneyMode {
  WALK = 'walk',
  CAR = 'car',
}

@Injectable({ providedIn: 'root' })
export class GeoService {
  // in km/h
  private avgHumanSpeed = 3.6;
  private avgCarSpeed = 85;

  /**
   *
   */
  getPlaces(query: string, minChars: number, maxResults: number): Promise<PlaceSuggestion[]> {
    return new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
      if (query.length <= minChars) {
        resolve([]);
        return;
      }

      const autocomplete = this.getAutoCompleteServiceInstance();
      autocomplete.getPlacePredictions(
        // For further configurations see:
        // https://developers.google.com/maps/documentation/javascript/reference/#AutocompletionRequest
        { input: query },
        (predictions: PlaceSuggestion[], serviceStatus: any) => {
          if (serviceStatus !== this.getPlacesServiceStatus()) {
            resolve([]);
          } else {
            resolve(predictions.slice(0, maxResults));
          }
        },
      );
    });
  }

  /**
   *
   */
  geocodeByPlaceId(placeId: string): Promise<any> {
    const geocoder = this.getGeocoderInstance();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ placeId }, (results: any, status: any) => {
        if (status !== this.getGeocoderStatus()) {
          reject(
            new Error(`Geocoding query for a place with an ID of '${placeId}' failed - response status: ${status}`),
          );
          return;
        }

        resolve(results);
      });
    });
  }

  /**
   *
   */
  getDistanceFromCoords(source: GeoLocation, destination: GeoLocation): string {
    // Meters in float
    const distance =
      getDistance(
        { latitude: source.lat, longitude: source.lng },
        { latitude: destination.lat, longitude: destination.lng },
      ) / 1000;

    return distance.toFixed(2);
  }

  /**
   *
   */
  getDistanceInTime(
    metricValue: number,
    mode: JourneyMode,
  ): {
    value: string;
    unit: 'hrs' | 'days';
  } {
    let avgSpeed = 0;
    switch (mode) {
      default:
      case JourneyMode.WALK:
        avgSpeed = this.avgHumanSpeed;
        break;
      case JourneyMode.CAR:
        avgSpeed = this.avgCarSpeed;
        break;
    }

    const hours = metricValue / avgSpeed;
    const duration: Duration = moment.duration(hours, 'hours');
    const asHours = duration.asHours();
    const asDays = Math.ceil(duration.asDays());

    const output = asHours >= 24 ? asDays.toString() : moment.utc(duration.asMilliseconds()).format('HH:mm');

    // TODO: i18n
    return {
      value: output,
      unit: asHours >= 24 ? 'days' : 'hrs',
    };
  }

  private getGeocoderInstance(): any {
    return WINDOW && WINDOW.google && WINDOW.google.maps ? new WINDOW.google.maps.Geocoder() : {};
  }

  private getAutoCompleteServiceInstance(): any {
    return WINDOW && WINDOW.google && WINDOW.google.maps ? new WINDOW.google.maps.places.AutocompleteService() : {};
  }

  private getGeocoderStatus(): any {
    return WINDOW && WINDOW.google && WINDOW.google.maps ? WINDOW.google.maps.GeocoderStatus.OK : '';
  }

  private getPlacesServiceStatus(): any {
    return WINDOW && WINDOW.google && WINDOW.google.maps ? WINDOW.google.maps.places.PlacesServiceStatus.OK : '';
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { GeoService, JourneyMode } from 'src/app/services/geo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Coords } from 'src/app/interfaces/graphql/coords.type';
import _ from 'lodash';

@Pipe({
  name: 'distance',
})
export class DistancePipe implements PipeTransform {
  constructor(private geo: GeoService, private sanitizer: DomSanitizer) {}

  transform(
    source: GeoLocation | Coords,
    destination: GeoLocation | Coords,
    byWalk: boolean = false,
    byCar: boolean = false,
    showLabel: boolean = true,
  ): unknown {
    if (
      _.isEmpty(source) ||
      _.isEmpty(destination) ||
      source.lat === null ||
      source.lng === null ||
      destination.lat === null ||
      destination.lng === null
    ) {
      return 'n.a.';
    }

    if (!(source instanceof GeoLocation)) {
      // TODO: Put a nice condition here
      source = new GeoLocation((source as Coords).lat, (source as Coords).lng);
    }
    if (!(destination instanceof GeoLocation)) {
      destination = new GeoLocation((destination as Coords).lat, (destination as Coords).lng);
    }

    const metricDistance = this.geo.getDistanceFromCoords(source as GeoLocation, destination as GeoLocation);
    let unit = 'kms';
    let distance = '';

    if (byWalk) {
      distance = this.geo.getDistanceInTime(+metricDistance, JourneyMode.WALK);
      unit = 'hrs';
    } else if (byCar) {
      distance = this.geo.getDistanceInTime(+metricDistance, JourneyMode.CAR);
      unit = 'hrs';
    } else {
      distance = metricDistance;
    }

    // TODO: i18n
    return source.toString() !== destination.toString()
      ? showLabel
        ? this.sanitizer.bypassSecurityTrustHtml(`<strong>${distance}</strong> ${unit} from you`)
        : distance
      : showLabel
      ? 'You are here'
      : 0;
  }
}

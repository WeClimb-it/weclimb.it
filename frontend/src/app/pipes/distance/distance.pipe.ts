import { Pipe, PipeTransform } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { GeoService, JourneyMode } from 'src/app/services/geo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Coords } from 'src/app/interfaces/graphql/coords.type';
import { isEmpty } from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'distance',
})
export class DistancePipe implements PipeTransform {
  constructor(private geo: GeoService, private sanitizer: DomSanitizer, private translateService: TranslateService) {}

  transform(
    source: GeoLocation | Coords,
    destination: GeoLocation | Coords,
    byWalk: boolean = false,
    byCar: boolean = false,
    showLabel: boolean = true,
    fromUser: boolean = true,
  ): unknown {
    if (
      isEmpty(source) ||
      isEmpty(destination) ||
      source.lat === null ||
      source.lng === null ||
      destination.lat === null ||
      destination.lng === null
    ) {
      return 'n.a.';
    }

    let destinationStr = '';

    if (!(source instanceof GeoLocation)) {
      if (!source.hasOwnProperty('lat') || !source.hasOwnProperty('lng')) {
        throw new Error('Invalid geo object was given.');
      }
      source = new GeoLocation((source as Coords).lat, (source as Coords).lng);
    }

    if (!(destination instanceof GeoLocation)) {
      if (!destination.hasOwnProperty('lat') || !destination.hasOwnProperty('lng')) {
        throw new Error('Invalid geo object was given.');
      }
      destination = new GeoLocation((destination as Coords).lat, (destination as Coords).lng);
    }

    destinationStr = destination.toString();

    const metricDistance = this.geo.getDistanceFromCoords(source as GeoLocation, destination as GeoLocation);
    let distance = '';
    let unit = 'kms';

    if (byWalk) {
      const oDistance = this.geo.getDistanceInTime(metricDistance, JourneyMode.WALK);
      distance = oDistance.value;
      unit = oDistance.unit;
    } else if (byCar) {
      const oDistance = this.geo.getDistanceInTime(metricDistance, JourneyMode.CAR);
      distance = oDistance.value;
      unit = oDistance.unit;
    } else {
      distance = metricDistance > 500 ? Math.floor(metricDistance).toString() : metricDistance.toString();
    }

    return source.toString() !== destinationStr
      ? showLabel
        ? this.sanitizer.bypassSecurityTrustHtml(
            `<strong>${distance} ${unit}</strong> ${
              fromUser
                ? this.translateService.instant('FROM_YOU')
                : this.translateService.instant('FROM_POINT', {
                    point: (destination as GeoLocation).cityName || destinationStr,
                  })
            }`,
          )
        : `<strong>${distance} ${unit}</strong>`
      : showLabel
      ? `<strong>${this.translateService.instant('YOU_ARE_HERE')}</strong>`
      : `<strong>0 ${unit}</strong>`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { GeoService } from 'src/app/services/geo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Coords } from 'src/app/interfaces/graphql/coords.type';

@Pipe({
  name: 'distance',
})
export class DistancePipe implements PipeTransform {
  constructor(private geo: GeoService, private sanitizer: DomSanitizer) {}

  transform(source: GeoLocation | Coords, destination: GeoLocation | Coords): unknown {
    // TODO: Put a nice condition here
    if (!(source instanceof GeoLocation)) {
      source = new GeoLocation((source as Coords).lat, (source as Coords).lng);
    }
    if (!(destination instanceof GeoLocation)) {
      destination = new GeoLocation((destination as Coords).lat, (destination as Coords).lng);
    }

    const dist = this.geo.getDistanceFromCoords(source as GeoLocation, destination as GeoLocation);

    // TODO: i18n
    return source.toString() !== destination.toString()
      ? this.sanitizer.bypassSecurityTrustHtml(`<strong>${dist}</strong> kms from you`)
      : 'You are here';
  }
}

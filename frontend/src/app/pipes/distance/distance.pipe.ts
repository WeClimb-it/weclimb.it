import { Pipe, PipeTransform } from '@angular/core';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { GeoService } from 'src/app/services/geo.service';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'distance',
})
export class DistancePipe implements PipeTransform {
  constructor(private geo: GeoService, private sanitizer: DomSanitizer) {}

  transform(source: GeoLocation, destination: GeoLocation): unknown {
    // TODO: Put a nice condition here
    if (!(source instanceof GeoLocation)) {
      source = new GeoLocation((source as any).lat, (source as any).lng);
    }
    if (!(destination instanceof GeoLocation)) {
      destination = new GeoLocation((destination as any).lat, (destination as any).lng);
    }

    const dist = this.geo.getDistanceFromCoords(source, destination);

    // TODO: i18n
    return source.toString() !== destination.toString()
      ? this.sanitizer.bypassSecurityTrustHtml(`<strong>${dist}</strong> kms from you`)
      : 'You are here';
  }
}

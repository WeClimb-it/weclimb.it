import { capitalize } from 'lodash';

export class GeoLocation {
  constructor(
    public lat: number,
    public lng: number,
    public country?: string,
    public city?: string,
    public address?: string,
    public code?: string,
  ) {}

  /**
   * Returns an array of coordinates [<longitude>, <latitude>]
   */
  toCoordinates(): number[] {
    return [this.lng || 0, this.lat || 0];
  }

  /**
   * Returns a string of coordinates
   */
  toString(): string {
    return capitalize(this.city) || `${this.lat.toFixed(3) || 0}, ${this.lng.toFixed(3) || 0}`;
  }

  /**
   * Returns an object of coordinats
   */
  toCoordinatesObject(): { lat: number; lng: number } {
    return {
      lat: this.lat || 0,
      lng: this.lng || 0,
    };
  }
}

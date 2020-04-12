export interface GeoJSONFeature {
  type: string;
  properties?: object;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface GeoJSON {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface GeoJSONFeature {
  type: string;
  properties?: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

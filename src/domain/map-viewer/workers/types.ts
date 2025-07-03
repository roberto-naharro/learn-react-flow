import type { BaseWorkerMessage } from '@shared/workers/types';

import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

// GeoJSON worker messages
export interface FetchGeoJsonMessage extends BaseWorkerMessage {
  type: 'FETCH_GEOJSON';
  url: string;
}

export interface GeoJsonWorkerResponse {
  type: 'GEOJSON_SUCCESS' | 'GEOJSON_ERROR';
  url: string;
  data?: FeatureCollection<Geometry, GeoJsonProperties>;
  error?: string;
}

// Intersection worker messages
export interface ComputeIntersectionMessage extends BaseWorkerMessage {
  type: 'COMPUTE_INTERSECTION';
  geojsonA: FeatureCollection<Geometry, GeoJsonProperties>;
  geojsonB: FeatureCollection<Geometry, GeoJsonProperties>;
  nodeId: string;
}

export interface IntersectionWorkerResponse {
  type: 'INTERSECTION_SUCCESS' | 'INTERSECTION_ERROR';
  nodeId: string;
  data?: FeatureCollection<Geometry, GeoJsonProperties>;
  error?: string;
}

// Union types for map worker messages and responses
export type MapWorkerMessage = FetchGeoJsonMessage | ComputeIntersectionMessage;
export type MapWorkerResponse = GeoJsonWorkerResponse | IntersectionWorkerResponse;

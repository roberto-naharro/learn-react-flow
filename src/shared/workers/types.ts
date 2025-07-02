import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

// Base worker message interface
export interface BaseWorkerMessage {
  type: string;
  id?: string;
}

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

// Union types for all worker messages and responses
export type WorkerMessage = FetchGeoJsonMessage | ComputeIntersectionMessage;
export type WorkerResponse = GeoJsonWorkerResponse | IntersectionWorkerResponse;

// Worker manager types
export interface WorkerManager<TMessage = WorkerMessage, TResponse = WorkerResponse> {
  postMessage: (message: TMessage) => void;
  addEventListener: (type: 'message', listener: (event: MessageEvent<TResponse>) => void) => void;
  removeEventListener: (
    type: 'message',
    listener: (event: MessageEvent<TResponse>) => void,
  ) => void;
  terminate: () => void;
  isAvailable: boolean;
}

// Worker factory function type
export type WorkerFactory = () => Worker | null;

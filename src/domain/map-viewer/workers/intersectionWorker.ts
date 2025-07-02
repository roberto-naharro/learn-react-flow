import * as turf from '@turf/turf';

import type {
  ComputeIntersectionMessage,
  IntersectionWorkerResponse,
} from '../../../shared/workers/types';
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  MultiPolygon,
  Polygon,
} from 'geojson';

// Type for valid intersection features
type ValidFeatureToIntersect = Feature<Polygon | MultiPolygon, GeoJsonProperties>;

const isValidGeometryType = (
  feature: Feature<Geometry, GeoJsonProperties>,
): feature is ValidFeatureToIntersect => {
  return (
    feature.geometry &&
    (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon')
  );
};

const validateGeoJsonForIntersection = (
  geojson: FeatureCollection<Geometry, GeoJsonProperties>,
): boolean => {
  if (!geojson || geojson.type !== 'FeatureCollection' || !Array.isArray(geojson.features)) {
    return false;
  }

  if (geojson.features.length === 0) {
    return false;
  }

  return geojson.features.some(
    (feature) =>
      feature?.geometry &&
      (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon'),
  );
};

async function computeIntersectionFeatures(
  sourceA: FeatureCollection<Geometry, GeoJsonProperties>,
  sourceB: FeatureCollection<Geometry, GeoJsonProperties>,
): Promise<Feature<Geometry, GeoJsonProperties>[]> {
  const intersectionFeatures: Feature<Geometry, GeoJsonProperties>[] = [];

  // Compute intersection for each feature combination
  for (const featureA of sourceA.features) {
    if (!isValidGeometryType(featureA)) {
      continue;
    }

    for (const featureB of sourceB.features) {
      if (!isValidGeometryType(featureB)) {
        continue;
      }

      try {
        // Use turf.featureCollection for proper type handling
        const combinedFeatures = turf.featureCollection([featureA, featureB]);
        const intersection = turf.intersect(combinedFeatures);

        if (intersection) {
          // Merge properties from both source features
          const mergedProperties = {
            ...featureA.properties,
            ...featureB.properties,
            intersection_computed_at: new Date().toISOString(),
          };

          intersectionFeatures.push({
            ...intersection,
            properties: mergedProperties,
          });
        }
      } catch (intersectionError) {
        console.warn('Error computing intersection for feature pair:', intersectionError);
        // Continue processing other features
      }
    }
  }

  return intersectionFeatures;
}

// Listen for messages from the main thread
self.addEventListener('message', async (event: MessageEvent<ComputeIntersectionMessage>) => {
  const { type, geojsonA, geojsonB, nodeId } = event.data;

  if (type === 'COMPUTE_INTERSECTION') {
    try {
      // Validate GeoJSON data
      if (!validateGeoJsonForIntersection(geojsonA)) {
        throw new Error('Invalid GeoJSON data for first input');
      }

      if (!validateGeoJsonForIntersection(geojsonB)) {
        throw new Error('Invalid GeoJSON data for second input');
      }

      // Compute intersections
      const intersectionFeatures = await computeIntersectionFeatures(geojsonA, geojsonB);

      const resultCollection: FeatureCollection<Geometry, GeoJsonProperties> = {
        type: 'FeatureCollection',
        features: intersectionFeatures,
      };

      // Send the successful result back to the main thread
      const workerResponse: IntersectionWorkerResponse = {
        type: 'INTERSECTION_SUCCESS',
        nodeId,
        data: resultCollection,
      };
      self.postMessage(workerResponse);
    } catch (error) {
      // Send the error back to the main thread
      const errorMessage = error instanceof Error ? error.message : String(error);
      const workerResponse: IntersectionWorkerResponse = {
        type: 'INTERSECTION_ERROR',
        nodeId,
        error: errorMessage,
      };
      self.postMessage(workerResponse);
    }
  }
});

// Add this to satisfy TypeScript when using with worker-loader
export default {} as typeof Worker & (new () => Worker);

import { geometryComponent } from './Geometry.js';
import { TorusKnotGeometry } from 'three';

export const props = {
  radius: { type: Number, default: 1 },
  tube: { type: Number, default: 0.4 },
  tubularSegments: { type: Number, default: 64 },
  radialSegments: { type: Number, default: 8 },
  p: { type: Number, default: 2 },
  q: { type: Number, default: 3 },
};

export function createGeometry(comp) {
  return new TorusKnotGeometry(comp.radius, comp.tube, comp.tubularSegments, comp.radialSegments, comp.p, comp.q);
};

export default geometryComponent('TorusKnotGeometry', props, createGeometry);

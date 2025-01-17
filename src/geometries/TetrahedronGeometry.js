import { geometryComponent } from './Geometry.js';
import { TetrahedronGeometry } from 'three';

export const props = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 },
};

export function createGeometry(comp) {
  return new TetrahedronGeometry(comp.radius, comp.detail);
};

export default geometryComponent('TetrahedronGeometry', props, createGeometry);

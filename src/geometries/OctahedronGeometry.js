import { geometryComponent } from './Geometry.js';
import { OctahedronGeometry } from 'three';

export const props = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 },
};

export function createGeometry(comp) {
  return new OctahedronGeometry(comp.radius, comp.detail);
};

export default geometryComponent('OctahedronGeometry', props, createGeometry);

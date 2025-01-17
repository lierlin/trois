import { geometryComponent } from './Geometry.js';
import { DodecahedronGeometry } from 'three';

export const props = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 },
};

export function createGeometry(comp) {
  return new DodecahedronGeometry(comp.radius, comp.detail);
};

export default geometryComponent('DodecahedronGeometry', props, createGeometry);

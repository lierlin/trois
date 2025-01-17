import { geometryComponent } from './Geometry.js';
import { IcosahedronGeometry } from 'three';

export const props = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 },
};

export function createGeometry(comp) {
  return new IcosahedronGeometry(comp.radius, comp.detail);
};

export default geometryComponent('IcosahedronGeometry', props, createGeometry);

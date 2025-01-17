import { geometryComponent } from './Geometry.js';
import { CircleGeometry } from 'three';

export const props = {
  radius: { type: Number, default: 1 },
  segments: { type: Number, default: 8 },
  thetaStart: { type: Number, default: 0 },
  thetaLength: { type: Number, default: Math.PI * 2 },
};

export function createGeometry(comp) {
  return new CircleGeometry(comp.radius, comp.segments, comp.thetaStart, comp.thetaLength);
};

export default geometryComponent('CircleGeometry', props, createGeometry);

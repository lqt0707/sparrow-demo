import { closeTo } from '../geometry/utils';

export function degree(radian) {
  return (radian * 180) / Math.PI;
}

export function unique(points, x = (d) => d[0], y = (d) => d[1]) {
  const overlap = (a, b) => closeTo(x(a), x(b)) && closeTo(y(a), y(b));
  return points.filter((d, index) => points.findIndex((p) => overlap(d, p)) === index);
}

export function lastOf(array) {
  return array[array.length - 1];
}
export function firstOf(array) {
  return array[0];
}

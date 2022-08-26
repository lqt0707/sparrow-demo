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

export function dist([x0, y0], [x1 = 0, y1 = 0] = []) {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

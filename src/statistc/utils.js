import { identity } from '../coordinate/utils';

export function min(array, accessor) {
  return Math.min(...array.map(accessor));
}
export function max(array, accessor) {
  return Math.max(...array.map(accessor));
}
export function bisect(array, x, lo = 0, hi = array.length, accessor = identity) {
  let i = lo;
  let j = hi;
  while (i < j) {
    const mid = (i + j) >>> 1;
    if (accessor(array[mid]) < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
}

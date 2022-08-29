import { identity } from '../coordinate/utils';

export function assignDefined(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) target[key] = value;
  }
}

export function indexOf(array) {
  return array.map((_, i) => i);
}

export function map(object, transform = identity) {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = transform(value, key);
    return obj;
  }, {});
}

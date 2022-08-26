import { scale, translate } from './transforms';
import { curry } from './utils';

function coordinate(transformOptions, canvasOptions) {
  const {
    x, y, width, height,
  } = canvasOptions;
  return [scale(width, height), translate(x, y)];
}

export const cartesian = curry(coordinate);

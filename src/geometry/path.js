import { createChannel } from './channel';
import { path as shapePath } from './shape';
import { channelStyles } from './style';
import { createGeometry } from './geometry';

const channels = {
  d: createChannel({ name: 'd', optional: false, scale: 'identity' }),
  fill: createChannel({ name: 'fill' }),
  stroke: createChannel({ name: 'stroke' }),
};

function render(renderer, I, scales, values, directStyles, coordinate) {
  const defaults = {};
  const { d: D } = values;
  return Array.from(I, (i) => shapePath(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...channels,
    ...channelStyles(i, values),
    d: D[i],
  }));
}

export const path = createGeometry(channels, render);

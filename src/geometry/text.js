import { createChannel, createChannels } from './channel';
import { text as shapeText } from './shape';
import { channelStyles } from './style';
import { createGeometry } from './geometry';

const channels = createChannels({
  rotate: createChannel({ name: 'rotate' }),
  fontSize: createChannel({ name: 'fontSize' }),
  text: createChannel({ name: 'text', optional: false, scale: 'identity' }),
  fontWeight: createChannel({ name: 'fontWeight' }),
});

function render(renderer, I, scales, values, directStyles, coordinate) {
  const defaults = {
    rotate: 0,
    fontSize: 14,
    fontWeight: 'normal',
  };

  const {
    x: X, y: Y, text: T, rotate: R = [], fontSize: FS = [], fontWeight: FW = [],
  } = values;

  return Array.from(I, (i) => shapeText(renderer, coordinate, {
    ...directStyles,
    ...channelStyles(i, values),
    x: X[i],
    y: Y[i],
    rotate: R[i] || defaults.rotate,
    fontSize: FS[i] || defaults.fontsize,
    text: T[i],
    fontWeight: FW[I] || defaults.fontWeight,
  }));
}

export const text = createGeometry(channels, render);

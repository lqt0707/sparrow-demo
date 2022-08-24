import {
  gridCircular, gridHorizontal, gridRay, gridVertical, labelLeftUp, labelTopRight,
} from './label';
import { ticksCircular, ticksLeft, ticksTop } from './ticks';
import { createAxis } from './axis';

const components = {
  '00': {
    start: (d, scale, offset) => [0, scale(d) + offset],
    end: (coordinate) => coordinate([1, 0]),
    grid: gridHorizontal,
    ticks: ticksLeft,
    label: labelLeftUp,
  },
  '01': {
    start: (d, scale, offset) => [0, scale(d) + offset],
    end: (coordinate) => coordinate([1, 0]),
    grid: gridVertical,
    ticks: ticksTop,
    label: labelTopRight,
  },
  10: {
    start: (d, scale, offset) => [0, scale(d) + offset],
    grid: gridCircular,
    ticks: ticksLeft,
    end: (coordinate) => coordinate.center(),
  },
  11: {
    start: (d, scale, offset) => [0, scale(d) + offset],
    grid: gridRay,
    ticks: ticksCircular,
    end: (coordinate) => coordinate.center(),
  },
};

export const axisY = createAxis(components);

import { createLinear } from '../../src/scale';
import { firstOf, renderAxis } from './utils';
import { cartesian } from '../../src/coordinate';
import { axisX } from '../../src/guide/axisX';

describe('axisX', () => {
  const domain = [0, 10];
  const scale = createLinear({
    domain,
    range: [0, 1],
  });

  test('cartesian', () => {
    const svg = renderAxis({ scale,
      domain,
      transforms: [cartesian()],
      axis: axisX,
      label: 'val',
      grid: true,
    });

    firstOf(svg, 'tick').toEqual({
      x1: '30',
      x2: '30',
      y1: '370',
      y2: '375',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'middle',
      x: '30',
      y: '375',
      dy: '1em',
      textContent: '0',
    });

    firstOf(svg, 'label').toEqual({
      textContent: 'val →',
      x: '570',
      y: '375',
    });
  });
});

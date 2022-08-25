const { legendSwatches } = require('../../src/guide/legendSwatches');
const {
  mount,
  createDiv
} = require('../utils');
const { createRenderer } = require('../../src/renderer/renderer');
const {
  createOrdinal,
  createLinear
} = require('../../src/scale');
const { interpolateColor } = require('../../src/scale/interpolate');
const { legendRamp } = require('../../src/guide/legendRamp');
describe('legend', () => {
  test('legendSwatches', () => {
    const domain = ['a', 'b', 'c'];
    const scale = createOrdinal({
      domain,
      range: ['#5B8FF9', '#5AD8A6', '#5D7092'],
    });
    const renderer = createRenderer(600, 400);
    mount(createDiv(), renderer.node());

    legendSwatches(renderer, scale, {}, {
      x: 0,
      y: 10,
      domain,
      label: 'name',
    });

    const svg = renderer.node();
    const [, , rect] = svg.getElementsByTagName('rect');
    expect(rect.getAttribute('x'))
      .toBe('96');
    expect(rect.getAttribute('y'))
      .toBe('20');
    expect(rect.getAttribute('fill'))
      .toBe('#5D7092');
    expect(rect.getAttribute('stroke'))
      .toBe('#5D7092');
  });

  test('legendRamp', () => {
    const domain = [0, 100];
    const scale = createLinear({
      domain,
      range: ['#5B8FF9', '#5AD8A6'],
      interpolate: interpolateColor,
    });

    const renderer = createRenderer(600, 400);
    mount(createDiv(), renderer.node());

    legendRamp(renderer, scale, {}, {
      x: 10,
      y: 10,
      domain,
      label: 'size →',
    });

    const svg = renderer.node();
    const labels = svg.getElementsByTagName('text');
    const lastLabel = labels[labels.length - 1];
    expect(labels.length)
      .toBe(7);
    expect(lastLabel.textContent)
      .toBe('100');

    const [line] = svg.getElementsByTagName('line');
    expect(line.getAttribute('x1'))
      .toBe('0');
    expect(line.getAttribute('y1'))
      .toBe('20');
    expect(line.getAttribute('x2'))
      .toBe('0');
    expect(line.getAttribute('y2'))
      .toBe('30');
    expect(line.getAttribute('stroke'))
      .toBe('#5b8ff9');
  });
});

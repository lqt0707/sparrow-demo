import { createRenderer } from '../renderer/renderer';
import { bfs } from '../view/utils';
import { createViews } from '../view/view';
import { identity } from '../coordinate/utils';
import { assignDefined } from './utils';

export function plot(root) {
  // 创建渲染引擎
  const { width = 640, height = 480, renderer: plugin } = root;
  const renderer = createRenderer(width, height, plugin);

  // 将配置从容器节点流向视图节点
  flow(root);

  // 将视图树转换成视图数组
  const views = createViews(root);
  for (const [view, nodes] of views) {
    const { transform = identity, ...dimensions } = view;
    const geometries = [];
    const scales = {};
    const guides = {};
    let coordinates = [];
    const chartNodes = nodes.filter(({ type }) => isChartNode(type));
    // 合并同一区域的所有视图的配置
    for (const options of chartNodes) {
      const {
        scales: s = {},
        guides: g = {},
        coordinates: c = [],
        transforms = [],
        paddingLeft, paddingRight, paddingBottom, paddingTop,
        ...geometry
      } = options;
      assignDefined(scales, s); /// 合并scales配置
      assignDefined(guides, g); /// 合并guides配置
      assignDefined(dimensions, {
        paddingLeft, paddingRight, paddingBottom, paddingTop,
      }); /// 合并padding配置
      if (c) coordinates = c; // 使用最后一个视图的坐标系
      // 收集该区域的所有几何图形
      geometries.push({ ...geometry, transforms: [transform, ...transforms] });
    }
    // 绘制每一个区域
    plotView({
      renderer, scales, guides, geometries, coordinates, ...dimensions,
    });
  }
  return renderer.node();
}

function plotView({
  renderer, scales: scalesOptions, guides: guidesOptions, geometries: geometriesOptions, width, height, x, y,
  paddingLeft = 45, paddingRight = 45, paddingBottom = 45, paddingTop = 60,
}) {
  // 获得每个通道的值
  const geometries = geometriesOptions.map(initialize);
  const channels = geometries.map((d) => d.channels);
}

function flow(root) {
  bfs(root, ({ type, children, ...options }) => {
    if (isChartNode(type)) return;
    if (!children || children.length === 0) return;
    const keyDescriptors = [
      'o:encodings', 'o:scales', 'o:guides', 'o:styles',
      'a:coordinates', 'a:statistics', 'a:transforms', 'a:data',
    ];
    for (const child of children) {
      for (const descriptor of keyDescriptors) {
        const [type, key] = descriptor.split(':');
        if (type === 'o') {
          child[key] = { ...options[key], ...child[key] };
        } else {
          child[key] = child[key] || options[key];
        }
      }
    }
  });
}

function isChartNode(type) {
  switch (type) {
    case 'layer': case 'col': case 'row': return false;
    default:
      return true;
  }
}

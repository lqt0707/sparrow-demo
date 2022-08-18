import { createChannel, createChannels } from './channel';
import { circle } from './shape';
import { channelStyles } from './style';

/**
 * @param {Renderer} renderer 渲染引擎
 * @param {number []} I 索引数组
 * @param {[key:string] Scale} scales 每个通道用到的 scale
 * @param {[key:string]: number[]} values 每个通道需要渲染的值
 * @param {[key: string]: string} directStyles 图形的和通道无关的样式
 * @param {Coordinate} coordinate 使用的坐标系
 * @returns 渲染的 SVG 元素
 */
export function point(renderer, I, scales, channels, directStyles, coordinate) {
  //  默认的一些属性
  const defaults = {
    r: 3,
    fill: 'none',
  };

  // 获取每一个通道经过比例尺映射的值
  const { x: X, y: Y, r: R = [] } = channels;

  // 通过索引去获得每一条数据各个通道的值
  return Array.from(I, (i) => {
    const { r: dr, ...restDefaults } = defaults;
    const r = R[i] || dr;
    return circle(renderer, coordinate, {
      ...restDefaults,
      // 元素的样式由直接指定的样式和通过通道指定的样式决定
      // 经过通道指定的样式就是和数据相关的样式
      // 后的优先级更高
      ...directStyles,
      ...channelStyles(i, channels),
      // 圆心的位置
      cx: X[i],
      cy: Y[i],
      r,
    });
  });
}

point.channels = () => createChannels({
  r: createChannel({ name: 'r' }),
});

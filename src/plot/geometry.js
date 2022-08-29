import { compose } from '../coordinate/utils';
import { indexOf } from './utils';
import { inferEncodings, valueOf } from './encoding';
import { create } from './create';
import { createChannel } from '../geometry/channel';

export function initialize({
  data, type, encodings: E = {}, statistics: statisticsOptions = [],
  transforms: transformsOptions = [],
  styles,
}) {
  // 执行transform
  // 把所有的transform都合成一个函数
  const transform = compose(...transformsOptions.map(create));
  const transformeData = transform(data);
  const index = indexOf(transformeData);

  // 执行valueOf
  // 从表格数据里面提取各个通道的值
  const encodings = inferEncodings(type, transformeData, E);
  const constants = {};
  const values = {};
  for (const [key, e] of Object.entries(encodings)) {
    if (e) {
      const { type, value } = e;
      if (type === 'constant') constants[key] = value;
      else values[key] = valueOf(transformeData, e);
    }
  }

  // 执行statistics
  // 把所有的statistics都合成一个函数
  const statistic = compose(...statisticsOptions.map(create));
  const { values: transformeVlues, index: I } = statistic({ index, values });
  // 创建通道
  const geometry = create({ type });
  const channels = {};
  for (const [key, channel] of Object.entries(geometry.channels())) {
    const values = transformeVlues[key];
    const { optional } = channel;
    if (values) {
      channels[key] = createChannel(channel, values, encodings[key]);
    } else if (!optional) {
      throw new Error(`Missing values for channel:${key}`);
    }
  }

  // 返回处理好数据
  return {
    index: I, geometry, channels, styles: { ...styles, ...constants },
  };
}

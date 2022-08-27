import { identity } from '../coordinate/utils';
import {bisect, max, min} from './utils';
import {
  ceil, floor, ticks, tickStep,
} from '../scale/utils';
import { group } from '../geometry/utils';
import { firstOf } from '../guide/utils';
// 计算划分区间
// 这里我们使用 linear scale 的 ticks 算法
function bin(values, count = 10, accessor = identity) {
  // 计算原始step
  const minValue = min(values, accessor);
  const maxValue = max(values, accessor);
  const step = tickStep(minValue, maxValue, count);
  // 计算nice之后的step
  const niceMin = floor(minValue, step);
  const niceMax = ceil(maxValue, step);
  const niceStep = tickStep(niceMin, niceMax, count);
  // 生成区间
  const thresholds = ticks(niceMin, niceMax, count);

  // 区间包含首位两个值，并去重
  return Array.from(new Set([
    floor(niceMin, niceStep),
    ...thresholds,
    ceil(niceMax, niceStep),
  ]));
}

/**
 * 分箱（BinX）
 * @param count
 * @param channel
 * @param aggregate
 * @returns {function({index?: *, values: *}): {values: *, index: *}}
 */
export function createBinX({ count = 10, channel, aggregate = (values) => values.length } = {}) {
  return ({ index, values }) => {
    const {
      [channel]: C, x: X, x1, ...rest
    } = values;
    const keys = Object.keys(rest);

    // 计算区间
    const thresholds = bin(X, count);
    const n = thresholds.length;

    // 分组，依据是二分查找找到对应的区间
    const groups = group(index, (i) => bisect(thresholds, X[i]) - 1);

    // 过滤掉没有数据点的区间
    const I = new Array(n - 1).fill(0).map((_, i) => i);
    const filtered = I.filter((i) => groups.has(i));
    return {
      index: filtered,
      values: Object.fromEntries([
        // 修改其余的原始数值
        // 取该组该通道的第一个值作为新生成的值
        ...keys.map((key) => [key, I.map((i) => {
          if (!groups.has(i)) return undefined;
          return values[key][firstOf(groups.get(i))];
        })]),
        // 聚合并且产生新的通道
        // 这里的聚合方式为简单的计数
        [channel, I.map((i) => {
          if (!groups.has(i)) return 0;
          return aggregate(groups.get(i).map((index) => values[index]));
        })],
        // 生成x和x1通道
        ['x', thresholds.slice(0, n - 1)],
        ['x1', thresholds.slice(1, n)],
      ]),
    };
  };
}

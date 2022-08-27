import { group } from '../geometry/utils';

/**
 * 堆叠（StackY）
 * @returns {function({index: *, values: *}): {values: *&{y1: *[], y: *[]}, index: *}}
 */
export function createStackY() {
  return ({ index, values }) => {
    const { x: X, y: Y } = values;

    // 根据x通道值分组
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];

    // 生成两个新的通道的值
    const newY = new Array(index.length);
    const newY1 = new Array(index.length);

    // 对每个分组的y进行累加
    for (const I of series) {
      for (let py = 0, i = 0; i < I.length; py = newY[I[i]], i += 1) {
        const index = I[i];
        newY1[index] = py;
        newY[index] = py + Y[index];
      }
    }

    return {
      index,
      // 返回修改后的 y 通道的值，并且新增一个 y1 通道
      values: { ...values, y: newY, y1: newY1 },
    };
  };
}

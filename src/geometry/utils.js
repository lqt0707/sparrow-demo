/**
 * 数据根据 key 分组
 * @param {T[]} array 需要分组的数据
 * @param {T => string} key 获得数据 key 的函数
 * @returns {Map<string, T>}
 * @example
 * const array = [
 *   {name:'a', value: 1},
 *   {name:'a', value: 2},
 *   {name:'b', value: 3}
 * ]
 * const groups = group(array, d => d.name);
 * groups // Map(2) {'a' => [{name: 'a', value:1}, {name: 'a', value: 2}], 'b' => [{name: 'b', value: 3}]}
 */
export function group(array, key = (d) => d) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}

export function equal([x0, y0], [x1, y1]) {
  return closeTo(x0, x1) && closeTo(y0, y1);
}

export function closeTo(x, y, tol = 1e-5) {
  return Math.abs(x - y) < tol;
}

export function dist([x0, y0], [x1 = 0, y1 = 0] = []) {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

export function sub([x1, y1], [x0, y0]) {
  return [x1 - x0, y1 - y0];
}

// 计算两个向量之间的夹角
export function angleBetween(v0, v1) {
  const a0 = angle(v0);
  const a1 = angle(v1);
  if (a0 < a1) return a1 - a0;
  return Math.PI * 2 - (a0 - a1);
}

export function angle([x, y]) {
  const theta = Math.atan2(y, x);
  return theta;
}

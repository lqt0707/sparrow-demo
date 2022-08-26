export function createOrdinal({ domain, range }) {
  const indexMap = new Map(domain.map((d, i) => [d, i]));

  return (x) => {
    const index = indexMap.get(x);
    // 取模的目的是为了应对 domain.length > range.length 的情况
    return range[index % range.length];
  };
}

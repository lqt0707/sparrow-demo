export function createDiv() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

// 将child节点挂载到parent节点上面
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

export function getAttributes(node, attributes) {
  return attributes.reduce(
    (total, cur) => ((total[cur] = node.getAttribute(cur)), total),
    {},
  );
}

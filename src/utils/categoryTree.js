const MAX_DEPTH = 20;

export function buildCategoryTree(categories) {
  const map = {};
  const roots = [];

  categories.forEach((cat) => {
    map[cat._id] = { ...cat, children: [], depth: 0 };
  });

  const visited = new Set();
  categories.forEach((cat) => {
    if (cat.parent && map[cat.parent._id || cat.parent]) {
      const parentId = cat.parent._id || cat.parent;
      if (visited.has(cat._id)) return;
      visited.add(cat._id);

      const parent = map[parentId];
      if (!parent || parent.depth >= MAX_DEPTH) {
        roots.push(map[cat._id]);
        return;
      }
      const child = map[cat._id];
      child.depth = parent.depth + 1;
      parent.children.push(child);
    } else if (!cat.parent) {
      roots.push(map[cat._id]);
    }
  });

  const sortByName = (nodes) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name));
    nodes.forEach((n) => sortByName(n.children));
  };
  sortByName(roots);

  return roots;
}

export function flattenTree(nodes, depth = 0) {
  const result = [];
  nodes.forEach((node) => {
    result.push({ ...node, depth });
    result.push(...flattenTree(node.children, depth + 1));
  });
  return result;
}

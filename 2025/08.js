function find(a) {
  while (parent[a] !== a) {
    parent[a] = parent[parent[a]];
    a = parent[a];
  }
  return a;
}
function union(a, b) {
  const ra = find(a);
  const rb = find(b);
  if (ra === rb) return false;
  if (size[ra] < size[rb]) {
    parent[ra] = rb;
    size[rb] += size[ra];
  } else {
    parent[rb] = ra;
    size[ra] += size[rb];
  }
  return true;
}
const data = $("*").textContent.trim().split("\n");
const pairs = [];
const limit = 1000;
data.forEach((d, i) => {
  const [x, y, z] = d.split(",").map(Number);
  for (let j = i + 1; j < data.length; j++) {
    const [x2, y2, z2] = data[j].split(",").map(Number);
    const dx = x - x2;
    const dy = y - y2;
    const dz = z - z2;
    const dist = dx * dx + dy * dy + dz * dz;
    pairs.push([dist, i, j]);
  }
});
pairs.sort((a, b) => a[0] - b[0]);
const parent = Array(data.length)
  .fill(0)
  .map((_, i) => i);
const size = Array(data.length).fill(1);
for (let k = 0; k < limit; k++) {
  const [, i, j] = pairs[k];
  union(i, j);
}
const comp = new Map();
for (let i = 0; i < data.length; i++) {
  const r = find(i);
  comp.set(r, (comp.get(r) || 0) + 1);
}
const sizes = [...comp.values()].sort((a, b) => b - a);
console.log("Part 1 ->", sizes[0] * sizes[1] * sizes[2]);
const [replacements, molecule] = $("*").textContent.trim().split("\n\n");
const r = [];
replacements.split("\n").forEach((d) => {
  const [p1, p2] = d.split(" => ");
  r.push([p1, p2]);
});
const s = new Set();
for (const [from, to] of r) {
  const len = from.length;
  for (let i = 0; i <= molecule.length - len; i++) {
    if (molecule.slice(i, i + len) === from) {
      const mlc = molecule.slice(0, i) + to + molecule.slice(i + len);
      s.add(mlc);
    }
  }
}
console.log("Part 1 ->", s.size);

const tokens = molecule.match(/[A-Z][a-z]?/g);
const count = (t) => tokens.filter(x => x === t).length;
const steps = tokens.length - count("Rn") - count("Ar") - 2 * count("Y") - 1;
console.log("Part 2 ->", steps);
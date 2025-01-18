const code = $('*').textContent.split('\n').slice(0, -1);
const row1 = [];
const row2 = [];
code.forEach(line => {
    const [n1, n2] = line.split('   ').map(Number);
    row1.push(n1);
    row2.push(n2);
});
row1.sort((a, b) => a - b);
row2.sort((a, b) => a - b);
let cache = new Map();
let result1 = row1.reduce((sum, value, i) => sum + Math.abs(value - row2[i]), 0);
let result2 = 0;

const rowCount = new Map();
row2.forEach(value => {
    rowCount.set(value, (rowCount.get(value) || 0) + 1);
});
row1.forEach(value => {
    const count = rowCount.get(value) || 0;
    result2 += value * count;
});
console.log('Part 1 ->', result1);
console.log('Part 2 ->', result2);
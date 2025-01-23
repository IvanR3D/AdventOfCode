const code = $('*').textContent.trim().split('\n');
const rows = code.length;
const cols = code[0].length;
const antennas = {};
code.forEach((line, y) => {
    [...line].forEach((char, x) => {
        if (char !== '.') {
            if (antennas[char] === undefined) {
                antennas[char] = [];
            }
            antennas[char].push([x, y]);
        }
    });
});
let antinodes = new Set();
Object.values(antennas).forEach(arr => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const [x1, y1] = arr[i];
            const [x2, y2] = arr[j];
            antinodes.add([2 * x1 - x2, 2 * y1 - y2]);
            antinodes.add([2 * x2 - x1, 2 * y2 - y1]);
        }
    }
});
const r1 = new Set();
antinodes.forEach(([x, y]) => {
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        r1.add(`${x}-${y}`);
    }
});
console.log('Part 1 ->', r1.size);

antinodes = new Set();
Object.values(antennas).forEach(arr => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i === j) continue;
            const [x1, y1] = arr[i];
            const [x2, y2] = arr[j];
            const dx = x2 - x1;
            const dy = y2 - y1;
            let x = x1;
            let y = y1;
            while (0 <= y && y < rows && 0 <= x && x < cols) {
                antinodes.add([x, y]);
                x += dx;
                y += dy;
            }
        }
    }
});
const r2 = new Set();
antinodes.forEach(([x, y]) => {
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        r2.add(`${x}-${y}`);
    }
});
console.log('Part 2 ->', r2.size);
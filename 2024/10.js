const code = $('*').textContent.trim().split('\n');
const rows = code.length;
const cols = code[0].length;
const th = [];
const ends = [];
const DIR = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const grid = code.map(line => line.split('').map(Number));
grid.forEach((row, y) => {
    row.forEach((char, x) => {
        if (char === 0) th.push([x, y]);
        if (char === 9) ends.push([x, y]);
    });
});

function findPaths(sx, sy, ex, ey) {
    const start = { x: sx, y: sy, v: 0 };
    const q = [start];
    const visited = {};
    visited[`${start.x}-${start.y}`] = 1;
    while (q.length > 0) {
        const el = q.shift();
        if (el.x === ex && el.y === ey) {
            return visited[`${el.x}-${el.y}`];
        }
        for (let [x, y] of DIR) {
            const newX = el.x + x;
            const newY = el.y + y;
            if (newY >= 0 && newY < rows && newX >= 0 && newX < cols) {
                if (grid[newY][newX] === el.v + 1) {
                    if (!visited[`${newX}-${newY}`]) {
                        q.push({ x: newX, y: newY, v: el.v + 1 });
                        visited[`${newX}-${newY}`] = visited[`${el.x}-${el.y}`];
                    } else {
                        visited[`${newX}-${newY}`] += visited[`${el.x}-${el.y}`];
                    }
                }
            }
        }
    }
    return 0;
}

let r1 = 0, r2 = 0;
th.forEach(([hx, hy]) => {
    ends.forEach(([ex, ey]) => {
        const paths = findPaths(hx, hy, ex, ey);
        r1 += paths > 0 ? 1 : 0;
        r2 += paths;
    });
});

console.log('Part 1 ->', r1);
console.log('Part 2 ->', r2);
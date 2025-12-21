let data = $('*').textContent.trim().split('\n');
const moves = [
    [-1,-1], [-1,0], [-1,1],
    [0,-1], [0,1],
    [1,-1], [1,0], [1,1]
];
const steps = 100;
let counter;
for(let k = 0; k < steps; k++) {
    counter = 0;
    let grid = [];
    for(let i = 0; i < data.length; i++) {
        let line = [];
        for(let j = 0; j < data[0].length; j++) {
            let light = data[i][j];
            let count = 0;
            for(const [y,x] of moves) {
                const nx = j + x;
                const ny = i + y;
                if (data[ny] !== undefined && data[ny][nx] !== undefined) {
                    if (data[ny][nx] === '#') count++;
                }
            }
            if(light === '#' && (count < 2 || count > 3)) {
                light = '.';
            }
            else if(light === '.' && count === 3) {
                light = '#';
            }
            if(light === '#') counter++;
            line.push(light);
        }
        grid.push(line);
    }
    data = grid;
}
console.log('Part 1 ->',counter);

data = $('*').textContent.trim().split('\n').map(r => r.split(''));
for (let k = 0; k < steps; k++) {
    forceCorners(data);
    let grid = [];
    for (let i = 0; i < data.length; i++) {
        let line = [];
        for (let j = 0; j < data[0].length; j++) {
            let light = data[i][j];
            let count = 0;
            for (const [y, x] of moves) {
                if (data[i + y]?.[j + x] === '#') count++;
            }
            if (light === '#' && (count < 2 || count > 3)) light = '.';
            else if (light === '.' && count === 3) light = '#';
            line.push(light);
        }
        grid.push(line);
    }
    forceCorners(grid);
    data = grid;
}
console.log('Part 2 ->', countLights(data));

function forceCorners(grid) {
    const h = grid.length;
    const w = grid[0].length;
    grid[0][0] = '#';
    grid[0][w - 1] = '#';
    grid[h - 1][0] = '#';
    grid[h - 1][w - 1] = '#';
}
function countLights(grid) {
    return grid.flat().filter(c => c === '#').length;
}
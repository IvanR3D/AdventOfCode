const data = $('*').textContent.trim().split('\n');
let beams = 0;
let active = new Set();
let startRow = 0;
let startCol = 0;
rows:for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if(data[r][c] === 'S') {
            startRow = r;
            startCol = c;
            active.add(c);
            break rows;
        }
    }
}
for (let i = startRow + 1; i < data.length; i++) {
    let next = new Set();
    for(const a of active) {
        const char = data[i][a];
        if(char === '^') {
            beams++;
            if(a - 1 >= 0) next.add(a - 1);
            if(a + 1 < data[i].length) next.add(a + 1);
        } else {
            next.add(a);
        }
    }
    active = next;
}
console.log('Part 1 ->',beams);

let tl = new Map();
tl.set(startCol, 1);
for (let i = startRow + 1; i < data.length; i++) {
    let next = new Map();
    for(const [col, c] of tl.entries()) {
        const char = data[i][col];
        if(char === '^') {
            if(col - 1 >= 0) {
                next.set(col - 1, (next.get(col - 1) || 0) + c);
            }
            if(col + 1 < data[i].length) {
                next.set(col + 1, (next.get(col + 1) || 0) + c);
            }
        } else {
            next.set(col, (next.get(col) || 0) + c);
        }
    }
    tl = next;
}
let result = 0;
for(const c of tl.values()) result += c;
console.log('Part 2 ->',result);
const DIR = [0,1,2,3]; // up, right, down, left
const pos = [0,0,0]; // x,y,dir
const data = $('*').textContent.split('\n')[0].split(', ');
const visited = new Set();
visited.add(`0,0`);
let r2 = null;

data.forEach(d => {
    d.includes("R") ? 
        pos[2] = (pos[2] + 1 + 4 ) % 4 
        : pos[2] = (pos[2] - 1 + 4) % 4;
    const steps = Number(d.slice(1));
    for (let i = 0; i < steps; i++) {
        if (pos[2] === 0) pos[1]++;
        else if (pos[2] === 1) pos[0]++;
        else if (pos[2] === 2) pos[1]--;
        else if (pos[2] === 3) pos[0]--;
        const key = `${pos[0]},${pos[1]}`;
        if (visited.has(key) && r2 === null) {
            r2 = Math.abs(pos[0]) + Math.abs(pos[1]);
        }
        visited.add(key);
    }
});

console.log('Part 1->',Math.abs(pos[0]) + Math.abs(pos[1]));
console.log('Part 2->',r2);

const data = $('*').textContent.split('\n').map(v=>v.trim()).slice(0,-1);
const combos = [[0,1,2],[0,2,1],[2,1,0]];
let counter = 0;
let counter2 = 0;
let count = 0;
let triangles = [];

function verify(t) {
    for(let i = 0; i < combos.length; i++) {
        const p1 = t[combos[i][0]];
        const p2 = t[combos[i][1]];
        const r = t[combos[i][2]];
        if(p1 + p2 <= r) return 0;
    }
    return 1;
}

data.forEach(line => {
    const sides = line.split('  ').map(Number).filter(v=>v!==0);
    counter += verify(sides);
    count++;
    triangles.push(sides);
    if (count === 3) {
        for (let i = 0; i < 3; i++) {
            counter2 += verify([triangles[0][i], triangles[1][i], triangles[2][i]]);
        }
        triangles = [];
        count = 0;
    }
});

console.log('Part 1 ->',counter);
console.log('Part 2 ->',counter2);
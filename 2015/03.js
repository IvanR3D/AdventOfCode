const data = $('*').textContent;
let pos = [0,0]; //x,y
const moves = {
    '^': [0,-1],
    '>': [1,0],
    'v': [0,1],
    '<': [-1,0]
};
let v = new Set();
v.add(`0-0`);
let houses = 1;
for (let i = 0; i < data.length; i++) {
    const move = data[i];
    pos[0] += moves[move][0];
    pos[1] += moves[move][1];
    if(!v.has(`${pos[0]}-${pos[1]}`)) {
        v.add(`${pos[0]}-${pos[1]}`);
        houses++;
    }
}
console.log('Part 1 ->',houses);
pos = [0,0];
const posr = [0,0]; //x,y
v = new Set();
v.add(`0-0`);
houses = 1;
for (let i = 0; i < data.length; i++) {
    const move = data[i];
    if (i % 2 === 0) {
        pos[0] += moves[move][0];
        pos[1] += moves[move][1];
        if(!v.has(`${pos[0]}-${pos[1]}`)) {
            v.add(`${pos[0]}-${pos[1]}`);
            houses++;
        }    
    } else {
        posr[0] += moves[move][0];
        posr[1] += moves[move][1];
        if(!v.has(`${posr[0]}-${posr[1]}`)) {
            v.add(`${posr[0]}-${posr[1]}`);
            houses++;
        }
    }
    
}
console.log('Part 2 ->',houses);
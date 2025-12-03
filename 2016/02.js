const data = $('*').textContent.split('\n').slice(0,-1);
const pad = [[1,2,3],[4,5,6],[7,8,9]];
const pad2 = [["","",1,"",""],["",2,3,4,""],[5,6,7,8,9],["","A","B","C",""],["","","D","",""]];
const pos = [1,1]; // x,y
const pos2 = [0,2];
const dir = {
    "U": [0,-1],
    "R": [1,0],
    "D": [0,1],
    "L": [-1,0]
};
let p1 = "";
let p2 = "";
data.forEach(line => {
    for(let i = 0; i < line.length; i++) {
        const nx = pos[0] + dir[line[i]][0];
        const ny = pos[1] + dir[line[i]][1];
        if (nx >= 0 && nx < 3 && ny >= 0 && ny < 3) {
            pos[0] = nx;
            pos[1] = ny;
        }
        const nx2 = pos2[0] + dir[line[i]][0];
        const ny2 = pos2[1] + dir[line[i]][1];
        if (nx2 >= 0 && nx2 < 5 && ny2 >= 0 && ny2 < 5 && pad2[ny2][nx2] !== "") {
            pos2[0] = nx2;
            pos2[1] = ny2;
        }
    }
    p1 += pad[pos[1]][pos[0]];
    p2 += pad2[pos2[1]][pos2[0]];
});

console.log('Part 1 ->',p1);
console.log('Part 2 ->',p2);
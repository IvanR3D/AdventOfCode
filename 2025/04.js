let data = $('*').textContent.trim().split('\n');
const moves = [
    [-1,-1], [-1,0], [-1,1],
    [0,-1], [0,1],
    [1,-1], [1,0], [1,1]
];
let counter = 0;
data.forEach((d,i) => {
   for (let j = 0; j < d.length; j++) {
       const cell = d[j];
       let count = 0;
       if (cell === '@') {
           for(const [y,x] of moves) {
                const nx = j + x;
                const ny = i + y;
                if (data[ny] !== undefined && data[ny][nx] !== undefined) {
                    if (data[ny][nx] === '@') count++;
                }
            }
           if (count < 4) counter++;
       }
       else continue;
   } 
});
console.log('Part 1 ->',counter);

counter = 0;
let pass = 1;
while(pass > 0) {
    pass = 0;
    let grid = [];
    data.forEach((d,i) => {
        let line = [];
        for (let j = 0; j < d.length; j++) {
           let cell = d[j];
           let count = 0;
           if (cell === '@') {
               for(const [y,x] of moves) {
                    const nx = j + x;
                    const ny = i + y;
                    if (data[ny] !== undefined && data[ny][nx] !== undefined) {
                        if (data[ny][nx] === '@') count++;
                    }
                }
               if (count < 4) {
                   pass++;
                   counter++;
                   cell = '.';
               }
           }
           line.push(cell); 
       }
        grid.push(line);
    });
    data = grid;
}
console.log('Part 2 ->',counter);
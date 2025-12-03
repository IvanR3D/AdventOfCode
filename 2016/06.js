const data = $('*').textContent.split('\n').slice(0,-1);
let m1 = "";
let m2 = "";

for(let i = 0; i < data[0].length; i++) {
    const column = {};
    for (let j = 0; j < data.length; j++) {
        column[data[j][i]] ??= 0;
        column[data[j][i]] += 1;
    }
    const entries = Object.entries(column);
    entries.sort((a,b) => b[1] - a[1]);
    //console.log(entries);
    m1 += entries[0][0];
    m2 += entries[entries.length-1][0];
}

console.log('Part 1 ->', m1);
console.log('Part 2 ->', m2);
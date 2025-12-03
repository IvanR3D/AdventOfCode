const data = $('*').textContent.trim().split('\n');
const IDs = [];
let sum = 0;
let sum2 = 0;
data.forEach(d=> {
    const ranges = d.split(',');
    for (const range of ranges) {
        IDs.push(range);
    }
});

for (const id of IDs) {
    const [first, last] = id.split('-');
    for (let i = Number(first); i <= Number(last); i++) {
        const str = String(i);
        if (str.length % 2 === 0) {
if (str.substring(0,str.length/2) === str.substring(str.length/2)) {
                sum += i;
            }
        }
    }
}
console.log('Part 1 ->',sum);

for (const id of IDs) {
    const [first, last] = id.split('-');
    for (let i = Number(first); i <= Number(last); i++) {
        const str = String(i);
        for(let j = 1; j <= str.length/2; j++) {
            const p = str.substring(0,j);
            const r = str.length / j;
            if(Number.isInteger(r)) {
                if(p.repeat(r) === str) {
                    sum2 += i;
                    break;
                }
            }
        }
    }
}
console.log('Part 2 ->',sum2);
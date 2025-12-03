const data = $('*').textContent.split('\n').slice(0,-1);
let pos = 50;
let counter = 0;
let counter2 = 0;
data.forEach(d=> {
    const n = Number(d.slice(1));
    for (let i = 0; i < n; i++) {
        d.startsWith('L') ? pos -- : pos++;
        if (pos < 0 || pos > 99) {
            pos = ((pos % 100) + 100) % 100;
        }
        if (pos === 0) counter2++;
    }
    if (pos === 0) counter++;
});
console.log('Part 1 ->', counter);
console.log('Part 2 ->', counter2);
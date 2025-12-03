const data = $('*').textContent.trim().split('\n');
let sum = 0;
data.forEach(d => {
    let battery = '';
    let n = 0;
    let index = 0;
    for(let i = 0; i < d.length-1; i++) {
        const num = Number(d[i]);
        if (n < num) {
            n = num;
            index = i;
        }
    }
    battery += n;
    n = 0;
    for(let j = index+1; j < d.length; j++) {
        const num = Number(d[j]);
        if (n < num) {
            n = num;
        }
    }
    battery += n;
    sum += Number(Number(battery));
});
console.log('Part 1 ->',sum);
sum = 0;
data.forEach(d => {
    let battery = '';
    let index = 0;
    for(let k = 11; k >= 0; k--) {
        let n = 0;
        for(let i = index; i < d.length-k; i++) {
            const num = Number(d[i]);
            if (n < num) {
                n = num;
                index = i+1;
            }
        }
        battery += n;
    }
    sum += Number(Number(battery));
});
console.log('Part 2 ->',sum);
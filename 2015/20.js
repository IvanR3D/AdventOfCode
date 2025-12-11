let presents = {};
const max = 1000000; // this is a safe number, increase it if don't right answers
for(let i = 1; i <= max; i++) {
    for(let h = i; h <= max; h+=i) {
        presents[h] ??= 0;
        presents[h] += 10 * i;
    }
}
for(let i = 1; i <= max; i++) {
    if (presents[i] >= 34000000) {
        console.log('Part 1 ->',i);
        break;
    }
}

presents = {};
for(let i = 1; i <= max; i++) {
    let delivered = 0;
    for(let h = i; h <= max && delivered < 50; h+=i) {
        presents[h] ??= 0;
        presents[h] += 11 * i;
        delivered++;
    }
}
for(let i = 1; i <= max; i++) {
    if (presents[i] >= 34000000) {
        console.log('Part 2 ->',i);
        break;
    }
}
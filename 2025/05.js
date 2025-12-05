const [freshRanges, available] = $('*').textContent.split('\n\n');
const ranges = freshRanges.trim().split('\n');
const merged = [];
let counter = 0;
let counter2 = 0;
available.trim().split('\n').forEach(a => {
    for (let i = 0; i < ranges.length; i++) {
        const r = ranges[i];
        const [s,e] = r.split('-').map(Number);
        if (Number(a) >= s && Number(a) <= e) {
            counter++;
            break;
        }
    }
});

const sortedRanges = ranges
  .map(r => r.split('-').map(Number))
  .sort((a, b) => a[0] - b[0]);
for (let i = 0; i < sortedRanges.length; i++) {
    const s = sortedRanges[i][0];
    const e = sortedRanges[i][1];
    if(!merged.length) {
        merged.push([s,e]);
        continue;
    }
    const last = merged[merged.length-1];
    if(s <= last[1]+1) {
        last[1] = Math.max(last[1], e);
    } else {
        merged.push([s,e]);
    }
}
for(const [s,e] of merged) {
    counter2 += e - s + 1;
}
console.log('Part 1 ->',counter);
console.log('Part 2 ->',counter2);
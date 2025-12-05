const data = $('*').textContent;
let floor = 0;
let pos = 0;
for(let i = 0; i < data.length; i++) {
    const d = data[i];
    floor += d === '(' ? 1 : -1;
    if (floor === -1 && pos < 1) {
        pos = i + 1;
    }
}
console.log('Part 1 ->',floor);
console.log('Part 2 ->',pos);
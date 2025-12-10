const data = $('*').textContent.trim().split('\n');
let largest = 0;
for (let i = 0; i < data.length; i++) {
    const [x1, y1] = data[i].split(',').map(Number);
    for (let j = i + 1; j < data.length; j++) {
        const [x2, y2] = data[j].split(',').map(Number);
        const width  = Math.abs(x2 - x1) + 1;
        const height = Math.abs(y2 - y1) + 1;
        const area   = width * height;
        if (area > largest) largest = area;
    }
}
console.log('Part 1 ->',largest);
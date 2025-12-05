const data = $('*').textContent.trim().split('\n');
let total = 0;
let feetofribbon = 0;
data.forEach(d => {
    const [l,w,h] = d.split('x').map(Number);
    const areas = [l*w, w*h, h*l]
    const sqf = (2*areas[0]) + (2*areas[1]) + (2*areas[2]);
    const min = Math.min(...areas);
    total += sqf + min;
    const s = [l,w,h].sort((a,b) => a - b);
    feetofribbon += 2*(s[0] + s[1]) + (l * w * h);
});
console.log('Part 1 ->',total);
console.log('Part 2 ->',feetofribbon);
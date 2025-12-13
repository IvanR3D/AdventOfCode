const data = $0.textContent.trim().split('\n');
const pts = data.map(d => d.split(',').map(Number));
let largest = 0;
for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    for (let j = i + 1; j < pts.length; j++) {
        const [x2, y2] = pts[j];
        const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
        largest = Math.max(largest, area);
    }
}
console.log('Part 1 ->', largest);

const sides = pts.map((p, i) => [
    p, pts[(i + 1) % pts.length]
]);
const inRange = (a1, a2, b1, b2) =>
    !(a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) &&
    !(a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2);
function rectangleCrossesPolygon(x1, y1, x2, y2) {
    return sides.some(([[sx1, sy1], [sx2, sy2]]) =>
        inRange(sy1, sy2, y1, y2) &&
        inRange(sx1, sx2, x1, x2)
    );
}
let largest2 = 0;
for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    for (let j = i + 1; j < pts.length; j++) {
        const [x2, y2] = pts[j];
        const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
        if (area <= largest2) continue;
        if (!rectangleCrossesPolygon(x1, y1, x2, y2)) {
            largest2 = area;
        }
    }
}
console.log('Part 2 ->', largest2);
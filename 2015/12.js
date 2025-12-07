function sumWithoutRed(obj) {
    if (Array.isArray(obj)) {
        return obj.reduce((sum, val) => sum + sumWithoutRed(val), 0);
    } else if (typeof(obj) === 'object' && obj !== null) {
        if (Object.values(obj).includes("red")) {
            return 0;
        }
        return Object.values(obj).reduce((sum, val) => sum + sumWithoutRed(val), 0);
    } else if (typeof(obj) === 'number') {
        return obj;
    }
    return 0;
}
const code = $('*').textContent;
const data = JSON.parse(code);
const numbers = code.match(/-?\d+/g).map(Number);
const r1 = numbers.reduce((sum, val) => sum + val);
const r2 = sumWithoutRed(data);
console.log('Part 1 ->',r1);
console.log('Part 2 ->', r2);
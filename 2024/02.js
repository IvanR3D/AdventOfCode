const code = $('*').textContent.split('\n').slice(0,-1);
let counter = 0;
let counter2 = 0

code.forEach(line => {
    const report = line.split(' ').map(Number);
    counter += checkReport(report) ? 1 : 0;
    counter2 += safeReport(report) ? 1 : 0;
});

console.log('Part 1 ->', counter);
console.log('Part 2 ->', counter2);

function checkReport(levels) {
    if (levels.length < 2) return true;
    const firstDiff = levels[1] - levels[0];
    const dir = firstDiff > 0;
    if (Math.abs(firstDiff) > 3 || Math.abs(firstDiff) === 0) return false;

    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i-1];
        if (dir && diff <= 0) return false;
        if (!dir && diff >= 0) return false;
        if (Math.abs(diff) > 3 || Math.abs(diff) === 0) return false;
    }
    return true;
}

function safeReport(levels) {
    if (checkReport(levels)) return true;

    for (let i = 0; i < levels.length; i++) {
        const changed = [...levels.slice(0,i), ...levels.slice(i+1)];
        if (checkReport(changed)) {
            return true;
        }
    }
    return false;
}

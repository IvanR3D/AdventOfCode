const data = $('*').textContent.trim().split('\n');
const rows = data.map(line => line.split(''));
const separators = [];
for (let i = 0; i < rows[0].length; i++) {
    let allSpaces = true;
    for (let j = 0; j < rows.length; j++) {
        if(rows[j][i] && rows[j][i] !== ' ') {
            allSpaces = false;
            break;
        }
    }
    if(allSpaces) separators.push(i);
}
// boundaries for better slicing
separators.unshift(-1);
separators.push(rows[0].length);

let total = 0;
for (let i = 0; i < separators.length - 1; i++) {
    const sc = separators[i] + 1;
    const ec = separators[i+1];
    const pc = [];
    for (let col = sc; col < ec; col++) {
        const column = [];
        for (let row = 0; row < rows.length; row++) {
            column.push(rows[row][col] || ' ');
        }
        pc.push(column);
    }
    const prs = [];
    for (let row = 0; row < rows.length; row++) {
        const pr = [];
        for (let col = 0; col < pc.length; col++) {
            pr.push(pc[col][row]);
        }
        prs.push(pr.join(''));
    }
    const nums = [];
    let op = null;
    for (let row = 0; row < prs.length - 1; row++) {
        const rowStr = prs[row];
        const matches = rowStr.match(/\d+/g);
        if(matches) {
            const num = parseInt(matches[matches.length - 1], 10);
            if (!isNaN(num)) {
                nums.push(num);
            }
        }
    }
    const last = prs[prs.length-1];
    last.includes('+') ? op = '+' : op = '*';
    if (nums.length > 0 && op) {
        let result;
        op === '+' ?
            result = nums.reduce((sum,num) => sum + num, 0) :
            result = nums.reduce((prod, num) => prod * num, 1);
        total += result;
    }
}
console.log('Part 1 ->',total);

total = 0;
const problems = [];
let nums = [];
const ops = [];
for (let i = rows[0].length-1; i >= 0; i--) {
    let num = '';
    for (let j = 0; j < rows.length; j++) {
        const el = rows[j][i];
        if(!isNaN(el)) num += el.trim();
        else {
            if (el !== undefined) ops.push(el);
        }
    }
    if (num === '') {
        problems.push(nums);
        nums = [];
    } else nums.push(num);
}
problems.push(nums);

for (let i = 0; i < problems.length; i++) {
    const p = problems[i].map(Number);
    const op = ops[i];
    let result;
        op === '+' ?
            result = p.reduce((sum,num) => sum + num, 0) :
            result = p.reduce((prod, num) => prod * num, 1);
        total += result;
}

console.log('Part 2 ->',total);
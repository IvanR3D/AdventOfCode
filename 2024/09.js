const code = $('*').textContent.trim();
const files = {};
let blocks = [];
let free = [];
let fid = 0;
let pos = 0;
for (let i = 0; i < code.length; i++) {
    const n = parseInt(code[i]);
    if (i % 2 === 0) {
        blocks.push(...Array(n).fill(fid));
        files[fid] = [pos, n];
        fid++;
    } else {
        blocks.push(...Array(n).fill('.'));
        if (n !== 0) {
            free.push([pos, n]);
        }
    }
    pos += n;
}
let counter = blocks.length - 1;
let i = blocks.findIndex(block => block === '.');
while (i < counter) {
    if (blocks[i] === '.') {
        while (blocks[counter] === '.') {
            counter--;
        }
        blocks[i] = blocks[counter];
        blocks[counter] = '.';
    }
    i++;
}
let r1 = blocks.reduce((sum, block, pos) => {
    if (block !== '.') {
        return sum + (pos * parseInt(block));
    }
    return sum;
}, 0);
console.log('Part 1 ->', r1);

while (fid > 0) {
    fid--;
    const [pos, size] = files[fid];
    for (let i = 0; i < free.length; i++) {
        const [start, length] = free[i];
        if (start >= pos) {
            free = free.slice(0, i);
            break;
        }
        if (size <= length) {
            files[fid] = [start, size];
            if (size === length) {
                free.splice(i, 1);
            } else {
                free[i] = [start + size, length - size];
            }
            break;
        }
    }

}
let total = 0;
for (const [fid, [pos, size]] of Object.entries(files)) {
    for (let x = pos; x < pos + size; x++) {
        total += fid * x;
    }
}
console.log('Part 2 ->', total);
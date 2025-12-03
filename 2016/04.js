const raw = $('*').textContent.split('\n').slice(0,-1);
const abc = 'abcdefghijklmnopqrstuvwxyz';
let sum = 0;
raw.forEach(line => {
    const letters = new Map();
    const data = line.split('-');
    let [id, checksum] = data.pop().split('[');
    id = Number(id);
    checksum = checksum.slice(0,-1);
    data.forEach(d => {    
        for(let i = 0; i < d.length; i++) {
            const v = letters.get(d[i]) + 1 || 1;
            letters.set(d[i], v);
        }
    });
    const sorted = [...letters.entries()].sort((a, b) => {
        const [charA, countA] = a;
        const [charB, countB] = b;
        // First sort by frequency DESC
        if (countA !== countB) return countB - countA;
        // Then sort alphabetically ASC
        return charA.localeCompare(charB);
    });
    if (!isDecoy(checksum, sorted)) sum += id;
    const text = decipher(data,id);
    if (text.includes("northpole")) console.log('Part 2 ->',id);
});

console.log('Part 1 ->',sum);

function isDecoy(checksum, sorted) {
    for(let i = 1; i < checksum.length; i++) {
        if(sorted[i-1][0] !== checksum[i-1]) return true;
        if(sorted[i][1] === sorted[i-1][1]) {
            if (abc.indexOf(sorted[i-1][0]) > abc.indexOf(sorted[i][0])) {
                return true;
            }
        }
    }
    return false;
}

function decipher(data,id) {
    let txt = "";
    for(const d of data) {
        for(let i = 0; i < d.length; i++) {
            const n = (abc.indexOf(d[i]) + id + abc.length) % abc.length;
            txt += abc[n];
        }
        txt += " ";
    }
    return txt;
}
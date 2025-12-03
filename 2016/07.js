const data = $0.textContent.split('\n').slice(0,-1);
let ipCount = 0;

data.forEach(line => {
    let isHypernet = false;
    let word = '';
    let counter = 0;
    let hn = false;
    for(let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '[') { 
            isHypernet = true; 
            word = '';
        }
        else if (char === ']') {
            isHypernet = false; 
            word = '';
        }
        else {
            word += char;
        }
        if (word.length === 4 && !isHypernet) {
            word[0] === word[3] && word[1] === word[2] && word[0] !== word[1] ?
            counter++ : null;
            word = word.slice(1);
        } else if (word.length === 4 && isHypernet) {
            word[0] === word[3] && word[1] === word[2] && word[0] !== word[1] ?
            hn = true : null;
            word = word.slice(1);
        }
    }
    if (counter > 0 && !hn) ipCount++;
});

console.log('Part 1 ->', ipCount);
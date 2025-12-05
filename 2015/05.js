function isNice(str) {
    let vowelCounter = 0;
    let doubleLetter = false;
    let forbidden = false;
    for (let i = 0; i < str.length; i++) {
        if ('aeiou'.includes(str[i])) vowelCounter++;
        if (i < str.length - 1 && str[i] === str[i+1]) doubleLetter = true;
        if (i < str.length - 1 && ['ab', 'cd', 'pq', 'xy'].includes(str.slice(i, i+2))) forbidden = true;
    }
    return vowelCounter>2 && doubleLetter && !forbidden ? 1 : 0;
}
function isNice2(str) {
    const pairs = new Map();
    let hasPair = false;
    let hasRepeat = false;
    for (let i = 0; i < str.length; i++) {
        const pair = str.substring(i,i+2);
        if (pairs.has(pair)) {
            if (i - pairs.get(pair) >= 2) hasPair = true;
        } else pairs.set(pair, i);
        if (i < str.length - 2 && str[i] === str[i+2]) hasRepeat = true;
    }
    return hasPair && hasRepeat ? 1 : 0;
}

const data = $('*').textContent.trim().split('\n');
let counter = 0;
let counter2 = 0;
data.forEach(d => {
    counter += isNice(d);
    counter2 += isNice2(d);
});
console.log('Part 1 ->',counter);
console.log('Part 2 ->',counter2);
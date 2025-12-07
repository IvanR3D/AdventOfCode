const code = $('*').textContent.trim().split('\n');
const data = { "children":3, "cats":7, "samoyeds":2, "pomeranians":3, "akitas": 0, "vizslas":0, "goldfish":5, "trees":3, "cars":2, "perfumes":1 };
const aunts = {};
code.forEach(line => {
    const info = line.split(' ');
    aunts[info[1].slice(0,-1)] = { [info[2].slice(0,-1)]:info[3].slice(0,-1), [info[4].slice(0,-1)]:info[5].slice(0,-1), [info[6].slice(0,-1)]:info[7]};
});
const auntNums = Object.keys(aunts);
let r1 = "";
auntNums.forEach(num => {
    let counter = 0;
    Object.keys(aunts[num]).forEach(key => {
            if (parseInt(data[key]) === parseInt(aunts[num][key])) counter++;
    });
    if(counter === 3) r1 = num;
});
console.log('Part 1 ->', r1);

let r2 = "";
auntNums.forEach(num => {
    let counter = 0;
    Object.keys(aunts[num]).forEach(key => {
            if (key === "cats" || key === "trees") {
                if (parseInt(data[key]) < parseInt(aunts[num][key])) counter++;
            } else if (key === "pomeranians" || key === "goldfish") {
                if (parseInt(data[key]) > parseInt(aunts[num][key])) counter++;
            } else {
                if (parseInt(data[key]) === parseInt(aunts[num][key])) counter++;
            }
    });
    if(counter === 3) r2 = num;
});
console.log('Part 2 ->', r2);
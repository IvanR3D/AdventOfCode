const data = $('*').textContent.trim().split('\n').map(Number);
const liters = 150;
const combs = [];
let counter = 0;

function combinations(index, sum, count) {
    if(sum === liters) {
        combs.push(count);
        counter++;
        return;
    }
    else if(sum > liters || index === data.length) return;
    combinations(index+1, sum, count++);
    combinations(index+1, sum + data[index], count++);
}

combinations(0,0,0);
console.log('Part 1 ->', counter);
const counts = {};
combs.sort().forEach(comb => counts[comb] = (counts[comb] || 0) + 1);
console.log('Part 2 ->', Object.values(counts)[0]);
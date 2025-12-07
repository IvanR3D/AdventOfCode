function getPermutations(arr) {
    // Base case
    if (arr.length <= 1) return [arr];   
    const result = [];
    // Take each element as first element
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        // Get all other elements
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        // Get permutations for remaining elements
        const remainingPerms = getPermutations(remaining);
        // Add current element to front of each permutation
        for (const perm of remainingPerms) {
            result.push([current, ...perm]);
        }
    }
    return result;
}
function calcHappiness(arr) {
    let total = 0;
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const person = arr[i];
        const next = arr[(i+1)%len];
        total += happiness[person][next];
        total += happiness[next][person];
    }
    return total;
}
const data = $('*').textContent.trim().split('\n');
const happiness = {};
data.forEach(line => {
    const str = line.split(' ');
    const person = str[0];
    const sign = str[2] === 'gain' ? '+' : '-';
    const num = parseInt(str[3]);
    const next = str[str.length-1].slice(0,-1);
    if (happiness[person] !== undefined) {
        happiness[person][next] = parseInt(sign+num);
    } else {
        happiness[person] = {[next]:parseInt(sign+num)};
    }
});
const people = Object.keys(happiness);
happiness["me"] = {};
people.forEach(person => {
    happiness["me"][person] = 0;
    happiness[person]["me"] = 0;
});
const peopleWithMe = Object.keys(happiness);
const firstPerson = people[0];
const others = people.slice(1);
const othersWithMe = peopleWithMe.slice(1);
const permutation = getPermutations(others);
const permutationWithMe = getPermutations(othersWithMe);
let maxHappiness1 = Number.NEGATIVE_INFINITY;
let maxHappiness2 = Number.NEGATIVE_INFINITY;
for (let perm of permutation) {
    const arrangement = [firstPerson, ...perm];
    const value = calcHappiness(arrangement);
    value > maxHappiness1 ? maxHappiness1 = value : null;
}
for (let perm of permutationWithMe) {
    const arrangement = [firstPerson, ...perm];
    const value = calcHappiness(arrangement);
    value > maxHappiness2 ? maxHappiness2 = value : null;
}
console.log('Part 1 ->', maxHappiness1);
console.log('Part 2 ->', maxHappiness2);
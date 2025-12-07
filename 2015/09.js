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
const code = $('*').textContent.split('\n').slice(0,-1);
const cities = new Set();
const distances = new Map();
code.forEach(line => {
    const [src, _, dst, e, dist] = line.split(' ');
    cities.add(src);
    cities.add(dst);
    distances.set(`${src}-${dst}`, parseInt(dist));
    distances.set(`${dst}-${src}`, parseInt(dist));
});
const arr = Array.from(cities);
const routes = getPermutations(arr);
let minDist = Infinity;
let maxDist = 0;
routes.forEach(route => {
    let sum = 0;
    for (let i = 0; i < route.length-1; i++) {
        sum += distances.get(`${route[i]}-${route[i+1]}`);
    }
    if(sum < minDist) minDist = sum;
    if(sum > maxDist) maxDist = sum;
});
console.log("Part 1 ->", minDist);
console.log("Part 2 ->", maxDist);
function makeCookie(comb) {
    let total = {c:0, d:0, f:0, t:0, ca:0};
    ingredientNames.forEach((name, i) => {
        total.c += comb[i] * ingredients[name].capacity;
        total.d += comb[i] * ingredients[name].durability;
        total.f += comb[i] * ingredients[name].flavor;
        total.t += comb[i] * ingredients[name].texture;
        total.ca += comb[i] * ingredients[name].calories;
    });
    total.c = total.c > 0 ? total.c : 0;
    total.d = total.d > 0 ? total.d : 0;
    total.f = total.f > 0 ? total.f : 0;
    total.t = total.t > 0 ? total.t : 0;
    if (total.ca === 500) r2.push(total.c * total.d * total.f * total.t);
    return total.c * total.d * total.f * total.t;
}
function distribute(number, parts) {
    let results = [];
    function helper(remaining, count, combination) {
        // Base case: when no more parts to fill and the sum is correct
        if (count === 0) {
            if (remaining === 0) results.push([...combination]);
            return;
        }
        // Recursive case: try each possible value for the current part
        for (let i = 0; i <= remaining; i++) {
            combination.push(i);
            helper(remaining - i, count - 1, combination);
            combination.pop(); // Backtrack
        }
    }
    helper(number, parts, []);
    return results;
}
const data = $('*').textContent.split('\n').slice(0,-1);
const regex = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;
const ingredients = {};
data.forEach(line => {
    const match = line.match(regex);
    ingredients[match[1]] = {capacity: parseInt(match[2]), durability: parseInt(match[3]), flavor: parseInt(match[4]), texture: parseInt(match[5]), calories: parseInt(match[6])};
});
const ingredientNames = Object.keys(ingredients);
const r1 = [];
const r2 = [];
const combinations = distribute(100, ingredientNames.length);
for (let comb of combinations) {
    const total = makeCookie(comb);
    if(total > 0) r1.push(total);
}
console.log('Part 1 ->', Math.max(...r1));
console.log('Part 2 ->', Math.max(...r2));
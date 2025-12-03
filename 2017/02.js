const data = $('*').textContent.trim().split('\n');
let sum = 0;
let sum2 = 0;
data.forEach(line => {
    const numbers = line.split('\t').map(Number);
    sum += Math.max(...numbers) - Math.min(...numbers);
    for(let i = 1; i < numbers.length; i++) {
        const nums = [numbers[i-1], numbers[i]];
        const max = Math.max(...nums);
        const min = Math.min(...nums);
        const div = max / min;
        if (Number.isInteger(div)) {
            sum2 += div;
        }
    }
});
console.log('Part 1 ->',sum);
console.log('Part 2 ->',sum2); // this one is not working


// ! VERY DIRTY CODE!!!
// I am ashamed of this code, but it works to get a right answer in this AoC challenge!
// And currently I don't have the time to refactor it... nor the knowledge to do it properly...
const data = $0.textContent.trim().split('\n\n');
const shapes = data.slice(0,6);
const regions = data.slice(6)[0].split('\n');
let canFit = 0;
regions.forEach(region => {
    const [dims, quantity] = region.split(': ');
    const [n1,n2] = dims.split('x').map(Number);
    const size = n1*n2;
    const nums = quantity.split(' ').map(Number);
    const sum = nums.reduce((acc,v)=>acc+v,0);
    const shapeNum = sum * 7;
    if (size >= sum*3*3 || size >= shapeNum) canFit++;
});
console.log('Part 1 ->', canFit);
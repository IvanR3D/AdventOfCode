function lookandsay(puzzle) {
    let las = '';
    let currentChar = puzzle[0];
    let counter = 1;
    for (let i = 1; i < puzzle.length; i++) {
        if (puzzle[i] === currentChar) counter++;
        else {
            las+=counter;
            las+=currentChar;
            currentChar = puzzle[i];
            counter = 1;
        }
    }
    las+=counter;
    las+=currentChar;
    return las;
}
const code = "1321131112"; // change by the correspond puzzle input 
let reps = 1;
let result = lookandsay(code);
while (reps < 40) {
    result = lookandsay(result);
    reps++;
}
console.log("Part 1 ->", result.length);
console.info("Wait a bit for part 2...");
while (reps < 50) {
    result = lookandsay(result);
    reps++;
}
console.log("Part 2 ->", result.length);
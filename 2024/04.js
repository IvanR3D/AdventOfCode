const code = $("*").innerText.split('\n').slice(0, -1);
let counter = 0;
let counter2 = 0;
code.forEach(line => {
    searchWord(line);
});
vertical(code);
diagonal(code);
console.log('Part 1 ->', counter);

findXMAS(code);
console.log('Part 2 ->', counter2);

function vertical(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Loop through each column
    for (let col = 0; col < cols; col++) {
        let columnString = '';
        for (let row = 0; row < rows; row++) {
            columnString += grid[row][col];
        }

        for (let i = 0; i <= columnString.length - 4; i++) {
            const word = columnString.slice(i, i + 4);
            if (word === "XMAS" || word === "SAMX") {
                counter++;
            }
        }
    }
}

function diagonal(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let start = 0; start < rows + cols - 1; start++) {
        let diagonalString = "";
        for (let i = 0; i < rows; i++) {
            let j = start - i;
            if (j >= 0 && j < cols) {
                diagonalString += grid[i][j];
            }
        }
        searchWord(diagonalString);
    }

    for (let start = -rows + 1; start < cols; start++) {
        let diagonalString = "";
        for (let i = 0; i < rows; i++) {
            let j = i + start;
            if (j >= 0 && j < cols) {
                diagonalString += grid[i][j];
            }
        }
        searchWord(diagonalString);
    }
}

function searchWord(line) {
    for (let i = 0; i <= line.length - 4; i++) {
        const word = line.slice(i, i + 4);
        if (word === "XMAS" || word === "SAMX") {
            counter++;
        }
    }
}

function findXMAS(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            const topLeft = grid[i - 1][j - 1];
            const topRight = grid[i - 1][j + 1];
            const center = grid[i][j];
            const bottomLeft = grid[i + 1][j - 1];
            const bottomRight = grid[i + 1][j + 1];

            if (
                (topLeft === 'M' && topRight === 'S' && center === 'A' && bottomLeft === 'M' && bottomRight === 'S') ||
                (topLeft === 'S' && topRight === 'M' && center === 'A' && bottomLeft === 'S' && bottomRight === 'M') ||
                (topLeft === 'S' && topRight === 'S' && center === 'A' && bottomLeft === 'M' && bottomRight === 'M') ||
                (topLeft === 'M' && topRight === 'M' && center === 'A' && bottomLeft === 'S' && bottomRight === 'S')
            ) {
                counter2++;
            }
        }
    }
}
function parseCommand(command) {
  const regex = /^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/;
  const match = command.match(regex);
  const [_, action, x1, y1, x2, y2] = match;
  return {
    action: action.replace("turn ", ""),
    start: { x: parseInt(x1), y: parseInt(y1) },
    end: { x: parseInt(x2), y: parseInt(y2) },
  };
}

const data = $0.textContent.split("\n").slice(0, -1);
let grid = Array(1000) .fill() .map(() => Array(1000).fill(0));
data.forEach((d) => {
  let ins = parseCommand(d);
  for (let i = ins.start.x; i <= ins.end.x; i++) {
    for (let j = ins.start.y; j <= ins.end.y; j++) {
      if (ins.action === "on") grid[i][j] = 1;
      else if (ins.action === "off") grid[i][j] = 0;
      else if (ins.action === "toggle") grid[i][j] = grid[i][j] === 0 ? 1 : 0;
    }
  }
});
const lightsOn = grid.reduce(
  (sum, row) => sum + row.reduce((rowSum, cell) => rowSum + cell, 0),
  0
);
console.log("Part 1 ->", lightsOn);

grid = Array(1000) .fill() .map(() => Array(1000).fill(0));
data.forEach((d) => {
  let ins = parseCommand(d);
  for (let i = ins.start.x; i <= ins.end.x; i++) {
    for (let j = ins.start.y; j <= ins.end.y; j++) {
      if (ins.action === "on") grid[i][j] = grid[i][j] + 1;
      else if (ins.action === "off") grid[i][j] = grid[i][j] > 0 ? grid[i][j] - 1 : (grid[i][j] = 0);
      else grid[i][j] = grid[i][j] + 2;
    }
  }
});
const total = grid.flat().reduce((sum, num) => sum + num, 0);
console.log("Part 2 ->", total);
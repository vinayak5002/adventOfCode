const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

let map = lines.map((line) => line.split(''));

const M = map.length;
const N = map[0].length;

let mem = new Set();  // Changed to Set for faster lookup
let pos = map.flatMap((line, i) =>
  line.map((char, j) => char === '^' ? [i, j] : null).filter(Boolean)
)[0];

const directions = [
  [-1, 0],  // up
  [0, 1],   // right
  [1, 0],   // down
  [0, -1],  // left
];

let totalLoopCount = 0;
let loopCount = 0;
const isInside = (pos) => pos[0] >= 0 && pos[0] < M && pos[1] >= 0 && pos[1] < N;

const getNextDirection = (dir) => {
  return directions[(directions.findIndex((d) => d[0] === dir[0] && d[1] === dir[1]) + 1) % 4];
};

const isLoopPos = (pos, dir) => {
  const res = mem.has(`${pos[0]},${pos[1]}:${dir[0]},${dir[1]}`);
  return res;
};

const guardTraverse = (pos, dir, starting) => {
  const nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  const currEle = map[pos[0]][pos[1]];

  if (!isInside(nextPos)) {
    return;  // Stop if the next position is out of bounds
  }

  if (currEle === '.') {
    map[pos[0]][pos[1]] = 'X';
  }

  const nextEle = map[nextPos[0]][nextPos[1]];

  if (nextEle === '.' || nextEle === 'X') {
    if(!starting && isLoopPos(pos, dir)) {
      loopCount++;
      console.log("Exiting due to loop at position:", pos, "direction:", dir);
      return;  // Stop recursion if a loop is detected
    }
    guardTraverse(nextPos, dir, false);  // Continue in the same direction
  } else if (nextEle === '#' || nextEle === 'O') {
    const nextDir = getNextDirection(dir);

    if (isLoopPos(pos, nextDir) && !starting) {
      loopCount++;
      console.log("Exiting due to loop at position:", pos, "direction:", dir);
      return;  // Stop recursion if a loop is detected
    }

    mem.add(`${pos[0]},${pos[1]}:${nextDir[0]},${nextDir[1]}`);  // Track position and direction
    const nextPosTurn = [pos[0] + nextDir[0], pos[1] + nextDir[1]];
    guardTraverse(nextPosTurn, nextDir, false);  // Turn direction and move
  }
};

map.forEach((line, i) => {
  line.forEach((char, j) => {
    // Deep copy the map (by copying each line individually)
    const temp = map.map(line => [...line]);  // Create a deep copy of the map

    map[i][j] = 'O';  // Place obstacle
    map[pos[0]][pos[1]] = 'X';  // Reset the starting position

    loopCount = 0;  // Reset loop count for each obstacle placement
    mem.clear();    // Clear memory to avoid old data affecting the new run

    mem.add(`${pos[0]},${pos[1]}:${directions[0][0]},${directions[0][1]}`);  // Track position and direction

    guardTraverse(pos, directions[0], true);

    // Print the map after running guardTraverse
    if (loopCount) {
      map.forEach((line) => console.log(line.join('')));
      console.log("Loop count:", loopCount);
      console.log('-----------------');
    }

    totalLoopCount += loopCount;

    // Restore map to its original state by using the deep copy
    map.length = 0;
    map.push(...temp);  // Push the original values back to map
  });
});

console.log('Total loops detected:', totalLoopCount);

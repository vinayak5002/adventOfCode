const fs = require('fs');
const v8 = require('v8');
v8.setFlagsFromString('--stack-size=10000000');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

let map = lines.map((line) => { return line.split('') });

const M = map.length;
const N = map[0].length;

let pos = map.flatMap((line, i) =>
  line.map((char, j) => char === '^' ? [i, j] : null).filter(Boolean)
)[0];

let isLoop = false;

let mem = map.reduce((acc, line) => {
  acc.push(line.map(() => 0));
  return acc;
}, [])


const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

let pathCount = 1;

const isInside = (pos) => {
  return pos[0] >= 0 && pos[0] < M && pos[1] >= 0 && pos[1] < N;
}

const getNextDirection = (dir) => {
  return directions[(directions.findIndex((d) => d[0] === dir[0] && d[1] === dir[1]) + 1) % 4];
}

let calls = 0;

const guardTraverse = (pos, dir) => {
  console.log("Calls: ", calls++);
  const nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  const currEle = map[pos[0]][pos[1]];

  // console.clear();  // Clear the console before printing
  // console.log(mem.map((line) => line.join('')).join('\n'));
  // console.log('-----------------');
  // console.log(map.map((line) => line.join('')).join('\n'));

  if (mem[pos[0]][pos[1]] > 4) {
    isLoop = true;
    return;
  }
  else {
    mem[pos[0]][pos[1]]++;
  }

  if (currEle === '.') {
    pathCount++;
    map[pos[0]][pos[1]] = 'X';
  }

  if (!isInside(nextPos)) {
    return;
  }

  const nextEle = map[nextPos[0]][nextPos[1]];

  if (nextEle === '.' || nextEle === 'X') {
    guardTraverse(nextPos, dir);
  }

  else if (nextEle === '#') {
    nextDir = getNextDirection(dir);
    const nextPosTurn = [pos[0] + nextDir[0], pos[1] + nextDir[1]];

    guardTraverse(nextPosTurn, nextDir);
  }
}

let numLoops = 0;

// for (let i = 0; i < M; i++) {
//   for (let j = 0; j < N; j++) {
  const i = 3;
  const j = 50;
    // Create a deep copy of the map using JSON.parse and JSON.stringify
    const original = JSON.parse(JSON.stringify(map));  // Deep copy of map

    // Make your modifications to the map
    map[pos[0]][pos[1]] = 'X';
    map[i][j] = '#';

    // console.clear();  // Clear the console before printing
    // console.log(map.map((line) => line.join('')).join('\n'));
    // console.log("obstruction: ", i, j);

    // Assuming guardTraverse and other logic follow
    guardTraverse(pos, directions[0]);

    if (isLoop) {
      numLoops++;
      isLoop = false;
    }

    // Reset memory to zeros
    mem = map.reduce((acc, line) => {
      acc.push(line.map(() => 0));
      return acc;
    }, []);

    // Restore map to its original state
    map = original;  // Restore to original map
//   }
// }

//write the map final state to a file
fs.writeFileSync('output.txt', map.map((line) => line.join('')).join('\n'));

console.log("Ans: ", numLoops);
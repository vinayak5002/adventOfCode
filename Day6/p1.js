const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

let map = lines.map((line) => { return line.split('') });

const M = map.length;
const N = map[0].length;

let pos = map.flatMap((line, i) =>
  line.map((char, j) => char === '^' ? [i, j] : null).filter(Boolean)
)[0];

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

const guardTraverse = (pos, dir) => {
  const nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  const currEle = map[pos[0]][pos[1]];

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

map[pos[0]][pos[1]] = 'X';
guardTraverse(pos, directions[0]);

//write the map final state to a file
fs.writeFileSync('output.txt', map.map((line) => line.join('')).join('\n'));

console.log(pathCount);
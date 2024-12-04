const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const map = input.split('\n').map((line) => {
  return line.split('');
});

const M = map.length;
const N = map[0].length;

// make a map of zeros with size M and N 
let zeroMap = Array(M).fill().map(() => Array(N).fill(0));

const isWithinBounds = (i, j) => {
  return i >= 0 && i < M && j >= 0 && j < N;
}

let count = 0;

const key = ['M', 'A', 'S'];

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

const countXmas = (i, j, history = [], direction) => {
  if (history.join('') === key.join('')) {
    if (directions[direction][0] !== 0 && directions[direction][1] !== 0) {
      console.log(directions[direction][0], directions[direction][1])
      const AcoordX = i - directions[direction][0];
      const AcoordY = j - directions[direction][1];

      zeroMap[AcoordX][AcoordY] += 1;
    }

    count++;
    return;
  }

  if (history.length > key.length) {
    return;
  }

  const I = i + directions[direction][0];
  const J = j + directions[direction][1];

  if (!isWithinBounds(I, J)) return;

  const expected = key[key.indexOf(map[i][j]) + 1];

  if (expected === map[I][J]) {
    countXmas(i + directions[direction][0], j + directions[direction][1], [...history, map[I][J]], direction);
  }
}


for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === key[0]) {
      for (let k = 0; k < directions.length; k++) {
        countXmas(i, j, [map[i][j]], k);
      }
    }

  }
}

console.log("Count: ", count);

let aCount = 0;
zeroMap.forEach((row) => {
  row.forEach((col) => {
    if (col >= 2) {
      aCount++;
    }
  })
});

// wrint zeromap into a file 
fs.writeFileSync('zeroMap.txt', zeroMap.map((row) => row.join('')).join('\n'));

console.log("Acount: ", aCount);
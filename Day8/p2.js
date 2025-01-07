const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

const map = lines.map((line) => line.split('').slice(0, -1));

const M = map.length;
const N = map[0].length;

const freqs = new Map();

map.forEach((line, i) => {
  line.forEach((char, j) => {
    if (char !== '.') {
      freqs.has(char) ? freqs.get(char).push([i, j]) : freqs.set(char, [[i, j]]);
    }
  });
});

let antiNodes = new Set();

const isInBounds = (pos) => {
  const [i, j] = pos;
  return i >= 0 && i < M && j >= 0 && j < N;
}

const calcAntiNodes = (loc1, loc2) => {
  let [x1, y1] = loc1;
  let [x2, y2] = loc2;

  const dx = x1 - x2;
  const dy = y1 - y2;

  let nodes1 = [];
  while (isInBounds([x1 + dx, y1 + dy])) {
    x1 += dx;
    y1 += dy;
    map[x1][y1] === '.' && nodes1.push([x1, y1]);
  }

  let nodes2 = [];
  while (isInBounds([x2 - dx, y2 - dy])) {
    x2 -= dx;
    y2 -= dy;
    map[x2][y2] === '.' && nodes2.push([x2, y2]);
  }

  return { nodes1, nodes2 };
};

freqs.forEach((f) => {
  for (let i = 0; i < f.length; i++) {
    for (let j = i + 1; j < f.length; j++) {
      const [loc1, loc2] = [f[i], f[j]];
      const { nodes1, nodes2 } = calcAntiNodes(loc1, loc2);

      for (let k = 0; k < nodes1.length; k++) {
        const [i, j] = nodes1[k];
        map[i][j] = '#';
        antiNodes.add([i, j]);
      }

      for (let k = 0; k < nodes2.length; k++) {
        const [i, j] = nodes2[k];
        map[i][j] = '#';
        antiNodes.add([i, j]);
      }
    }
  }
});

const numAntinodes = antiNodes.size + [...freqs.values()].flat().length;

console.log(numAntinodes);

// writen output map into a file named output.txt
const output = map.map(line => line.join('')).join('\n');
fs.writeFileSync('output.txt', output);
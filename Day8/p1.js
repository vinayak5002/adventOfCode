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

const isInBounds = (i, j) => i >= 0 && i < M && j >= 0 && j < N;

const calcAntiNodes = (loc1, loc2) => {
  const [x1, y1] = loc1;
  const [x2, y2] = loc2;

  const dx = x1 - x2;
  const dy = y1 - y2;

  const p1 = [x1 + dx, y1 + dy];
  const p2 = [x2 - dx, y2 - dy]; 
  
  return {p1, p2};
};

freqs.forEach((f) => {
  for (let i = 0; i < f.length; i++) {
    for (let j = i + 1; j < f.length; j++) {
      const [loc1, loc2] = [f[i], f[j]];
      const {p1, p2} = calcAntiNodes(loc1, loc2);

      if(isInBounds(...p1) && map[p1[0]][p1[1]] !== '#') {
        map[p1[0]][p1[1]] = '#';
        antiNodes.add(p1);
      }

      if(isInBounds(...p2) && map[p2[0]][p2[1]] !== '#') {
        map[p2[0]][p2[1]] = '#';
        antiNodes.add(p2);
      }
    }
  }
});

console.log(antiNodes.size);

// writen output map into a file named output.txt
const output = map.map(line => line.join('')).join('\n');
fs.writeFileSync('output.txt', output);
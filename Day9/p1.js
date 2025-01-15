const fs = require('fs');

const input = fs.readFileSync('sample.txt', 'utf8').split('').map(Number);

let id = 0;

let isFile = true;

let diskSpace = [];

input.forEach((num) => {
  if(isFile) {
    diskSpace = diskSpace.concat(Array(num).fill(id));
    id++;
  }
  else {
    diskSpace = diskSpace.concat(Array(num).fill('.'));
  }
  isFile = !isFile;
});

const N = diskSpace.length;

let i = 0;
let j = N-1;

while (j > i+1) {
  if(diskSpace[j] === '.') {
    j--;
  }
  else {
    while(diskSpace[i] !== '.') {
      i++;
    }

    diskSpace[i] = diskSpace[j];
    diskSpace[j] = '.';
    j--;
  }
  console.log(diskSpace.join(''));
}
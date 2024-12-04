// read a file called input.txt

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const reports = input.split('\n');

const levels = reports.map((level) => {
  return level.split(' ').map((num) => {
    return parseInt(num)
  })
});

var unSafeLevels = 0;

levels.forEach((level) => {
  let direction = null;

  for (var i = 0; i < level.length - 1; i++) {
    var diff = level[i] - level[i + 1];

    if(diff === 0 || Math.abs(diff) > 3) {
      unSafeLevels++;
      break;
    }

    if(direction === null) {
      direction = diff > 0; 
    }
    else {
      if((diff > 0) !== direction) {
        unSafeLevels++;
        break;
      }
    }

  }
});

console.log(`Safe levels: ${levels.length - unSafeLevels}`);
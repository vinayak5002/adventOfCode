// read a file called input.txt

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const reports = input.split('\n');

const levels = reports.map((level) => {
  return level.split(' ').map((num) => {
    return parseInt(num)
  })
});

const checkLevelIsSafe = (level) => {
  let diffs = [];

  for (var i = 0; i < level.length - 1; i++) {
    diffs.push(level[i] - level[i + 1]);
  }

  const numPos = diffs.filter((diff) => { return diff > 0 }).length;
  const numNeg = diffs.filter((diff) => { return diff < 0 }).length;
  const numZero = diffs.filter((diff) => { return diff === 0 }).length;

  if (numZero !== 0) {
    return false;
  }

  const allInRange = diffs.every((diff) => { return Math.abs(diff) <= 3 && Math.abs(diff) !== 0 });
  if (allInRange === false) {
    return false;
  }

  const min = Math.min(numPos, numNeg);

  if (min > 1) {
    return false;
  }

  if (min !== 0) {
    // console.log(`diffs: ${diffs} - Pos: ${numPos} Neg: ${numNeg} Zero: ${numZero} Min: ${min}`);
  }

  return true;
};

const safeLevels = levels.filter((level) => { return checkLevelIsSafe(level) });

const input2 = fs.readFileSync('safe-reports.txt', 'utf8');

const reports2 = input2.split('\n');

const lvls = reports2.map((level) => {
  return level.split(' ').map((num) => {
    return parseInt(num)
  })
});

// reports from lvls which are not there in safelevls

const missedLvls = lvls.filter((lvl) => {
  return safeLevels.filter((safeLvl) => {
    return safeLvl.toString() === lvl.toString();
  }).length === 0;
});

console.log("Missed levels: ", missedLvls.length);
console.log(missedLvls);

// console.log(`Safe levels: ${safeLevels.length}`);
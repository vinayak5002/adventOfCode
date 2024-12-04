const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const reports = input.split('\n').map(line => line.split(' ').map(Number));

const isSafe = (levels) => {
  let diffs = [];
  
  // Calculate differences between adjacent levels
  for (let i = 0; i < levels.length - 1; i++) {
    diffs.push(levels[i] - levels[i + 1]);
  }

  const allIncreasing = diffs.every(diff => diff < 0 && Math.abs(diff) <= 3);
  const allDecreasing = diffs.every(diff => diff > 0 && Math.abs(diff) <= 3);

  return (allIncreasing || allDecreasing) && !diffs.some(diff => Math.abs(diff) > 3);
};

// Check if removing one level from an unsafe report makes it safe
const canFixWithOneRemoval = (levels) => {
  for (let i = 0; i < levels.length; i++) {
    const newLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
    if (isSafe(newLevels)) {
      return true;
    }
  }
  return false;
};

// Count safe reports
const countSafeReports = reports.reduce((safeCount, report) => {
  if (isSafe(report) || canFixWithOneRemoval(report)) {
    // write the safe report into a file

    fs.appendFileSync('safe-reports.txt', `${report.join(' ')}\n`);
    safeCount++;
  }
  return safeCount;
}, 0);

console.log(`Safe reports: ${countSafeReports}`);

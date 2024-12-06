const fs = require('fs');

const lines = fs.readFileSync('sample.txt', 'utf-8').split('\n');

const rulesList = lines
  .filter(line => line.trim() && line.includes('|'))
  .map(line => line.split('|').map(num => parseInt(num)));

let page = [97, 13, 75, 29, 47];

let indegree = page.reduce((acc, num) => {
  acc[num] = rulesList
    .filter(rule => rule[1] === num) // Find all rules where num is the second element
    .map(rule => rule[0]); // Extract the first element (dependency)
  return acc;
}, {});

console.log('Indegree:', indegree);

let dependencyCount = page.reduce((acc, num) => {
  acc[num] = Object.values(indegree).filter(deps => deps.includes(num)).length;
  return acc;
}, {});

console.log('Dependency Count:', dependencyCount);

const sortedKeys = Object.entries(dependencyCount)
  .sort((a, b) => a[1] - b[1]) // Sort by dependency count (value)
  .map(entry => parseInt(entry[0])); // Convert keys to numbers

console.log('Sorted Keys:', sortedKeys);

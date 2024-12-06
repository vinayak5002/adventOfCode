const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

const rulesList = lines
  .filter(line => line.trim() && line.includes('|'))
  .map(line =>
    line.split('|')
      .map(num => parseInt(num))
  );

const pages = lines
  .filter(line => line.trim() && !line.includes('|'))
  .map(line =>
    line.split(',')
      .map(num => parseInt(num))
  );


const rules = {};
rulesList.forEach(rule => {
  if (rules[rule[0]]) {
    rules[rule[0]].push(rule[1]);
  } else {
    rules[rule[0]] = [rule[1]];
  }
});

console.log(rules);

const isPageValid = (page) => {
  let blackList = [];
  const n = page.length;

  for (let i = n - 1; i >= 0; i--) {
    if (blackList.includes(page[i])) {
      return false;
    }

    blackList = blackList.concat(rules[page[i]]);
  }

  return true;
}

const inValidPages = pages.filter(page => {
  return !isPageValid(page);
});

const makeValid = (page) => {
  let indegree = page.reduce((acc, num) => {
    acc[num] = rulesList
      .filter(rule => rule[1] === num)
      .map(rule => rule[0]); 
    return acc;
  }, {});
  
  // console.log('Indegree:', indegree);

  let dependencyCount = page.reduce((acc, num) => {
    acc[num] = Object.values(indegree).filter(deps => deps.includes(num)).length;
    return acc;
  }, {});
  
  // console.log('Dependency Count:', dependencyCount);
  
  const newPage = Object.entries(dependencyCount)
    .sort((a, b) => a[1] - b[1]) 
    .map(entry => parseInt(entry[0])); 

  return newPage;
  
}

const validPages = inValidPages.map(page => {return makeValid(page)});

const sumOfMiddlePages = validPages.reduce((acc, page) => {
  return acc + page[Math.floor(page.length / 2)];
}, 0);

console.log(validPages);
console.log(sumOfMiddlePages);
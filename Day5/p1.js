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
      console.log("Rule violated by: ", page[i]);
      return false;
    }

    blackList = blackList.concat(rules[page[i]]);
  }

  return true;
}

// const validPages = pages.filter(page => {
//   return isPageValid(page);
// });


// const sumOfMiddlePages = validPages.reduce((acc, page) => {
//   return acc + page[Math.floor(page.length / 2)];
// }, 0);

// console.log(sumOfMiddlePages);

console.log(isPageValid([97,13,75,29,47]));
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

let mul = true;

const instructions = lines.flatMap((line) => {
  const doRegex = /do(n't)?\(\)/g;
  const insRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let currentInd = 0;

  const matches = [];
  let match;

  while ((match = doRegex.exec(line)) !== null) {
    while ((ins = insRegex.exec(line.slice(currentInd, match.index))) !== null) {
      if (mul) {
        matches.push(ins[0]);
      }
    }

    currentInd = match.index + match[0].length;
    mul = match[0] === "don't()" ? false : true; // true if do(), false if don't()
  }

  while ((ins = insRegex.exec(line.slice(currentInd))) !== null) {
    if (mul) {
      matches.push(ins[0]);
    }
  }

  return matches;
});

let product = 0;

instructions.forEach((ins) => {
  const numRegex = /\d{1,3}/g;

  const nums = ins.match(numRegex);

  product += parseInt(nums[0]) * parseInt(nums[1]);
})

console.log(product);

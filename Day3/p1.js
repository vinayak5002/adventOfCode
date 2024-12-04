const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

const instructions = lines.flatMap((line) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g; 
  const matches = [];
  let match;

  while ((match = regex.exec(line)) !== null) {
    matches.push(match[0]);  
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

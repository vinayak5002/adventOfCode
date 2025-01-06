const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

const splits = lines.map((line) => {
  const [lhs, rhs] = line.split(': ');

  return [parseInt(lhs), rhs.split(' ').map((num) => parseInt(num))];
});

const test = splits.map(([lhs, _]) => lhs);
const values = splits.map(([_, rhs]) => rhs);

const N = test.length;

const concatNums = (a, b) => {
  let c = b;
  let len = 0;

  while(c) {
    c = Math.floor(c / 10);
    len++;
  }

  return a * Math.pow(10, len) + b;
}

let mem = new Map(); // Initialize mem outside of the loop

const check = (test, values, acc) => {
  if (values.length == 0) {
    return test == acc; 
  }

  // Serialize the state (test, values, acc) as a string
  const memoKey = `${test}:${JSON.stringify(values)}:${acc}`;

  // If the result is cached, return it
  if (mem.has(memoKey)) {
    return mem.get(memoKey);
  }

  const top = values[0];

  // Recursive calculations with checks for memoized values
  const lft = check(test, values.slice(1), acc + top);
  const combined = concatNums(acc, top);
  const mid = check(test, values.slice(1), combined);
  const rgt = check(test, values.slice(1), acc * top);

  const result = lft || rgt || mid;

  // Store the result in the cache with the serialized key
  mem.set(memoKey, result);

  return result;
}

let ans = 0;

for (let i = 0; i < N; i++) {
  if (check(test[i], values[i].slice(1), values[i][0])) {
    ans += test[i];
  }
}

console.log(ans);

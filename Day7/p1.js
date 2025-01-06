const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

const splits = lines.map((line) => {
  const [lhs, rhs] = line.split(': ');

  return [parseInt(lhs), rhs.split(' ').map((num) => parseInt(num))];
});

const test = splits.map(([lhs, _]) => lhs);
const values = splits.map(([_, rhs]) => rhs);

const N = test.length;

const check = (test, values, acc) => {
  if (values.length == 0) {
    return test == acc; 
  }

  const top = values[0];

  const lft = check(test, values.slice(1), acc + top);
  const rgt = check(test, values.slice(1), acc * top);

  return lft || rgt;
}

let ans = 0;

for (let i = 0; i < N; i++) {
  if (check(test[i], values[i].slice(1), values[i][0])) {
    ans += test[i];
  }
}

console.log(ans);
const fs = require('fs');

// Reading the input from the file
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

// Regex patterns
const doRegex = /do(n't)?\(\)/g;    // Matches do() or don't()
const insRegex = /mul\((\d+),(\d+)\)/g;  // Matches mul(a,b) with numbers

let mulEnabled = true;  // Initially, mul instructions are enabled
let product = 0;        // Store the result of the multiplications

// Process each line
lines.forEach((line) => {
  let currentInd = 0;   // To track the current index in the line
  let match;
  
  // First, handle the 'do()' and 'don't()' instructions, adjusting mulEnabled flag
  while ((match = doRegex.exec(line)) !== null) {
    // Find mul instructions before the current do() or don't()
    const preInstructions = line.slice(currentInd, match.index);
    let insMatch;
    while ((insMatch = insRegex.exec(preInstructions)) !== null) {
      if (mulEnabled) {
        const num1 = parseInt(insMatch[1]);
        const num2 = parseInt(insMatch[2]);
        product += num1 * num2;
      }
    }

    // Update the current index to after the do() or don't()
    currentInd = match.index + match[0].length;

    // Update the mulEnabled flag based on the current instruction
    mulEnabled = match[0] === "do()" ? true : false;
  }

  // Process any remaining instructions after the last do() or don't()
  const remainingInstructions = line.slice(currentInd);
  let insMatch;
  while ((insMatch = insRegex.exec(remainingInstructions)) !== null) {
    if (mulEnabled) {
      const num1 = parseInt(insMatch[1]);
      const num2 = parseInt(insMatch[2]);
      product += num1 * num2;
    }
  }
});

console.log(product);

const properties = {
  'T': { time: 5, earning: 1500 },
  'P': { time: 4, earning: 1000 },
  'C': { time: 10, earning: 3000 }
}

function calculateEarnings(state, time) {
  let earnings = 0;
  for (const property in state) {
    earnings += properties[property].earning * state[property] * time;
  }
  return earnings;
}

function maximizeEarnings(timeUnits) {
  let sols = new Map();

  function foo(timeLeft, state, earnings) {
    // console.log(timeLeft, state, earnings);
    for(const property in properties) {
      if(timeLeft >= properties[property].time) {
        const newTimeLeft = timeLeft - properties[property].time;

        const newState = { ...state };
        newState[property]++;

        const timeDiff = timeLeft - newTimeLeft;

        const newEarnings = earnings + calculateEarnings(state, timeDiff);

        foo(newTimeLeft, newState, newEarnings);
      }
      else {
        const newEarnings = earnings + calculateEarnings(state, timeLeft);

        if(sols.has(newEarnings)) {
          sols.get(newEarnings).push(state);
        } else {
          sols.set(newEarnings, [state]);
        }        

      }
    }
  }

  foo(timeUnits, { 'T': 0, 'P': 0, 'C': 0 }, 0);

  const maxEarnings = Math.max(...Array.from(sols.keys()));
  // console.log(sols);
  
  const uniqueSolutions = Array.from(new Set(sols.get(maxEarnings)
  .map(a => JSON.stringify(a))))
  .map(e => JSON.parse(e));

  return {
    earnings: maxEarnings,
    solution: uniqueSolutions
  };
}

console.log("Test case: 7", maximizeEarnings(7));  
console.log("Test case: 8", maximizeEarnings(8));  
console.log("Test case: 13", maximizeEarnings(13));
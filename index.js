const BigNumber = require('bignumber.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getMinAndMax() {
  return new Promise((resolve) => {
    rl.question('Enter five integer numbers: ', (answer) => {
      const numbers = answer
        .trim()
        .split(/\s+/)
        .map((number) => new BigNumber(number))
        .sort((a, b) => a.comparedTo(b));

      const lengthNumber = numbers.length;

      if (lengthNumber !== 5) {
        console.log('You must enter five integer numbers');
        resolve(getMinAndMax());
        return;
      }

      let min = new BigNumber(0);
      let max = new BigNumber(0);

      for (let i = 0; i < lengthNumber; i++) {
        if (numbers[i].isNegative() || !numbers[i].isInteger()) {
          console.log('You entered a non-positive-integer number');
          resolve(getMinAndMax());
          return;
        }
        if (i !== 0) {
          max = max.plus(numbers[i]);
        }
        if (i !== lengthNumber - 1) {
          min = min.plus(numbers[i]);
        }
      }

      resolve([min.toString(), max.toString()]);
    });
  });
}

function askToExit() {
  return new Promise((resolve) => {
    rl.question('Do you want to exit? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

async function main() {
  let isExit = false;
  while (!isExit) {
    const [min, max] = await getMinAndMax();
    console.log('Min and max: ' + min + ' ' + max);
    isExit = await askToExit();
  }
  rl.close();
}

main();

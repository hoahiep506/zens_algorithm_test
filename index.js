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

      let totalMin = new BigNumber(0);
      let totalMax = new BigNumber(0);
      let total = new BigNumber(0);
      let min = new BigNumber(Infinity);
      let max = new BigNumber(0);
      let odd = [];
      let even = [];

      for (let i = 0; i < lengthNumber; i++) {
        if (numbers[i].isNegative() || !numbers[i].isInteger()) {
          console.log('You entered a non-positive-integer number');
          resolve(getMinAndMax());
          return;
        }
        if (i !== 0) {
          totalMax = totalMax.plus(numbers[i]);
        }
        if (i !== lengthNumber - 1) {
          totalMin = totalMin.plus(numbers[i]);
        }
        if (numbers[i].modulo(2).isEqualTo(1)) {
          odd.push(numbers[i].toString());
        }
        if (numbers[i].modulo(2).isEqualTo(0)) {
          even.push(numbers[i].toString());
        }
        if (numbers[i].isLessThan(min)) {
          min = numbers[i];
        }
        if (numbers[i].isGreaterThan(max)) {
          max = numbers[i];
        }
        total = total.plus(numbers[i]);
      }

      resolve([
        total.toString(),
        totalMin.toString(),
        totalMax.toString(),
        min.toString(),
        max.toString(),
        odd.join(' '),
        even.join(' '),
      ]);
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
    const [total, totalMin, totalMax, min, max, odd, even] =
      await getMinAndMax();
    console.log('Total: ' + total);
    console.log('Min sum and max sum: ' + totalMin + ' ' + totalMax);
    console.log('Min and max : ' + min + ' ' + max);
    console.log('Odd numbers : ' + odd);
    console.log('Even numbers : ' + even);
    isExit = await askToExit();
  }
  rl.close();
}

main();

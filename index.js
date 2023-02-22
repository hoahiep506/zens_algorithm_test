const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getMinAndMax() {
  return new Promise((resolve) => {
    rl.question('Enter five integer numbers: ', (answer) => {
      const numbers = answer
        .split(' ')
        .map((number) => parseFloat(number))
        .sort((a, b) => a - b);

      const lengthNumber = numbers.length;

      if (lengthNumber !== 5) {
        console.log('You must enter five integer numbers');
        getMinAndMax().then(resolve);
        return;
      }

      let min = 0;
      let max = 0;

      for (let i = 0; i < lengthNumber; i++) {
        if (!Number.isInteger(numbers[i]) || numbers[i] < 0) {
          console.log('You entered a non-positive-integer number');
          getMinAndMax().then(resolve);
          return;
        }
        if (i !== 0) {
          max += numbers[i];
        }
        if (i !== lengthNumber - 1) {
          min += numbers[i];
        }
      }

      resolve(console.log('Min and max: ' + min + ' ' + max));
      rl.close();
    });
  });
}

getMinAndMax();

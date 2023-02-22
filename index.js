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
        process.stderr.write('You must enter five integer numbers');
        return resolve(getMinAndMax());
      }

      let min = 0;
      let max = 0;

      for (let i = 0; i < lengthNumber; i++) {
        if (!Number.isInteger(numbers[i]) || numbers[i] < 0) {
          process.stderr.write('You entered a non-positive-integer number');
          return resolve(getMinAndMax());
        }
        if (i !== 0) {
          max += numbers[i];
        }
        if (i !== lengthNumber - 1) {
          min += numbers[i];
        }
      }

      resolve([min, max]);
    });
  });
}

(async function () {
  const [min, max] = await getMinAndMax();
  console.log('Min and max: ' + min + ' ' + max);
  rl.close();
})();

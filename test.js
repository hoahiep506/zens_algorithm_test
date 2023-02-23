const assert = require('assert');
const BigNumber = require('bignumber.js');

function getMinAndMax(str) {
  return new Promise((resolve) => {
    const numbers = str
      .trim()
      .split(/\s+/)
      .map((number) => new BigNumber(number))
      .sort((a, b) => a.comparedTo(b));

    const lengthNumber = numbers.length;

    if (lengthNumber !== 5) {
      console.log('You must enter five integer numbers');
      resolve([]);
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
        resolve([]);
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
}

describe('getMinAndMax', () => {
  it('should return the correct min and max values for input "1 2 3 4 5"', async () => {
    const [total, min, max] = await getMinAndMax('1 2 3 4 5');
    assert.strictEqual(total, '15');
    assert.strictEqual(min, '10');
    assert.strictEqual(max, '14');
  });

  it('should return the correct min and max values for input " 1 2 3 4 5"', async () => {
    const [total, min, max] = await getMinAndMax(' 1 2 3 4 5');
    assert.strictEqual(total, '15');
    assert.strictEqual(min, '10');
    assert.strictEqual(max, '14');
  });

  it('should return the correct min and max values for input "1 4 2 3 5 "', async () => {
    const [total, min, max] = await getMinAndMax('1 4 2 3 5 ');
    assert.strictEqual(total, '15');
    assert.strictEqual(min, '10');
    assert.strictEqual(max, '14');
  });

  it('should return the correct min and max values for input "1  2  3  4  5"', async () => {
    const [total, min, max] = await getMinAndMax('1  2  3  4  5');
    assert.strictEqual(total, '15');
    assert.strictEqual(min, '10');
    assert.strictEqual(max, '14');
  });

  it('should return the correct min and max values for input "2147483641 2147483642 2147483643 3147483648 41474836410"', async () => {
    const [total, min, max] = await getMinAndMax(
      '2147483641 2147483642 2147483643 3147483648 41474836410'
    );
    assert.strictEqual(total, '51064770984');
    assert.strictEqual(min, '9589934574');
    assert.strictEqual(max, '48917287343');
  });

  it('should return an error message for input "1 2 3 4"', async () => {
    const [total, min, max] = await getMinAndMax('1 2 3 4');
    assert.strictEqual(total, undefined);
    assert.strictEqual(min, undefined);
    assert.strictEqual(max, undefined);
  });

  it('should return an error message for input "1 2 3 -4 5"', async () => {
    const [total, min, max] = await getMinAndMax('1 2 3 -4 5');
    assert.strictEqual(total, undefined);
    assert.strictEqual(min, undefined);
    assert.strictEqual(max, undefined);
  });

  it('should return an error message for input "1.5 2 3 4 5"', async () => {
    const [total, min, max] = await getMinAndMax('1.5 2 3 4 5');
    assert.strictEqual(total, undefined);
    assert.strictEqual(min, undefined);
    assert.strictEqual(max, undefined);
  });

  it('should return an error message for input "1 2 a 2 4"', async () => {
    const [total, min, max] = await getMinAndMax('1 2 a 2 4');
    assert.strictEqual(total, undefined);
    assert.strictEqual(min, undefined);
    assert.strictEqual(max, undefined);
  });
});

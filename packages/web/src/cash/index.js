/*
 * Helper functions to work with cash/denominations
 */

const TYPES = {
  NOTE: 'NOTE',
  BIG_COIN: 'BIG_COIN',
  SMALL_COIN: 'SMALL_COIN',
};

const SIZES = {
 [TYPES.NOTE]: [1000, 500, 200, 100, 50],
 [TYPES.BIG_COIN]: [20, 5 ,2],
 [TYPES.SMALL_COIN]: [10, 1],
};

// Initial collection of notes and coins with
// total amount of 14360. Change the counts
// to increase or decrease payable amount of the ATM.
// Dinni binni bonni
const getReserve = () => ([
  { value: 1000, count: 5 },
  { value: 500, count: 10 },
  { value: 200, count: 10 },
  { value: 100, count: 10 },
  { value: 50, count: 15 },
  { value: 20, count: 15 },
  { value: 10, count: 15 },
  { value: 5, count: 20 },
  { value: 2, count: 20 },
  { value: 1, count: 20 },
]);

const getTotal = cashReserve => cashReserve.reduce(
  (acc, { value, count }) => acc + value * count,
  0,
);

// Split the amount into denominations.
// Uses simple greedy approach that works
// reasonably ok, but is not optimal in cases
// where the next denomination is not at least
// twice more than current one.
//
// Example: Let's say we have denominations of
//          100, 80, 50 and 10. Note that 2*80 is
//          more than 100.
//          With greedy approach below, an amount of 160
//          would be split into three notes: 100, 50 and 10.
//          This is not optimal. The optimal solution is two
//          notes of 80.
const getChange = (amount, cashReserve) =>
  cashReserve
    .filter(x => x.count > 0)
    .reduce(
      (acc, { value, count }) => {
        if (value > acc.rest) {
          return acc;
        }

        let coins = Math.floor(acc.rest / value);
        if (coins > count) {
          coins = count;
        }

        acc.rest = acc.rest - coins * value;
        acc.change.push({ value, count: coins });

        return acc;
      },
      { rest: amount, change: [] },
    );

// Subtracts change from cashReserve
const subtractChange = (change, cashReserve) =>
  cashReserve.reduce((acc, { value, count }) => {
    const denomination = change.find(x => x.value === value);
    const newCount = denomination
      ? count - denomination.count
      : count;

    acc.push({ value, count: newCount });
    return acc;
  }, []);

module.exports = {
  getReserve,
  getTotal,
  getChange,
  subtractChange,
  TYPES,
  SIZES,
};

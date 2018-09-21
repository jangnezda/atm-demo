const assert = require('assert');

const cash = require('./index');

describe('cash', function() {
  describe('#getTotal()', function() {
    it('should return the sum of all denominations', () => {
      const reserve = cash.getReserve();
      const total = cash.getTotal(reserve);
      assert.equal(14360, total);
    });
  });

  describe('#getChange()', function() {
    it('should return no denominations if amount is 0', () => {
      const reserve = cash.getReserve();
      const { rest, change } = cash.getChange(0, reserve);
      assert.equal(0, rest);
      assert.deepEqual(change, []);
    });

    it('should return all denominations + some rest if amount is bigger than total', () => {
      const reserve = cash.getReserve();
      const { rest, change } = cash.getChange(15000, reserve);
      assert.equal(true, rest > 0);
      assert.deepEqual(reserve, change);
    });

    it('should return 100, 50 and 10 for amount 160', () => {
      const reserve = cash.getReserve();
      const { rest, change } = cash.getChange(160, reserve);
      assert.equal(0, rest);
      assert.deepEqual([
        { value: 100, count: 1 },
        { value: 50, count: 1 },
        { value: 10, count: 1 },
      ], change);
    });
  });

  describe('#subtractChange()', function() {
    it('should subtract denominations', () => {
      const change = [
        { value: 50, count: 5 },
        { value: 10, count: 2 },
      ];
      const reserve = [
        { value: 100, count: 10 },
        { value: 50, count: 10 },
        { value: 10, count: 10 },
      ];

      const subtracted = cash.subtractChange(change, reserve);

      assert.deepEqual([
        { value: 100, count: 10 },
        { value: 50, count: 5 },
        { value: 10, count: 8 },
      ], subtracted);
    });
  });
});

const { expect } = require('chai');

const { calculateFee } = require('./feeCalculator');

const feeConfiguration = {
  depositFeePercent: '4',
  depositFeeCents: '30'
};

describe('feeCalculator', () => {
  it('returns an object with total fees and amount', () => {
    const baseAmount = 500;
    expect(calculateFee(baseAmount, feeConfiguration)).to.eql({
      amount: 500,
      fee: 50,
      total: 550
    });
  });

  describe('when amount is zero', () => {
    it('returns an object with all zeros', () => {
      const baseAmount = 0;
      expect(calculateFee(baseAmount, feeConfiguration)).to.eql({
        amount: baseAmount,
        fee: 0,
        total: 0
      });
    });
  });
});
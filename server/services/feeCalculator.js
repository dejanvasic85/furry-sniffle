const AUD_BASE_VALUE = 100;

module.exports = {
  calculateFee: (baseAmount, { depositFeePercent, depositFeeCents }) => {
    if (baseAmount <= 0) {
      return { total: 0, fee: 0, amount: 0 };
    }
    const fee = (baseAmount * (Number(depositFeePercent) / AUD_BASE_VALUE)) + Number(depositFeeCents);
    return {
      total: fee + baseAmount,
      fee,
      amount: baseAmount
    }
  }
};

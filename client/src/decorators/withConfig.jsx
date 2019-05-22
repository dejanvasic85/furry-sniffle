import React from 'react';

const config = {
  stripe_key: process.env.REACT_APP_STRIPE_KEY || '1234',
  feeConfiguration: {
    depositFeePercent: Number(process.env.REACT_APP_DEPOSIT_FEE_PERCENT),
    depositFeeCents: Number(process.env.REACT_APP_DEPOSIT_FEE_CENTS),
  }
}

const withConfig = (WrappedComponent) => props => (<WrappedComponent {...props} config={config} />);

export default withConfig;
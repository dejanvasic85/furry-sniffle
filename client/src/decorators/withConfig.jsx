import React from 'react';

const config = {
  stripe_key: process.env.REACT_APP_STRIPE_KEY || 'pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH',
  feeConfiguration: {
    depositFeePercent: Number(process.env.REACT_APP_DEPOSIT_FEE_PERCENT || 3),
    depositFeeCents: Number(process.env.REACT_APP_DEPOSIT_FEE_CENTS || 50),
  }
}

const withConfig = (WrappedComponent) => props => (<WrappedComponent {...props} config={config} />);

export default withConfig;
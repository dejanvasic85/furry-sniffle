import React from 'react';

const config = {
  stripe_key: process.env.STRIPE_KEY || "pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH",
  feeConfiguration: {
    depositFeePercent: process.env.DEPOSIT_FEE_PERCENT || 3,
    depositFeeCents: process.env.DEPOSIT_FEE_CENTS || 30,
  }
}

const withConfig = (WrappedComponent) => props => (<WrappedComponent {...props} config={config} />);

export default withConfig;
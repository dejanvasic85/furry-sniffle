import React from 'react';
import  loadConfig from '../envConfig.js';

const config = {
  stripe_key: loadConfig().stripe.apiKey,
  feeConfiguration: {
    depositFeePercent: loadConfig().stripe.depositFeePercent,
    depositFeeCents:  loadConfig().stripe.depositFeeCents,
  }
}

const withConfig = (WrappedComponent) => props => (<WrappedComponent {...props} config={config} />);

export default withConfig;
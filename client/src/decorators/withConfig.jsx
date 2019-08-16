import React from 'react';

//import  loadConfig from '../envConfig.js';

import  selectedConfigSet from '../envConfig';
const { stripe } = selectedConfigSet;

const config = {
  stripe_key: stripe.apiKey,
  feeConfiguration: {
    depositFeePercent: stripe.depositFeePercent,
    depositFeeCents:  stripe.depositFeeCents,
  }
}

const withConfig = (WrappedComponent) => props => (<WrappedComponent {...props} config={config} />);

export default withConfig;
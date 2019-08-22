import React from 'react';

//import  loadConfig from '../envConfig.js';

import  selectedConfigSet from '../envConfig';
const { stripe } = selectedConfigSet;

export interface IConfig{
  stripe_key: string,
  feeConfiguration:{
    depositFeePercent: number
    depositFeeCents: number
  }

}

const config: IConfig = {
  stripe_key: stripe.apiKey,
  feeConfiguration: {
    depositFeePercent: stripe.depositFeePercent,
    depositFeeCents:  stripe.depositFeeCents,
  }
}

const withConfig = (WrappedComponent) => props => (<WrappedComponent {...props} config={config} />);

export default withConfig;
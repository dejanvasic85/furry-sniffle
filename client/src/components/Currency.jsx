import React from 'react';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';

const Currency = ({ baseAmount }) => {
  return <CurrencyFormat value={baseAmount / 100}
    displayType={'text'} 
    decimalScale={2}
    fixedDecimalScale={true}
    thousandSeparator={true}
    prefix={'$'}
  />
}

Currency.propTypes = {
  baseAmount: PropTypes.number.isRequired
};

export default Currency;
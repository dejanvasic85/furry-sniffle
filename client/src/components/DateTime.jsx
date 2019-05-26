import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

export default function DateTime(props) {
  const formated = format(props.date,"Do MMM YYYY H:mA");
  return <span>{formated}</span>;
}

DateTime.propTypes = {
  date: PropTypes.string.isRequired
};
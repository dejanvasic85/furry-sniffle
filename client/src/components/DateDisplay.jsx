import React from 'react';
import PropTypes from 'prop-types';
import humanDate from 'human-date';

export default function DateDisplay(props) {
  const humanReadable = humanDate.relativeTime(props.date);
  return <span>{humanReadable}</span>;
}

DateDisplay.propTypes = {
  date: PropTypes.string.isRequired
};
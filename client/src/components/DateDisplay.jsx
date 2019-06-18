import React from 'react';
import PropTypes from 'prop-types';
import humanDate from 'human-date';

export default function DateDisplay(props) {
  let humanReadable = humanDate.relativeTime(props.date);
  
  var delta = Math.round((new Date() - new Date(props.date)) / 1000);
  if (delta < 30) {
    humanReadable = 'just then';
  }
  return <span>{humanReadable}</span>;
}

DateDisplay.propTypes = {
  date: PropTypes.string.isRequired
};

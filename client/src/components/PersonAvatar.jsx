import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main
  }
});

export const getOrDefault = prop => {
  return prop ? prop.substring(0, 1).toUpperCase() : '';
}

export const PersonAvatar = ({ classes, details }) => {
  return <Avatar className={classes.root}>
    {getOrDefault(details.firstName)}
    {getOrDefault(details.lastName)}
  </Avatar>;
};

PersonAvatar.propTypes = {
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonAvatar);
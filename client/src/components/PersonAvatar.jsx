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

export const PersonAvatar =({classes, details}) => {
  if (!details || !details.firstName) {
    return null;
  }

  return <Avatar className={classes.root}>
    {details.firstName.substring(0, 1).toUpperCase()}
    {details.lastName.substring(0, 1).toUpperCase()}
  </Avatar>;
};

PersonAvatar.propTypes = { 
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonAvatar);
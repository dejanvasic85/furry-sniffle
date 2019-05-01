import React from 'react';
import PropTypes from 'prop-types';
import { Button as MaterialButton, CircularProgress, withStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  wrapper: {
    position: 'relative'
  },
  progress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
});

const Button = props => {
  const { classes, disabled, isFetching, children, ...restProps } = props;

  return <div className={classes.wrapper}>
    <MaterialButton {...restProps} disabled={disabled || isFetching}>
      {children}
    </MaterialButton>
    {isFetching && <CircularProgress size={24} className={classes.progress} />}
  </div>
};

Button.propTypes = {
  isFetching: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Button.defaultProps = {
  isFetching: false
};

export default withStyles(styles)(Button);
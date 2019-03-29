import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  textRoot: {
    margin: theme.spacing.unit
  },
  searchIcon: {
    marginRight: '10px'
  }
});

const SearchInput = (props) => {
  const { classes, onSearchTextChange } = props;

  return <TextField
    id="outlined-adornment-weight"
    className={classes.textRoot}
    variant="outlined"
    label="Search"
    onChange={onSearchTextChange}
    fullWidth
    InputProps={{
      startAdornment: <InputAdornment position="end"><Search className={classes.searchIcon} /></InputAdornment>,
    }}
  />;
}

SearchInput.propTypes = {
  onSearchTextChange: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchInput);
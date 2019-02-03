import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    position: 'relative',
    minHeight: 600,  
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class ClientsPage extends React.Component {

  addClient = () => {
    this.props.history.push('/clients/new');
  }

  render() {
    const { classes } = this.props;
    console.log('props', this.props)
    return <div>
      <Typography variant="h6">Client Management</Typography>
      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addClient}>
        <AddIcon />
      </Fab>
    </div>;
  }
}

export default withRouter(withStyles(styles)(ClientsPage));
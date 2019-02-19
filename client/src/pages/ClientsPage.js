import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { apiClient } from '../apiClient';

const styles = theme => ({
  root: {
    position: 'relative'
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
  state = {
    clients: []
  };

  componentDidMount() {
    apiClient.getClients().then(clients => this.setState({clients}));
  }

  addClient = () => {
    this.props.history.push('/clients/new');
  }

  render() {
    const { classes } = this.props;
    const { clients } = this.state;

    console.log('clients', clients);

    return <div>
      <Typography variant="h6">Client Management</Typography>
      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addClient}>
        <AddIcon />
      </Fab>
    </div>;
  }
}

export default withRouter(withStyles(styles)(ClientsPage));
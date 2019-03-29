import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {
  Fab,
  List
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import ClientListItem from '../components/ClientListItem';
import SearchInput from '../components/SearchInput';
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
  clients: {
    backgroundColor: theme.palette.background.paper
  }
});

class ClientsPage extends React.Component {
  state = {
    clients: []
  };

  componentDidMount() {
    apiClient.getClients().then(clients => this.setState({ clients }));
  }

  addClient = () => {
    this.props.history.push('/app/clients/new');
  }

  handleClientClick = (client) => {
    this.props.history.push(`/app/clients/${client.id}`)
  }

  handleSearchTextchange = event => {
    console.log('criteria', event.target.value);
  }

  render() {
    const { classes } = this.props;
    const { clients } = this.state;

    return <>
      <SearchInput onSearchTextChange={this.handleSearchTextchange} />
      <List className={classes.clients}>
        {
          clients.map(client => (<ClientListItem 
            key={client.id} 
            client={client} 
            onClick={() => this.handleClientClick(client)} />))
        }
      </List>
      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addClient}>
        <AddIcon />
      </Fab>
    </>;
  }
}

export default withRouter(withStyles(styles)(ClientsPage));
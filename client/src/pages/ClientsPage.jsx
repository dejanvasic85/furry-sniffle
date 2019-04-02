import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {
  Fab,
  List,
  Paper
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import ClientListItem from '../components/ClientListItem';
import SearchInput from '../components/SearchInput';
import Loader from '../components/Loader';
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
  },
  search: {
    padding: '20px'
  }
});

class ClientsPage extends React.Component {
  state = {
    clients: [],
    filteredClients: [],
    filter: '',
    isFetching: true
  };

  async componentDidMount() {
    const clients = await apiClient.getClients();
    this.setState({ clients, isFetching: false });
  }

  addClient = () => {
    this.props.history.push('/app/clients/new');
  }

  handleClientClick = (client) => {
    this.props.history.push(`/app/clients/${client.id}`)
  }

  handleSearchTextchange = event => {
    const filter = event.target.value.toLowerCase();
    const filteredClients = this.state.clients
      .filter(({ firstName, lastName, email }) => {
        return firstName.toLowerCase().indexOf(filter) > -1 ||
          lastName.toLowerCase().indexOf(filter) > -1 ||
          email.toLowerCase().indexOf(filter) > -1;
      });

    this.setState({
      filter: event.target.value,
      filteredClients
    });
  }

  render() {
    const { classes } = this.props;
    const { clients, filteredClients, filter, isFetching } = this.state;

    const clientsToDisplay = filter
      ? filteredClients
      : clients;

    return <Paper>
      <div className={classes.search}>
        <SearchInput value={filter}
          onSearchTextChange={this.handleSearchTextchange} />
      </div>
      {
        isFetching && <Loader />
      }
      {
        !isFetching && <>
          <List className={classes.clients}>
            {
              clientsToDisplay.map(client => (<ClientListItem
                key={client.id}
                client={client}
                onClick={() => this.handleClientClick(client)} />))
            }
          </List>
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addClient}>
            <AddIcon />
          </Fab>
        </>
      }
    </Paper>;
  }
}

export default withRouter(withStyles(styles)(ClientsPage));
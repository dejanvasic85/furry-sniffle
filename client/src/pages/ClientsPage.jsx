import React from 'react';
import { compose } from 'recompose';

import { withRouter } from 'react-router-dom';
import {
  Fab,
  List,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import withApiClient from '../decorators/withApiClient';
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
  padded: {
    padding: '20px'
  }
});

export class ClientsPage extends React.Component {
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

    return <div className={classes.root}>
      <Paper>
        {
          isFetching && <Loader />
        }
        {
          !isFetching && clientsToDisplay.length > 0 && <>
            <div className={classes.padded}>
              <SearchInput value={filter}
                onSearchTextChange={this.handleSearchTextchange} />
            </div>
            <List className={classes.clients}>
              {
                clientsToDisplay.map(client => (<ClientListItem
                  key={client.id}
                  client={client}
                  onClick={() => this.handleClientClick(client)} />))
              }
            </List>

          </>
        }
        {
          !isFetching && clientsToDisplay.length === 0 && <>
            <div className={classes.padded}>
              <Typography variant="h6">
                No clients at the moment
          </Typography>
              <Typography variant="body1">
                Click on the plus icon in the bottom right to add one. Or you can always
              &nbsp;<a href="mailto:dejanvasic24@gmail.com?subject=Import Clients Please">email</a>
                &nbsp;us an exported file and we can add them for you.
          </Typography>
            </div>
          </>
        }
      </Paper>
      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addClient}>
        <AddIcon />
      </Fab>
    </div>;
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(ClientsPage);

import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { Fab, List, Paper, Typography, withStyles } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { withApiClient } from '../decorators';
import ClientListItem from './ClientListItem';
import { Loader, SearchInput, Alert } from '../components';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  clients: {
    backgroundColor: theme.palette.background.paper,
  },
  padded: {
    padding: '20px',
  },
});

export class ClientsPage extends React.Component {
  state = {
    clients: [],
    clientsWithoutEmails: 0,
    filteredClients: [],
    filter: '',
    isFetching: true
  };

  async componentDidMount() {
    const { clients, clientsWithoutEmails } = await this.props.api.getClients();
    this.setState({ clients, clientsWithoutEmails, isFetching: false });
  }

  addClient = () => {
    this.props.history.push('/app/clients-new');
  };

  handleSearchTextchange = event => {
    const filter = event.target.value.toLowerCase();
    const filteredClients = this.state.clients.filter(({ firstName, lastName, email }) => {
      return (
        firstName.toLowerCase().indexOf(filter) > -1 ||
        lastName.toLowerCase().indexOf(filter) > -1 ||
        email.toLowerCase().indexOf(filter) > -1
      );
    });

    this.setState({
      filter: event.target.value,
      filteredClients,
    });
  };

  render() {
    const { classes } = this.props;
    const { clients, clientsWithoutEmails, filteredClients, filter, isFetching } = this.state;

    const clientsToDisplay = filter ? filteredClients : clients;
    const shouldDisplayEmailLink = clients && clients.length > 0 && clientsWithoutEmails > 0;

    return (
      <Fragment>
        {isFetching && <Loader />}
        {!isFetching && (
          <Fragment>
            <Paper className={classes.padded}>
              {!isFetching && (
                <Fragment>
                  { shouldDisplayEmailLink && (
                    <Alert 
                      message={<span>Looks like some clients need to be emailed. 
                        <Link to="/app/email?clientIds=unnotified" color="inherit">
                          -> Let's see
                        </Link></span>}
                      variant="warning" />
                  )}
                  <div className={classes.padded}>
                    <SearchInput value={filter} onSearchTextChange={this.handleSearchTextchange} />
                  </div>
                  <List className={classes.clients}>
                    {clientsToDisplay.map(client => (
                      <ClientListItem key={client.id} client={client} />
                    ))}
                  </List>
                </Fragment>
              )}
              {clients.length === 0 && (
                <Fragment>
                  <div className={classes.padded}>
                    <Typography variant="h6">No clients at the moment</Typography>
                    <Typography variant="body1">
                      Click on the plus icon in the bottom right to add one. Or you can always &nbsp;
                      <a href="mailto:dejanvasic24@gmail.com?subject=Import Clients Please">email</a>
                      &nbsp;us an exported file and we can add them for you.
                    </Typography>
                  </div>
                </Fragment>
              )}
            </Paper>
          </Fragment>
        )}

        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addClient}>
          <AddIcon />
        </Fab>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(ClientsPage);

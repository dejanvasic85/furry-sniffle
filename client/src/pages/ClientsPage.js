import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

    return <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Referral Code</TableCell>
            <TableCell align="right">Referral Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(c => (
            <TableRow key={c.id}>
              <TableCell component="th" scope="row">
                {c.firstName} {c.lastName}
              </TableCell>
              <TableCell align="right">{c.email}</TableCell>
              <TableCell align="right">{c.phone}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addClient}>
        <AddIcon />
      </Fab>
    </>;
  }
}

export default withRouter(withStyles(styles)(ClientsPage));
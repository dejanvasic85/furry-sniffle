import React from 'react';
import format from 'date-fns/format';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import EmailInteraction from './EmailInteraction';

const styles = theme => ({
  root: {
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class ClientEmails extends React.Component {
  render() {
    const { emails, classes } = this.props;

    return (
      <Card>
        <CardHeader title="Interactions" />
        <CardContent>
          
          {/* <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right">Sent</TableCell>
                <TableCell align="right">Delivered</TableCell>
                <TableCell align="right">Opened</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.map(c => (
                <TableRow key={c.id}>
                  <TableCell align="right">
                    {formatDate(c.createdAt, false)}
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(c.deliveredAt, true)}
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(c.openedAt, true)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ClientEmails);

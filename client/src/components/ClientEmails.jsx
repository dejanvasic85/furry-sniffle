import React from 'react';
import format from 'date-fns/format';

// Material
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Fab } from '@material-ui/core';
import EmailRounded from '@material-ui/icons/EmailRounded';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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

const formatDate = (date, includeIcon) => {
  if (date) {
    const formattedDate = format(date, 'D MMM YYYY h:mm A');
    return (
      <span>
        {includeIcon && <DoneIcon />}
        <span>{formattedDate}</span>
      </span>
    );
  } else {
    return <span>...</span>;
  }
};
class ClientEmails extends React.Component {
  render() {
    const { emails, classes, sendEmail } = this.props;

    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Emails sent
          </Typography>
          <Table className={classes.table}>
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
          </Table>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={sendEmail}>
            <EmailRounded />
            Send Email
          </Button>
        </CardActions>
      </Card>

      // <Fab
      //   color="primary"
      //   aria-label="Sent"
      //   className={classes.fab}
      //   onClick={sendEmail}
      // >
      //   <EmailRounded />
      // </Fab>
      //</>
    );
  }
}

export default withStyles(styles)(ClientEmails);

import React, { useState, useEffect, Fragment } from 'react';
import { parse } from 'query-string';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Chip, Paper, withStyles, Typography, colors } from '@material-ui/core';

import { withApiClient, withAuth } from '../decorators';

import { Alert, Loader } from '../components';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  emailInfo: {
    marginTop: '20px',
    paddingBottom: '8px',
    borderBottom: `1px solid ${colors.grey[500]}`
  },
  emailChip: {
    marginRight: '8px'
  },
  label: {
    color: colors.grey[600]
  }
});

const EmailPage = ({ api, location, classes, ...props }) => {
  const [recipients, setRecipients] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const { clientIds } = parse(location.search);

  useEffect(() => {
    const fetchRecipients = async () => {
      const recipients = await api.getClientEmails(clientIds);
      setRecipients(recipients.emails);
      setIsFetching(false);
    };

    if (isFetching && clientIds) {
      fetchRecipients();
    }
  }, [isFetching, recipients, clientIds, api]);

  if (!clientIds) {
    return (
      <Paper className={classes.root}>
        <Alert 
          message="Ooops. Something seems to be missing."
          variant="error" />
      </Paper>
    );
  }

  return (
    <Paper className={classes.root}>
      {isFetching && <Loader />}
      {!isFetching && (
        <Fragment>
          <Typography variant="h5">
            Preview Email and Send
          </Typography>
          <div className={classes.emailInfo}>
            <Typography className={classes.label}>Recipients: </Typography>
            {recipients.map(r => <Chip color="primary" key={r} label={r} className={classes.emailChip}/>) }
          </div>

          <div className={classes.emailInfo}>
            <Typography className={classes.label}>Subject</Typography>
            <Typography>Testing something</Typography>
          </div>

          <div className={classes.emailInfo}>
            <Typography className={classes.label}>Body</Typography>
            <div>

            </div>
          </div>
        </Fragment>
      )}
    </Paper>
  );
};

export default compose(
  withRouter,
  withApiClient,
  withAuth,
  withStyles(styles)
)(EmailPage);

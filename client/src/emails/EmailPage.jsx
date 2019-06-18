import React, { useState, useEffect, Fragment } from 'react';
import { parse } from 'query-string';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Paper, withStyles, Typography } from '@material-ui/core';

import { withApiClient, withAuth } from '../decorators';

import { Alert, Loader } from '../components';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
});

const EmailPage = ({ api, location, classes, ...props }) => {
  const [recipients, setRecipients] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const { clientIds } = parse(location.search);

  useEffect(() => {
    const fetchRecipients = async () => {
      const recipients = await api.getClientEmails(clientIds);
      setRecipients(recipients);
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
            Send Email
          </Typography>
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

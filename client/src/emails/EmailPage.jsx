import React, { useState, useEffect, Fragment } from 'react';
import { parse } from 'query-string';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import {
  Avatar,
  Chip,
  Paper,
  withStyles,
  Typography,
  colors
} from '@material-ui/core';

import { withApiClient, withAuth } from '../decorators';

import { Alert, Button, Loader } from '../components';
import EmailPreview from './EmailPreview';

const getAvatar = ({ firstName, lastName }) =>
  (<span>
    {firstName.substring(0, 1).toUpperCase()}
    {lastName.substring(0, 1).toUpperCase()}
  </span>
  );

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  emailInfo: {
    marginTop: '20px',
    paddingBottom: '8px',
    borderBottom: `1px solid ${colors.grey[500]}`
  },
  label: {
    color: colors.grey[600]
  },
  chips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  chip: {
    margin: (theme.spacing.unit / 2)
  },
  alert: {
    marginTop: '8px'
  },
  actions: {
    marginTop: '8px',
    display: 'flex',
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  progress: {
    margin: '0 20px'
  }
});

const EmailPage = ({ api, location, classes, ...props }) => {
  const [recipients, setRecipients] = useState([]);
  const [agent, setAgent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSendingEmails, setIsSendingEmails] = useState(false);
  const [sentEmailCount, setSentEmailCount] = useState(0);

  const { clientIds } = parse(location.search);

  useEffect(() => {
    const fetchData = async () => {
      const { clients } = await api.getClientEmails(clientIds);
      const agent = await api.getAgent();

      setRecipients(clients);
      setAgent(agent);
      setIsFetching(false);
    };

    if (isFetching && clientIds) {
      fetchData();
    }
  }, [isFetching, recipients, clientIds, agent, api]);

  if (!clientIds) {
    return (
      <Paper className={classes.root}>
        <Alert
          message="Ooops. Something seems to be missing."
          variant="error" />
      </Paper>
    );
  }

  const sendEmails = () => {
    setIsSendingEmails(true);
  }

  const hasMultipleRecipients = recipients && recipients.length > 1;

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
            <div className={classes.chips}>
              {recipients.map(r =>
                <div key={r.id} className={classes.chip}>
                  <Chip
                    avatar={<Avatar>{getAvatar(r)}</Avatar>}
                    color="primary"
                    label={<span>{r.email}</span>}
                  />
                </div>)
              }
            </div>
          </div>

          <div className={classes.emailInfo}>
            <Typography className={classes.label}>Subject</Typography>
            <Typography>Testing something</Typography>
          </div>

          <div className={classes.emailInfo}>
            <Typography className={classes.label}>Body</Typography>
            <EmailPreview
              agentName={agent.firstName}
              clientName={recipients[0].firstName} />
            {
              recipients.length > 1 && (
                <Alert
                  message="Note: The first name is changed based on each recipient"
                  variant="success"
                  className={classes.alert} />
              )
            }
          </div>

          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              onClick={sendEmails}
              isFetching={isSendingEmails}>
              Send
            </Button>

            {
              isSendingEmails && hasMultipleRecipients && (
                <div className={classes.progress}>
                  <Typography>Sending {sentEmailCount} / {recipients.length} - Please Wait...</Typography>
                </div>
              )
            }
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

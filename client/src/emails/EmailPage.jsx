import React, { useState, useEffect, Fragment } from 'react';
import { parse } from 'query-string';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Avatar, Chip, Paper, withStyles, Typography, colors } from '@material-ui/core';

import { withApiClient, withAuth } from '../decorators';

import { Alert, Button, Loader } from '../components';
import EmailPreview from './EmailPreview';

const MAX_RECIPIENTS_TO_SHOW = 5;

const getAvatar = ({ firstName, lastName }) => (
  <span>
    {firstName.substring(0, 1).toUpperCase()}
    {lastName.substring(0, 1).toUpperCase()}
  </span>
);

const styles = theme => ({
  root: {
    padding:'40px',
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
    margin: theme.spacing.unit / 2
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

const getFullName = ({ firstName, lastName }) => (`${firstName} ${lastName}`);

const EmailPage = ({ api, location, classes, ...props }) => {
  const [recipients, setRecipients] = useState([]);
  const [agent, setAgent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

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

  const sendEmails = async () => {
    setIsSending(true);
    await api.sendBatchClientEmails(recipients.map(({ id }) => id));
    setIsSent(true);
  };

  const recipientsToDisplay =
    recipients && recipients.length > MAX_RECIPIENTS_TO_SHOW ? recipients.slice(0, 5) : recipients;

  return (
    <Paper className={classes.root}>
      {isFetching && <Loader />}
      {!isFetching && (
        <Fragment>
          <Typography variant="h5">Preview Email and Send</Typography>
          <div className={classes.emailInfo}>
            <Typography className={classes.label}>
              Recipients:
              {recipients.length > 1 && <span> (Total {recipients.length})</span>}
            </Typography>
            <div className={classes.chips}>
              {recipientsToDisplay.map(r => (
                <div key={r.id} className={classes.chip}>
                  <Chip
                    avatar={<Avatar>{getAvatar(r)}</Avatar>}
                    color="primary"
                    label={<span>{r.email}</span>}
                  />
                </div>
              ))}
              {recipients.length > MAX_RECIPIENTS_TO_SHOW && (
                <div className={classes.chip}>
                  <Chip
                    label={`... +${recipients.length - MAX_RECIPIENTS_TO_SHOW}`}
                    color="primary"
                  />
                </div>
              )}
            </div>
          </div>

          <div className={classes.emailInfo}>
            <Typography className={classes.label}>Subject</Typography>
            <Typography>{`${getFullName(agent)} from ${agent.businessName} has invited you`} </Typography>
          </div>

          <div className={classes.emailInfo}>
            <Typography className={classes.label}>Body</Typography>
            <EmailPreview agentName={getFullName(agent)} businessName={agent.businessName} />
          </div>

          {
            !isSent && (
              <div className={classes.actions}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendEmails}
                  isFetching={isSending}
                >
                  Send
                </Button>
              </div>
            )
          }

          {
            isSent && (
              <Alert
                className={classes.alert}
                variant="success"
                message="Successfuly Sent"
              />
            )
          }

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

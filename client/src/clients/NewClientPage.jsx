import React from 'react';
import { compose } from 'recompose';
import { Redirect, Link } from 'react-router-dom';
import { Paper, withStyles, Typography } from '@material-ui/core';

import { withApiClient } from '../decorators';
import ClientEditor from './ClientEditor';
import { Alert, Loader } from '../components';
import { agentRequiresSetup } from '../services/agentService';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class NewClientPage extends React.Component {
  state = {
    saved: false,
    isAgentFetching: true,
    isFetching: false,
    error: null,
    signupRequired: true
  };

  async componentDidMount() {
    const { api } = this.props;
    const agent = await api.getAgent();
    this.setState({
      isAgentFetching: false,
      signupRequired: agentRequiresSetup(agent)
    });
    console.log('requires setup', agentRequiresSetup(agent));
  }

  handleAlertClose = () => {
    this.setState({ error: null });
  };

  handleSave = async clientDetails => {
    this.setState({ isFetching: true });
    try {
      await this.props.api.createClient(clientDetails);
      this.setState({ saved: true, isFetching: false });
    } catch (e) {
      this.setState({ saved: false, isFetching: false, error: e });
    }
  };

  render() {
    const { saved, isAgentFetching, isFetching, error, signupRequired } = this.state;
    const { classes } = this.props;

    if (isAgentFetching) {
      return (
        <Paper className={classes.root}>
          <Loader />
        </Paper>
      );
    }

    if (signupRequired) {
      return (
        <Paper className={classes.root}>
          <Typography variant="h6">
            Signup Required
          </Typography>
          <Typography>
            Please <Link to={`/app/agent/details`}>complete all your details</Link> before adding
            clients.
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper className={classes.root}>
        {isAgentFetching && <Loader />}
        {saved && <Redirect to="/app/clients" />}
        {error && <Alert message={`${error}`} variant="error" onClose={this.handleAlertClose} />}
        <ClientEditor onSaveClient={this.handleSave} inProgress={isFetching} />
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles),
  withApiClient
)(NewClientPage);

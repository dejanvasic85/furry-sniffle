import React from 'react';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import { Paper, withStyles } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import ClientEditor from '../components/ClientEditor';
import Alert from '../components/Alert';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class NewClientPage extends React.Component {
  state = {
    saved: false,
    isFetching: false,
    error: null,
  };

  handleAlertClose = () => {
    this.setState({ error: null });
  };

  handleSave = async clientDetails => {
    this.setState({ isFetching: true });
    try {
      await this.props.api.createClient(clientDetails);
      this.setState({ saved: true, isFetching: false });
    } catch (e) {
      console.log(e);
      this.setState({ saved: false, isFetching: false, error: e });
    }
  };

  render() {
    const { saved, isFetching, error } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
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

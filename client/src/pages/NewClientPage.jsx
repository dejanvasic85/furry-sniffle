import React from 'react';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import { Paper, withStyles } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import ClientEditor from '../components/ClientEditor';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class NewClientPage extends React.Component {
  state = {
    saved: false,
    isFetching: false
  }

  handleSave = (clientDetails) => {
    this.setState({ isFetching: true });
    this.props.api.createClient(clientDetails).then(() => {
      this.setState({ saved: true, isFetching: false });
    });
  }

  render() {
    const { saved, isFetching } = this.state;
    const { classes } = this.props;

    return <Paper className={classes.root}>
      {
        saved && <Redirect to="/app/clients" />
      }
      <ClientEditor onSaveClient={this.handleSave} inProgress={isFetching} />
    </Paper>;
  }
}

export default compose(
  withStyles(styles),
  withApiClient,
)(NewClientPage);
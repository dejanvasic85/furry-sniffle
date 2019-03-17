import React from 'react';
import { Redirect } from 'react-router-dom';
import {Paper, withStyles } from '@material-ui/core';

import { apiClient } from '../apiClient';
import ClientEditor from '../components/ClientEditor';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class NewClientPage extends React.Component {
  state = {
    saved: false
  }

  handleSave = (clientDetails) => {
    apiClient.createClient(clientDetails).then(() => {
      this.setState({ saved: true });
    });
  }

  render() {
    const { saved } = this.state;

    return <>
      {
        saved && <Redirect to="/app/clients" />
      }

      <ClientEditor onSaveClient={this.handleSave}/>

    </>;  
  }
}

export default withStyles(styles)(NewClientPage);
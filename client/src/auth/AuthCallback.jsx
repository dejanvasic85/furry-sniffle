import React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { apiClient } from '../apiClient';
import { agentRequiresSetup } from '../services/agentService';

class AuthCallback extends React.Component {
  state = {
    goHome: false,
    goCompleteRegistration: false
  };

  componentDidMount() {
    const { auth } = this.props;
    auth
      .handleAuthentication()
      .then(authResult => {
        apiClient
          .getAgent(authResult.accessToken)
          .then(profile => {
            if (!profile) {
              apiClient.createAgent().then(() => {
                this.setState({ goCompleteRegistration: true });
              });
            } else {
              if (agentRequiresSetup(profile) === true) {
                this.setState({ goCompleteRegistration: true });
              } else {
                this.setState({ goHome: true });
              }
            }
          })
          .catch(e => {
            console.error(`getAgent failed`, e, authResult);
          });
      })
      .catch(e => {
        console.error(`handleAuthentication failed`, e);
      });
  }

  render() {
    if (this.state.goCompleteRegistration) {
      return <Redirect to="/app/agent/details" />;
    }

    if (this.state.goHome) {
      return <Redirect to="/app" />;
    }

    return <div><Typography>Logging in... please wait</Typography></div>;
  }
}

export default AuthCallback;

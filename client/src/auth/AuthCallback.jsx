import React from 'react';
import { Redirect } from 'react-router-dom';

import { apiClient } from '../apiClient';
import { agentRequiresSetup } from '../services/agentService';

class AuthCallback extends React.Component {
  state = {
    goHome: false,
    goCompleteRegistration: false
  }

  componentDidMount() {
    const { auth } = this.props;
    auth.handleAuthentication().then(authResult => {
      apiClient.getAgent(authResult.accessToken).then(profile => {
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
      });
    });
  }

  render() {
    if (this.state.goCompleteRegistration) {
      return <Redirect to="/app/agent/details" />
    }

    if (this.state.goHome) {
      return <Redirect to="/app" />
    }

    return <div>Logging in... please wait</div>;
  }
}

export default AuthCallback;
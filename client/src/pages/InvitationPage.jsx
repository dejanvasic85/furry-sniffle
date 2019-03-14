import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { apiClient } from '../apiClient';


const styles = theme => ({
  root: {
  }
});

class InvitationPage extends React.Component {
  state = {
    fetching: true,
    isValid: null
  }

  componentDidMount() {
    const { agentId, referralCode } = this.props.match.params;

    apiClient.validateInvite(agentId, referralCode).then(result => {
      this.setState({ isValid: true });
    }).catch(err => {
      this.setState({ isValid: false });
    });
  }

  render() {
    const { isValid } = this.state;

    return <>
      {
        isValid === false &&  <Redirect to="/not-found" /> 
      }

      <Typography>
        Coming soon...
      </Typography>
    </>;
  }
}

export default withRouter(withStyles(styles)(InvitationPage));
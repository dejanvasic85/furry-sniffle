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
    isValid: null,
    invite: null
  }

  componentDidMount() {
    const { agentId, referralCode } = this.props.match.params;

    apiClient.validateInvite(agentId, referralCode).then(result => {
      this.setState({ isValid: true, invite: result.invite });
    }).catch(err => {
      this.setState({ isValid: false });
    });
  }

  render() {
    const { isValid, invite } = this.state;
    console.log(invite);

    return <>
      {
        isValid === false && <Redirect to="/not-found" />
      }

      {
        invite && <div>
          <Typography>
            Hey there! Your trusted friend {invite.clientName} has referred you to 
            checkout services offered by {invite.agentName}. Fill out the form below to get in touch.
          </Typography>
        </div>
      }

    </>;
  }
}

export default withRouter(withStyles(styles)(InvitationPage));
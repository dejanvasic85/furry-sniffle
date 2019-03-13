import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { apiClient } from '../apiClient';


const styles = theme => ({
  root: {
  }
});

class InvitationPage extends React.Component {
  componentDidMount() {
    // todo - validate the query parameters (referralCode and agent id)
  }

  render() {
    return <div>
      <Typography>
        Coming soon...
      </Typography>
    </div>;
  }
}

export default withRouter(withStyles(styles)(InvitationPage));
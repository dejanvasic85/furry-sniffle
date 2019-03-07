import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography } from '@material-ui/core';

import { apiClient } from '../apiClient';

const styles = theme => ({
  root: {
  }
});

class AgentDetailsPage extends React.Component {
  componentDidMount() {
    console.log('props', this.props);    
  }

  render() {
    return <>
      <Typography>
        Agent Details
      </Typography>
      <div>
        
      </div>
    </>
  }
}

export default withRouter(withStyles(styles)(AgentDetailsPage));
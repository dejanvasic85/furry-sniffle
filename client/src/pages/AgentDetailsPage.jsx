import React from 'react';

import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
  }
});

class AgentDetailsPage extends React.Component {
  render() {
    return <Typography>
      Complete Agent Registration
    </Typography>
  }
}

export default withStyles(styles)(AgentDetailsPage);
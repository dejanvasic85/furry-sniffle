import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Paper } from '@material-ui/core';

import { apiClient } from '../apiClient';
import AgentEditor from '../components/AgentEditor';

const styles = theme => ({
  root: {
  },
  paper: {
    padding: theme.spacing.unit * 2,
  }
});

class AgentDetailsPage extends React.Component {
  state = {
    agent: null
  }

  componentDidMount() {
    apiClient.getAgent().then(agent => {
      this.setState({ agent });
    });
  }

  handleAgentSave = (updatedAgentDetails) => {
    apiClient.updateAgent(updatedAgentDetails).then(agent => {
      console.log('agent details updated', agent);
    });
  }

  render() {
    const { agent } = this.state;
    const { classes } = this.props;

    return <>
      <Typography>
        Agent Details
      </Typography>
      <Paper className={classes.paper}>
        {
          agent && <AgentEditor agent={agent} onSaveAgent={this.handleAgentSave} />
        }
      </Paper >
    </>
  }
}

export default withRouter(withStyles(styles)(AgentDetailsPage));
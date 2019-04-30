import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withStyles, Paper } from '@material-ui/core';

import { apiClient } from '../apiClient';
import AgentEditor from '../components/AgentEditor';
import Alert from '../components/Alert';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  notification: {
    marginTop: '10px'
  },
  link: {
    color: '#fff'
  }
});

class AgentDetailsPage extends React.Component {
  state = {
    agent: null,
    saved: false,
    isFetching: false
  }

  componentDidMount() {
    apiClient.getAgent().then(agent => {
      this.setState({ agent });
    });
  }

  handleAgentSave = async (updatedAgentDetails) => {
    this.setState({ isFetching: true });
    await apiClient.updateAgent(updatedAgentDetails)
    this.setState({ displaySuccess: true, isFetching: false });
  }

  handleAlertClose = () => {
    this.setState({ displaySuccess: false });
  }

  render() {
    const { agent, displaySuccess, isFetching } = this.state;
    const { classes } = this.props;

    return <Paper className={classes.root}>
      {
        agent && <AgentEditor agent={agent} onSaveAgent={this.handleAgentSave} isFetching={isFetching} />
      }
      {
        displaySuccess && <div className={classes.notification}><Alert
          message={<span>Saved Successfully. <Link to="/app/clients" className={classes.link}>Start managing clients.</Link></span>}
          variant="success"
          onClose={this.handleAlertClose}></Alert></div>
      }
    </Paper>;
  }
}

export default withRouter(withStyles(styles)(AgentDetailsPage));
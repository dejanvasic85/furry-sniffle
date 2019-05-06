import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withStyles, Paper } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import AgentEditor from '../components/AgentEditor';
import Alert from '../components/Alert';
import Loader from '../components/Loader';

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
    isFetching: true,
    isSaving: false
  }

  async componentDidMount() {
    const agent = await this.props.api.getAgent();
    this.setState({ agent, isFetching: false });
  }

  handleAgentSave = async (updatedAgentDetails) => {
    this.setState({ isSaving: true });
    await this.props.api.updateAgent(updatedAgentDetails)
    this.setState({ displaySuccess: true, isSaving: false });
  }

  handleAlertClose = () => {
    this.setState({ displaySuccess: false });
  }

  render() {
    const { agent, displaySuccess, isFetching, isSaving } = this.state;
    const { classes } = this.props;

    return <Fragment>
      {
        isFetching && <Loader />
      }
      {
        isFetching === false && agent && <Fragment>
          <Paper className={classes.root}>
            {
              agent && <AgentEditor 
                agent={agent} 
                onSaveAgent={this.handleAgentSave} 
                isFetching={isSaving} />
            }
            {
              displaySuccess && <div className={classes.notification}><Alert
                message={<span>Saved Successfully. <Link to="/app/clients" className={classes.link}>Start managing clients.</Link></span>}
                variant="success"
                onClose={this.handleAlertClose}></Alert></div>
            }
          </Paper>
        </Fragment>
      }
    </Fragment>;
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(AgentDetailsPage);
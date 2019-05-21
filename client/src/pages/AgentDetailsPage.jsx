import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { Elements } from 'react-stripe-elements';

import withApiClient from '../decorators/withApiClient';
import AgentEditor from '../components/AgentEditor';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import DepositForm from '../components/DepositForm';

const styles = theme => ({
  root: {},
  gutter: {
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
        !isFetching && agent && <Fragment>
          {
            agent && <AgentEditor
              agent={agent}
              onSaveAgent={this.handleAgentSave}
              isFetching={isSaving} />
          }
          {
            displaySuccess && <div className={classes.gutter}><Alert
              message={<span>Saved Successfully</span>}
              variant="success"
              onClose={this.handleAlertClose}></Alert></div>
          }
          <Elements>
            <div className={classes.gutter}>
              <DepositForm 
                accountBalance={agent.accountBalance || 0}
                agent={agent} />
            </div>
          </Elements>

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
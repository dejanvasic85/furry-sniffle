import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  withStyles,
  Typography,
  CardActions,
  Divider
} from '@material-ui/core';

import { withApiClient } from '../decorators';
import AgentEditor from './AgentEditor';
import {
  Alert,
  Button,
  Currency,
  Loader
} from '../components';

const styles = theme => ({
  root: {},
  gutter: {
    marginTop: '10px',
  },
  link: {
    color: '#fff',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class AgentDetailsPage extends React.Component {
  state = {
    agent: null,
    account: {
      balance: 0,
      availableFunds: 0
    },
    saved: false,
    isFetching: true,
    isSaving: false
  };

  async componentDidMount() {
    const { api } = this.props;
    const agent = await api.getAgent();
    const { account } = await api.getAccount();
    if (account) {
      this.setState({ account });
    }

    this.setState({ agent, isFetching: false });
  }

  handleAgentSave = async updatedAgentDetails => {
    this.setState({ isSaving: true });
    await this.props.api.updateAgent(updatedAgentDetails);
    this.setState({ displaySuccess: true, isSaving: false });
  };

  handleAlertClose = () => {
    this.setState({ displaySuccess: false });
  };

  render() {
    const {
      agent,
      account,
      displaySuccess,
      isFetching,
      isSaving
    } = this.state;

    const { classes } = this.props;

    return (
      <Fragment>
        {isFetching && <Loader />}
        {!isFetching && agent && (
          <Fragment>
            {agent && (<AgentEditor
              agent={agent}
              onSaveAgent={this.handleAgentSave}
              isFetching={isSaving} />)}
            {displaySuccess && (
              <div className={classes.gutter}>
                <Alert
                  message={
                    <span>
                      Saved Successfully.{' '}
                      <Link to="/app/clients" className={classes.link}>
                        Start managing clients.
                      </Link>
                    </span>
                  }
                  variant="success"
                  onClose={this.handleAlertClose}
                />
              </div>
            )}

            <Card className={classes.gutter}>
              <CardHeader
                title="Balance"
                subheader="When funds have settled, you may gift your clients." />
              <Divider />
              <CardContent>
                <Typography>
                  Balance: <Currency baseAmount={account.balance} />
                </Typography>
                <Typography>
                  Available Funds: <Currency baseAmount={account.availableFunds} />
                </Typography>
              </CardContent>
              <CardActions className={classes.buttons}>
                <Button
                  variant="outlined"
                  color="primary">
                  Deposit
                </Button>
              </CardActions>
            </Card>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(AgentDetailsPage);

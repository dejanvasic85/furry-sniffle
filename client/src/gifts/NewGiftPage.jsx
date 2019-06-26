import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { withApiClient } from '../decorators';
import { 
  Loader,Alert
} from '../components';

import GiftEditor from './GiftEditor';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class NewGiftPage extends React.Component {
  state = {
    saved: false,
    isFetching: true,
    account: { availableFunds: 0 },
    agentName: '',
    error: null
  };

  async componentDidMount() {
    const { api } = this.props;
    const agent = await api.getAgent();
    const { account } = await api.getAccount();

    if (account) {
      this.setState({ account, agentName: agent.firstName });
    }

    this.setState({ isFetching: false });
  }

  handleSave = async giftDetails => {
    const { api } = this.props;
    const { id } = this.props.match.params;

    this.setState({ isFetching: true, error:null });
    try{
      await api.sendGift(id, giftDetails);
      this.setState({ saved: true, isFetching: false });
    }catch( error ){
      console.error(error);
      this.setState({ error: error, isFetching: false });
    }
  };

  dismissError = () => {
    this.setState({ error: null });
  }

  render() {
    const {
      isFetching,
      saved,
      agentName,
      error,
      account: { availableFunds }
    } = this.state;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <Fragment>
        {!!error && (
          <Alert
            message={`Failed to send gift: ${error}`}
            variant="error"
            onClose={this.dismissError}
          />
        )}

        {saved && <Redirect to="/app/gifts" />}
        <GiftEditor
          from={agentName}
          onSave={this.handleSave}
          isFetching={isFetching}
          availableFunds={Number(availableFunds)}
        />
      </Fragment>
    );
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(NewGiftPage);

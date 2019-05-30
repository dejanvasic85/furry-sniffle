import React from 'react';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { withApiClient } from '../decorators';

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
    account: { availableFunds: 0 }
  };

  async componentDidMount() {
    const { api } = this.props;
    const { account } = api.getAccount();
    if (account) {
      this.setState({ account });
    }
  }

  handleSave = async giftDetails => {
    const { api } = this.props;
    this.setState({ isFetching: true }, async () => {
      const { id } = this.props.match.params;
      await api.sendGift(id, giftDetails);
      this.setState({ saved: true, isFetching: false });
    });
  };

  render() {
    const {
      isFetching,
      saved,
      account: { availableFunds }
    } = this.state;

    return (
      <>
        {saved && <Redirect to="/app/gifts" />}

        <GiftEditor
          onSave={this.handleSave}
          isFetching={isFetching}
          availableFunds={availableFunds}
        />
      </>
    );
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(NewGiftPage);

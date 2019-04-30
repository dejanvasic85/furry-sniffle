import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { apiClient } from '../apiClient';
import GiftEditor from '../components/GiftEditor';

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
    isFetching: false
  };

  handleSave = async giftDetails => {
    this.setState({ isFetching: true });
    const { id } = this.props.match.params;
    await apiClient.sendGift(id, giftDetails);
    this.setState({ saved: true, isFetching: false });
  };

  render() {
    const { isFetching, saved } = this.state;

    return (
      <>
        {saved && <Redirect to="/app/gifts" />}

        <GiftEditor onSave={this.handleSave} isFetching={isFetching} />
      </>
    );
  }
}

export default withStyles(styles)(NewGiftPage);

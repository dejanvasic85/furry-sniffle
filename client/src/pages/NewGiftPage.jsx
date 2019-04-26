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
    saved: false
  };

  handleSave = async giftDetails => {
    const { id } = this.props.match.params;
    await apiClient.sendGift(id, giftDetails);
    this.setState({ saved: true });
  };

  render() {
    const { saved } = this.state;

    return (
      <>
        {saved && <Redirect to="/app/gifts" />}

        <GiftEditor onSave={this.handleSave} />
      </>
    );
  }
}

export default withStyles(styles)(NewGiftPage);

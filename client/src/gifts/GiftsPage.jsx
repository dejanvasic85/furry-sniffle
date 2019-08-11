import React from 'react';
import { compose } from 'recompose';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import { List, Paper, Typography, withStyles } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import GiftListItem from './GiftListItem';
import SearchInput from '../components/SearchInput';
import Loader from '../components/Loader';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  gifts: {
    paddingLeft: '10px',
    paddingRight: '10px',
    backgroundColor: theme.palette.background.paper,
  },
  padded: {
    padding: '20px',
  },
});

class GiftsPage extends React.Component {
  state = {
    gifts: [],
    filteredGifts: [],
    filter: '',
    isFetching: true,
    refreshingStatusGiftId:null,
  };

  async componentDidMount() {
    const gifts = await this.props.api.getGifts();
    this.setState({ gifts, isFetching: false });
  }

  addClient = () => {
    this.props.history.push('/app/clients-new');
  };

  handleClientClick = clientId => {
    this.props.history.push(`/app/clients/${clientId}`);
  };

  handleRefreshStatusClick = async (giftId) => {
    this.setState({ refreshingStatusGiftId:giftId});
    const updatedGift = await this.props.api.getGiftStatus(giftId);
    const newGifts = this.state.gifts.slice(0);
    const index = newGifts.findIndex(x=>x.id === giftId);
    newGifts[index] = updatedGift;
    this.setState({ gifts:newGifts, refreshingStatusGiftId: null });
  };

  handleSearchTextchange = event => {
    const filter = event.target.value.toLowerCase();
    const filteredGifts = this.state.gifts.filter(({ message, giftValue }) => {
      return message.toLowerCase().indexOf(filter) > -1 || giftValue.toLowerCase().indexOf(filter) > -1;
    });

    this.setState({
      filter: event.target.value,
      filteredGifts,
    });
  };

  render() {
    const { classes } = this.props;
    const { gifts, filteredGifts, filter, isFetching, refreshingStatusGiftId } = this.state;

    const giftsToDisplay = filter ? filteredGifts : gifts;

    return (
      <Paper className={classes.padded}>
        {isFetching && <Loader />}
        {!isFetching && giftsToDisplay.length > 0 && (
          <>
            <div className={classes.padded}>
              <SearchInput value={filter} onSearchTextChange={this.handleSearchTextchange} />
            </div>
            <List className={classNames(classes.gifts)}>
              {giftsToDisplay.map((gift) => (
                <GiftListItem
                  key={gift.id}
                  giftDetails={gift}
                  isRefreshInProgress={refreshingStatusGiftId === gift.id}
                  onRefreshStatus={() => this.handleRefreshStatusClick(gift.id)}
                  onClick={() => this.handleClientClick(gift.clientId)}
                />
              ))}
            </List>
          </>
        )}
        {!isFetching && giftsToDisplay.length === 0 && (
          <>
            <div className={classes.padded}>
              <Typography variant="h6">No gifts cards were sent. </Typography>
              <Typography variant="body1">
                You can send gifts to your clients from the clients details page . Or you can always &nbsp;
                <a href="mailto:dejanvasic24@gmail.com?subject=Import Clients Please">email</a>
                &nbsp;us for a help
              </Typography>
            </div>
          </>
        )}
      </Paper>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(GiftsPage);

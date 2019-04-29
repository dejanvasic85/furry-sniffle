import React from 'react';

import { withRouter } from 'react-router-dom';
import { List, Paper, Typography, withStyles } from '@material-ui/core';

import PageLayout from '../components/PageLayout';
import GiftListItem from '../components/GiftListItem';
import SearchInput from '../components/SearchInput';
import Loader from '../components/Loader';
import { apiClient } from '../apiClient';

const styles = theme => ({
  root: {
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  gifts: {
    backgroundColor: theme.palette.background.paper
  },
  padded: {
    padding: '20px'
  }
});

class GiftsPage extends React.Component {
  state = {
    gifts: [],
    filteredGifts: [],
    filter: '',
    isFetching: true
  };

  async componentDidMount() {
    const gifts = await apiClient.getGifts();
    this.setState({ gifts, isFetching: false });
  }

  addClient = () => {
    this.props.history.push('/app/clients/new');
  };

  handleClientClick = clientId => {
    this.props.history.push(`/app/clients/${clientId}`);
  };

  handleSearchTextchange = event => {
    const filter = event.target.value.toLowerCase();
    const filteredGifts = this.state.gifts.filter(({ message, giftValue }) => {
      return (
        message.toLowerCase().indexOf(filter) > -1 ||
        giftValue.toLowerCase().indexOf(filter) > -1
      );
    });

    this.setState({
      filter: event.target.value,
      filteredGifts
    });
  };

  render() {
    const { classes } = this.props;
    const { gifts, filteredGifts, filter, isFetching } = this.state;

    const giftsToDisplay = filter ? filteredGifts : gifts;

    return (
      <PageLayout>
        <Paper>
          {isFetching && <Loader />}
          {!isFetching && giftsToDisplay.length > 0 && (
            <>
              <div className={classes.padded}>
                <SearchInput
                  value={filter}
                  onSearchTextChange={this.handleSearchTextchange}
                />
              </div>
              <List className={classes.gifts}>
                {giftsToDisplay.map((gift, hackishIndex) => (
                  <GiftListItem
                    key={hackishIndex}
                    giftDetails={gift}
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
                  You can send gifts to your clients from the clients details page
                  . Or you can always &nbsp;
                <a href="mailto:dejanvasic24@gmail.com?subject=Import Clients Please">
                    email
                </a>
                  &nbsp;us for a help
              </Typography>
              </div>
            </>
          )}
        </Paper>
      </PageLayout>
    );
  }
}

export default withRouter(withStyles(styles)(GiftsPage));

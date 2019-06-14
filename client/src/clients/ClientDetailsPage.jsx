import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import withApiClient from '../decorators/withApiClient';
import ClientDetails from './ClientDetails';
import ClientEmails from './ClientEmails';
import ClientGifts from './ClientGifts';
import Loader from '../components/Loader';
import ProspectList from '../prospects/ProspectList';

const styles = theme => ({
  root: {},
  interactions: {
    marginTop: '20px',
  },
});

class ClientDetailsPage extends React.Component {
  state = {
    isFetching: true,
    client: {},
    emails: [],
  };

  async componentDidMount() {
    const clientId = this.props.match.params.id;
    const client = await this.props.api.getClient(clientId);
    this.setState({
      client,
      emails: client.emails,
      gifts: client.gifts,
      prospects: client.prospects,
      isFetching: false,
    });
  }

  handleEmailSent = email => {
    const newState = [email];
    this.setState({
      emails: [...newState, ...this.state.emails],
    });
  };

  handleOnNewGift = clientId => {
    this.props.history.push(`/app/clients/${clientId}/gifts/new`);
  };

  render() {
    const { client, emails, gifts, prospects, isFetching } = this.state;
    const { classes } = this.props;
    const prospectCount = prospects ? prospects.length : 0;
    const giftCount = gifts ? gifts.length : 0;

    return (
      <Fragment>
        {isFetching && <Loader />}
        {!isFetching && (
          <Fragment>
            <ClientDetails 
              giftCount={giftCount}
              prospectCount={prospectCount}
              client={client} 
              onEmailSent={this.handleEmailSent} 
              onNewGift={this.handleOnNewGift} />
              
            {/* <div className={classes.interactions}>
              <ProspectList prospects={prospects || []} />
            </div>

            <div className={classes.interactions}>
              <ClientGifts gifts={gifts || []} />
            </div>

            <div className={classes.interactions}>
              <ClientEmails emails={emails || []} />
            </div> */}
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
)(ClientDetailsPage);

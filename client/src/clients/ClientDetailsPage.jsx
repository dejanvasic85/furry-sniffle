import React, { Fragment } from 'react';
import { compose } from 'recompose';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  withStyles
} from '@material-ui/core';

import { Email, CardGiftcard, QuestionAnswer } from '@material-ui/icons';

import { withRouter } from 'react-router-dom';

import withApiClient from '../decorators/withApiClient';
import ClientDetails from './ClientDetails';
import { DateDisplay, Loader } from '../components';

const styles = theme => ({
  root: {},
  interactions: {
    marginTop: '20px'
  }
});

class ClientDetailsPage extends React.Component {
  state = {
    isFetching: true,
    client: {}
  };

  async _fetchClient() {
    const clientId = this.props.match.params.id;
    const client = await this.props.api.getClient(clientId);
    this.setState({
      client,
      isFetching: false
    });
  }

  async componentDidMount() {
    await this._fetchClient();
  }

  handleEmailSent = async () => {
    await this._fetchClient();
  };

  renderIcon({ type }) {
    switch (type) {
      case 'email': {
        return <Email />;
      }
      case 'prospect': {
        return <QuestionAnswer />;
      }
      case 'gift': {
        return <CardGiftcard />;
      }
      default:
        return null;
    }
  }

  render() {
    const { client, isFetching } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        {isFetching && <Loader />}
        {!isFetching && (
          <Fragment>
            <ClientDetails
              giftCount={client.giftCount}
              prospectCount={client.prospectCount}
              client={client}
              onEmailSent={this.handleEmailSent}
            />

            <Card className={classes.interactions}>
              <CardHeader title="Interactions" />
              <Divider />
              <CardContent>
                <List>
                  {client.interactions.map(interaction => (
                    <ListItem key={interaction.id}>
                      <Avatar>{this.renderIcon(interaction)}</Avatar>
                      <ListItemText
                        primary={interaction.description}
                        secondary={<DateDisplay date={interaction.date} />}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
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
)(ClientDetailsPage);

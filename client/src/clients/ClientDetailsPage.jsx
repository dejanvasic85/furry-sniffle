import React, { Fragment } from 'react';
import { compose } from 'recompose';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import withApiClient from '../decorators/withApiClient';
import ClientDetails from './ClientDetails';
import Loader from '../components/Loader';

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

  async componentDidMount() {
    const clientId = this.props.match.params.id;
    const client = await this.props.api.getClient(clientId);
    this.setState({
      client,
      isFetching: false
    });
  }

  handleOnNewGift = clientId => {
    this.props.history.push(`/app/clients/${clientId}/gifts/new`);
  };

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
                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>interaction.type</ListItemText>
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

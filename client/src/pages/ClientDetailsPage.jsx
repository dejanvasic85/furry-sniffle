import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { apiClient } from '../apiClient';

import ClientDetails from '../components/ClientDetails';
import ClientEmails from '../components/ClientEmails';

const styles = theme => ({
  root: {}
});

class ClientDetailsPage extends React.Component {
  state = {
    client: {},
    emails: []
  };

  componentDidMount() {
    const clientId = this.props.match.params.id;
    apiClient.getClient(clientId).then(client => {
      this.setState({
        client,
        emails: client.emails
      });
    });
  }

  sendEmail = () => {
    const clientId = this.props.match.params.id;
    apiClient.sendEmail(clientId).then(emails => {
      this.setState({
        emails: emails
      });
    });
  };

  render() {
    const { client, emails } = this.state;
    return (
      <div>
        <ClientDetails client={client} />
        <ClientEmails emails={emails || []} sendEmail={this.sendEmail} />
      </div>
    );
  }
}

export default withStyles(styles)(ClientDetailsPage);

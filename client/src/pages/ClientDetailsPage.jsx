import React from 'react';
import { withStyles } from '@material-ui/core';
import { apiClient } from '../apiClient';

import ClientDetails from '../components/ClientDetails';
import ClientEmails from '../components/ClientEmails';
import Loader from '../components/Loader';

const styles = theme => ({
  root: {},
  interactions: {
    marginTop: '20px'
  },
  progress: {
    margin: 'auto',
    width: '40px'
  }
});

class ClientDetailsPage extends React.Component {
  state = {
    isFetching: true,
    client: {},
    emails: []
  };

  async componentDidMount() {
    const clientId = this.props.match.params.id;
    const client = await apiClient.getClient(clientId);
    this.setState({
      client,
      emails: client.emails,
      isFetching: false
    });
  }

  handleEmailSent = email => {
    this.setState( {
      emails: [...this.state.emails, email]
    });
  };

  render() {
    const { client, emails, isFetching } = this.state;
    const { classes } = this.props;

    return <>
      {isFetching && <Loader />}
      {!isFetching && <>
        <ClientDetails client={client} onEmailSent={this.handleEmailSent} />
        <div className={classes.interactions}>
          <ClientEmails emails={emails || []} />
        </div>
      </>
      }
    </>;
  }
}

export default withStyles(styles)(ClientDetailsPage);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { apiClient } from '../apiClient';

import ClientDetails from '../components/ClientDetails';

const styles = theme => ({
  root: {
  }
});

class ClientDetailsPage extends React.Component {
  state = {
    client: {}
  };

  componentDidMount() {
    const clientId = this.props.match.params.id;
    apiClient.getClient(clientId).then(client => {
      this.setState({
        client
      });
    });
  }

  render() {
    const { client } = this.state;
    return <ClientDetails client={client}/>;
  }
}

export default withStyles(styles)(ClientDetailsPage);
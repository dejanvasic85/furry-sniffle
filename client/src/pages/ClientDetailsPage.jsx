import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { apiClient } from '../apiClient';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    console.log('client', this.state.client);
    const { client } = this.state;
    return <ClientDetails client={client}/>;
  }
}

export default withStyles(styles)(ClientDetailsPage);
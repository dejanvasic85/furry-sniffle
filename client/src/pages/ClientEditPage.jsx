import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { apiClient } from '../apiClient';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
  }
});

export class ClientEditPage extends React.Component {
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
    return <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {client.firstName} {client.lastName}
          </Typography>
          <Typography component="p">
            {client.email}
          </Typography>
          <Typography component="p">
            {client.phone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </>;
  }
}

export default withStyles(styles)(ClientEditPage);
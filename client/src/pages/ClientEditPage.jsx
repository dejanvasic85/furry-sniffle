import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { apiClient } from '../apiClient';

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
    console.log('edit mode');
    return <>
      Editing coming soon
    </>;
  }
}

export default withStyles(styles)(ClientEditPage);
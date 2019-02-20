import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { apiClient } from '../apiClient';

const styles = theme => ({
  root: {
  }
});

export class ClientDetailsPage extends React.Component {
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

    return null;
    // return <>
    //   <div>Client Details</div>
    //   <div>{client.firstName}</div>
    // </>;
  }
}

export default withStyles(styles)(ClientDetailsPage);
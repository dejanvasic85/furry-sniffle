import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { apiClient } from '../apiClient';
import ClientEditor from '../components/ClientEditor';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const styles = theme => ({
  root: {
  }
});

class ClientEditPage extends React.Component {
  state = {
    client: null,
    displaySuccess: false,
    isFetching: true
  };

  async componentDidMount() {
    const clientId = this.props.match.params.id;
    const client = await apiClient.getClient(clientId);
    this.setState({
      client,
      isFetching: false
    });
  }

  handleClientSave = async (client) => {
    const { id } = this.props.match.params;
    await apiClient.updateClient(id, client);
    this.setState({
      displaySuccess: true
    });
  }

  handleAlertClose = () => {
    this.setState({
      displaySuccess: false
    });
  }

  render() {
    const { client, displaySuccess, isFetching } = this.state;

    return <>
      {
        isFetching && <Loader />
      }
      {
        !isFetching && <ClientEditor client={client} onSaveClient={this.handleClientSave} />
      }
      {
        displaySuccess && <Alert message={"Client details saved"} variant="success" onClose={this.handleAlertClose}></Alert>
      }
    </>;
  }
}

export default withRouter(withStyles(styles)(ClientEditPage));
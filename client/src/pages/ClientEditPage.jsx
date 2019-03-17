import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { apiClient } from '../apiClient';
import ClientEditor from '../components/ClientEditor';
import Alert from '../components/Alert';

const styles = theme => ({
  root: {
  }
});

class ClientEditPage extends React.Component {
  state = {
    client: null,
    displaySuccess: false
  };

  componentDidMount() {
    const clientId = this.props.match.params.id;
    apiClient.getClient(clientId).then(client => {
      this.setState({
        client
      });
    });
  }

  handleClientSave = (client) => {
    const { id } = this.props.match.params;
    apiClient.updateClient(id, client).then(() => {
      this.setState({
        displaySuccess: true
      });
    });
  }

  handleAlertClose = () => {
    this.setState({
      displaySuccess: false
    });
  }

  render() {
    const { client, displaySuccess } = this.state;

    return <>
      {
        client && <ClientEditor client={client} onSaveClient={this.handleClientSave} />
      }

      {
        displaySuccess && <Alert message={"Client details saved"} variant="success" onClose={this.handleAlertClose}></Alert>
      }
    </>;
  }
}

export default withRouter(withStyles(styles)(ClientEditPage));
import React from 'react';
import { withRouter } from 'react-router-dom';

import { apiClient } from '../apiClient';
import ClientEditor from '../components/ClientEditor';
import Loader from '../components/Loader';

class ClientEditPage extends React.Component {
  state = {
    client: null,
    isFetching: true,
    isClientSaving: false
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
    this.setState({ isClientSaving: true })
    await apiClient.updateClient(id, client);
    this.props.history.push(`/app/clients/${id}`);
  }

  render() {
    const { client, isFetching, isClientSaving } = this.state;

    return <>
      {
        isFetching && <Loader />
      }
      {
        !isFetching && <ClientEditor client={client} inProgress={isClientSaving} onSaveClient={this.handleClientSave} />
      }
      
    </>;
  }
}

export default withRouter(ClientEditPage);
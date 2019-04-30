import React from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import withApiClient from '../decorators/withApiClient';
import ClientEditor from '../components/ClientEditor';
import Loader from '../components/Loader';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  }
});

export class ClientEditPage extends React.Component {
  state = {
    client: null,
    isFetching: true,
    isClientSaving: false
  };

  async componentDidMount() {
    const clientId = this.props.match.params.id;
    const client = await this.props.api.getClient(clientId);
    this.setState({
      client,
      isFetching: false
    });
  }

  handleClientSave = async (client) => {
    const { id } = this.props.match.params;
    this.setState({ isClientSaving: true })
    await this.props.api.updateClient(id, client);
    this.props.history.push(`/app/clients/${id}`);
  }

  render() {
    const { client, isFetching, isClientSaving } = this.state;
    const { classes } = this.props;

    return <Paper className={classes.root}>
      {
        isFetching && <Loader />
      }
      {
        !isFetching && <ClientEditor client={client} inProgress={isClientSaving} onSaveClient={this.handleClientSave} />
      }
      
    </Paper>;
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(ClientEditPage);
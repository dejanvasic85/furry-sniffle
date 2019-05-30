import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import withApiClient from '../decorators/withApiClient';
import {
  Alert,
  Loader
} from '../components';

import ProspectDetails from './ProspectDetails';


class ProspectDetailsPage extends React.Component {
  state = {
    isFetching: true,
    prospect: {},
    updatedToProcessed:false,
    updatedToCancelled:false
  };

  async componentDidMount() {
    this.fetchProspect(this.props.match.params.id);
  }

  async fetchProspect(prospectId){

    this.setState({
      isFetching: true,
    });

    const prospect = await this.props.api.getProspect(prospectId);
    this.setState({
      prospect,
      isFetching: false,
      updatedToProcessed: false,
      updatedToCancelled: false
    });
  }

  handleCancel = async () => {
    const { prospect } = this.state;
    await this.props.api.updateProspectStatus(prospect.id, 'cancelled');
    await this.fetchProspect(prospect.id);
    this.setState({
      updatedToCancelled: true,
    });
  };

  handleProcessed = async () => {
    const { prospect } = this.state;
    await this.props.api.updateProspectStatus(prospect.id, 'processed');

    await this.fetchProspect(prospect.id);

    this.setState({
      updatedToProcessed: true,
    });
  };

  render() {
    const { prospect, isFetching ,updatedToProcessed,updatedToCancelled} = this.state;

    return (
      <Fragment>
        {!!updatedToProcessed && <Alert message="Prospect status updated. Do not forget to reward client who has recommened you." variant="success" />}
        {!!updatedToCancelled && <Alert message="Prospect status updated... sorry to hear that it didn't work out for you..." variant="warning" />}

        {isFetching && <Loader />}
        {!isFetching && (
          <Fragment>
            <ProspectDetails prospect={prospect} onCancel={this.handleCancel} onProcess={this.handleProcessed} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withApiClient
)(ProspectDetailsPage);

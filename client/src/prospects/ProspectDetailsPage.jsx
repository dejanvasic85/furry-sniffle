import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import withApiClient from '../decorators/withApiClient';
import Loader from '../components/Loader';
import ProspectDetails from './ProspectDetails';

class ProspectDetailsPage extends React.Component {
  state = {
    isFetching: true,
    prospect: {},
  };

  async componentDidMount() {
    const prospectId = this.props.match.params.id;
    const prospect = await this.props.api.getProspect(prospectId);
    this.setState({
      prospect,
      isFetching: false,
    });
  }

  handleCancel = async () => {
    const { prospect } = this.state;
    await this.props.api.updateProspectStatus(prospect.id, 'cancel');
  };
  handleProcessed = async () => {
    const { prospect } = this.state;
    await this.props.api.updateProspectStatus(prospect.id, 'processed');
  };

  render() {
    const { prospect, isFetching } = this.state;

    return (
      <Fragment>
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

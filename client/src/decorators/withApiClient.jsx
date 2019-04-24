import React from 'react';
import { apiClient } from '../apiClient';

const withApiClient = () => {
  return (WrappedComponent) => {
    return class ApiClientEnhanced extends React.PureComponent {
      render() {
        return <WrappedComponent api={apiClient} {...this.props} />;
      }
    }
  };
};

export default withApiClient;
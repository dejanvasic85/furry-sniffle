import React from 'react';
import { apiClient } from '../apiClient';

const withApiClient = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} api={apiClient} />;
  }
};

export default withApiClient;
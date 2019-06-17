import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withApiClient, withAuth } from '../decorators';

const EmailPage = ({ api, location, ...props }) => {
  
  
  return (
    <div>
      Email Page - Coming soon
    </div>
  );
};

export default compose(
  withRouter, 
  withApiClient,
  withAuth
)(EmailPage);
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { withApiClient, withAuth } from '../decorators';

const AuthCallback = ({ api, auth }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      const authResult = await auth.handleAuthentication();
      await api.login(authResult.accessToken);
      setLoggedIn(true);
    };

    if (!isLoggedIn) {
      login();
    }
  });

  if (isLoggedIn) {
    return <Redirect to="/app" />;
  }

  return <div><Typography>Logging in... please wait</Typography></div>;
}

export default compose(
  withAuth,
  withApiClient
)(AuthCallback);
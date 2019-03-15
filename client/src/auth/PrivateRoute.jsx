import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (auth.isAuthenticated()) {
    return <Route {...rest} render={(props) => <Component {...props} />} />
  }

  auth.login();
  return null;
}

export default PrivateRoute;
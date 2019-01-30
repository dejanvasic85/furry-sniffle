import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { auth } = this.props;
    console.log('auth', auth);
    return auth.isAuthenticated() 
      ? <Route {...this.props} />
      : <Redirect to="/login" />
  }
}


export default PrivateRoute;
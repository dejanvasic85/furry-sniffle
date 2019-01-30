import React from 'react';

class AuthCallback extends React.Component {
  render() {
    const {auth} = this.props;

    console.log('authCallback auth', auth);
    auth.handleAuthentication(); // dv: this should redirect inside

    return <div>Logging in... please wait</div>;
  }
}

export default AuthCallback;
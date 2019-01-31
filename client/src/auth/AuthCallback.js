import React from 'react';

class AuthCallback extends React.Component {
  render() {
    const {auth} = this.props;  
    auth.handleAuthentication().then(() => {
      this.props.history.push('/');
    });

    return <div>Logging in... please wait</div>;
  }
}

export default AuthCallback;
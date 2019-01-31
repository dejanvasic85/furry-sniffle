import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    state = {
        redirectToPreviousRoute: false
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToPreviousRoute } = this.state;
    
        if (redirectToPreviousRoute) {
          return <Redirect to={from} />;
        }

        this.props.auth.login();
        return <div>You will be redirected to login screen. Please wait...</div>;
    }
}
export default Login;
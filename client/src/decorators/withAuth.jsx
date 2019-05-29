import React from 'react';
import AuthService from '../auth/AuthService';

const auth = new AuthService(); 
const withAuth = (WrappedComponent) => props => (<WrappedComponent {...props} auth={auth} />);

export default withAuth;
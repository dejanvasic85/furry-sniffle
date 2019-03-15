import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import AuthCallback from './auth/AuthCallback';
import Login from './auth/Login';
import InvitationPage from './pages/InvitationPage';
import AuthService from './auth/AuthService';
import LandingPage from './pages/LandingPage';

const authService = new AuthService();

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} auth={authService} />} />
        <Route path="/callback" render={(props) => <AuthCallback {...props} auth={authService} />} />
        <Route path="/app" render={(props) => <App {...props} auth={authService} />} />
        <Route path="/invite/:agentId/code/:referralCode" exact render={(props) => <InvitationPage {...props} />} />

        {/* Fallback - Not found */}
        <Route path="/" render={(props) => <LandingPage {...props} />} />
        <Route render={() => <div>Sorry, the page you are looking for cannot be found! </div>} />
      </Switch>
    </div>
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
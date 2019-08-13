import auth0 from 'auth0-js';
import loadConfig from '../envConfig.js';

export default class Auth {
  accessToken;
  idToken;
  profile;
  auth0;
  clientId;

  constructor(){
    const authConfig = loadConfig().auth0;
    console.log('auth config', JSON.stringify(authConfig));
    this.clientId = authConfig.clientId;

    this.auth0 = new auth0.WebAuth({
      domain: authConfig.domain,
      clientID: authConfig.clientId,
      redirectUri: authConfig.callback,
      responseType: 'token id_token',
      scope: 'openid email profile',
      audience: authConfig.audience
    });
  }


  getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  getToken() {
    return localStorage.getItem('accessToken');
  };

  login() {
    this.auth0.authorize();
  };

  setSession(authResult) {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
  }

  handleAuthentication() {
    const me = this;
    return new Promise((resolve, reject) => {
      me.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        me.setSession(authResult);
        resolve(authResult);
      });
    });
  }

  renewSession() {
    const me = this;
    me.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        me.setSession(authResult);
      } else if (err) {
        me.logout();
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');

    this.auth0.logout({
      clientID: this.clientId,
      returnTo: window.location.origin
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = localStorage.getItem('expiresAt');
    return new Date().getTime() < expiresAt;
  }
}

import auth0 from 'auth0-js';
import {appConfig} from '../config';

export default class Auth {
  accessToken;
  idToken;
  profile;

  auth0 = new auth0.WebAuth({
    domain: appConfig.domain,
    clientID: appConfig.clientId,
    redirectUri: appConfig.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid email profile'
  });

  login = () => {
    this.auth0.authorize();
  }

  setSession = (authResult) => {
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('expiresAt', expiresAt);

    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        console.log(authResult);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expiresAt');
  }
  
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = localStorage.getItem('expiresAt');
    return new Date().getTime() < expiresAt;
  }
}
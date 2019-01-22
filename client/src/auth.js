import auth0 from 'auth0-js';
import {appConfig} from './config';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: appConfig.domain,
    clientID: appConfig.clientId,
    redirectUri: appConfig.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}

import { appConfig } from './config';
import AuthService from './auth/AuthService';

class Api {
  constructor() {
    this.authService = new AuthService();
  }

  get(path, headers) {
    const url = appConfig.apiBaseUrl + path;
    console.log('GET', url);
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: headers || {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authService.getToken()}`
      },
    }).then(this.processResponse);
  }

  post(path, data) {
    const url = appConfig.apiBaseUrl + path;
    console.log('POST', url, data);
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authService.getToken()}`
      },
      body: JSON.stringify(data)
    }).then(this.processResponse);
  }

  processResponse(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error("API call was not successfully", res);
  }

  createClient(client) {
    return this.post('/clients', client);
  }

  getClients() {
    return this.get('/clients');
  }

  getClient(id) { 
    return this.get(`/clients/${id}`);
  }

  getAgent(accessToken) {
    return this.get('/agents', {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    });
  }

  createAgent() {
    return this.post('/agents', {});
  }
}

const apiClient = new Api();

export {
  apiClient
};
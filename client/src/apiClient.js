
import { appConfig } from './config';
import AuthService from './auth/AuthService';

const agentId = 1;

class Api {
  constructor() {
    this.authService = new AuthService();
  }

  get(path) {
    const url = appConfig.apiBaseUrl + path;
    console.log('GET', url);
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": agentId
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
        "Authorization": agentId
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

  getAgentProfile() {
    const url = appConfig.apiBaseUrl + '/agents/auth';
    console.log('GET', url);
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.authService.getToken()
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      if (res.status === 404) {
        return null;
      }

      throw new Error("API call was not successfully", res);
    });
  }
}

const apiClient = new Api();

export {
  apiClient
};
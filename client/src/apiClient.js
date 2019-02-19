
import { appConfig } from './config';

const agentId = 1;

class Api {
  post(path, data) {
    const url = appConfig.apiBaseUrl + path;
    console.log('POST', url, data);
    return fetch(appConfig + path, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": agentId
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
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
    }).then(res => res.json());
  }

  createClient(client) {
    return this.post('/clients', client);
  }

  getClients() {
    return this.get('/clients');
  }
}

const apiClient = new Api();

export {
  apiClient
};
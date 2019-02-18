
import { appConfig } from './config';

class Api {
  post(url, data) {
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    });
  }

  createClient(client) {
    return this.post('/clients', client);
  }
}

const apiClient = new Api();

export {
  apiClient
};

import AuthService from './auth/AuthService';

class Api {
  constructor() {
    this.authService = new AuthService();
  }

  doFetch(path, method, data, accessToken) {
    const auth = accessToken || this.authService.getToken();

    let options = {
      method: method || 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth}`
      }
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    return fetch(`/api${path}`, options).then(res => {
      if (res.ok) {
        return res.json();
      }
  
      throw new Error("API call was not successfully", res);
    });
  }

  createClient(client) {
    return this.doFetch('/clients', 'POST', client);
  }

  getClients() {
    return this.doFetch('/clients');
  }

  getClient(id) { 
    return this.doFetch(`/clients/${id}`);
  }

  getAgent(accessToken) {
    if (accessToken) {
      return this.doFetch('/agents', 'GET', null, accessToken);
    }

    // Get the current agent details from auth token
    return this.doFetch('/agents');
  }

  createAgent() {
    return this.doFetch('/agents', 'POST', {});
  }

  updateAgent(agent) { 
    return this.doFetch('/agents', 'PUT', agent);
  }
}

const apiClient = new Api();

export {
  apiClient
};
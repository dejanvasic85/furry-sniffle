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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return fetch(`/api${path}`, options).then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('API call was not successful', res);
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

  sendEmail(id) {
    return this.doFetch(`/clients/${id}/sendEmail`, 'POST', {});
  }

  sendGift(id, giftDetails) {
    const request = {
      message: giftDetails.message,
      giftValue: Number.parseInt(giftDetails.giftValue),
      from: giftDetails.from
    };
    return this.doFetch(`/clients/${id}/gift`, 'POST', request);
  }

  getClientGifts(id) {
    return this.doFetch(`/clients/${id}/gift`);
  }

  getGifts() {
    return this.doFetch(`/gifts`);
  }

  updateClient(id, client) {
    return this.doFetch(`/clients/${id}`, 'PUT', client);
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

  createProspect(prospect) {
    return this.doFetch('/prospects', 'POST', prospect);
  }

  updateAgent(agent) {
    return this.doFetch('/agents', 'PUT', agent);
  }

  invite(data) {
    return this.doFetch(`/prospects/invite`, 'POST', data);
  }

  completeDeposit({ amount, stripeToken }) {
    return this.doFetch(`/agents/deposit`, 'POST', { amount, stripeToken });
  }
}

const apiClient = new Api();

export { apiClient };

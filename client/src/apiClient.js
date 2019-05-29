import AuthService from './auth/AuthService';

class Api {
  constructor() {
    this.authService = new AuthService();
  }

  async doFetch(path, method, data, accessToken) {
    const auth = accessToken || this.authService.getToken();

    let options = {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(`/api${path}`, options);
    if (res.ok) {
      return await res.json();
    }

    if (res.status >= 400) {
      const payload = await res.json();
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    throw new Error('Oops.. something went wrong. Check your connect or try again.', res);
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
      from: giftDetails.from,
    };
    return this.doFetch(`/clients/${id}/gift`, 'POST', request);
  }

  getDashboard() {
    return this.doFetch(`/dashboard`);
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

  login(accessToken) {
    return this.doFetch('/agents/login', 'POST', null, accessToken);
  }

  getAgent() {
    // Returns the current agent stored in token (local storage)
    return this.doFetch('/agents');
  }

  createAgent() {
    return this.doFetch('/agents', 'POST', {});
  }

  getProspect(prospectId) {
    return this.doFetch(`/prospects/${prospectId}`);
  }

  updateProspectStatus(prospectId, status) {
    return this.doFetch(`/prospects/${prospectId}`,'PUT',{status});
  }

  getProspects() {
    return this.doFetch('/prospects');
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

  getAccount() {
    return this.doFetch(`/accounts`);
  }
}

const apiClient = new Api();

export { apiClient };

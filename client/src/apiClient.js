import AuthService from './auth/AuthService';

class Api {
  constructor() {
    this.authService = new AuthService();
  }

  async processResponse(res){
    if (res.ok) {
      return await res.json();
    }

    if (res.status >= 400) {
      let payload;
      try {
        payload = await res.json();
      } catch (parsingError) {
        throw new Error('failed to parse payload');
      }

      if (payload.error) {
        throw new Error(payload.error);
      }      
    }

    throw new Error('Oops.. something went wrong. Check your connect or try again.', res);
  }

  createHeaders(auth) {
    return  {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    };
  }

  async doGet(path, queryParams) {
    const auth = this.authService.getToken();

    let options = {
      method: 'GET',
      headers: this.createHeaders(auth),
      params: queryParams
    };
    
    const res = await fetch(`/api${path}`, options);
    return this.processResponse(res);
  }

  async doCall(path, method, data, accessToken) {
    if(!method){
      throw new Error('method is required.',path);
    }

    const auth = accessToken || this.authService.getToken();

    let options = {
      method: method,
      headers: this.createHeaders(auth),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(`/api${path}`, options);
    return this.processResponse(res);
  }

  createClient(client) {
    return this.doCall('/clients', 'POST', client);
  }

  getClients() {
    return this.doGet('/clients');
  }

  getClient(id) {
    return this.doGet(`/clients/${id}`);
  }

  sendEmail(id) {
    return this.doCall(`/clients/${id}/sendEmail`, 'POST', {});
  }

  sendBatchClientEmails(ids) {
    return this.doCall(`/clients/sendBatchClientEmails`, 'POST', {
      ids
    });
  }

  sendGift(id, giftDetails) {
    const request = {
      message: giftDetails.message,
      giftValue: Number.parseInt(giftDetails.giftValue),
      from: giftDetails.from,
    };
    return this.doCall(`/clients/${id}/gift`, 'POST', request);
  }

  getDashboard(days) {
    return this.doGet(`/dashboard?xdaysago=${days}`);
  }

  getClientGifts(id) {
    return this.doGet(`/clients/${id}/gift`);
  }

  getClientEmails(ids) {
    return this.doGet(`/clients/emails/list?ids=${ids}`);
  }

  getGifts() {
    return this.doGet(`/gifts`);
  }

  getGiftStatus(giftId) {
    if(!giftId){
      throw new Error('giftID is requied');
    }
    return this.doGet(`/gifts/${giftId}/status`);
  }

  updateClient(id, client) {
    return this.doCall(`/clients/${id}`, 'PUT', client);
  }

  login(accessToken) {
    return this.doCall('/agents/login', 'POST', null, accessToken);
  }

  getAgent() {
    // Returns the current agent stored in token (local storage)
    return this.doGet('/agents');
  }

  createAgent() {
    return this.doCall('/agents', 'POST', {});
  }

  getProspect(prospectId) {
    return this.doGet(`/prospects/${prospectId}`);
  }

  getNewProspects() {
    return this.doGet(`/prospects?status=new`);
  }

  getSignupCompletion() {
    return this.doGet(`/signup`);
  }

  updateProspectStatus(prospectId, status) {
    return this.doCall(`/prospects/${prospectId}`,'PUT',{status});
  }

  getProspects() {
    return this.doGet('/prospects');
  }

  createProspect(prospect) {
    return this.doCall('/prospects', 'POST', prospect);
  }

  updateAgent(agent) {
    return this.doCall('/agents', 'PUT', agent);
  }

  invite(data) {
    return this.doCall(`/prospects/invite`, 'POST', data);
  }

  completeDeposit({ amount, stripeToken }) {
    return this.doCall(`/agents/deposit`, 'POST', { amount, stripeToken });
  }

  getAccount() {
    return this.doGet(`/accounts`);
  }
}

const apiClient = new Api();

export { apiClient };
